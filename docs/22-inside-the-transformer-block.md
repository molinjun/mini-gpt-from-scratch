# 23 Inside the Transformer Block

## Section

Transformer Architecture

## Slide-Visible Text

- Attention mixes information across positions
- MLP refines each position
- Residual paths keep information flowing

## Speaker Notes

Now we enter one Transformer block. The block has two main jobs. Attention lets positions look at the context. The MLP transforms each position's vector. RMSNorm and residual connections keep the stream stable and make the block easier to train.

## Visual Direction

Section divider with one Transformer block exploded into Attention, MLP, Norm, and Residual paths. Show the running character context `d e n n` entering the block and a likely next token `i` after the block path.

## Target Image

`share/deck/v2/23-slide-inside-the-transformer-block.png`
