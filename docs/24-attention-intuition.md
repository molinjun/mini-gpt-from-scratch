# 25 Attention Intuition

## Section

Transformer Architecture

## Slide-Visible Text

- Each token looks at earlier tokens
- Important tokens get more weight
- The result is a mixed vector

## Speaker Notes

Attention is a learned way for one position to look back at useful context. For the prefix d, e, n, n, the last n may need information from earlier characters to predict i. Attention scores visible positions and mixes their value vectors.

## Visual Direction

Current character token `n` in the context `d e n n` looking backward with weighted blue lines to earlier character tokens `d`, `e`, and `n`. Add a definition chip: "attention = weighted mixing".

## Target Image

`share/deck/v2/25-slide-attention-intuition.png`
