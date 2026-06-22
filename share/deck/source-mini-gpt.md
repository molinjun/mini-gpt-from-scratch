# Build a Mini-GPT from Scratch

Speaker: Molin

This source is compiled from the talk-ordered files in `docs/`. It is used for the baoyu slide asset workflow and the final HTML deck.

## 00 Cover

Title: Build a Mini-GPT from Scratch
Subtitle: Understand GPT and Transformer mechanics through 3k English names
Speaker: Molin

## 01 Goals

micro-gpt trains a character-level GPT on roughly 3k English names. The model learns next-character prediction, then samples new English-style names. The task is small, but it still covers tokenizer, embedding, Transformer block, loss, backpropagation, Adam, and generation.

## 02 Neural Network Basics

A Transformer is still a trainable function. Parameters control computation, loss measures error, backpropagation computes gradients, and Adam updates parameters. Attention lets token positions communicate, while MLPs compute inside each token position.

## 03 Tokenizer

Models process numbers, not raw strings. A tokenizer converts text into token ids. micro-gpt uses a character-level tokenizer because it is simple, reversible, and ideal for teaching. ChatGPT-style systems use larger token vocabularies and more efficient tokenization. OpenAI's tiktoken material explains that GPT models see tokens, and token counts affect context length and cost.

## 04 Embedding

Token ids are discrete labels. Embedding turns each id into a trainable vector. Token embedding says what the token is; position embedding says where it is in the context. The initial hidden state is their sum.

## 05 Transformer Architecture

GPT is a decoder-only Transformer that predicts the next token from left to right. Each block performs communication + computation. Attention uses Q/K/V to read information from prior positions. The MLP transforms each position independently. Multi-head attention learns several relation spaces in parallel. The causal mask prevents future leakage.

## 06 Linear & Norm

Linear is the basic trainable transform. The target micro-gpt teaching version uses RMSNorm + ReLU: RMSNorm stabilizes scale, and ReLU provides a direct nonlinearity. The current source still uses LayerNorm + GELU, and source alignment can be a follow-up task.

## 07 Softmax Output

The output layer projects hidden states to vocabulary size and produces logits. Softmax turns logits into a probability distribution. During training, cross-entropy penalizes low probability on the correct token. During generation, the model samples from the final position's distribution.

## 08 Recap

Names dataset -> tokenizer -> ids -> embedding -> Transformer blocks -> logits -> loss/generation. GPT is a next-token predictor.

## 09 References

Karpathy micrograd / makemore / nanoGPT / Let's build GPT. Attention Is All You Need. OpenAI Cookbook tiktoken. Repo docs and source.

## 10 QA

Discuss why small models can explain large models, next-token prediction, attention versus MLPs, tokenizer tradeoffs, and RMSNorm/ReLU versus LayerNorm/GELU.

## 11 Thank You

The best way to understand GPT is to train one small enough to inspect.
