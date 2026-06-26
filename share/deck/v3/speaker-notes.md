# Mini-GPT Deck V3 Speaker Notes

These are simple read-aloud English speaker notes for the 37-slide V3 deck.

## 01. Build a Mini-GPT from Scratch

Section: Opening

Hello everyone. Thank you for joining. Today's topic is Build a Mini-GPT from Scratch. We will try to build a GPT-style name generator, and use that  to understand the main ideas behind the Transformer architecture. All right, let's get started.


## 02. Agenda

Section: Opening

Here is the plan. We will cover five parts: why we build Mini-GPT, tokenizer and embedding, some neural-network basics, the Transformer architecture, then training and inference.

## 03. Transformer Is the Architecture

Section: Why We Build Mini-GPT

Many modern AI models are based on the Transformer architecture. It was introduced in the paper Attention Is All You Need in 2017. GPT models can look complex, but the core task is simple: given some tokens, predict the next token. The original diagram has many parts, so today we will follow a smaller one.

## 04. From MicroGPT to Our Mini-GPT

Section: Why We Build Mini-GPT

This is where the MicroGPT idea helps. We make the problem small enough to inspect: a character-level model that generates names. The task is small, but the path is real. Text becomes tokens, tokens become vectors, Transformer blocks process the context, and the model predicts the next token. Name generation is our small example.

## 05. Why We Need a Tokenizer

Section: Tokenizer and Embedding

Now we start from the input string. A Transformer cannot read a word like Dennis directly. It needs numbers. A tokenizer does this first step. It splits text into tokens, then maps each token to an integer ID.

## 06. BPE vs Character Tokens

Section: Tokenizer and Embedding

In real GPT systems, tokenizers often use word pieces or subword pieces. Tools like tiktoken can show that process. For Mini-GPT, our data is only names, so we keep it much simpler. We use 26 letters plus one BOS token. That gives us a vocabulary size of 27.

## 07. Dennis to Token IDs

Section: Tokenizer and Embedding

Now let's make the tokenizer concrete. We build a small vocabulary and map each character to an ID. For example, Dennis becomes d, e, n, n, i, s, and then 4, 5, 14, 14, 9, 19. Encoding means text to IDs. Decoding means IDs back to text.

## 08. From Token IDs to Vectors

Section: Tokenizer and Embedding

Token IDs are still just integers. The next step is embedding. The token embedding table turns each ID into a vector. The position embedding tells the model where the token is in the sequence. From this point on, the Transformer works with vectors.

## 09. Token Embedding

Section: Tokenizer and Embedding

An embedding layer is a learned lookup table. A token ID has no meaning by itself. It only selects one row in the table. That row is a vector, and the model learns that vector during training.

## 10. Position Embedding

Section: Tokenizer and Embedding

Token embeddings tell the model what the token is. Position embeddings tell it where the token is. This matters because the two n characters in Denn have the same token ID, but they are in different places. We add the token vector and the position vector together.

## 11. Decoder-Only Map

Section: Transformer Architecture

Now that text has become vectors, let's zoom out and see the whole GPT path. Mini-GPT is decoder-only. It reads previous tokens and predicts the next token. The embeddings go into Transformer blocks. Then RMSNorm and the linear head turn the final vectors into logits over the vocabulary. This map connects the input steps to the block we will open next.

## 12. Neural Network Basics

Section: Neural Network Basics

Before we open the Transformer block, we need a short neural-network foundation. We do not need a full machine-learning course. We only need a few ideas. Parameters shape predictions. ReLU and MLPs make the model more flexible. Loss and gradients tell the model how to improve.

## 13. A Neural Network Is a Function

Section: Neural Network Basics

The first idea is simple: a neural network is a function with parameters. It takes numbers in and produces numbers out. At the start, the function is usually wrong. Training changes the parameters so the output fits the data better.

## 14. One Neuron: y = Wx + b

Section: Neural Network Basics

A very small model is y equals W times x plus b. The weight W controls the slope. The bias b shifts the line. Both of them are learnable parameters. During training, the model learns values of W and b that make its predictions closer to the targets.

## 15. ReLU Adds a Bend

Section: Neural Network Basics

A straight line can only fit simple patterns. Real data is usually not that simple. ReLU adds a bend. Negative values become zero, and positive values pass through. With this small change, the model can build more useful shapes.

## 16. From Neuron to MLP

Section: Neural Network Basics

One neuron gives us one small feature. An MLP stacks many neurons and layers. This lets the model combine simple features into richer ones. In Mini-GPT, the MLP is still simple: Linear, ReLU, then Linear. The same idea appears inside every Transformer block.

## 17. Backprop and AdamW

Section: Neural Network Basics

Now we need a way to improve the parameters. The model runs forward and makes a prediction. The loss measures the gap between the prediction and the target. Backpropagation tells us how each parameter affected that loss. AdamW uses those gradients to move the parameters a small step in a better direction.

## 18. Training Is a Loop

Section: Neural Network Basics

For Mini-GPT, this becomes a next-token training loop. The model predicts the next token. Cross entropy measures the mistake. Backpropagation computes gradients. AdamW updates the parameters. We repeat this over many batches, so the loss goes down and the generated names start to look more real.

