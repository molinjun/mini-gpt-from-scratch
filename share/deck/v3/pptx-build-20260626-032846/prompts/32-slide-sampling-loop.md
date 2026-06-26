Sampling Loop

At each generation step, we keep the latest context window and run Mini-GPT. The model returns logits for the next token. We turn those logits into probabilities with softmax, sample one token, append it, and repeat. Training predicts many positions in parallel, but generation moves left to right one step at a time.

