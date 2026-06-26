Linear Head to Logits

At the end, the linear head maps the hidden vector to vocabulary logits. Logits are raw scores for possible next tokens. Here we use a second softmax: earlier, softmax turned attention scores into attention weights; now, softmax turns vocabulary logits into next-token probabilities. Then we sample the next token.

