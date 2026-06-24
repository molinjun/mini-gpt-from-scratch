# 18 Inside One Transformer Block

## Slide Goal

Show the two main jobs inside a block.

## Key Points

- RMSNorm before each sublayer
- Residual adds keep the stream
- Attention + MLP repeat

## Speaker Notes

A Transformer block has two main jobs.

First, attention lets one position read information from earlier positions. Second, the MLP computes new features inside each position.

RMSNorm helps keep vector scale stable. Residual connections add the new information back to the old stream. This makes the model easier to train and easier to think about.

## Visual Idea

Zoom-in blueprint of one Transformer block with RMSNorm, Attention, residual add, RMSNorm, MLP, residual add.

## Code Anchor

- src/model.py: TransformerBlock
