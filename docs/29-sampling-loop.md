# 29 Sampling Loop

## Slide Goal

Explain generation as repeated forward passes.

## Key Points

- Start from BOS or a prompt
- Read final-position logits
- Sample one token and repeat

## Speaker Notes

Generation is not a new model. It reuses the same forward pass.

We start from BOS or from a prompt like den. We crop the context if it is longer than block size. We run the model and read the logits at the last position.

Then we sample one token, append it, and repeat. When the model samples BOS again, we stop and decode the name.

## Visual Idea

Generation loop diagram with token context growing one box at a time from d e n to dennis.

## Code Anchor

- src/train.py: generate
- src/train.py: generate_name
