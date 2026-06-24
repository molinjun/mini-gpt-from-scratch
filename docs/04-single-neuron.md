# 04 One Neuron

## Slide Goal

Explain weighted sum and activation with a small example.

## Key Points

- Multiply each input by a weight
- Add them together
- Pass through ReLU

## Speaker Notes

A single neuron is a very small computation. It takes several input numbers, multiplies them by weights, and adds the results.

Then it usually applies a nonlinearity. In this project, the MLP uses ReLU. ReLU is simple: negative values become zero, positive values stay positive.

One neuron is not enough for GPT, but it gives us the basic building block: weighted information plus a simple nonlinear step.

## Visual Idea

A precise neuron diagram with three input lines, weights on each line, a sum node, and a ReLU gate producing one output.

## Code Anchor

- src/model.py: relu
