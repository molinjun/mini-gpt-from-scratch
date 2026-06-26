# Mini-GPT Deck V3 Speaker Notes

These are polished read-aloud English speaker notes for the 37-slide V3 deck.

## 01. Build a Mini-GPT from Scratch

Section: Opening

Hello everyone. Thank you for being here. Today's topic is Build a Mini-GPT from Scratch. We will build the idea of a tiny GPT-style name generator, and use that path to understand the main ideas behind the Transformer architecture. All right, let's get started.

## 02. Agenda

Section: Opening

Here is the plan for the talk. We will move through five parts: why we build Mini-GPT, tokenizer and embedding, the neural network basics we need, the Transformer architecture, and finally training and name generation.

## 03. Transformer Is the Architecture

Section: Why We Build Mini-GPT

Before we build anything small, let's set the big picture. GPT-style models may look mysterious, but their core behavior is simple: given a sequence of tokens, predict the next token. The architecture behind this comes from the Transformer paper, Attention Is All You Need. The full Transformer diagram is powerful, but it is also dense. So instead of trying to understand the whole diagram at once, we will walk through a smaller GPT path.

## 04. From MicroGPT to Our Mini-GPT

Section: Why We Build Mini-GPT

This is where the MicroGPT spirit is useful. We make the problem small enough to inspect: a character-level model that generates names. The task is small, but the path is real. Text becomes tokens, tokens become vectors, Transformer blocks process the context, and the model predicts the next token. Name generation is just the microscope.

## 05. Why We Need a Tokenizer

Section: Tokenizer and Embedding

Now we start the Mini-GPT path from the input string. A Transformer cannot read a string like Dennis directly. It needs numbers. A tokenizer solves this first problem: it splits text into tokens, then maps those tokens to integer IDs.

## 06. BPE vs Character Tokens

Section: Tokenizer and Embedding

In real GPT systems, a common tokenizer style is subword tokenization, and tools like tiktoken can show how text becomes word pieces or subword pieces. For our Mini-GPT, the data is just names, so we use a much simpler tokenizer: 26 letters plus one BOS token. That gives us a vocabulary size of 27.

## 07. Dennis to Token IDs

Section: Tokenizer and Embedding

Now we make the Mini-GPT tokenizer concrete. We build a small vocabulary, map each character to an ID, and use that mapping both ways. For example, Dennis becomes d, e, n, n, i, s, and then 4, 5, 14, 14, 9, 19. Encoding means text to IDs; decoding means IDs back to text.

## 08. From Token IDs to Vectors

Section: Tokenizer and Embedding

Token IDs are still just integers. The next step is embedding. The token embedding table turns each ID into a vector. The position embedding tells the model where that token is in the sequence. From here on, the Transformer works with vectors.

## 09. Token Embedding

Section: Tokenizer and Embedding

An embedding layer is a learned lookup table. A token ID is not meaning by itself; it only selects one row. That row is a vector, and that vector is what the model can learn and update during training.

## 10. Position Embedding

Section: Tokenizer and Embedding

Token embeddings tell the model what the token is. Position embeddings tell it where the token is. This matters because the two n characters in Denn have the same token ID, but they are in different positions. We add token and position vectors together.

## 11. Decoder-Only Map

Section: Transformer Architecture

Now that text has become token and position vectors, let's zoom out and see the whole GPT path. Mini-GPT is decoder-only: it reads the previous tokens and predicts the next token. The embeddings go into repeated Transformer blocks, then RMSNorm and the linear head turn the final vectors into logits over the vocabulary. This map is the bridge between the input pipeline we just built and the Transformer blocks we are about to open.

## 12. Neural Network Basics

Section: Neural Network Basics

Before we open those Transformer blocks, we need a short neural network foundation. We do not need a full machine learning course. We only need a few ideas: parameters shape predictions, ReLU and MLPs add expressive power, and loss plus gradients tell the model how to improve.

## 13. A Neural Network Is a Function

Section: Neural Network Basics

The first mental model is simple: a neural network is a function with parameters. It takes numbers in and produces numbers out. At the beginning, the function is usually wrong. Training changes the parameters so the function fits the data better.

## 14. One Neuron: y = Wx + b

Section: Neural Network Basics

A very small model is y equals W times x plus b. The weight W controls the slope, and the bias b shifts the line. These are learnable parameters. During training, the model does not memorize the line directly; it learns values of W and b that make the predictions closer to the targets.

## 15. ReLU Adds a Bend

Section: Neural Network Basics

A straight line can only fit linear patterns. Real data is usually not that simple. ReLU adds a bend: negative values become zero, and positive values pass through. With this simple nonlinearity, the model can start building more complex shapes.

## 16. From Neuron to MLP

Section: Neural Network Basics

One neuron gives us one small feature. An MLP stacks many neurons and layers, so the model can combine simple features into richer ones. In our Mini-GPT, the MLP is still simple: Linear, ReLU, then Linear. This same idea appears inside every Transformer block.

## 17. Backprop and AdamW

Section: Neural Network Basics

Now we need a way to improve the parameters. The model runs forward and makes a prediction, then the loss measures the gap between prediction and target. Backpropagation computes how each parameter affected that loss. AdamW uses those gradients to move the parameters a small step in a better direction.

