# 10 What a Tokenizer Does

## Slide Goal

Define tokenizer as the boundary from text to ids.

## Key Points

- Split text into tokens
- Map tokens to ids
- Decode ids back to text

## Speaker Notes

A tokenizer is the boundary between human text and model input.

The model cannot read the string directly. The tokenizer splits the text into tokens, maps each token to an integer id, and can later decode ids back into text.

For our small model, tokens are characters. For large GPT systems, tokens are often pieces of words. The idea is the same: text becomes ids.

## Visual Idea

Three-stage tokenizer pipeline: text string, token boxes, integer id boxes, then reverse decode arrow.

## Code Anchor

- src/tokenizer.py: CharTokenizer
