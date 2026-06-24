# 39 Recap: Dennis Through Mini-GPT

## Section

Recap and References

## Slide-Visible Text

- Text -> tokens -> vectors
- Blocks -> logits -> probabilities
- Sample -> append -> repeat

## Speaker Notes

Let us follow Denn through the full path. Text becomes character tokens. Tokens become IDs. IDs become vectors with token and position embeddings. Transformer blocks update the hidden stream. The head produces logits, softmax gives probabilities, we sample i, append it, and continue.

## Visual Direction

Long pipeline from `Denn` to `Dennis`: character tokenizer with small IDs, embedding, position, attention, MLP, logits, softmax, sample. Show character-level tokens such as `d e n n` and small IDs such as `[4, 5, 14, 14]`. Add definition chips: "logits = raw scores" and "softmax = probabilities".

## Target Image

`share/deck/v2/39-slide-recap-dennis-through-mini-gpt.png`
