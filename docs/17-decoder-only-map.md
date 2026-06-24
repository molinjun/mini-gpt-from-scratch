# 17 MicroGPT Decoder-Only Map

## Slide Goal

Show the full MicroGPT path.

## Key Points

- No encoder
- Causal self-attention
- One linear head

## Speaker Notes

Now we can look at the full MicroGPT-style architecture.

It is decoder-only. That means there is no separate encoder. The model reads the previous tokens and predicts the next token.

The path is simple to say: token ids become embeddings, embeddings pass through repeated Transformer blocks, a final norm prepares the vectors, and a linear head produces logits for the next token.

## Visual Idea

Full dark blueprint architecture similar to the reference image: token ids, embeddings, repeated blocks, norm, linear head, logits.

## Code Anchor

- src/model.py: MiniGPT