## 18. Training Is a Loop

Section: Neural Network Basics

For Mini-GPT, the same idea becomes a next-token training loop. The model predicts the next token, cross entropy measures the mistake, backpropagation computes gradients, and AdamW updates the parameters. We repeat this over many batches, so the loss goes down and the generated names become more plausible.

## 19. Inside the Transformer Block

Section: Transformer Architecture

Now we open one Transformer block. The block has two main parts: attention and MLP. Attention lets each position read useful information from earlier positions. The MLP then computes new features inside each position. Residual paths keep the hidden vectors flowing through the block.

## 20. Attention Intuition

Section: Transformer Architecture

Attention is a learned lookup mechanism. For the last `n` in `Denn`, the model asks: which earlier characters matter for predicting the next one? It gives visible positions different weights, then mixes their value vectors into a new vector for this position.

## 21. Q, K, V Roles

Section: Transformer Architecture

Q, K, and V are three learned projections from the same hidden vectors. Query means: what am I looking for? Key means: what does each context position contain? Value means: what information can this position send? Q and K decide the weights. V carries the information that gets mixed.

## 22. Scores and Softmax

Section: Transformer Architecture

The model compares Q and K to get attention scores. A higher score means a stronger match. Then softmax turns those scores into attention weights that add up to one. This is the first softmax in the story: it is inside attention, and it decides how much each visible token contributes.

## 23. Causal Mask

Section: Transformer Architecture

Before the attention weights are finalized, GPT must block the future. During training, the full sequence is available, but the model is only allowed to use current and past positions. The causal mask makes training match left-to-right generation, so the prediction stays honest.

## 24. Multi-Head Attention

Section: Transformer Architecture

One attention head gives one view of the context. Multi-head attention runs several heads in parallel. One head may focus on nearby spelling patterns, another may focus on endings or repeated characters. Then the head outputs are merged back into one hidden stream.

## 25. The MLP Block

Section: Transformer Architecture

After attention shares information across tokens, the MLP works inside each token position. This is the neural network idea from the previous section: Linear, ReLU, Linear. The same MLP weights are reused at every position, but each position has its own hidden vector.

## 26. RMSNorm and Residuals

Section: Transformer Architecture

RMSNorm and residual connections make the repeated block stable. The pattern is: normalize the stream, compute an update, and add the old stream back. RMSNorm controls the scale, and residuals preserve information as the model passes through many layers.

## 27. Linear Head to Logits

Section: Transformer Architecture

At the end, the linear head maps the hidden vector to vocabulary logits. Logits are raw scores for possible next tokens. Here we use a second softmax: earlier, softmax turned attention scores into attention weights; now, softmax turns vocabulary logits into next-token probabilities. Then we sample the next token.

## 28. Training Mini-GPT

Section: Training and Inference

That completes the forward path. Now we need to train it. Each batch contains many shifted next-token examples. The model produces logits, the loss measures how wrong they are, and the optimizer updates all learnable weights.

## 29. Training Loop: PyTorch View

Section: Training and Inference

This is the training loop in a short PyTorch-style view. First we run the model to get logits. Then cross entropy compares logits with the target tokens. Backward computes gradients, and AdamW uses those gradients to update the parameters.

## 30. Loss Goes Down

Section: Training and Inference

At the beginning, the model's generated names are mostly random. As training continues, the loss goes down. That means the model is becoming less surprised by real name patterns. The samples start to look more like plausible names.

## 31. Generating Names

Section: Training and Inference

Generation is autoregressive. We start with a seed token. The model predicts one next token. We append that token to the context, then ask again. Repeating this step grows a name one character at a time.

## 32. Sampling Loop

Section: Training and Inference

At each generation step, the model only needs the latest context window. It produces logits for the next token. We turn logits into probabilities, sample one token, append it, and continue. This is the same next-token idea we used during training.

## 33. Temperature Controls Creativity

Section: Training and Inference

Temperature changes the probability distribution. Low temperature makes the model safer and more predictable. Higher temperature spreads probability across more choices, so the output becomes more surprising. It is a simple control for stability versus variety.

## 34. Recap: Dennis Through Mini-GPT

Section: Recap and References

Let's put all the pieces back together with one example. Text becomes character tokens. Tokens become IDs. IDs become vectors with token and position embeddings. Transformer blocks update the hidden stream. The head produces logits, softmax gives probabilities, we sample i, append it, and continue.

## 35. What to Inspect in Code

Section: Recap and References

After the talk, these are the best places to inspect in code. Start with the tokenizer to see text and IDs. Then read the model to see blocks and logits. Finally, inspect the training file for loss, optimization, and the sampling loop.

## 36. References

Section: Recap and References

These references are good next steps. The original Transformer paper gives the architecture. Karpathy's microgpt, makemore, and nanoGPT are excellent for small GPT learning. The videos from 3Blue1Brown and Mu Li are helpful for building intuition.

## 37. Q&A / Thank You

Section: Recap and References

Thank you for listening. I hope this Mini-GPT path makes the Transformer feel more concrete. I am happy to take questions.
