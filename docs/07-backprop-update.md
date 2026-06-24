# 07 Backprop and Update

## Slide Goal

Explain how training changes parameters.

## Key Points

- Backprop computes gradients
- AdamW changes weights
- Repeat many times

## Speaker Notes

Training is not mysterious. We run the model, compute loss, compute gradients, and update the parameters.

Backpropagation tells each parameter how it affected the loss. AdamW uses those gradients to move the parameter a small amount.

After many updates, the model becomes less surprised by real training examples. In our case, it becomes better at predicting the next character in a name.

## Visual Idea

Circular training loop diagram with four nodes and small arrows flowing around the circle.

## Code Anchor

- src/model.py: Tensor.backward
- src/train.py: AdamW
