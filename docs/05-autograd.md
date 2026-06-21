# 05 Autograd

The project uses a tiny local `Tensor` class to expose reverse-mode differentiation.

Every forward operation creates:

- output data
- links to parent tensors
- a `_backward()` closure that knows the local derivative

Calling `loss.backward()` topologically sorts the graph, seeds the loss gradient with `1`, and executes local backward closures in reverse.

For matrix multiplication:

```python
out = x @ W
dW = x.T @ dout
dx = dout @ W.T
```

For addition and multiplication, gradients are unbroadcast back to the original operand shapes.

Embedding lookup has sparse gradient flow. Only selected rows receive updates:

```python
out = weight[idx]
np.add.at(weight.grad, idx, out.grad)
```

Cross-entropy writes the most direct gradient into logits:

```python
dlogits = probs.copy()
dlogits[np.arange(N), targets] -= 1
dlogits /= N
```

Attention backward is not a special case. It is the reverse of ordinary array operations: reshape, transpose, matrix multiply, softmax, scaling, and residual addition.
