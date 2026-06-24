---
slide: 31
title: "The MLP Block"
section: "Transformer Architecture"
output: "31-slide-the-mlp-block.png"
references:
  - ref_id: 01
    filename: "../refs/01-ref-blueprint.png"
    usage: style
---

Create one complete 16:9 presentation slide image.

Slide title to render:
The MLP Block

Slide-visible text to render:
- Attention mixes across tokens
- MLP works inside each token
- Linear -> ReLU -> Linear

Speaker-note intent, for context only:
Attention shares information across positions. The MLP then processes each position separately. In this teaching project, the MLP is Linear, ReLU, and Linear.

Visual direction:
Per-position MLP pipeline repeated under several token columns.

Code snippet intent:
PyTorch teaching snippet: `nn.Sequential(nn.Linear(n, 4*n), nn.ReLU(), nn.Linear(4*n, n))`.

Approved deck generation rules:
# Mini-GPT Deck Generation Rules

These rules are approved for the next production stages of the Mini-GPT deck.

## Content Rules

- Keep all slide-visible text and speaker notes in English.
- Use simple, common English words for speaker notes.
- Prefer familiar running examples: `ECP CIS`, `I love CIS`, and `Dennis`.
- Avoid unfamiliar generic filler words; prefer project-specific terms from this deck.
- Every technical concept slide should include a short definition chip when the term may be new.
- Use concise definition chips, for example:
  - `logits = raw scores`
  - `gradient = direction to reduce loss`
  - `softmax = scores to probabilities`
  - `embedding = learned lookup table`
  - `attention = weighted mixing`

## Tokenizer Rules

- Mini-GPT uses a character-level tokenizer.
- Keep token IDs small and realistic for the teaching model.
- Use `vocab_size = 27` and token IDs in the `0..26` range.
- For `Dennis`, prefer lowercase character examples when showing IDs:
  - `d e n n`
  - `[4, 5, 14, 14]`
- Do not render large production-model token IDs for Mini-GPT examples.

## Visual Rules

- Use the approved dark blueprint style:
  - deep navy grid background
  - cyan and electric-blue strokes
  - crisp high-contrast text
  - technical panels with 8px-or-less corner radius
- Generated PNGs should contain enough short text to let the audience understand the topic without relying only on narration.
- Avoid dense paragraphs inside images.
- Prefer diagrams plus short labels, not diagram-only slides.
- Keep visual examples project-specific and familiar.

## Pilot Decisions

- QKV examples should use `I love CIS`.
- Recap should use `Recap: Dennis Through Mini-GPT`.
- Training-loop slides should define `logits` and `gradient` directly on the slide.
- Recap/tokenizer slides should show character-level tokens and small IDs.


Rendering instructions:
- Output is a single polished slide PNG.
- Keep all visible text in English.
- Use the approved dark blueprint style.
- Use diagrams plus short definition chips where useful.
- Keep text readable at presentation size.
- Do not include slide numbers, logos, watermarks, or Chinese text.
- Do not add unrelated examples, random tokens, or generic filler words.
- Target output filename for the production batch: 31-slide-the-mlp-block.png
