# 21 Position Embedding

## Section

Tokenizer and Embedding

## Slide-Visible Text

- Attention sees tokens in parallel
- Order must be added
- Token vector + position vector

## Speaker Notes

Token embeddings tell the model what the token is. Position embeddings tell it where the token is. This matters because the two n characters in Denn have the same token ID, but they are in different positions. We add token and position vectors together.

## Visual Direction

Character token row `d e n n` plus position row `0 1 2 3` equals hidden vector row. Include a small contrast row `n n e d` to show that the same characters in a different order get different position vectors.

## Target Image

`share/deck/v2/21-slide-position-embedding.png`
