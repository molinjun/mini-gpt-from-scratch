"""Pure NumPy Mini-GPT components with a tiny reverse-mode engine."""

from __future__ import annotations

from dataclasses import dataclass
import math
from typing import Iterable

import numpy as np


def _ensure_array(data) -> np.ndarray:
    return np.asarray(data, dtype=np.float64)


def _unbroadcast(grad: np.ndarray, shape: tuple[int, ...]) -> np.ndarray:
    while grad.ndim > len(shape):
        grad = grad.sum(axis=0)
    for axis, size in enumerate(shape):
        if size == 1:
            grad = grad.sum(axis=axis, keepdims=True)
    return grad


class Tensor:
    """A small NumPy tensor that records enough graph state for backprop."""

    def __init__(self, data, children=(), op: str = "", requires_grad: bool = True):
        self.data = _ensure_array(data)
        self.grad = np.zeros_like(self.data, dtype=np.float64)
        self.requires_grad = requires_grad
        self._prev = tuple(children)
        self._op = op
        self._backward = lambda: None

    def __repr__(self) -> str:
        return f"Tensor(shape={self.data.shape}, op={self._op!r})"

    @property
    def shape(self) -> tuple[int, ...]:
        return self.data.shape

    def zero_grad(self) -> None:
        self.grad = np.zeros_like(self.data, dtype=np.float64)

    def backward(self) -> None:
        topo: list[Tensor] = []
        visited: set[int] = set()

        def build(node: Tensor) -> None:
            if id(node) in visited:
                return
            visited.add(id(node))
            for child in node._prev:
                build(child)
            topo.append(node)

        build(self)
        self.grad = np.ones_like(self.data, dtype=np.float64)
        for node in reversed(topo):
            node._backward()

    def __add__(self, other) -> "Tensor":
        other = as_tensor(other)
        out = Tensor(self.data + other.data, (self, other), "+")

        def backward() -> None:
            if self.requires_grad:
                self.grad += _unbroadcast(out.grad, self.data.shape)
            if other.requires_grad:
                other.grad += _unbroadcast(out.grad, other.data.shape)

        out._backward = backward
        return out

    def __radd__(self, other) -> "Tensor":
        return self + other

    def __neg__(self) -> "Tensor":
        return self * -1.0

    def __sub__(self, other) -> "Tensor":
        return self + (-as_tensor(other))

    def __rsub__(self, other) -> "Tensor":
        return as_tensor(other) + (-self)

    def __mul__(self, other) -> "Tensor":
        other = as_tensor(other)
        out = Tensor(self.data * other.data, (self, other), "*")

        def backward() -> None:
            if self.requires_grad:
                self.grad += _unbroadcast(other.data * out.grad, self.data.shape)
            if other.requires_grad:
                other.grad += _unbroadcast(self.data * out.grad, other.data.shape)

        out._backward = backward
        return out

    def __rmul__(self, other) -> "Tensor":
        return self * other

    def __truediv__(self, other) -> "Tensor":
        return self * (as_tensor(other) ** -1.0)

    def __rtruediv__(self, other) -> "Tensor":
        return as_tensor(other) * (self ** -1.0)

    def __pow__(self, power: float) -> "Tensor":
        out = Tensor(self.data**power, (self,), f"**{power}")

        def backward() -> None:
            if self.requires_grad:
                self.grad += (power * self.data ** (power - 1)) * out.grad

        out._backward = backward
        return out

    def __matmul__(self, other) -> "Tensor":
        other = as_tensor(other)
        out = Tensor(np.matmul(self.data, other.data), (self, other), "@")

        def backward() -> None:
            if self.requires_grad:
                grad_self = np.matmul(out.grad, np.swapaxes(other.data, -1, -2))
                self.grad += _unbroadcast(grad_self, self.data.shape)
            if other.requires_grad:
                grad_other = np.matmul(np.swapaxes(self.data, -1, -2), out.grad)
                other.grad += _unbroadcast(grad_other, other.data.shape)

        out._backward = backward
        return out

    def sum(self, axis=None, keepdims: bool = False) -> "Tensor":
        out = Tensor(self.data.sum(axis=axis, keepdims=keepdims), (self,), "sum")

        def backward() -> None:
            if not self.requires_grad:
                return
            grad = out.grad
            if axis is not None and not keepdims:
                axes = axis if isinstance(axis, tuple) else (axis,)
                axes = tuple(ax if ax >= 0 else ax + self.data.ndim for ax in axes)
                for ax in sorted(axes):
                    grad = np.expand_dims(grad, ax)
            self.grad += np.ones_like(self.data) * grad

        out._backward = backward
        return out

    def mean(self, axis=None, keepdims: bool = False) -> "Tensor":
        if axis is None:
            denom = self.data.size
        else:
            axes = axis if isinstance(axis, tuple) else (axis,)
            denom = math.prod(self.data[ax].shape[0] if False else self.data.shape[ax] for ax in axes)
        return self.sum(axis=axis, keepdims=keepdims) / denom

    def reshape(self, *shape: int) -> "Tensor":
        out = Tensor(self.data.reshape(*shape), (self,), "reshape")

        def backward() -> None:
            if self.requires_grad:
                self.grad += out.grad.reshape(self.data.shape)

        out._backward = backward
        return out

    def transpose(self, axes: tuple[int, ...]) -> "Tensor":
        out = Tensor(np.transpose(self.data, axes), (self,), "transpose")
        inverse = np.argsort(axes)

        def backward() -> None:
            if self.requires_grad:
                self.grad += np.transpose(out.grad, inverse)

        out._backward = backward
        return out

    def swapaxes(self, axis1: int, axis2: int) -> "Tensor":
        axes = list(range(self.data.ndim))
        axes[axis1], axes[axis2] = axes[axis2], axes[axis1]
        return self.transpose(tuple(axes))

    def tanh(self) -> "Tensor":
        value = np.tanh(self.data)
        out = Tensor(value, (self,), "tanh")

        def backward() -> None:
            if self.requires_grad:
                self.grad += (1.0 - value**2) * out.grad

        out._backward = backward
        return out

    def exp(self) -> "Tensor":
        value = np.exp(self.data)
        out = Tensor(value, (self,), "exp")

        def backward() -> None:
            if self.requires_grad:
                self.grad += value * out.grad

        out._backward = backward
        return out

    def log(self) -> "Tensor":
        out = Tensor(np.log(self.data), (self,), "log")

        def backward() -> None:
            if self.requires_grad:
                self.grad += out.grad / self.data

        out._backward = backward
        return out


