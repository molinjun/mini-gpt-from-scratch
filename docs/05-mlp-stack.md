# 05 From Neuron to MLP

## Slide Goal

Show how many neurons become a small network.

## Key Points

- Layer 1 creates hidden features
- ReLU keeps useful positive signals
- Layer 2 maps back to model size

## Speaker Notes

When we place many neurons side by side, we get a layer. When we stack layers, we get a small neural network called an MLP.

In our Mini-GPT block, the MLP is Linear, then ReLU, then Linear. It does not talk across time. It works inside each token position.

This is important. Attention is the part that reads other positions. The MLP is the part that computes new features at the current position.

## Visual Idea

Layered MLP blueprint: input vector, first linear layer, ReLU row, second linear layer, output vector.

## Code Anchor

- src/model.py: FeedForward
