# 24 Decoder-Only Map

## Section

Transformer Architecture

## Slide-Visible Text

- GPT uses decoder-only blocks
- Blocks repeat the same pattern
- The head maps vectors to logits

## Speaker Notes

Mini-GPT uses a decoder-only Transformer. There is no separate encoder. The model reads previous tokens and predicts the next token. We repeat the same block several times, then use a linear head to map hidden vectors back to vocabulary scores.

## Visual Direction

Full architecture map: `d e n n` -> small token IDs `[4, 5, 14, 14]` -> embeddings -> repeated decoder-only blocks -> final norm -> linear head -> logits for next character, with `i` highlighted.

## Target Image

`share/deck/v2/24-slide-decoder-only-map.png`
