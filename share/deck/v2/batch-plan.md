# Mini-GPT Deck V2 Batch Plan

This plan uses `share/deck/storyboard-v2.md`, `share/deck/generation-rules.md`, and the generated prompts in `share/deck/v2/prompts/`.

Do not replace the formal deck until a batch is generated, reviewed, and explicitly promoted.

## Batch 1: Opening and Why Mini-GPT

Slides:
- 01 Build a Mini-GPT from Scratch
- 02 Agenda
- 03 Transformer Is the Architecture
- 04 From MicroGPT to Our Mini-GPT

Review focus:
- Title and speaker are correct.
- `ECP CIS`, `Attention Is All You Need`, `MicroGPT`, and `Mini-GPT` are readable.
- The Transformer paper architecture is clear but not too detailed.
- The MicroGPT slide clearly explains the name-generator task.

## Batch 2: Neural Network Basics

Status: Generated in `share/deck/v2/` and included in `share/deck/v2/index.html`.

Slides:
- 05 Neural Network Basics
- 06 A Neural Network Is a Function
- 07 One Neuron: y = Wx + b
- 08 From Neuron to MLP
- 09 ReLU Adds a Bend
- 10 Prediction and Loss
- 11 Backprop and AdamW

Review focus:
- The line-fitting example is easy to follow.
- `W`, `b`, `ReLU`, `MLP`, `loss`, `gradient`, and `AdamW` have enough short text.
- Slides do not look like a full neural-network course.
- Each slide clearly connects back to training parameters.

## Batch 3: Tokenizer and Embedding

Status: Generated in `share/deck/v2/` and included in `share/deck/v2/index.html`.

Slides:
- 12 From Text to Token IDs
- 13 Names as Tiny Documents
- 14 Why We Need a Tokenizer
- 15 BPE vs Character Tokens
- 16 Dennis to Token IDs
- 17 Inputs and Targets Are Shifted
- 18 From Token IDs to Vectors
- 19 Token IDs Are Not Meaning
- 20 Token Embedding
- 21 Position Embedding
- 22 The Hidden Stream

Review focus:
- Mini-GPT token IDs are small: `vocab_size = 27`, `0..26`.
- `Dennis` examples use character-level tokens.
- `I love CIS` is used for tokenizer/order examples where helpful.
- Embedding is explained as a learned lookup table.

## Batch 4: Transformer Architecture

Slides:
- 23 Inside the Transformer Block
- 24 Decoder-Only Map
- 25 Attention Intuition
- 26 Q, K, V Roles
- 27 Scores and Softmax
- 28 Causal Mask
- 29 Multi-Head Attention
- 30 RMSNorm and Residuals
- 31 The MLP Block
- 32 Linear Head to Logits

Review focus:
- QKV uses `I love CIS`.
- New terms have short definition chips.
- `logits = raw scores` and `softmax = scores to probabilities` are visible where needed.
- Architecture diagrams are readable and not overloaded.

## Batch 5: Training, Inference, and Closing

Slides:
- 33 Training Mini-GPT
- 34 Training Loop: PyTorch View
- 35 Loss Goes Down
- 36 Generating Names
- 37 Sampling Loop
- 38 Temperature Controls Creativity
- 39 Recap: Dennis Through Mini-GPT
- 40 What to Inspect in Code
- 41 References
- 42 Q&A / Thank You

Review focus:
- Training loop code is readable.
- `logits` and `gradient` definitions are visible.
- Recap uses character-level IDs and `Dennis`.
- Closing slides stay simple.

## Promotion Checklist

- Generate a batch into `share/deck/v2/`.
- Review generated PNGs in a temporary preview.
- Regenerate any weak slide before promotion.
- Promote approved PNGs, prompts, docs, HTML, and PPTX together.
- Run deck sync checks only after formal promotion.