class Parameter(Tensor):
    """A trainable tensor."""

    def __init__(self, data, name: str = ""):
        super().__init__(data, requires_grad=True)
        self.name = name


def as_tensor(value) -> Tensor:
    if isinstance(value, Tensor):
        return value
    return Tensor(value, requires_grad=False)


def softmax(x: Tensor, axis: int = -1) -> Tensor:
    shifted = x + Tensor(-np.max(x.data, axis=axis, keepdims=True), requires_grad=False)
    exps = shifted.exp()
    return exps / exps.sum(axis=axis, keepdims=True)


def softmax_cross_entropy(logits: Tensor, targets: np.ndarray) -> Tensor:
    """Stable mean cross-entropy with direct gradient into logits."""

    targets = np.asarray(targets, dtype=np.int64)
    flat_logits = logits.data.reshape(-1, logits.data.shape[-1])
    flat_targets = targets.reshape(-1)
    shifted = flat_logits - flat_logits.max(axis=-1, keepdims=True)
    exp_scores = np.exp(shifted)
    probs = exp_scores / exp_scores.sum(axis=-1, keepdims=True)
    n = flat_targets.size
    loss_value = -np.log(probs[np.arange(n), flat_targets] + 1e-12).mean()
    out = Tensor(loss_value, (logits,), "cross_entropy")

    def backward() -> None:
        if not logits.requires_grad:
            return
        dlogits = probs.copy()
        dlogits[np.arange(n), flat_targets] -= 1.0
        dlogits /= n
        logits.grad += dlogits.reshape(logits.data.shape) * out.grad

    out._backward = backward
    return out


def gelu(x: Tensor) -> Tensor:
    inner = math.sqrt(2.0 / math.pi) * (x + 0.044715 * (x**3))
    return 0.5 * x * (1.0 + inner.tanh())


def causal_mask(size: int) -> np.ndarray:
    return np.tril(np.ones((size, size), dtype=bool))


class Module:
    def parameters(self) -> list[Parameter]:
        params: list[Parameter] = []
        for value in self.__dict__.values():
            if isinstance(value, Parameter):
                params.append(value)
            elif isinstance(value, Module):
                params.extend(value.parameters())
            elif isinstance(value, list):
                for item in value:
                    if isinstance(item, Module):
                        params.extend(item.parameters())
        return params

    def zero_grad(self) -> None:
        for param in self.parameters():
            param.zero_grad()


class Linear(Module):
    def __init__(self, in_features: int, out_features: int, rng: np.random.Generator, bias: bool = True):
        scale = 1.0 / math.sqrt(in_features)
        self.weight = Parameter(rng.normal(0.0, scale, (in_features, out_features)), "weight")
        self.bias = Parameter(np.zeros(out_features), "bias") if bias else None

    def __call__(self, x: Tensor) -> Tensor:
        out = x @ self.weight
        if self.bias is not None:
            out = out + self.bias
        return out


class Embedding(Module):
    def __init__(self, num_embeddings: int, embedding_dim: int, rng: np.random.Generator):
        self.weight = Parameter(rng.normal(0.0, 0.02, (num_embeddings, embedding_dim)), "embedding")

    def __call__(self, idx: np.ndarray) -> Tensor:
        idx = np.asarray(idx, dtype=np.int64)
        out = Tensor(self.weight.data[idx], (self.weight,), "embedding")

        def backward() -> None:
            if self.weight.requires_grad:
                np.add.at(self.weight.grad, idx, out.grad)

        out._backward = backward
        return out


