# 30 What to Inspect

## Slide Goal

Give the audience practical checkpoints.

## Key Points

- Tokenizer round trips
- Tensor shapes
- Attention mask
- Loss and samples

## Speaker Notes

The best part of a tiny implementation is visibility.

We can test that the tokenizer round-trips text correctly. We can print shapes like B, T, and D. We can inspect the causal mask. We can watch loss go down and samples become more name-like.

This habit is useful even when working with larger systems. Always connect the concept to something you can check.

## Visual Idea

Testing dashboard with four panels: tokenizer, shapes, attention mask, generated samples.

## Code Anchor

- tests/test_core.py
