# 22 The Hidden Stream

## Section

Tokenizer and Embedding

## Slide-Visible Text

- Hidden vectors flow through blocks
- Each block refines the stream
- Final vectors predict tokens

## Speaker Notes

After embeddings, we have a hidden stream. Its shape is batch size, sequence length, and model dimension. Each position has one vector. Transformer blocks update this stream. Attention mixes information across positions, and the MLP refines each position.

## Visual Direction

Horizontal river of vectors passing through repeated blocks.

## Target Image

`share/deck/v2/22-slide-the-hidden-stream.png`
