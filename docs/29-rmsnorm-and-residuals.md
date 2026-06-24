# 30 RMSNorm and Residuals

## Section

Transformer Architecture

## Slide-Visible Text

- Residual adds the old signal back
- RMSNorm stabilizes the stream
- Deep blocks become easier to train

## Speaker Notes

Residual connections add the old signal back after a layer. This helps information and gradients flow through deep blocks. RMSNorm keeps the vector scale stable. Together, they make repeated Transformer blocks much easier to train.

## Visual Direction

Block diagram with main path and skip path, plus RMSNorm gate. Label the stream as character hidden vectors for `d e n n`.

## Target Image

`share/deck/v2/30-slide-rmsnorm-and-residuals.png`
