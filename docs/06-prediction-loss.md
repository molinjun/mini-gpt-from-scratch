# 06 Prediction and Loss

## Slide Goal

Connect scores to probability and loss.

## Key Points

- Logits are raw scores
- Softmax gives probabilities
- Cross-entropy rewards the target

## Speaker Notes

The model outputs logits. Logits are raw scores. They are not probabilities yet.

Softmax turns these scores into probabilities. If the true next character is n, then a good model gives high probability to n.

Cross-entropy loss is high when the correct character has low probability. It is low when the correct character has high probability. So loss gives us one number to improve.

## Visual Idea

Probability bar chart for next characters after den, with n highlighted and a loss gauge beside it.

## Code Anchor

- src/model.py: softmax_cross_entropy
