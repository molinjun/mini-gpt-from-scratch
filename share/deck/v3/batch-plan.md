# Mini-GPT Deck V3 Batch Plan

This plan uses `share/deck/storyboard-v2.md`, `share/deck/generation-rules.md`, and the generated prompts in `share/deck/v3/prompts/`.

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

## Batch 2: Tokenizer and Embedding

Status: Generated in `share/deck/v3/`; reordered before neural network basics.

Slides:
- 05 Why We Need a Tokenizer
- 06 BPE vs Character Tokens
- 07 Dennis to Token IDs
- 08 From Token IDs to Vectors
- 09 Token Embedding
- 10 Position Embedding
- 11 The Hidden Stream

Review focus:
- Mini-GPT token IDs are small: `vocab_size = 27`, `0..26`.
- `Dennis` examples use character-level tokens.
- Team context can mention `ECP CIS`, but model examples should stay on `Dennis`.
- Embedding is explained as a learned lookup table.

## Batch 3: Neural Network Basics

Status: Generated in `share/deck/v3/`; moved after tokenizer and embedding.

Slides:
- 12 Neural Network Basics
- 13 A Neural Network Is a Function
- 14 One Neuron: y = Wx + b
- 15 From Neuron to MLP
- 16 ReLU Adds a Bend
- 17 Prediction and Loss
- 18 Backprop and AdamW

Review focus:
- The line-fitting example is easy to follow.
- `W`, `b`, `ReLU`, `MLP`, `loss`, `gradient`, and `AdamW` have enough short text.
- Slides do not look like a full neural-network course.
- Each slide clearly connects back to training parameters.

## Batch 4: Transformer Architecture

Status: Generated in `share/deck/v3/`.

Slides:
- 19 Inside the Transformer Block
- 20 Decoder-Only Map
- 21 Attention Intuition
- 22 Q, K, V Roles
- 23 Scores and Softmax
- 24 Causal Mask
- 25 Multi-Head Attention
- 26 RMSNorm and Residuals
- 27 The MLP Block
- 28 Linear Head to Logits

Review focus:
- QKV uses character tokens from `Dennis`, especially `d e n n -> i`.
- New terms have short definition chips.
- `logits = raw scores` and `softmax = scores to probabilities` are visible where needed.
- Architecture diagrams are readable and not overloaded.

## Batch 5: Training, Inference, and Closing

Status: Generated in `share/deck/v3/`.

Slides:
- 29 Training Mini-GPT
- 30 Training Loop: PyTorch View
- 31 Loss Goes Down
- 32 Generating Names
- 33 Sampling Loop
- 34 Temperature Controls Creativity
- 35 Recap: Dennis Through Mini-GPT
- 36 What to Inspect in Code
- 37 References
- 38 Q&A / Thank You

Review focus:
- Training loop code is readable.
- `logits` and `gradient` definitions are visible.
- Recap uses character-level IDs and `Dennis`.
- Closing slides stay simple.

## Promotion Checklist

- V3 preview complete: `share/deck/v3/index.html` contains 38 slides.
- V3 exports complete: `share/deck/v3/build-mini-gpt-from-scratch-v3.pptx` and `share/deck/v3/build-mini-gpt-from-scratch-v3.pdf`.
- Formal promotion status: promoted to `share/slides/index.html` and `share/deck/build-mini-gpt-from-scratch.pptx`.
- Speaker notes source: `share/deck/v3/speaker-notes.md` and matching talk-ordered docs.
- Talk flow source: `share/deck/v3/talk-flow.md`.
- Generate a batch into `share/deck/v3/`.
- Review generated PNGs in a temporary preview.
- Regenerate any weak slide before promotion.
- Promote approved PNGs, prompts, docs, HTML, and PPTX together.
- Run deck sync checks only after formal promotion.
