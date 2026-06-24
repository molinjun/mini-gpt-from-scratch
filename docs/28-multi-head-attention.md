# 29 Multi-Head Attention

## Section

Transformer Architecture

## Slide-Visible Text

- One head sees one relation pattern
- Many heads learn different views
- Outputs are joined together

## Speaker Notes

One attention head can learn one kind of relation. Multi-head attention runs several heads in parallel, so different heads can learn different views of the same context. Then the head outputs are joined together and projected back to the model dimension.

## Visual Direction

Several parallel attention heads over the same character context `d e n n`, with different highlighted relation patterns, merging into one output vector.

## Target Image

`share/deck/v2/29-slide-multi-head-attention.png`
