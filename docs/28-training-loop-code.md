# 28 Training Loop in Code

## Slide Goal

Connect the theory to the training function.

## Key Points

- Get a batch
- Run forward pass
- Backprop and step AdamW

## Speaker Notes

Now the code should look familiar.

The training loop gets a batch of token ids and targets. It runs the model forward. It computes the loss. Then it clears old gradients, runs backward, and calls the optimizer step.

This is the same loop we saw near the beginning. The only difference is that now the function is a Transformer instead of a simple MLP.

## Visual Idea

Split-screen blueprint with compact pseudocode on the left and a training loop diagram on the right.

## Code Anchor

- src/train.py: train
