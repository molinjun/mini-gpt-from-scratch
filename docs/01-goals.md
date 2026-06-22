# 01 Goals

## Slide Goal

Explain what this talk is trying to teach, and why a name generator is enough to understand the GPT path.

## Key Points

- micro-gpt task: train a character-level GPT on roughly 3k English names.
- Input is a sequence of name characters; the target is the next character.
- After training, the model samples forward from a starting context and generates new name-like strings.
- The goal is not production quality; the goal is to shrink the full GPT loop until it is inspectable.
- The second goal is to introduce the core Transformer architecture through this tiny model.

## Speaker Notes

We shrink the problem down to name generation. Names are short and the dataset is small, but the model still has to learn statistical structure: common prefixes, letter combinations, endings, and sequence boundaries. That makes the task tiny enough to inspect while still complete enough to cover the core GPT architecture.

## Training Objective

For a sequence `x = [x0, x1, x2, ...]`, training creates next-token pairs:

```text
input:  x0 x1 x2 x3
target: x1 x2 x3 x4
```

At position `t`, the model receives the past and current context and learns to assign high probability to token `t + 1`.

## Visual Idea

Training flow: `names.txt -> tokenizer -> Mini-GPT -> loss -> Adam -> generated names`.

## Code Anchor

- `src/train.py`
