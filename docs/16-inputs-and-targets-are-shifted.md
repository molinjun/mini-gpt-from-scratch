# 17 Inputs and Targets Are Shifted

## Section

Tokenizer and Embedding

## Slide-Visible Text

- Input: `D e n n`
- Target: `e n n i`
- Learn one-step prediction

## Speaker Notes

Training uses shifted pairs. If the input is D, e, n, n, then the target is e, n, n, i. At every position, the model learns to predict the next token. This is why one short name gives us several training examples.

## Visual Direction

Two aligned rows of token boxes with a one-position shift arrow.

## Target Image

`share/deck/v2/17-slide-inputs-and-targets-are-shifted.png`
