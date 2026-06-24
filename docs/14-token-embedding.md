# 14 Token Embedding

## Slide Goal

Show embedding lookup as table selection.

## Key Points

- One row per token
- Vector size is model dimension
- Rows change during training

## Speaker Notes

The token embedding table has one row for each token in the vocabulary.

When the model sees token id 4, it selects row 4 from the table. That row is a vector. The vector length is the model dimension.

At the start, these vectors are random. During training, the vectors move so useful character patterns become easier for the Transformer to compute.

## Visual Idea

Embedding matrix diagram: token ids on the left select colored vector rows in a table.

## Code Anchor

- src/model.py: Embedding.forward
