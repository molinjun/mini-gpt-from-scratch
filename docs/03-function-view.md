# 03 A Neural Network Is a Function

## Slide Goal

Start from the simplest mental model of a neural network.

## Key Points

- Input numbers
- Parameter weights
- Output scores

## Speaker Notes

Before we say Transformer, let us start with a simple idea. A neural network is a function.

The input is a group of numbers. The function has parameters, also called weights. The output is another group of numbers.

For our Mini-GPT, the output numbers are scores for possible next characters. At first these scores are bad. Training changes the parameters so the scores become more useful.

## Visual Idea

Clean function box diagram: input vector x enters f(x; theta), output scores leave the box, with theta shown as adjustable knobs.

## Code Anchor

- src/model.py: Linear
