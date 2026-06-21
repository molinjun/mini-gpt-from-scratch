# 02 Embedding

Token ids are coordinates into a learned table. If `idx` has shape `(B, T)`, token lookup produces `(B, T, C)`, where `C` is `n_embd`.

The first representation is:

```python
positions = np.arange(T)[None, :]
x = token_embedding(idx) + position_embedding(positions)
```

The token embedding answers: what symbol is this? The position embedding answers: where is it in the context window?

The output projection turns every hidden vector back into vocabulary scores:

```python
logits = x @ lm_head_w + lm_head_b
```

Logits are unnormalized evidence. Cross-entropy converts them into a scalar training signal by comparing the predicted next-token distribution with the target token id.

Shape discipline:

- ids: `(batch, time)`
- embeddings: `(batch, time, channels)`
- logits: `(batch, time, vocab_size)`
- targets: `(batch, time)`
