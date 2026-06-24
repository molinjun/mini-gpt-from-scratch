# 12 Character Tokenizer: Dennis

## Slide Goal

Make the project tokenizer fully concrete.

## Key Points

- Small vocabulary
- Visible mapping
- Easy round-trip test

## Speaker Notes

For the name Dennis, we lowercase it for the tiny model and treat each character as a token.

The wrapped sequence is BOS, d, e, n, n, i, s, BOS. Each symbol has an id from the tokenizer vocabulary.

This is simple enough to test directly. If we encode and then decode a name, we should get the same name back, except for the special tokens we choose to add or remove.

## Visual Idea

Tokenizer table showing BOS, d, e, n, i, s mapped to integer ids, plus a Dennis token sequence below.

## Code Anchor

- tests/test_core.py: tokenizer round trip
