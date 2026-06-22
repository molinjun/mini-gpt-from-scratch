# 05 Transformer

## Slide Goal

Explain the core of GPT: how attention lets tokens read context, how the MLP computes, and how multi-head attention learns multiple relation types in parallel.

## Key Points

- GPT is a decoder-only Transformer: it predicts the next token from left to right.
- Each block has two jobs: communication + computation.
- The attention block lets each position read prior positions by content.
- The MLP block transforms each position independently.
- Multi-head attention splits channels so the model can learn different relation spaces in parallel.
- The causal mask prevents a position from reading future tokens.

## Attention Mechanics

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

## Block Mechanics

A Transformer block alternates two operations:

1. Communication across positions through attention.
2. Computation inside each position through an MLP.

The current implementation uses pre-normalization:

```python
x = x + self.attn(self.ln1(x))
x = x + self.mlp(self.ln2(x))
```

Residual paths keep the representation editable. Each block adds a learned correction to the existing stream rather than replacing it wholesale.

## Speaker Notes

Attention can be understood as content lookup. The current position produces a query, prior positions provide keys, and the information to mix is carried in values. Softmax turns scores into weights. Multi-head attention lets the model perform several such lookups in separate subspaces at the same time.

## Visual Idea

Use three visuals in the HTML deck:

1. Transformer block overview.
2. Q/K/V attention plus causal mask.
3. Multi-head split/merge.

## Code Anchor

- `src/model.py`: `CausalSelfAttention`, `TransformerBlock`
