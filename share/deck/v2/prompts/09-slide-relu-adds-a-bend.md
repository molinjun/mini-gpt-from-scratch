---
slide: 09
title: "ReLU Adds a Bend"
section: "Neural Network Basics"
output: "09-slide-relu-adds-a-bend.png"
references:
  - ref_id: 01
    filename: "../refs/01-ref-blueprint.png"
    usage: style
---

Create one complete 16:9 presentation slide image.

Slide title to render:
ReLU Adds a Bend

Slide-visible text to render:
- Linear layers alone stay linear
- ReLU keeps positive values
- Nonlinearity adds expressive power

Speaker-note intent, for context only:
If we only stack linear layers, the result is still a linear function. ReLU adds a simple bend. This lets the model build piecewise lines, so it can fit patterns that a single straight line cannot fit.

Visual direction:
Side-by-side plot: a straight line underfitting curved data, then a piecewise line after ReLU bends the function.

Code snippet intent:
PyTorch teaching snippet: `torch.relu(x)` or `nn.ReLU()`.

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
- Target output filename for the production batch: 09-slide-relu-adds-a-bend.png
