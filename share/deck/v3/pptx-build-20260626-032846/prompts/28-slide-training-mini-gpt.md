Training Mini-GPT

Now that we have the full forward path, training is simple to describe. We take name text and turn it into many shifted next-token examples. Given `d e n n`, the target might be `i`; given `e n n i`, the target might be `s`. Mini-GPT predicts logits, cross entropy measures the mistake, and the optimizer updates all learnable weights.

