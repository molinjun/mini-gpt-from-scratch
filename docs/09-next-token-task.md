# 09 The Next-Token Task

## Slide Goal

Show shifted input and target windows.

## Key Points

- Same sequence
- Shift by one step
- Many targets from one name

## Speaker Notes

The next-token task is made by shifting the sequence by one step.

The input row might be BOS, d, e, n. The target row is d, e, n, n. At each position, the model predicts the next character.

This is very efficient for learning. One short name gives many small prediction tasks. The Transformer learns from all positions at the same time.

## Visual Idea

Aligned two-row sequence diagram: input row BOS d e n, target row d e n n, with vertical arrows between positions.

## Code Anchor

- src.train.get_batch
