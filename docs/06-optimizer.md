# 06 Optimizer

Training repeatedly builds next-token tasks from the token stream:

```python
x = data[i : i + block_size]
y = data[i + 1 : i + block_size + 1]
```

The loop is:

```python
logits, loss = model.forward(x, y)
optimizer.zero_grad()
loss.backward()
clip_grad_norm(model.parameters(), 1.0)
optimizer.step()
```

AdamW keeps first and second moments for every parameter:

```text
m = beta1 * m + (1 - beta1) * grad
v = beta2 * v + (1 - beta2) * grad^2
```

Bias correction removes the early-step underestimation:

```text
m_hat = m / (1 - beta1^t)
v_hat = v / (1 - beta2^t)
```

The parameter update is:

```text
param = param * (1 - lr * weight_decay)
param = param - lr * m_hat / (sqrt(v_hat) + eps)
```

Generation reuses the same forward pass. The model receives the current context, reads the final-step logits, samples one next token, appends it, and repeats. Temperature changes distribution sharpness; top-k limits sampling to the strongest candidates.
