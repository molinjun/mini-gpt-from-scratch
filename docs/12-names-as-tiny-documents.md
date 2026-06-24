# 13 Names as Tiny Documents

## Section

Tokenizer and Embedding

## Slide-Visible Text

- Each name is a short document
- A special token separates names
- The dataset becomes one token stream

## Speaker Notes

In this project, each name is like a tiny document. We add a special boundary token, then put names into a training stream. This makes the task concrete: given the characters so far, predict the next character in the name.

## Visual Direction

Name list flowing into one token stream with separator markers.

## Target Image

`share/deck/v2/13-slide-names-as-tiny-documents.png`