## 19. Inside the Transformer Block

Section: Transformer Architecture

Now we open one Transformer block. The block has two main parts: attention and MLP. Attention lets each position read useful information from earlier positions. The MLP builds new features inside each position. Residual paths keep the hidden vectors moving through the block.

## 20. Attention Intuition

Section: Transformer Architecture

Attention is a learned lookup step. For the last `n` in `Denn`, the model asks: which earlier characters matter for predicting the next one? It gives visible positions different weights. Then it mixes their value vectors into a new vector for this position.

## 21. Q, K, V Roles

Section: Transformer Architecture

Q, K, and V are three learned views of the same hidden vectors. Query means: what am I looking for? Key means: what does each context position contain? Value means: what information can this position send? Q and K decide the weights. V carries the information that gets mixed.

## 22. Scores and Softmax

Section: Transformer Architecture

The model compares Q and K to get attention scores. A higher score means a stronger match. Then softmax turns those scores into attention weights that add up to one. This is the first softmax in the talk. It is inside attention, and it decides how much each visible token contributes.

## 23. Causal Mask

Section: Transformer Architecture

Before the attention weights are final, GPT must block the future. During training, the full sequence is available. But the model can only use the current token and past tokens. The causal mask makes training match left-to-right generation.

## 24. Multi-Head Attention

Section: Transformer Architecture

One attention head gives one view of the context. Multi-head attention runs several heads in parallel. One head may focus on nearby spelling patterns. Another may focus on endings or repeated characters. Then the head outputs are merged back into one hidden stream.

## 25. The MLP Block

Section: Transformer Architecture

After attention shares information across tokens, the MLP works inside each token position. This is the neural-network idea from the earlier section: Linear, ReLU, Linear. The same MLP weights are used at every position, but each position has its own hidden vector.

## 26. RMSNorm and Residuals

Section: Transformer Architecture

RMSNorm and residual connections help the repeated blocks stay stable. The pattern is simple: normalize the stream, compute an update, and add the old stream back. RMSNorm controls the scale. Residuals keep useful information as the model passes through many layers.

## 27. Linear Head to Logits

Section: Transformer Architecture

At the end, the linear head maps the hidden vector to vocabulary logits. Logits are raw scores for possible next tokens. Here we use a second softmax. Earlier, softmax turned attention scores into attention weights. Now, softmax turns vocabulary logits into next-token probabilities. Then we sample the next token.

## 28. Training Mini-GPT

Section: Training and Inference

Now that we have the full forward path, training is easier to describe. We take name text and turn it into many shifted next-token examples. Given `d e n n`, the target might be `i`. Given `e n n i`, the target might be `s`. Mini-GPT predicts logits, cross entropy measures the mistake, and the optimizer updates the weights.

## 29. Training Loop: PyTorch View

Section: Training and Inference

In code, the loop is small. Get a batch. Run the model forward to produce logits. Compare logits with target tokens using cross entropy. Run backward to compute gradients. Then let AdamW update the parameters. The embeddings, attention weights, MLP weights, and linear head all learn through this same loop.

## 30. Loss Goes Down

Section: Training and Inference

When loss goes down, the model is less surprised by real name patterns. At the beginning, generated names are mostly random letters. As training continues, the model gives more probability to normal character patterns. The samples start to look like names.

## 31. Generating Names

Section: Training and Inference

Generation runs left to right. We start with a seed token and ask the model to predict one next token. Then we append that token to the context and ask again. Each new character becomes part of the next input, so a name grows one token at a time.

## 32. Sampling Loop

Section: Training and Inference

At each generation step, we keep the latest context window and run Mini-GPT. The model returns logits for the next token. We turn those logits into probabilities with softmax. Then we sample one token, append it, and repeat. Training can predict many positions at once, but generation moves one step at a time.

## 33. Temperature Controls Creativity

Section: Training and Inference

Temperature changes how sharp the probabilities are before sampling. Low temperature makes the model safer and more predictable. Higher temperature spreads probability across more choices. The output becomes more varied, but also more risky. For name generation, temperature is a simple creativity control.

## 34. Recap: Dennis Through Mini-GPT

Section: Recap and References

Let's put all the pieces back together with one example. Text becomes character tokens. Tokens become IDs. IDs become vectors with token and position embeddings. Transformer blocks update the hidden stream. The head produces logits, softmax gives probabilities, and we sample the next character. Then we append it and continue.

## 35. What to Inspect in Code

Section: Recap and References

After the talk, these are the best places to inspect in code. Start with the tokenizer to see text and IDs. Then read the model to see the blocks and logits. Finally, inspect the training file for loss, optimization, and the sampling loop.

## 36. References

Section: Recap and References

Here are a couple of useful references if you're interested. I highly recommend reading the original Attention Is All You Need paper and MicroGPT source code.

## 37. Q&A / Thank You

Section: Recap and References

Thank you all for listening.

Even though there's still a lot details we didn't have time to cover, I hope this walkthrough has helped you build a basic understanding of how a Transformer works.

Any questions?

OK, If not, we'll end here. If you're interested in this and want to discuss more, feel free to message me on SeaTalk.Thank you!