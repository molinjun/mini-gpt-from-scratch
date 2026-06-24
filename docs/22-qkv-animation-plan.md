# 22 QKV Animation Plan

## Slide Goal

Describe the animation/video sequence requested for QKV.

## Key Points

- 1. Hidden vectors split into Q K V
- 2. Current Q compares with visible K
- 3. Mask hides the future
- 4. Weights mix V

## Speaker Notes

This slide is a clear plan for the QKV animation.

First, each hidden vector is projected into Q, K, and V. Second, the current query compares with the keys from visible positions. Third, the mask removes future positions. Fourth, the final weights mix the value vectors.

Even if we show it as an animation, the idea is still simple: ask, match, block the future, and mix useful information.

## Visual Idea

Storyboard strip with four blueprint frames showing the QKV attention process over the tokens d e n n.

## Code Anchor

- src/model.py: CausalSelfAttention
