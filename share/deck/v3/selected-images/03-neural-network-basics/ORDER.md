# 03 Neural Network Basics

Purpose: give the audience just enough neural-network foundation before the Transformer block. This section should feel like a short bridge, not a separate machine-learning lecture.

## Core Story

A neural network is a function with learnable parameters. A single linear function can learn `W` and `b`, but it can only draw a straight line. ReLU adds nonlinearity, and stacking neurons into an MLP gives the model more expressive power. Training then repeats a loop: predict, measure loss, compute gradients with backpropagation, and update parameters with AdamW.

## Recommended Image Order

| # | Image | Role |
|---|---|---|
| 01 | `01-neural-network-basics-overview.png` | Section bridge |
| 02 | `02-neural-network-is-a-function.png` | Main mental model |
| 03 | `03-one-neuron-w-b.png` | Learnable parameters: `W` and `b` |
| 04 | `04-relu-adds-a-bend.png` | Why nonlinearity matters |
| 05 | `05-mlp-layers-of-neurons.png` | Why we stack neurons |
| 06 | `06-slide-backprop-and-adamw.png` | How parameters learn from loss |
| 07 | `07-training-is-a-loop.png` | Mini-GPT training loop |

## Speaker Notes

### 01. Neural Network Basics Overview

Before we open the Transformer block, we need one small foundation. Not a full neural network course, just the few ideas we will reuse: parameters shape predictions, ReLU and MLPs add expressive power, and loss plus gradients tell the model how to improve.

### 02. A Neural Network Is a Function

The first mental model is simple: a neural network is a function with parameters. It takes numbers in and produces numbers out. At the beginning, the function is usually wrong. Training changes the parameters so the function fits the data better.

### 03. One Neuron: `y = Wx + b`

The smallest useful example is `y = W x + b`. `W` controls the slope, and `b` shifts the line. These are learnable parameters. During training, the model does not memorize the line directly; it learns values of `W` and `b` that make the predictions closer to the targets.

### 04. ReLU Adds a Bend

A straight line can only fit linear patterns. Real data is usually not that simple. ReLU adds a bend: negative values become zero, and positive values pass through. With this simple nonlinearity, the model can start building more complex shapes.

### 05. An MLP Stacks Neurons

One neuron gives us one small feature. An MLP stacks many neurons and layers, so the model can combine simple features into richer ones. In our Mini-GPT, the MLP pattern is still simple: Linear, ReLU, then Linear. This same idea appears inside every Transformer block.

### 06. Backprop and AdamW

Now we need a way to improve the parameters. The model runs forward and makes a prediction, then the loss measures the gap between prediction and target. Backpropagation computes how each parameter affected that loss. AdamW uses those gradients to move the parameters a small step in a better direction.

### 07. Training Is a Loop

For Mini-GPT, the same idea becomes a next-token training loop. The model predicts the next token, cross entropy measures the mistake, backpropagation computes gradients, and AdamW updates the parameters. We repeat this over many batches, so the loss goes down and the generated names become more plausible.

## Compression Notes

If the talk is running long, combine slides 02 and 03 verbally, then keep slides 04, 05, 06, and 07. The minimum version of this section is: function, nonlinearity, MLP, gradients, training loop.
