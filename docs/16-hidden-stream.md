# 16 The Hidden Stream

## Slide Goal

Introduce the vector stream that moves through the model.

## Key Points

- Shape: B, T, D
- One vector per token position
- Blocks update the stream

## Speaker Notes

After token and position embeddings are added, the model has a hidden stream.

The shape is B, T, D. B is batch size. T is the number of positions. D is the vector size.

Each position has its own vector. The Transformer block will update these vectors. Attention lets positions share information. The MLP computes new features inside each position.

## Visual Idea

Tensor stream diagram: a row of token positions, each with a vertical vector bar, flowing into Transformer blocks.

## Code Anchor

- src/model.py: MiniGPT.forward
