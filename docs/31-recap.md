# 31 Recap

## Slide Goal

Close with the full connected path.

## Key Points

- Neural networks are trainable functions
- Tokenizer and embeddings create model input
- Transformer blocks improve next-token predictions

## Speaker Notes

Let us recap the whole path.

A neural network is a trainable function. Our tokenizer turns text into ids. Embeddings turn ids and positions into vectors. Transformer blocks update those vectors. Attention lets positions read earlier context. The linear head produces logits, and sampling turns logits into new characters.

That is the core idea of GPT, shown in a tiny model we can inspect.

## Visual Idea

Full end-to-end blueprint ribbon from raw names to generated name samples, with major stages marked.

## Code Anchor

- src/tokenizer.py
- src/model.py
- src/train.py
