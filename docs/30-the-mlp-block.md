# 31 The MLP Block

## Section

Transformer Architecture

## Slide-Visible Text

- Attention mixes across tokens
- MLP works inside each token
- Linear -> ReLU -> Linear

## Speaker Notes

Attention mixes information across tokens. The MLP works inside each token position. In this teaching version, the MLP is Linear, ReLU, and Linear. So the block first shares context with attention, then computes new features at each position.

## Visual Direction

Per-position MLP pipeline repeated under character token columns `d`, `e`, `n`, `n`. Show that the MLP does not mix positions; attention already did that.

## Target Image

`share/deck/v2/31-slide-the-mlp-block.png`
