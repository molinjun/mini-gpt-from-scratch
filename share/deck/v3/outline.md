# Mini-GPT Deck V3 Production Outline

Source storyboard: `share/deck/storyboard-v2.md`, reordered and compressed for V3. Hidden Stream is folded into the architecture overview.

Rules: `share/deck/generation-rules.md`

Status: production prompt scaffold only. These files do not replace the current formal deck until images are generated and explicitly promoted.


| # | Title | Section | Target Image |
|---|---|---|---|
| 01 | Build a Mini-GPT from Scratch | Opening | selected-images/01-opening-why-mini-gpt/01-slide-build-a-mini-gpt-from-scratch.png |
| 02 | Agenda | Opening | selected-images/01-opening-why-mini-gpt/02-slide-agenda.png |
| 03 | Transformer Is the Architecture | Why We Build Mini-GPT | selected-images/01-opening-why-mini-gpt/03-slide-transformer-is-the-architecture.png |
| 04 | From MicroGPT to Our Mini-GPT | Why We Build Mini-GPT | selected-images/01-opening-why-mini-gpt/04-slide-from-microgpt-to-our-mini-gpt.png |
| 05 | Why We Need a Tokenizer | Tokenizer and Embedding | selected-images/02-tokenizer-embedding/05-slide-why-we-need-a-tokenizer.png |
| 06 | BPE vs Character Tokens | Tokenizer and Embedding | selected-images/02-tokenizer-embedding/06-slide-bpe-vs-character-tokens.png |
| 07 | Dennis to Token IDs | Tokenizer and Embedding | selected-images/02-tokenizer-embedding/07-slide-dennis-to-token-ids.png |
| 08 | From Token IDs to Vectors | Tokenizer and Embedding | selected-images/02-tokenizer-embedding/08-slide-from-token-ids-to-vectors.png |
| 09 | Token Embedding | Tokenizer and Embedding | selected-images/02-tokenizer-embedding/09-slide-token-embedding.png |
| 10 | Position Embedding | Tokenizer and Embedding | selected-images/02-tokenizer-embedding/10-slide-position-embedding.png |
| 11 | Decoder-Only Map | Transformer Architecture | selected-images/02-tokenizer-embedding/11-slide-decoder-only-map.png |
| 12 | Neural Network Basics | Neural Network Basics | selected-images/03-neural-network-basics/01-neural-network-basics-overview.png |
| 13 | A Neural Network Is a Function | Neural Network Basics | selected-images/03-neural-network-basics/02-neural-network-is-a-function.png |
| 14 | One Neuron: y = Wx + b | Neural Network Basics | selected-images/03-neural-network-basics/03-one-neuron-w-b.png |
| 15 | ReLU Adds a Bend | Neural Network Basics | selected-images/03-neural-network-basics/04-relu-adds-a-bend.png |
| 16 | From Neuron to MLP | Neural Network Basics | selected-images/03-neural-network-basics/05-mlp-layers-of-neurons.png |
| 17 | Backprop and AdamW | Neural Network Basics | selected-images/03-neural-network-basics/06-slide-backprop-and-adamw.png |
| 18 | Training Is a Loop | Neural Network Basics | selected-images/03-neural-network-basics/07-training-is-a-loop.png |
| 19 | Inside the Transformer Block | Transformer Architecture | selected-images/04-transformer-architecture/01-inside-the-transformer-block.png |
| 20 | Attention Intuition | Transformer Architecture | selected-images/04-transformer-architecture/02-attention-intuition.png |
| 21 | Q, K, V Roles | Transformer Architecture | selected-images/04-transformer-architecture/03-qkv-roles.png |
| 22 | Scores and Softmax | Transformer Architecture | selected-images/04-transformer-architecture/04-scores-and-softmax.png |
| 23 | Causal Mask | Transformer Architecture | selected-images/04-transformer-architecture/05-causal-mask.png |
| 24 | Multi-Head Attention | Transformer Architecture | selected-images/04-transformer-architecture/06-multi-head-attention.png |
| 25 | The MLP Block | Transformer Architecture | selected-images/04-transformer-architecture/07-mlp-block.png |
| 26 | RMSNorm and Residuals | Transformer Architecture | selected-images/04-transformer-architecture/08-rmsnorm-and-residuals.png |
| 27 | Linear Head to Logits | Transformer Architecture | selected-images/04-transformer-architecture/09-linear-head-to-logits.png |
| 28 | Training Mini-GPT | Training and Inference | selected-images/05-training-inference/01-training-mini-gpt.png |
| 29 | Training Loop: PyTorch View | Training and Inference | selected-images/05-training-inference/02-training-loop-pytorch-view.png |
| 30 | Loss Goes Down | Training and Inference | selected-images/05-training-inference/03-loss-goes-down.png |
| 31 | Generating Names | Training and Inference | selected-images/05-training-inference/04-generating-names.png |
| 32 | Sampling Loop | Training and Inference | selected-images/05-training-inference/05-sampling-loop.png |
| 33 | Temperature Controls Creativity | Training and Inference | selected-images/05-training-inference/06-temperature-controls-creativity.png |
| 34 | Recap: Dennis Through Mini-GPT | Recap and References | selected-images/06-recap-closing/01-recap-dennis-through-mini-gpt.png |
| 35 | What to Inspect in Code | Recap and References | selected-images/06-recap-closing/02-what-to-inspect-in-code.png |
| 36 | References | Recap and References | selected-images/06-recap-closing/03-references.png |
| 37 | Q&A / Thank You | Recap and References | selected-images/06-recap-closing/04-qanda-thank-you.png |