class LayerNorm(Module):
    def __init__(self, n_embd: int, eps: float = 1e-5):
        self.gamma = Parameter(np.ones(n_embd), "ln_gamma")
        self.beta = Parameter(np.zeros(n_embd), "ln_beta")
        self.eps = eps

    def __call__(self, x: Tensor) -> Tensor:
        mean = x.mean(axis=-1, keepdims=True)
        centered = x - mean
        var = (centered * centered).mean(axis=-1, keepdims=True)
        normed = centered / ((var + self.eps) ** 0.5)
        return self.gamma * normed + self.beta


class FeedForward(Module):
    def __init__(self, n_embd: int, rng: np.random.Generator):
        self.c_fc = Linear(n_embd, 4 * n_embd, rng)
        self.c_proj = Linear(4 * n_embd, n_embd, rng)

    def __call__(self, x: Tensor) -> Tensor:
        return self.c_proj(gelu(self.c_fc(x)))


class CausalSelfAttention(Module):
    def __init__(self, n_embd: int, n_head: int, block_size: int, rng: np.random.Generator):
        if n_embd % n_head != 0:
            raise ValueError("n_embd must be divisible by n_head.")
        self.n_head = n_head
        self.head_dim = n_embd // n_head
        self.block_size = block_size
        self.q_proj = Linear(n_embd, n_embd, rng, bias=False)
        self.k_proj = Linear(n_embd, n_embd, rng, bias=False)
        self.v_proj = Linear(n_embd, n_embd, rng, bias=False)
        self.out_proj = Linear(n_embd, n_embd, rng, bias=False)

    def _split_heads(self, x: Tensor) -> Tensor:
        b, t, c = x.shape
        return x.reshape(b, t, self.n_head, c // self.n_head).transpose((0, 2, 1, 3))

    def _merge_heads(self, x: Tensor) -> Tensor:
        b, h, t, d = x.shape
        return x.transpose((0, 2, 1, 3)).reshape(b, t, h * d)

    def __call__(self, x: Tensor) -> Tensor:
        _, t, _ = x.shape
        q = self._split_heads(self.q_proj(x))
        k = self._split_heads(self.k_proj(x))
        v = self._split_heads(self.v_proj(x))

        scores = (q @ k.swapaxes(-1, -2)) / math.sqrt(self.head_dim)
        allowed = causal_mask(t).reshape(1, 1, t, t)
        mask_bias = np.where(allowed, 0.0, -1e9)
        weights = softmax(scores + Tensor(mask_bias, requires_grad=False), axis=-1)
        out = weights @ v
        return self.out_proj(self._merge_heads(out))


class TransformerBlock(Module):
    def __init__(self, n_embd: int, n_head: int, block_size: int, rng: np.random.Generator):
        self.ln1 = LayerNorm(n_embd)
        self.attn = CausalSelfAttention(n_embd, n_head, block_size, rng)
        self.ln2 = LayerNorm(n_embd)
        self.mlp = FeedForward(n_embd, rng)

    def __call__(self, x: Tensor) -> Tensor:
        x = x + self.attn(self.ln1(x))
        x = x + self.mlp(self.ln2(x))
        return x


@dataclass
class MiniGPTConfig:
    vocab_size: int
    block_size: int = 32
    n_layer: int = 2
    n_head: int = 2
    n_embd: int = 32
    seed: int = 1337


class MiniGPT(Module):
    def __init__(self, config: MiniGPTConfig):
        self.config = config
        self.rng = np.random.default_rng(config.seed)
        self.token_embedding = Embedding(config.vocab_size, config.n_embd, self.rng)
        self.position_embedding = Embedding(config.block_size, config.n_embd, self.rng)
        self.blocks = [
            TransformerBlock(config.n_embd, config.n_head, config.block_size, self.rng)
            for _ in range(config.n_layer)
        ]
        self.ln_f = LayerNorm(config.n_embd)
        self.lm_head = Linear(config.n_embd, config.vocab_size, self.rng, bias=True)

    def forward(self, idx: np.ndarray, targets: np.ndarray | None = None) -> tuple[Tensor, Tensor | None]:
        idx = np.asarray(idx, dtype=np.int64)
        if idx.ndim != 2:
            raise ValueError("idx must have shape (batch, time).")
        _, t = idx.shape
        if t > self.config.block_size:
            raise ValueError(f"Sequence length {t} exceeds block_size {self.config.block_size}.")

        positions = np.arange(t, dtype=np.int64)[None, :]
        x = self.token_embedding(idx) + self.position_embedding(positions)
        for block in self.blocks:
            x = block(x)
        x = self.ln_f(x)
        logits = self.lm_head(x)
        loss = softmax_cross_entropy(logits, targets) if targets is not None else None
        return logits, loss

    def __call__(self, idx: np.ndarray, targets: np.ndarray | None = None) -> tuple[Tensor, Tensor | None]:
        return self.forward(idx, targets)


def parameters_count(params: Iterable[Parameter]) -> int:
    return int(sum(param.data.size for param in params))
