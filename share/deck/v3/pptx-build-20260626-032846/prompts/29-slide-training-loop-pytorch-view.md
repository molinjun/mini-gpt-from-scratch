Training Loop: PyTorch View

In code, the loop is small. Get a batch, run the model forward to produce logits, compare logits with target tokens using cross entropy, run backward to compute gradients, and let AdamW update the parameters. The embeddings, attention matrices, MLP weights, and linear head all learn through this same loop.

