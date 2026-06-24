# 23 Causal Mask

## Slide Goal

Explain why GPT cannot look right during training.

## Key Points

- Training sees full sequences
- Mask hides future tokens
- Generation stays left-to-right

## Speaker Notes

During training, we give the model a whole window of tokens. Without a mask, a position could look at the answer on its right.

That would be cheating. GPT must learn to predict from the past, because during generation the future does not exist yet.

The causal mask solves this. Each position can read itself and earlier positions, but it cannot read later positions.

## Visual Idea

Lower-triangular causal mask matrix for tokens BOS d e n n, with allowed cells glowing cyan and blocked cells dark.

## Code Anchor

- src/model.py: causal_mask
