# Mini-GPT Deck V2 Production Outline

Source storyboard: `share/deck/storyboard-v2.md`

Rules: `share/deck/generation-rules.md`

Status: production prompt scaffold only. These files do not replace the current formal deck until images are generated and explicitly promoted.

| # | Title | Section | Target Image |
|---|---|---|---|
| 01 | Build a Mini-GPT from Scratch | Opening | 01-slide-build-a-mini-gpt-from-scratch.png |
| 02 | Agenda | Opening | 02-slide-agenda.png |
| 03 | Transformer Is the Architecture | Why We Build Mini-GPT | 03-slide-transformer-is-the-architecture.png |
| 04 | From MicroGPT to Our Mini-GPT | Why We Build Mini-GPT | 04-slide-from-microgpt-to-our-mini-gpt.png |
| 05 | Neural Network Basics | Neural Network Basics | 05-slide-neural-network-basics.png |
| 06 | A Neural Network Is a Function | Neural Network Basics | 06-slide-a-neural-network-is-a-function.png |
| 07 | One Neuron: y = Wx + b | Neural Network Basics | 07-slide-one-neuron-y-wx-b.png |
| 08 | From Neuron to MLP | Neural Network Basics | 08-slide-from-neuron-to-mlp.png |
| 09 | ReLU Adds a Bend | Neural Network Basics | 09-slide-relu-adds-a-bend.png |
| 10 | Prediction and Loss | Neural Network Basics | 10-slide-prediction-and-loss.png |
| 11 | Backprop and AdamW | Neural Network Basics | 11-slide-backprop-and-adamw.png |
| 12 | From Text to Token IDs | Tokenizer and Embedding | 12-slide-from-text-to-token-ids.png |
| 13 | Names as Tiny Documents | Tokenizer and Embedding | 13-slide-names-as-tiny-documents.png |
| 14 | Why We Need a Tokenizer | Tokenizer and Embedding | 14-slide-why-we-need-a-tokenizer.png |
| 15 | BPE vs Character Tokens | Tokenizer and Embedding | 15-slide-bpe-vs-character-tokens.png |
| 16 | Dennis to Token IDs | Tokenizer and Embedding | 16-slide-dennis-to-token-ids.png |
| 17 | Inputs and Targets Are Shifted | Tokenizer and Embedding | 17-slide-inputs-and-targets-are-shifted.png |
| 18 | From Token IDs to Vectors | Tokenizer and Embedding | 18-slide-from-token-ids-to-vectors.png |
| 19 | Token IDs Are Not Meaning | Tokenizer and Embedding | 19-slide-token-ids-are-not-meaning.png |
| 20 | Token Embedding | Tokenizer and Embedding | 20-slide-token-embedding.png |
| 21 | Position Embedding | Tokenizer and Embedding | 21-slide-position-embedding.png |
| 22 | The Hidden Stream | Tokenizer and Embedding | 22-slide-the-hidden-stream.png |
| 23 | Inside the Transformer Block | Transformer Architecture | 23-slide-inside-the-transformer-block.png |
| 24 | Decoder-Only Map | Transformer Architecture | 24-slide-decoder-only-map.png |
| 25 | Attention Intuition | Transformer Architecture | 25-slide-attention-intuition.png |
| 26 | Q, K, V Roles | Transformer Architecture | 26-slide-q-k-v-roles.png |
| 27 | Scores and Softmax | Transformer Architecture | 27-slide-scores-and-softmax.png |
| 28 | Causal Mask | Transformer Architecture | 28-slide-causal-mask.png |
| 29 | Multi-Head Attention | Transformer Architecture | 29-slide-multi-head-attention.png |
| 30 | RMSNorm and Residuals | Transformer Architecture | 30-slide-rmsnorm-and-residuals.png |
| 31 | The MLP Block | Transformer Architecture | 31-slide-the-mlp-block.png |
| 32 | Linear Head to Logits | Transformer Architecture | 32-slide-linear-head-to-logits.png |
| 33 | Training Mini-GPT | Training and Inference | 33-slide-training-mini-gpt.png |
| 34 | Training Loop: PyTorch View | Training and Inference | 34-slide-training-loop-pytorch-view.png |
| 35 | Loss Goes Down | Training and Inference | 35-slide-loss-goes-down.png |
| 36 | Generating Names | Training and Inference | 36-slide-generating-names.png |
| 37 | Sampling Loop | Training and Inference | 37-slide-sampling-loop.png |
| 38 | Temperature Controls Creativity | Training and Inference | 38-slide-temperature-controls-creativity.png |
| 39 | Recap: Dennis Through Mini-GPT | Recap and References | 39-slide-recap-dennis-through-mini-gpt.png |
| 40 | What to Inspect in Code | Recap and References | 40-slide-what-to-inspect-in-code.png |
| 41 | References | Recap and References | 41-slide-references.png |
| 42 | Q&A / Thank You | Recap and References | 42-slide-qanda-thank-you.png |
