# 01 Tokenizer

The model cannot read text directly. The first layer of the system turns a string into a sequence of integer ids.

`CharTokenizer` uses the smallest useful contract:

- `fit(text)` collects the sorted character vocabulary.
- `encode(text)` maps every character to its id.
- `decode(ids)` maps ids back to characters.
- `vocab_size` defines the width of the model's output distribution.

The invariant is lossless round trip:

```python
tok = CharTokenizer().fit(text)
assert tok.decode(tok.encode(text)) == text
```

For a sequence `x = [x0, x1, x2, ...]`, training creates next-token pairs:

```text
input:  x0 x1 x2 x3
target: x1 x2 x3 x4
```

This is the autoregressive objective. At position `t`, the model receives the past and current context and learns to assign high probability to token `t + 1`.
