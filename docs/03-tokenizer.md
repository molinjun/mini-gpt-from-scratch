# 03 Tokenizer

## Slide Goal

Explain why models cannot read raw text directly, and compare micro-gpt's character tokenizer with ChatGPT-style tokenization at a high level.

## Key Points

- Models process numbers, not raw strings.
- A tokenizer converts text into token ids.
- micro-gpt uses `CharTokenizer`: each observed character becomes one token.
- Strength: simple, reversible, and ideal for teaching.
- Limitation: sequences are longer, efficiency is lower, and unseen characters fail.
- ChatGPT-style systems use larger token vocabularies and more efficient token chunks.
- OpenAI's tiktoken material emphasizes that GPT models see tokens, and token counts affect context length and cost.

## Talk Detail

`CharTokenizer` uses the smallest useful interface:

- `fit(text)` collects the sorted character vocabulary.
- `encode(text)` maps every character to its id.
- `decode(ids)` maps ids back to characters.
- `vocab_size` defines the width of the model's output distribution.

The invariant is lossless round trip:

```python
tok = CharTokenizer().fit(text)
assert tok.decode(tok.encode(text)) == text
```

## Speaker Notes

The tokenizer is the boundary between language and matrices. In micro-gpt, we deliberately use a primitive character tokenizer because it hides almost nothing. Larger models use more sophisticated tokenizers so common text fragments can become single tokens. OpenAI's tiktoken material also emphasizes that GPT models see tokens, and token counts affect context length and cost.

## Visual Idea

Comparison: `emma -> [e, m, m, a] -> [4, 12, 12, 0]`, next to a high-level subword tokenization example.

## Code Anchor

- `src/tokenizer.py`: `CharTokenizer`
