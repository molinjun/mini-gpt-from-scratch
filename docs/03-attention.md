# 03 Attention

Causal self-attention lets every position look backward through the context.

For each hidden vector `x`, the model builds three projections:

```python
q = x @ Wq
k = x @ Wk
v = x @ Wv
```

Queries describe what a position is looking for. Keys describe what each position contains. Values carry the information that will be mixed into the result.

The score matrix compares every query with every key:

```python
scores = q @ np.swapaxes(k, -1, -2)
scores = scores / np.sqrt(head_dim)
```

The causal mask is lower triangular. It keeps token `t` from reading positions greater than `t`.

```python
scores = np.where(mask, scores, -1e9)
weights = softmax(scores, axis=-1)
out = weights @ v
```

Multi-head attention splits the channel dimension into separate relation spaces:

```text
(B, T, C) -> (B, H, T, D) -> (B, T, C)
```

Each head can learn a different kind of dependency: local syntax, repeated symbols, long-range names, or punctuation rhythm.
