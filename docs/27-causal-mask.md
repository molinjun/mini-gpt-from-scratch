# 28 Causal Mask

## Section

Transformer Architecture

## Slide-Visible Text

- GPT must not see future tokens
- The mask blocks future positions
- Prediction stays honest

## Speaker Notes

During training, the full sequence is available, but GPT must not cheat by looking at future tokens. The causal mask blocks future positions. Each token can only attend to itself and earlier tokens, so the next-token prediction stays honest.

## Visual Direction

Attention matrix for character positions `d e n n`, with the upper triangle blocked out. Show that each position can only attend to itself and earlier character tokens.

## Target Image

`share/deck/v2/28-slide-causal-mask.png`
