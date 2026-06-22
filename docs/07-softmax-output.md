# 07 Softmax Output

## Slide Goal

Explain how the final hidden vector becomes a probability distribution over the next token, and how generation samples names.

## Key Points

- The output layer projects hidden states back to vocabulary size.
- Logits are unnormalized scores, not probabilities.
- Softmax turns logits into a probability distribution.
- Cross-entropy penalizes low probability on the correct token.
- During generation, the model samples from the final position's probability distribution.
- Sampling repeats until an end marker or a length limit.

## Logits and Loss

The output projection turns every hidden vector back into vocabulary scores:

```python
logits = x @ lm_head_w + lm_head_b
```

Softmax converts logits into probabilities:

```text
prob_i = exp(logit_i) / sum_j exp(logit_j)
loss = -log(prob_target)
```

## Training and Generation

Training uses cross-entropy to push probability toward the correct next token. Generation reuses the same forward pass: the model receives the current context, reads the final-step logits, samples one next token, appends it, and repeats. Temperature changes distribution sharpness; top-k limits sampling to the strongest candidates.

## Speaker Notes

The model does not output a full name at once. It outputs a probability distribution for the next character. During training, the correct answer is known, so cross-entropy pushes probability onto the target. During generation, we sample one character, append it to the context, and repeat.

## Visual Idea

Show a name prefix such as `mar`, then a probability bar chart for `a`, `i`, `y`, `o`, and `<end>`.

## Code Anchor

- `src/model.py`: `softmax`, `softmax_cross_entropy`
- `src/train.py`: `generate`
