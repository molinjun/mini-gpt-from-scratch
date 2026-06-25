# Mini-GPT Deck V3 Speaker Notes

These are polished read-aloud English speaker notes for the 42-slide V3 deck.

## 01. Build a Mini-GPT from Scratch

Section: Opening

Hello everyone. Thank you for being here. Today's topic is Build a Mini-GPT from Scratch. I will show how we can build a tiny Mini-GPT to generate names, and use that process to understand the core ideas behind the Transformer architecture. All right, let's get started.

## 02. Agenda

Section: Opening

Here is the plan for the talk. I will divide it into five parts: why we try to build a Mini-GPT, how tokenizer and embedding work, the basic neural network ideas we need, the Transformer architecture, and finally training and name generation.

## 03. Transformer Is the Architecture

Section: Why We Build Mini-GPT

Before we build our Mini-GPT, let's set the big picture. GPT-style models look very powerful, but the core task is simple: given a sequence of tokens, predict the next token. The architecture behind this comes from the Transformer paper, Attention Is All You Need. The paper link is https://arxiv.org/abs/1706.03762. The original architecture diagram is important, but it is also complex: encoder, decoder, attention, feed-forward layers, residual connections, and normalization. So instead of trying to understand everything at once, we will use a smaller path.

## 04. From MicroGPT to Our Mini-GPT

Section: Why We Build Mini-GPT

This is where MicroGPT gives us a good learning idea. Instead of starting with a huge model, we build a tiny GPT-style model that generates names. The task is small, but the structure is still real: text becomes tokens, tokens become vectors, the Transformer block processes the context, and the model predicts the next token. So name generation is not the final goal. It is a simple example that lets us see how the Transformer works step by step.

## 05. Neural Network Basics

Section: Neural Network Basics

Before we enter the Transformer, we only need a small foundation. We need to know how learnable parameters shape predictions, why ReLU and MLPs make a model more flexible, and how loss and gradients drive learning. Later, the Transformer uses the same training idea, just with many more matrices.

## 06. A Neural Network Is a Function

Section: Neural Network Basics

The first mental model is simple: a neural network is a function with parameters. It takes input numbers and produces output numbers. At the beginning, the function is usually wrong. Training changes the parameters so the output fits the data better.

## 07. One Neuron: y = Wx + b

Section: Neural Network Basics

A very small model is y equals W times x plus b. The weight W controls the slope, and the bias b moves the line up or down. A neuron uses the same idea, often with many inputs. This is the simplest example of learnable parameters changing a prediction.

## 08. From Neuron to MLP

Section: Neural Network Basics

One neuron can only do a limited job. When the pattern is more complex, we use many neurons and stack layers. That gives us an MLP. In this teaching model, the MLP pattern is Linear, then ReLU, then Linear. We will see the same pattern inside each Transformer block.

## 09. ReLU Adds a Bend

Section: Neural Network Basics

If we only stack linear layers, the result is still linear. ReLU adds a simple bend. Negative values become zero, and positive values stay positive. This gives the model expressive power, so it can fit patterns that a single straight line cannot fit.

## 10. Prediction and Loss

Section: Neural Network Basics

The model makes a prediction, and the training data gives us a target. Loss measures the gap between them. For a line, the loss can be squared error. For GPT, the loss is cross entropy. The details are different, but the meaning is the same: make the wrongness smaller.

## 11. Backprop and AdamW

Section: Neural Network Basics

Backpropagation tells each parameter how it affected the loss. A gradient is the direction that helps reduce the loss. AdamW uses those gradients to update the weights. In a Transformer, we run the same loop, but now the parameters are embeddings, attention matrices, MLP weights, and the final head.

## 12. From Text to Token IDs

Section: Tokenizer and Embedding

Now we start the GPT path. The first problem is that the model cannot read a string like Dennis. It only reads numbers. The tokenizer is the bridge from text to token IDs. Once text becomes IDs, the rest of the model can work with arrays and vectors.

## 13. Names as Tiny Documents

Section: Tokenizer and Embedding

In this project, each name is like a tiny document. We add a special boundary token, then put names into a training stream. This makes the task concrete: given the characters so far, predict the next character in the name.

## 14. Why We Need a Tokenizer

Section: Tokenizer and Embedding

A tokenizer turns pieces of text into integer IDs. The IDs are not meanings by themselves. They are addresses. They let the model look up vectors in an embedding table. That is why the tokenizer is the first important step in the pipeline.

## 15. BPE vs Character Tokens

Section: Tokenizer and Embedding

Large GPT systems usually use tokenizers that split text into subword pieces. For Mini-GPT, we use character-level tokens. It is much smaller and easier to inspect. The model is less powerful, but the idea is the same: text becomes a sequence of IDs.

## 16. Dennis to Token IDs

Section: Tokenizer and Embedding

For a character tokenizer, we collect the characters in the dataset and assign each one a small ID. For example, Dennis becomes lowercase character tokens such as d, e, n, n, i, s. Encoding maps text to IDs, and decoding maps IDs back to text.

## 17. Inputs and Targets Are Shifted

Section: Tokenizer and Embedding

Training uses shifted pairs. If the input is D, e, n, n, then the target is e, n, n, i. At every position, the model learns to predict the next token. This is why one short name gives us several training examples.

## 18. From Token IDs to Vectors

Section: Tokenizer and Embedding

Token IDs are still just integers. The next step is embedding. The embedding table turns each ID into a vector, and the position embedding tells the model where that token is in the sequence. From here on, the Transformer works with vectors.

## 19. Token IDs Are Not Meaning

Section: Tokenizer and Embedding

