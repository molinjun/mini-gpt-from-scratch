# 14 Why We Need a Tokenizer

## Section

Tokenizer and Embedding

## Slide-Visible Text

- Strings are symbols for humans
- Models need integer IDs
- IDs index into tables

## Speaker Notes

A tokenizer turns pieces of text into integer IDs. The IDs are not meanings by themselves. They are addresses. They let the model look up vectors in an embedding table. That is why the tokenizer is the first important step in the pipeline.

## Visual Direction

`Dennis` -> token boxes -> ID boxes -> lookup table.

## Target Image

`share/deck/v2/14-slide-why-we-need-a-tokenizer.png`
