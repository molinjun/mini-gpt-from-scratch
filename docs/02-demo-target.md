# 02 The Demo Target

## Slide Goal

Make the task concrete before theory.

## Key Points

- Input: a short prefix
- Output: one next character
- Repeat until stop

## Speaker Notes

Here is the visible behavior we want. We give the model a short prefix, for example den.

The model does not write the whole name in one step. It predicts one next character. Then we append that character and ask again.

If the model samples n, then i, then s, and then the special stop token, we decode the result as dennis. This one-character loop is the main story for the whole talk.

## Visual Idea

A left-to-right generation trace showing BOS, d, e, n, then sampled n, i, s, and BOS as stop.

## Code Anchor

- src/train.py: generate_name
