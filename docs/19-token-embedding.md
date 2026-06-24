# 20 Token Embedding

## Section

Tokenizer and Embedding

## Slide-Visible Text

- Embedding is a lookup table
- Each token gets a vector
- The vectors are learned

## Speaker Notes

An embedding layer is a learned lookup table. When the model sees a token ID, it selects one row from the table. At first these vectors are random. During training, they move so character patterns become easier for the Transformer to use.

## Visual Direction

Embedding table with token IDs selecting vector rows.

## Target Image

`share/deck/v2/20-slide-token-embedding.png`
