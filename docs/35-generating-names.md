# 36 Generating Names

## Section

Training and Inference

## Slide-Visible Text

- Start with a seed token
- Predict one token
- Append and repeat

## Speaker Notes

Generation is autoregressive. We start with a seed token. The model predicts one next token. We append that token to the context, then ask again. Repeating this step grows a name one character at a time.

## Visual Direction

Section divider with growing string: `<BOS>` -> `D` -> `De` -> `Den` -> `Dennis`.

## Target Image

`share/deck/v2/36-slide-generating-names.png`
