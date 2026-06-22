# 00 Cover

## Slide Goal

Establish the theme in one sentence: build a Mini-GPT that generates English names, then use it to inspect Transformer mechanics.

## Key Points

- Title: Build a Mini-GPT from Scratch
- Subtitle: Understanding Transformer architecture and mechanics.
- Speaker: Molin
- Team: Infra . ECP .CIS

## Speaker Notes

Today we start from a tiny name generator rather than the product surface of ChatGPT. The model is small, but the path is complete: tokenizer, embedding, attention, MLP, loss, backpropagation, Adam, and sampling. Once this miniature version is clear, the core mechanics of Transformer models become much easier to inspect.

## Visual Idea

Use the current dark blueprint style: title on the left, and Figure 1 from "Attention Is All You Need" on the right with attribution.

## Code Anchor

- `src/tokenizer.py`
- `src/model.py`
- `src/train.py`
