# 13 Token IDs Are Not Meaning

## Slide Goal

Prevent the common misunderstanding that ids contain meaning.

## Key Points

- Ids choose rows
- Distances between ids do not matter
- Learning starts in embeddings

## Speaker Notes

A very common mistake is to think token ids have meaning by themselves.

They do not. If d has id 4 and n has id 14, that does not mean n is ten units away from d in a useful language space.

The id is just an address. It chooses a row in an embedding table. The vector in that row is what the model will learn and use.

## Visual Idea

Blueprint warning-style diagram: integer id boxes point to table rows, with a crossed-out ruler between id numbers.

## Code Anchor

- src/model.py: Embedding
