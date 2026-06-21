# 04 Activation

A Transformer block alternates two operations:

1. Communication across positions through attention.
2. Computation inside each position through an MLP.

The implementation uses pre-normalization:

```python
x = x + self.attn(self.ln1(x))
x = x + self.mlp(self.ln2(x))
```

Layer normalization stabilizes the channel scale per token:

```text
norm(x) = (x - mean(x)) / sqrt(var(x) + eps)
```

Learned `gamma` and `beta` let the model restore useful scale and offset after normalization.

The feed-forward network expands and contracts channels:

```text
C -> 4C -> C
```

GELU provides the nonlinear gate:

```python
0.5 * x * (1 + tanh(sqrt(2 / pi) * (x + 0.044715 * x**3)))
```

Residual paths keep the representation editable. Each block adds a learned correction to the existing stream rather than replacing it wholesale.
