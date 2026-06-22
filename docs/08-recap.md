# 08 Recap

## Slide Goal

Use one full pipeline to help the audience connect every component.

## Key Points

- Name text enters the tokenizer and becomes token ids.
- Embedding turns ids into vectors.
- Transformer blocks repeatedly run attention + MLP.
- The linear head produces logits.
- Softmax + cross-entropy provide the training signal.
- Backpropagation + Adam update parameters.
- Generation reuses the forward pass and samples one token at a time.

## Speaker Notes

If there is one idea to remember, it is this: GPT is a next-token predictor. All the complicated structure serves one goal: at the current position, use the prior context to assign better probabilities to the next token. micro-gpt shrinks that process down to name generation, but the main mechanism is the same.

## Visual Idea

End-to-end pipeline: dataset -> tokenizer -> embedding -> transformer -> logits -> loss/generation.

## Code Anchor

- `src/tokenizer.py`
- `src/model.py`
- `src/train.py`
