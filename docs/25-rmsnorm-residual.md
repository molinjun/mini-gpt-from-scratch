# 25 RMSNorm and Residuals

## Slide Goal

Explain stability pieces in simple terms.

## Key Points

- RMSNorm controls scale
- Residual adds keep old information
- Training becomes smoother

## Speaker Notes

RMSNorm and residual connections are not the flashiest parts, but they matter.

RMSNorm keeps vector scale under control before attention or the MLP. The residual connection adds the new result back to the old stream.

This means each block can make an edit instead of replacing everything. That makes deep stacks easier to train.

## Visual Idea

Blueprint pipe diagram: hidden stream goes through RMSNorm, sublayer, plus sign, and returns to the main stream.

## Code Anchor

- src/model.py: RMSNorm
