# 37 Sampling Loop

## Section

Training and Inference

## Slide-Visible Text

- Use the latest context window
- Convert logits to probabilities
- Sample the next token

## Speaker Notes

At each generation step, the model only needs the latest context window. It produces logits for the next token. We turn logits into probabilities, sample one token, append it, and continue. This is the same next-token idea used during training.

## Visual Direction

Loop diagram: context, model, logits, probabilities, sampled token, append.

## Target Image

`share/deck/v2/37-slide-sampling-loop.png`
