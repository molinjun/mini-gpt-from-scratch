# 11 Tokenizer Example: I love CIS

## Slide Goal

Compare subword tokenization to character tokenization.

## Key Points

- tiktoken style: word pieces
- Mini-GPT style: characters
- Both output integer ids

## Speaker Notes

Let us use the text I love CIS. A production GPT tokenizer, such as tiktoken, may split this into word pieces. For example, I, space-love, and space-CIS may be separate tokens depending on the vocabulary.

Our Mini-GPT tokenizer is simpler. It splits the same text into characters.

The split is different, but the final interface is the same. The model receives integer ids. It does not receive the original text string.

## Visual Idea

Side-by-side tokenizer comparison for the phrase I love CIS: subword chunks on one side, character chunks on the other.

## Code Anchor

- src/tokenizer.py
