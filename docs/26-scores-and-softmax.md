# 27 Scores and Softmax

## Section

Transformer Architecture

## Slide-Visible Text

- Score = Q dot K match strength
- Softmax turns scores into weights
- Weights mix the values

## Speaker Notes

The model compares queries and keys with a dot product. That gives attention scores, or match strengths. Then softmax turns those scores into weights that add up to one. The final attention output is a weighted mix of the value vectors.

## Visual Direction

Matrix multiplication view over the character context `d e n n`: `Q @ K.T`, scale, softmax, attention matrix. Add definition chips: "score = match strength" and "softmax = scores to weights".

## Target Image

`share/deck/v2/27-slide-scores-and-softmax.png`
