# 26 The MLP Inside the Block

## Slide Goal

Connect the early MLP explanation to the Transformer block.

## Key Points

- Same MLP idea as before
- Applied to every token position
- Uses Linear -> ReLU -> Linear

## Speaker Notes

Now the earlier MLP idea comes back.

Inside each Transformer block, after attention has shared information, the MLP computes new features at each position. It uses Linear, ReLU, and Linear.

The same MLP weights are applied to every position. So attention is communication across positions, while the MLP is computation inside each position.

## Visual Idea

Zoomed block diagram showing one token vector entering a small MLP stack, while other positions run the same MLP independently.

## Code Anchor

- src/model.py: FeedForward
