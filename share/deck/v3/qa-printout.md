# Common Transformer Q&A Printout

Short English answers for presenter preparation. Focus on the questions people most often ask when learning Transformers for the first time.

## Core Ideas

### Q1. What is a Transformer?
A Transformer is a neural network architecture for sequences. It turns tokens into vectors, uses attention to mix information across positions, and updates those vectors layer by layer.

### Q2. What is the difference between a Transformer encoder and decoder?
An encoder reads the input with full bidirectional self-attention, so every token can look at every other input token. A decoder generates output with causal self-attention, so each token can only look at previous tokens.

### Q3. What is an encoder used for?
An encoder is useful when the task is mainly understanding an input, such as classification, search embeddings, sentence similarity, or extracting features from text.

### Q4. What is a decoder used for?
A decoder is useful when the task is generating a sequence, such as text generation, code generation, dialogue, or any left-to-right next-token prediction task.

### Q5. When do we use both encoder and decoder?
Encoder-decoder models are useful when there is a separate input sequence and output sequence, such as translation, summarization, or text-to-text tasks. The encoder reads the source; the decoder writes the target.

### Q6. Why does GPT use only the decoder?
GPT is trained for next-token prediction. It only needs previous tokens as context, so a causal decoder is enough. There is no separate source sequence that requires an encoder.

### Q7. What is the KV cache, and why can cached tokens be cheaper?
During generation, the model reuses previously computed Key and Value vectors instead of recomputing them from scratch. Cached tokens are cheaper because they require less computation than processing fresh input tokens.

### Q8. What is GPT in one sentence?
GPT is a decoder-only Transformer trained to predict the next token from previous tokens.

## RNN vs Transformer

### Q9. What is the biggest difference between an RNN and a Transformer?
An RNN reads tokens step by step and carries information in a hidden state. A Transformer reads a whole context window at once and lets positions directly attend to other positions.

### Q10. Why are Transformers easier to train in parallel than RNNs?
During training, all tokens in the sequence are known. A Transformer can compute many positions at the same time, while a causal mask prevents each position from seeing future tokens.

### Q11. Does GPT generate tokens in parallel?
No. Training can be parallel across positions, but generation is still one token at a time: predict, append, predict again.

## Vectors and Matrices

### Q12. Why do we convert tokens into vectors?
Vectors give the model many dimensions to store useful features. A single token ID is just an index; the embedding vector is what the model can actually compute with.

### Q13. Why do token IDs not have meaning by themselves?
Token IDs are just lookup addresses. ID 4 is not naturally closer to ID 5; meaning comes from learned embedding vectors.

### Q14. Why do we need position embeddings?
Attention alone does not know token order. Position embeddings tell the model where each token is in the sequence.

### Q15. Why can matrix multiplication and addition learn anything useful?
Matrices are learnable transformations. They can mix, rotate, scale, and project vectors. Training changes the matrix values so these transformations become useful for prediction.

### Q16. If matrix multiplication is linear, why is the model powerful?
The model also uses nonlinear operations such as ReLU, softmax, and normalization. Linear transformations plus nonlinear steps can represent complex patterns.

## Attention

### Q17. What does attention do?
Attention lets each token position decide which other positions are useful, then mixes information from those positions into a new vector.

### Q18. What are Q, K, and V?
Q means Query: what am I looking for? K means Key: what does this position contain? V means Value: what information should this position send?

### Q19. Why split into Query, Key, and Value instead of using one vector?
Matching and information transfer are different jobs. Q and K decide attention weights; V carries the content that gets mixed.

### Q20. How are attention scores calculated?
The model takes dot products between Query vectors and Key vectors. A larger dot product means a stronger match.

### Q21. Why use softmax in attention?
Softmax turns raw scores into positive weights that add up to one. The attention output becomes a weighted mix of Value vectors.

### Q22. Why divide by the square root of the head dimension?
Dot products get larger as vector size grows. Scaling keeps the scores stable so softmax does not become too sharp too early.

### Q23. What is a causal mask?
A causal mask blocks future tokens. It makes sure each position can only use itself and earlier positions when predicting the next token.

### Q24. Why do we need multi-head attention?
Different heads can learn different relationship patterns. One head may focus on nearby tokens, another on repeated characters, another on endings.

## Transformer Blocks

### Q25. Why do layers and heads look similar?
Both use attention, but heads are parallel views inside one layer. Layers are sequential steps: each layer refines the output of the previous layer.

### Q26. What does the MLP block do?
Attention mixes information across positions. The MLP transforms each position's vector locally and builds richer features.

### Q27. Why use residual connections?
Residual connections add the old vector back after a layer update. They help information and gradients flow through many layers.

## Training and Generation

### Q28. What does next-token prediction mean?
Given the tokens so far, the model learns to assign high probability to the token that really comes next.

### Q29. How is training different from generation?
Training compares predictions with known targets across many positions. Generation samples one new token, appends it, and repeats.

### Q30. What is the one thing to remember?
Transformer = vectors plus attention. GPT = causal decoder-only Transformer plus next-token prediction. Training changes matrices so the right next token becomes more likely.
