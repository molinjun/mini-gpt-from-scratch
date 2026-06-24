# 32 Linear Head to Logits

## Section

Transformer Architecture

## Slide-Visible Text

- Logits are raw vocab scores
- Softmax gives probabilities
- Sampling picks the next token

## Speaker Notes

At the end, the linear head maps each hidden vector to vocabulary size. The output numbers are logits, which means raw scores. Softmax turns logits into probabilities, and sampling chooses the next token. For Denn, we hope i becomes likely.

## Visual Direction

Hidden vector for the last `n` entering the linear head, raw logit bars for character tokens `a`, `e`, `i`, `n`, `s`, then softmax probability bars. Highlight `i` as the likely next token. Add definition chips: "logits = raw scores" and "softmax = scores to probabilities".

## Target Image

`share/deck/v2/32-slide-linear-head-to-logits.png`