It is important not to overread the ID numbers. ID 4 is not semantically close to ID 5 just because the numbers are close. The ID is only an index into a table. The learned vector is what carries useful information for the model.

## 20. Token Embedding

Section: Tokenizer and Embedding

An embedding layer is a learned lookup table. When the model sees a token ID, it selects one row from the table. At first these vectors are random. During training, they move so character patterns become easier for the Transformer to use.

## 21. Position Embedding

Section: Tokenizer and Embedding

Token embeddings tell the model what the token is. Position embeddings tell it where the token is. This matters because the two n characters in Denn have the same token ID, but they are in different positions. We add token and position vectors together.

## 22. The Hidden Stream

Section: Tokenizer and Embedding

After embeddings, we have a hidden stream. Its shape is batch size, sequence length, and model dimension. Each position has one vector. Transformer blocks update this stream. Attention mixes information across positions, and the MLP refines each position.

## 23. Inside the Transformer Block

Section: Transformer Architecture

Now we enter one Transformer block. The block has two main jobs. Attention lets positions look at the context. The MLP transforms each position's vector. RMSNorm and residual connections keep the stream stable and make the block easier to train.

## 24. Decoder-Only Map

Section: Transformer Architecture

Mini-GPT uses a decoder-only Transformer. There is no separate encoder. The model reads previous tokens and predicts the next token. We repeat the same block several times, then use a linear head to map hidden vectors back to vocabulary scores.

## 25. Attention Intuition

Section: Transformer Architecture

Attention is a learned way for one position to look back at useful context. For the prefix d, e, n, n, the last n may need information from earlier characters to predict i. Attention scores visible positions and mixes their value vectors.

## 26. Q, K, V Roles

Section: Transformer Architecture

For each hidden vector, the model makes three learned projections: query, key, and value. The query asks what the current token needs. The keys describe the context tokens. The values carry the information that will be mixed. Q and K choose the weights; V is what gets combined.

## 27. Scores and Softmax

Section: Transformer Architecture

The model compares queries and keys with a dot product. That gives attention scores, or match strengths. Then softmax turns those scores into weights that add up to one. The final attention output is a weighted mix of the value vectors.

## 28. Causal Mask

Section: Transformer Architecture

During training, the full sequence is available, but GPT must not cheat by looking at future tokens. The causal mask blocks future positions. Each token can only attend to itself and earlier tokens, so the next-token prediction stays honest.

## 29. Multi-Head Attention

Section: Transformer Architecture

One attention head can learn one kind of relation. Multi-head attention runs several heads in parallel, so different heads can learn different views of the same context. Then the head outputs are joined together and projected back to the model dimension.

## 30. RMSNorm and Residuals

Section: Transformer Architecture

Residual connections add the old signal back after a layer. This helps information and gradients flow through deep blocks. RMSNorm keeps the vector scale stable. Together, they make repeated Transformer blocks much easier to train.

## 31. The MLP Block

Section: Transformer Architecture

Attention mixes information across tokens. The MLP works inside each token position. In this teaching version, the MLP is Linear, ReLU, and Linear. So the block first shares context with attention, then computes new features at each position.

## 32. Linear Head to Logits

Section: Transformer Architecture

At the end, the linear head maps each hidden vector to vocabulary size. The output numbers are logits, which means raw scores. Softmax turns logits into probabilities, and sampling chooses the next token. For Denn, we hope i becomes likely.

## 33. Training Mini-GPT

Section: Training and Inference

Now we train the model. Each batch contains many shifted next-token examples. The model produces logits, the loss measures how wrong they are, and the optimizer updates all learnable weights. The whole model learns from this same loop.

## 34. Training Loop: PyTorch View

Section: Training and Inference

This is the training loop in a short PyTorch-style view. First we run the model to get logits. Then cross entropy compares logits with the target tokens. Backward computes gradients, and AdamW uses those gradients to update the parameters.

## 35. Loss Goes Down

Section: Training and Inference

At the beginning, the model's generated names are mostly random. As training continues, the loss goes down. That means the model is becoming less surprised by real name patterns. The samples start to look more like plausible names.

## 36. Generating Names

Section: Training and Inference

Generation is autoregressive. We start with a seed token. The model predicts one next token. We append that token to the context, then ask again. Repeating this step grows a name one character at a time.

## 37. Sampling Loop

Section: Training and Inference

At each generation step, the model only needs the latest context window. It produces logits for the next token. We turn logits into probabilities, sample one token, append it, and continue. This is the same next-token idea used during training.

## 38. Temperature Controls Creativity

Section: Training and Inference

Temperature changes the probability distribution. Low temperature makes the model safer and more predictable. Higher temperature spreads probability across more choices, so the output becomes more surprising. It is a simple control for creativity versus stability.

## 39. Recap: Dennis Through Mini-GPT

Section: Recap and References

Let us follow Denn through the full path. Text becomes character tokens. Tokens become IDs. IDs become vectors with token and position embeddings. Transformer blocks update the hidden stream. The head produces logits, softmax gives probabilities, we sample i, append it, and continue.

## 40. What to Inspect in Code

Section: Recap and References

After the talk, these are the best places to inspect in code. Start with the tokenizer to see text and IDs. Then read the model to see blocks and logits. Finally, inspect the training file for loss, optimization, and the sampling loop.

## 41. References

Section: Recap and References

These references are good next steps. The original Transformer paper gives the architecture. Karpathy's microgpt, makemore, and nanoGPT are great for small GPT learning. The videos from 3Blue1Brown and Mu Li are helpful for building intuition.

## 42. Q&A / Thank You

Section: Recap and References

Thank you for listening. I hope this Mini-GPT path makes the Transformer feel more concrete. I am happy to take questions.
