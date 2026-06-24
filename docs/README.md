# Mini-GPT Talk Source

This directory is the single talk-ordered source for the presentation deck.

Current deck: **Build a Mini-GPT from Scratch**

Slides: 42

Rules:

- Keep slide-visible text and speaker notes in English.
- Keep the dark blueprint visual language used in `share/deck/v2/`.
- Use the tiny character-level name generator as the running example.
- The teaching implementation explains RMSNorm + ReLU.

## Talk Order

- 01. [Build a Mini-GPT from Scratch](00-cover.md)
- 02. [Agenda](01-agenda.md)
- 03. [Transformer Is the Architecture](02-transformer-is-the-architecture.md)
- 04. [From MicroGPT to Our Mini-GPT](03-from-microgpt-to-our-mini-gpt.md)
- 05. [Neural Network Basics](04-neural-network-basics.md)
- 06. [A Neural Network Is a Function](05-a-neural-network-is-a-function.md)
- 07. [One Neuron: y = Wx + b](06-one-neuron-y-wx-b.md)
- 08. [From Neuron to MLP](07-from-neuron-to-mlp.md)
- 09. [ReLU Adds a Bend](08-relu-adds-a-bend.md)
- 10. [Prediction and Loss](09-prediction-and-loss.md)
- 11. [Backprop and AdamW](10-backprop-and-adamw.md)
- 12. [From Text to Token IDs](11-from-text-to-token-ids.md)
- 13. [Names as Tiny Documents](12-names-as-tiny-documents.md)
- 14. [Why We Need a Tokenizer](13-why-we-need-a-tokenizer.md)
- 15. [BPE vs Character Tokens](14-bpe-vs-character-tokens.md)
- 16. [Dennis to Token IDs](15-dennis-to-token-ids.md)
- 17. [Inputs and Targets Are Shifted](16-inputs-and-targets-are-shifted.md)
- 18. [From Token IDs to Vectors](17-from-token-ids-to-vectors.md)
- 19. [Token IDs Are Not Meaning](18-token-ids-are-not-meaning.md)
- 20. [Token Embedding](19-token-embedding.md)
- 21. [Position Embedding](20-position-embedding.md)
- 22. [The Hidden Stream](21-the-hidden-stream.md)
- 23. [Inside the Transformer Block](22-inside-the-transformer-block.md)
- 24. [Decoder-Only Map](23-decoder-only-map.md)
- 25. [Attention Intuition](24-attention-intuition.md)
- 26. [Q, K, V Roles](25-q-k-v-roles.md)
- 27. [Scores and Softmax](26-scores-and-softmax.md)
- 28. [Causal Mask](27-causal-mask.md)
- 29. [Multi-Head Attention](28-multi-head-attention.md)
- 30. [RMSNorm and Residuals](29-rmsnorm-and-residuals.md)
- 31. [The MLP Block](30-the-mlp-block.md)
- 32. [Linear Head to Logits](31-linear-head-to-logits.md)
- 33. [Training Mini-GPT](32-training-mini-gpt.md)
- 34. [Training Loop: PyTorch View](33-training-loop-pytorch-view.md)
- 35. [Loss Goes Down](34-loss-goes-down.md)
- 36. [Generating Names](35-generating-names.md)
- 37. [Sampling Loop](36-sampling-loop.md)
- 38. [Temperature Controls Creativity](37-temperature-controls-creativity.md)
- 39. [Recap: Dennis Through Mini-GPT](38-recap-dennis-through-mini-gpt.md)
- 40. [What to Inspect in Code](39-what-to-inspect-in-code.md)
- 41. [References](40-references.md)
- 42. [Q&A / Thank You](41-qanda-thank-you.md)
