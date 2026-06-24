# 34 Training Loop: PyTorch View

## Section

Training and Inference

## Slide-Visible Text

- Forward pass makes logits
- Loss compares logits to targets
- Gradients guide AdamW updates

## Speaker Notes

This is the training loop in a short PyTorch-style view. First we run the model to get logits. Then cross entropy compares logits with the target tokens. Backward computes gradients, and AdamW uses those gradients to update the parameters.

## Visual Direction

Split screen: left minimal code, right loop diagram. Add definition chips: "logits = raw scores" and "gradient = direction to improve parameters".

## Target Image

`share/deck/v2/34-slide-training-loop-pytorch-view.png`
