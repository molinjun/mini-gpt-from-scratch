---
slide: 08
title: "Backprop and Update"
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
- Slide number for internal tracking only: 08
- Filename: 08-slide-backprop-update.png
- Type: Training Basics
- Layout: circular-flow
- Narrative goal: Explain how training changes parameters.
- Headline text to render: "Training is a loop"
- Supporting text to render: "predict -> loss -> gradients -> update"
- Small labels to render only where useful: predict, loss, gradients, AdamW
- Visual description: Circular training loop diagram with four nodes and small arrows flowing around the circle.
- Key points to show visually: Backprop computes gradients | AdamW changes weights | Repeat many times

Rendering instructions:
- Build the slide around the visual description, not around a bullet list.
- Use the headline as the largest text.
- Use at most two short supporting text blocks beyond labels.
- Prefer diagrams, matrices, arrows, tensor boxes, timelines, and code-like tags.
- Make every label legible at presentation size.
- Avoid fake dense paragraphs, distorted text, random numbers, and irrelevant formulas.
