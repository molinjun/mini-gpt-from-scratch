# Mini-GPT Deck V3 Handoff

Date: 2026-06-25

This file preserves the current working context so another Codex session can continue with minimal style drift.

## Current Goal

Finish the V3 talk outline and English speaker notes for the technical presentation **Build a Mini-GPT from Scratch**.

The talk is tomorrow at 6 PM. The priority is speed and clarity: finish the story and notes first, then generate final deck outputs once at the end.

Latest state update:

- V3 is now a 37-slide logical deck in `speaker-notes.md` and `outline.md`.
- `The Hidden Stream` is no longer an independent talk slide.
- The hidden-stream idea is folded into the architecture overview and Transformer block explanation.
- `Decoder-Only Map` is moved logically right after `Position Embedding` as the whole-model map.
- Image and prompt files have now been physically reordered to match the 37-slide structure.
- Active V3 root images are now `01-slide-...png` through `37-slide-...png`.
- Active V3 prompts are now `prompts/01-slide-...md` through `prompts/37-slide-...md`.
- The previous 38-slide V3 image/prompt sequence is preserved under `share/deck/v3/backup-before-37-slide-reorder-20260626-003051/`.
- Image selection should now happen through `share/deck/v3/selected-images/`, grouped by talk module. The user will copy preferred v1/v2/v3 candidates there before final assembly.

## Current Constraints

- Do not edit PPTX, PDF, or `index.html` during the notes/outlining pass.
- For now, edit only:
  - `share/deck/v3/speaker-notes.md`
  - image order / image files under `share/deck/v3/` if absolutely needed
- Avoid changing images unless the user explicitly asks.
- Avoid image generation for now to save laptop battery and tokens.
- Keep all slide-visible text and speaker notes in English.
- Collaboration language can be Chinese.
- The user calls the assistant "小K"; keep the tone warm, direct, and gently challenging.

## Narrative Direction

The main line is:

> The original Transformer architecture is important but concept-heavy. We use Andrej Karpathy's MicroGPT spirit to build a tiny, inspectable GPT-style name generator, then use that build path to understand Transformer principles.

Keep the title:

> Build a Mini-GPT from Scratch

But interpret "build" as a guided architecture walkthrough, not live coding.

The talk should connect:

1. Attention Is All You Need and the Transformer architecture
2. Why a small MicroGPT-style model helps learning
3. Name generation as the concrete task
4. Next-token prediction as the core GPT behavior
5. The path through tokenizer, embeddings, neural-network basics, Transformer blocks, training, and sampling

## Preferred Agenda Order

The user likes this order:

1. Why Mini-GPT
2. Text to Tokens and Embeddings
3. Neural Network Basics
4. Transformer Architecture
5. Training and Inference

The current Agenda image still shows the older order, but do not regenerate it now. The user may regenerate images tomorrow when they have battery.

## Work Completed

- Created `share/deck/v3/` from `share/deck/v2/`.
- Preserved V2; do not overwrite or delete V2.
- V3 currently has:
  - 37 active PNG files
  - 37 active prompt files
  - `speaker-notes.md`
  - copied `index.html`, PPTX, and PDF from V2, but these should not be edited now
- Cover image was minimally patched from V2:
  - right-side input text changed visually from `ECP CIS` to `ECP IS`
  - output remains `Awesome`
  - rest of composition should remain V2-like
- Rejected direction:
  - Do not use the fully regenerated cover with `ECP is -> awesome`; user preferred the original V2 composition with only `CIS` changed to `IS`.

## Current Speaker Notes

Source of truth for current notes:

`share/deck/v3/speaker-notes.md`

Current Slide 01:

> Hello everyone. Thank you for being here. Today's topic is Build a Mini-GPT from Scratch. I will show how we can build a tiny Mini-GPT to generate names, and use that process to understand the core ideas behind the Transformer architecture. All right, let's get started.

Current Slide 02:

> Here is the plan for the talk. I will divide it into five parts: why we try to build a Mini-GPT, how tokenizer and embedding work, the basic neural network ideas we need, the Transformer architecture, and finally training and name generation.

## Next Step

Continue refining from the Transformer Architecture section after Slide 19.

Current logical sequence around the redesign:

- Slide 10: Position Embedding
- Slide 11: Decoder-Only Map, whole Mini-GPT architecture overview
- Slides 12-18: Neural Network Basics
- Slide 19: Inside the Transformer Block
- Slides 20 onward: Attention, Q/K/V, softmax, mask, multi-head, RMSNorm/residuals, MLP, logits

Keep each speaker note short, natural, and read-aloud friendly. The user prefers simple but not childish English. Avoid stiff "First, second, third" scripts unless the slide is explicitly an agenda.

## Do Not Touch Yet

- `share/slides/index.html`
- any PPTX or PDF outputs
- `share/deck/v2/`
- final promotion flow

At the end, after notes and image order are finalized, generate the final HTML/PPT/PDF in one pass.
