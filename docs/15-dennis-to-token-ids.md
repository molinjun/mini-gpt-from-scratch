# 16 Dennis to Token IDs

## Section

Tokenizer and Embedding

## Slide-Visible Text

- Build a small vocabulary
- Map each character to an ID
- Encode and decode text

## Speaker Notes

For a character tokenizer, we collect the characters in the dataset and assign each one a small ID. For example, Dennis becomes lowercase character tokens such as d, e, n, n, i, s. Encoding maps text to IDs, and decoding maps IDs back to text.

## Visual Direction

`Dennis` split into character tokens `d e n n i s`, each connected to a small ID card: `d=4`, `e=5`, `n=14`, `i=9`, `s=19`. Add a compact label: `vocab_size = 27`, `token IDs: 0..26`.

## Target Image

`share/deck/v2/16-slide-dennis-to-token-ids.png`
