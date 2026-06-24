# 33 Training Mini-GPT

## Section

Training and Inference

## Slide-Visible Text

- Use many shifted examples
- Minimize next-token loss
- Update all learnable weights

## Speaker Notes

Now we train the model. Each batch contains many shifted next-token examples. The model produces logits, the loss measures how wrong they are, and the optimizer updates all learnable weights. The whole model learns from this same loop.

## Visual Direction

Section divider showing batches flowing through model into loss and weight updates.

## Target Image

`share/deck/v2/33-slide-training-mini-gpt.png`
