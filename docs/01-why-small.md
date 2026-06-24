# 01 Why Build a Tiny GPT

## Slide Goal

Explain why a tiny model is useful for learning.

## Key Points

- Large GPT: powerful but hidden
- Mini-GPT: weak but inspectable
- Same path: tokens -> vectors -> logits

## Speaker Notes

Large GPT systems are impressive, but they are hard to study directly. There are too many parameters and too much training data.

A tiny GPT is not powerful, but it is very useful for learning. We can print the tensors. We can check the shapes. We can read the model code.

So the small model becomes a microscope. It lets us see the same path that a larger GPT also uses: tokens become vectors, vectors move through Transformer blocks, and the model predicts the next token.

## Visual Idea

Side-by-side blueprint comparison: a large opaque server block on the left and an open tiny model diagram on the right.

## Code Anchor

- README.md
- src/train.py
