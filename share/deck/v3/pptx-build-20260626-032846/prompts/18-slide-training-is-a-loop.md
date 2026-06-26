Training Is a Loop

For Mini-GPT, the same idea becomes a next-token training loop. The model predicts the next token, cross entropy measures the mistake, backpropagation computes gradients, and AdamW updates the parameters. We repeat this over many batches, so the loss goes down and the generated names become more plausible.

