# 15 BPE vs Character Tokens

## Section

Tokenizer and Embedding

## Slide-Visible Text

- Production models use larger tokenizers
- Mini-GPT uses character tokens
- Same idea, smaller scale

## Speaker Notes

Large GPT systems usually use tokenizers that split text into subword pieces. For Mini-GPT, we use character-level tokens. It is much smaller and easier to inspect. The model is less powerful, but the idea is the same: text becomes a sequence of IDs.

## Visual Direction

Two-column comparison: production tokenizer vs character tokenizer. Use `Dennis` as the example: production tokenizer may use a larger word/subword token, while Mini-GPT splits it into `d e n n i s`.

## Target Image

`share/deck/v2/15-slide-bpe-vs-character-tokens.png`
