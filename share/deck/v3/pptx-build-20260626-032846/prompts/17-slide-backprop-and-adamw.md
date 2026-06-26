Backprop and AdamW

Now we need a way to improve the parameters. The model runs forward and makes a prediction, then the loss measures the gap between prediction and target. Backpropagation computes how each parameter affected that loss. AdamW uses those gradients to move the parameters a small step in a better direction.

