"""Training and generation entry point for the pure NumPy Mini-GPT."""

from __future__ import annotations

from pathlib import Path
import sys

import numpy as np

if __package__ in (None, ""):
    sys.path.append(str(Path(__file__).resolve().parents[1]))

from src.model import MiniGPT, MiniGPTConfig, Parameter, softmax  # noqa: E402
from src.tokenizer import CharTokenizer  # noqa: E402


DEFAULT_TEXT = (
    "Mini-GPT learns by predicting the next character. "
    "Attention lets each token look backward through context. "
)


def get_batch(data: np.ndarray, batch_size: int, block_size: int, rng: np.random.Generator) -> tuple[np.ndarray, np.ndarray]:
    if len(data) <= block_size:
        raise ValueError("Data length must be larger than block_size.")
    starts = rng.integers(0, len(data) - block_size, size=batch_size)
    x = np.stack([data[i : i + block_size] for i in starts])
    y = np.stack([data[i + 1 : i + block_size + 1] for i in starts])
    return x, y


class AdamW:
    """Decoupled Adam weight decay optimizer for local `Parameter` objects."""

    def __init__(
        self,
        parameters: list[Parameter],
        lr: float = 3e-3,
        betas: tuple[float, float] = (0.9, 0.999),
        eps: float = 1e-8,
        weight_decay: float = 1e-2,
    ):
        self.parameters = parameters
        self.lr = lr
        self.beta1, self.beta2 = betas
        self.eps = eps
        self.weight_decay = weight_decay
        self.t = 0
        self.m = [np.zeros_like(param.data) for param in parameters]
        self.v = [np.zeros_like(param.data) for param in parameters]

    def zero_grad(self) -> None:
        for param in self.parameters:
            param.zero_grad()

    def step(self) -> None:
        self.t += 1
        for i, param in enumerate(self.parameters):
            grad = param.grad
            self.m[i] = self.beta1 * self.m[i] + (1.0 - self.beta1) * grad
            self.v[i] = self.beta2 * self.v[i] + (1.0 - self.beta2) * (grad * grad)
            m_hat = self.m[i] / (1.0 - self.beta1**self.t)
            v_hat = self.v[i] / (1.0 - self.beta2**self.t)
            param.data *= 1.0 - self.lr * self.weight_decay
            param.data -= self.lr * m_hat / (np.sqrt(v_hat) + self.eps)


def clip_grad_norm(parameters: list[Parameter], max_norm: float) -> float:
    total = 0.0
    for param in parameters:
        total += float(np.sum(param.grad * param.grad))
    norm = float(np.sqrt(total))
    if norm > max_norm:
        scale = max_norm / (norm + 1e-12)
        for param in parameters:
            param.grad *= scale
    return norm


def estimate_loss(
    model: MiniGPT,
    data: np.ndarray,
    batch_size: int,
    block_size: int,
    eval_iters: int,
    rng: np.random.Generator,
) -> float:
    losses = []
    for _ in range(eval_iters):
        x, y = get_batch(data, batch_size, block_size, rng)
        _, loss = model.forward(x, y)
        losses.append(float(loss.data))
    return float(np.mean(losses))


def generate(
    model: MiniGPT,
    idx: np.ndarray,
    max_new_tokens: int,
    temperature: float = 1.0,
    top_k: int | None = None,
    rng: np.random.Generator | None = None,
) -> np.ndarray:
    rng = rng or np.random.default_rng()
    out = np.asarray(idx, dtype=np.int64)
    if out.ndim == 1:
        out = out[None, :]

    for _ in range(max_new_tokens):
        context = out[:, -model.config.block_size :]
        logits, _ = model.forward(context)
        next_logits = logits.data[:, -1, :] / max(temperature, 1e-8)
        if top_k is not None:
            kth = np.partition(next_logits, -top_k, axis=-1)[:, -top_k][:, None]
            next_logits = np.where(next_logits < kth, -1e9, next_logits)
        shifted = next_logits - next_logits.max(axis=-1, keepdims=True)
        probs = np.exp(shifted)
        probs /= probs.sum(axis=-1, keepdims=True)
        next_ids = np.array([rng.choice(probs.shape[-1], p=row) for row in probs], dtype=np.int64)[:, None]
        out = np.concatenate([out, next_ids], axis=1)
    return out


def train(
    text: str = DEFAULT_TEXT,
    max_steps: int = 20,
    batch_size: int = 4,
    block_size: int = 16,
    n_layer: int = 1,
    n_head: int = 2,
    n_embd: int = 24,
    seed: int = 1337,
) -> tuple[MiniGPT, CharTokenizer]:
    rng = np.random.default_rng(seed)
    tokenizer = CharTokenizer().fit(text)
    ids = np.array(tokenizer.encode(text), dtype=np.int64)
    config = MiniGPTConfig(
        vocab_size=tokenizer.vocab_size,
        block_size=block_size,
        n_layer=n_layer,
        n_head=n_head,
        n_embd=n_embd,
        seed=seed,
    )
    model = MiniGPT(config)
    optimizer = AdamW(model.parameters(), lr=2e-3, weight_decay=1e-2)

    for step in range(max_steps):
        x, y = get_batch(ids, batch_size, block_size, rng)
        _, loss = model.forward(x, y)
        optimizer.zero_grad()
        loss.backward()
        grad_norm = clip_grad_norm(model.parameters(), 1.0)
        optimizer.step()

        if step == 0 or (step + 1) % 5 == 0:
            print(f"step {step + 1:03d} | loss {float(loss.data):.4f} | grad_norm {grad_norm:.4f}")

    return model, tokenizer


def main() -> None:
    model, tokenizer = train()
    seed = np.array([tokenizer.encode("Mini")], dtype=np.int64)
    sample = generate(model, seed, max_new_tokens=80, temperature=0.9, top_k=8, rng=np.random.default_rng(7))
    print("\n--- sample ---")
    print(tokenizer.decode(sample[0].tolist()))


if __name__ == "__main__":
    main()
