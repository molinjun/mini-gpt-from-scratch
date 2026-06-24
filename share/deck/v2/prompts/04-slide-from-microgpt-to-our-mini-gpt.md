---
slide: 04
title: "From MicroGPT to Our Mini-GPT"
section: "Why We Build Mini-GPT"
output: "04-slide-from-microgpt-to-our-mini-gpt.png"
references:
  - ref_id: 01
    filename: "../refs/01-ref-blueprint.png"
    usage: style
---

Create one complete 16:9 presentation slide image.

Slide title to render:
From MicroGPT to Our Mini-GPT

Slide-visible text to render:
- Inspired by Andrej Karpathy's MicroGPT
- Build a tiny GPT to generate names
- Use it to inspect the full path

Speaker-note intent, for context only:
The full Transformer is still too large to learn all at once. So we borrow the spirit of Andrej Karpathy's MicroGPT and build our own Mini-GPT. The task is simple: generate names. This small task still shows the full path: tokenizer, embeddings, Transformer blocks, logits, and sampling.

Visual direction:
Source-and-task slide with no human portrait: Andrej Karpathy name as a source label, MicroGPT code card, makemore names dataset card, then our Mini-GPT workbench producing sample names such as `Dennis`. Include source chips: `MicroGPT gist` and `github.com/karpathy/makemore`.

Code snippet intent:
None.

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
- Target output filename for the production batch: 04-slide-from-microgpt-to-our-mini-gpt.png
