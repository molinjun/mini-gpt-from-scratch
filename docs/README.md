# Mini-GPT from Scratch Notes

This minibook follows the same order as the implementation. Each chapter maps one concept to one concrete NumPy layer.

1. [Tokenizer](01-tokenizer.md): raw text becomes integer token ids.
2. [Embedding](02-embedding.md): token and position ids become vectors and logits.
3. [Attention](03-attention.md): each token performs masked content lookup over prior tokens.
4. [Activation](04-activation.md): blocks combine normalization, attention, residuals, and MLPs.
5. [Autograd](05-autograd.md): gradients are derived by reversing cached NumPy operations.
6. [Optimizer](06-optimizer.md): AdamW updates parameters and generation samples from logits.

The implementation intentionally stays inside pure Python and NumPy. The goal is not speed; the goal is mechanical clarity.
