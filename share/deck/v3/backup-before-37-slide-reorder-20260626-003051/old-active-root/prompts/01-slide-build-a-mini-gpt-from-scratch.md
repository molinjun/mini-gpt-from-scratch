---
slide: 01
title: "Build a Mini-GPT from Scratch"
section: "Opening"
output: "01-slide-build-a-mini-gpt-from-scratch.png"
references:
  - ref_id: 01
    filename: "../refs/01-ref-blueprint.png"
    usage: style
---

Create one complete 16:9 presentation slide image.

Slide title to render:
Build a Mini-GPT from Scratch

Slide-visible text to render:
- Understand Transformer architecture and how it works
- Build a tiny name generator
- Speaker: Zhiqiang Ge, ECP CIS

Speaker-note intent, for context only:
Hello everyone. I am Zhiqiang Ge from ECP CIS. Today we will build a Mini-GPT from scratch. By build, I do not mean typing every line live. I mean assembling the main ideas step by step: starting from the Transformer paper, using Andrej Karpathy's MicroGPT spirit to simplify the problem, and tracing how a tiny name generator learns to predict the next token.

Visual direction:
Preserve the V2 cover composition and visual language. Left side title, subtitle, speaker, and team stay unchanged. Right side keeps the same compact flow through a Transformer block: input panel -> Transformer -> next-token output panel. Make only one text correction in the right-side input panel: replace `ECP CIS` with exact text `ECP IS`. Keep the output panel as exact text `Awesome`. Keep the `next token` label and the Transformer panel unchanged.

Code snippet intent:
None.

Approved deck generation rules:
# Mini-GPT Deck Generation Rules

These rules are approved for the next production stages of the Mini-GPT deck.

## Content Rules

- Keep all slide-visible text and speaker notes in English.
- Use simple, common English words for speaker notes.
- Prefer familiar running examples: `ECP CIS` and `Dennis`.
- Use `Dennis` as the main model example. Transformer slides should use character-level tokens such as `d e n n -> i`.
- Use `ECP CIS` only as a team/context label, not as the main model token sequence.
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

- QKV examples should use character tokens from `Dennis`, especially `d e n n` with `i` as the likely next token.
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
- Target output filename for the production batch: 01-slide-build-a-mini-gpt-from-scratch.png
