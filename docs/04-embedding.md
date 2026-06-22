# 04 Embedding

## Slide Goal

Explain why token ids need to become vectors, and what token embedding and position embedding each contribute.

## Key Points

- Token ids are discrete labels; they do not carry useful numeric distance by themselves.
- Embedding is a learned table: each token id selects one vector row.
- Position embedding tells the model where the token sits in the context window.
- Initial hidden state: `x = token_embedding(ids) + position_embedding(pos)`.
- All later Transformer blocks operate on these vectors.

## Talk Detail

If `idx` has shape `(B, T)`, token lookup produces `(B, T, C)`, where `C` is `n_embd`.

```python
positions = np.arange(T)[None, :]
x = token_embedding(idx) + position_embedding(positions)
```

The token embedding answers: what symbol is this? The position embedding answers: where is it in the context window?

Shape discipline:

- ids: `(batch, time)`
- embeddings: `(batch, time, channels)`
- logits: `(batch, time, vocab_size)`
- targets: `(batch, time)`

## Speaker Notes

Embedding is not a dictionary lookup for meaning. It gives each token a continuous coordinate that can be trained. At initialization, those vectors are nearly random. As loss falls, useful statistical relationships are written into the vectors.

## Visual Idea

Matrix lookup diagram: token ids select rows from the embedding table, then position rows are added.

## Code Anchor

- `src/model.py`: `Embedding`, `MiniGPT.forward`
