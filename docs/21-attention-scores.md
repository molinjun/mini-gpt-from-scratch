# 21 Attention Scores

## Slide Goal

Show dot product, mask, and softmax as a sequence.

## Key Points

- Dot product measures match
- Mask removes future
- Softmax normalizes weights

## Speaker Notes

The attention score is usually made with a dot product between query and key.

If the query and key match well, the score is high. If they do not match, the score is low.

Then the causal mask blocks future positions. Finally, softmax turns the visible scores into weights. Those weights decide how much value information will be mixed into the current position.

## Visual Idea

Attention score matrix for BOS d e n n, with the final row highlighted and future cells blocked.

## Code Anchor

- src/model.py: causal_mask
