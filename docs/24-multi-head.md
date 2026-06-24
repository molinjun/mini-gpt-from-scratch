# 24 Multi-Head Attention

## Slide Goal

Explain why multiple heads are useful.

## Key Points

- Split channels
- Run attention in parallel
- Merge heads back

## Speaker Notes

Multi-head attention means the model runs several attention operations in parallel.

Each head gets part of the vector channels. One head might learn local spelling rhythm. Another might learn likely endings. Another might notice repeated letters like n n.

After the heads read context in different ways, their outputs are merged back into one vector stream.

## Visual Idea

Three parallel attention head lanes over the same Dennis token sequence, each with a different highlighted relation.

## Code Anchor

- src/model.py: _split_heads
- src/model.py: _merge_heads
