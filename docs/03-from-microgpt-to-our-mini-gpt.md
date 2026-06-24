# 04 From MicroGPT to Our Mini-GPT

## Section

Why We Build Mini-GPT

## Slide-Visible Text

- Inspired by Andrej Karpathy's MicroGPT
- Build a tiny GPT to generate names
- Use it to inspect the full path

## Speaker Notes

A full Transformer can feel too large to learn at once. So we borrow the spirit of Andrej Karpathy's MicroGPT and build a tiny GPT for name generation. The task is small, but it still includes the full path: tokenizer, embeddings, Transformer blocks, logits, loss, and sampling.

## Visual Direction

Source-and-task slide with no human portrait: Andrej Karpathy name as a source label, MicroGPT code card, makemore names dataset card, then our Mini-GPT workbench producing sample names such as `Dennis`. Include source chips: `MicroGPT gist` and `github.com/karpathy/makemore`.

## Target Image

`share/deck/v2/04-slide-from-microgpt-to-our-mini-gpt.png`
