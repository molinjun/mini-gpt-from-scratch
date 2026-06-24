---
slide: 03
title: "The Demo Target"
references:
  - ref_id: 01
    filename: 01-ref-blueprint.png
    usage: style
---

Create a highly polished presentation slide image.

Image specifications:
- Aspect ratio: 16:9 landscape.
- Output is a single complete slide image.
- Use the dark blueprint visual quality shown in the reference image.
- Make diagrams clear, precise, and information-rich.
- Keep all text in English.
- Do not include slide numbers, footers, logos, watermarks, or Chinese text.

<STYLE_INSTRUCTIONS>
Design aesthetic: dark technical blueprint, inspired by the provided reference image.
Background: deep navy to near-black grid, subtle engineering paper texture, no light theme.
Palette: cyan #55d7ff, electric blue #2f80ed, deep navy #07182e, teal accents, small amber highlights only for warnings or targets.
Typography: crisp sans-serif, high contrast, clear labels, all English text, no Chinese text.
Visual elements: precise rectangular panels, 8px or smaller corner radius, thin technical strokes, orthogonal arrows, matrix cells, tensor labels, small code-like tags.
Density: detailed and educational, but each slide must have one main visual message.
Style rules: no slide numbers, no logos, no decorative blobs, no stock photos, no blurry text, no extra unexplained labels.
Reference style image: share/deck/refs/01-ref-blueprint.png
</STYLE_INSTRUCTIONS>

Slide content:
- Slide number for internal tracking only: 03
- Filename: 03-slide-demo-target.png
- Type: Outcome
- Layout: linear-progression
- Narrative goal: Make the task concrete before theory.
- Headline text to render: "We generate names one character at a time"
- Supporting text to render: "Prompt: den -> model samples n -> i -> s -> stop."
- Small labels to render only where useful: BOS, d, e, n, n, i, s, stop
- Visual description: A left-to-right generation trace showing BOS, d, e, n, then sampled n, i, s, and BOS as stop.
- Key points to show visually: Input: a short prefix | Output: one next character | Repeat until stop

Rendering instructions:
- Build the slide around the visual description, not around a bullet list.
- Use the headline as the largest text.
- Use at most two short supporting text blocks beyond labels.
- Prefer diagrams, matrices, arrows, tensor boxes, timelines, and code-like tags.
- Make every label legible at presentation size.
- Avoid fake dense paragraphs, distorted text, random numbers, and irrelevant formulas.
