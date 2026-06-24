# 15 Position Embedding

## Slide Goal

Explain why order must be added.

## Key Points

- Same token can appear twice
- Position vector is different
- Token + position becomes hidden state

## Speaker Notes

A token embedding tells the model what symbol it is. But the model also needs to know where the symbol is.

In the prefix denn, the two n characters have the same token id. Without position information, they would start with the same vector.

So Mini-GPT adds a position embedding. Token vector plus position vector becomes the first hidden state for each position.

## Visual Idea

Two rows showing token vectors and position vectors added together for d e n n, with the two n tokens highlighted differently.

## Code Anchor

- src/model.py: MiniGPT.forward
