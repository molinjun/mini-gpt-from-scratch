# 19 Attention Intuition

## Slide Goal

Explain attention before formulas.

## Key Points

- Look only left
- Score visible positions
- Mix useful values

## Speaker Notes

Attention is easier to understand as content lookup.

Imagine the final n in the prefix denn. To predict the next character, it may need to read earlier context. It can look left at d, e, and the previous n.

Attention gives the model a learned way to score those visible positions and mix their information into the current vector.

## Visual Idea

Hub-spoke diagram where the final n in denn sends lookup rays to BOS, d, e, and the previous n.

## Code Anchor

- src/model.py: CausalSelfAttention
