# 11 Backprop and AdamW

## Section

Neural Network Basics

## Slide-Visible Text

- Backprop computes gradients
- Gradient = direction to reduce loss
- AdamW updates weights

## Speaker Notes

Backpropagation tells each parameter how it affected the loss. A gradient is the direction that helps reduce the loss. AdamW uses those gradients to update the weights. In a Transformer, we run the same loop, but now the parameters are embeddings, attention matrices, MLP weights, and the final head.

## Visual Direction

Circular training loop around the line plot: forward prediction, loss gap, backward gradients on `W` and `b`, AdamW update, improved line. Add definition chips: "gradient = direction to reduce loss" and "same loop for Transformer matrices".

## Target Image

`share/deck/v2/11-slide-backprop-and-adamw.png`
