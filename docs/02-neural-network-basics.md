# 02 Neural Network Basics

## Slide Goal

Prepare the minimum set of ideas needed for Transformer: it is still a trainable function.

## Key Points

- Function: input `x`, parameterized computation, output `y_hat`.
- Neuron: weighted sum plus nonlinear activation.
- Perceptron: a tiny learnable classifier.
- MLP: stacked neurons that transform features inside each token position.
- Loss function: turns prediction error into one optimizable number.
- Backpropagation: uses the chain rule to compute parameter gradients.
- Adam: uses first and second moments to make updates steadier.

## Speaker Notes

A Transformer sounds special, but it is not outside neural networks. It is still a function with inputs, parameters, outputs, and a loss. Backpropagation computes gradients, and an optimizer updates the parameters. The clever part is the function shape: attention lets token positions communicate, while the MLP computes within each position.

## Talk Shape

Keep this section conceptual. The audience only needs the training loop intuition:

```text
prediction -> loss -> gradients -> parameter update
```

Backpropagation explains how the loss sends credit or blame backward through the model. Adam explains how those gradients become smoother parameter updates.

## Visual Idea

Show a ladder from `f(x)` to neuron, MLP, and Transformer block.

## Code Anchor

- `src/model.py`: `Tensor`, `Linear`
- `src/train.py`: `AdamW`
