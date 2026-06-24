import { mkdirSync, writeFileSync } from "fs";
import { join } from "path";
import { slides, styleGuide } from "./microgpt_deck_data.mjs";

const root = process.cwd();
const docsDir = join(root, "docs");
const deckDir = join(root, "share", "deck");
const slidesDir = join(root, "share", "slides");
const promptsDir = join(deckDir, "prompts");

mkdirSync(docsDir, { recursive: true });
mkdirSync(slidesDir, { recursive: true });
mkdirSync(promptsDir, { recursive: true });

const pad = (n) => String(n).padStart(2, "0");
const docIndex = (slide) => pad(slide.n - 1);
const slideIndex = (slide) => pad(slide.n);
const bulletList = (items) => items.map((item) => `- ${item}`).join("\n");
const prose = (items) => items.join("\n\n");

const styleInstructions = `<STYLE_INSTRUCTIONS>
Design aesthetic: dark technical blueprint, inspired by the provided reference image.
Background: deep navy to near-black grid, subtle engineering paper texture, no light theme.
Palette: cyan #55d7ff, electric blue #2f80ed, deep navy #07182e, teal accents, small amber highlights only for warnings or targets.
Typography: crisp sans-serif, high contrast, clear labels, all English text, no Chinese text.
Visual elements: precise rectangular panels, 8px or smaller corner radius, thin technical strokes, orthogonal arrows, matrix cells, tensor labels, small code-like tags.
Density: detailed and educational, but each slide must have one main visual message.
Style rules: no slide numbers, no logos, no decorative blobs, no stock photos, no blurry text, no extra unexplained labels.
Reference style image: ${styleGuide.referenceImage}
</STYLE_INSTRUCTIONS>`;

function docFor(slide) {
  return `# ${docIndex(slide)} ${slide.title}

## Slide Goal

${slide.goal}

## Key Points

${bulletList(slide.bullets)}

## Speaker Notes

${prose(slide.notes)}

## Visual Idea

${slide.visual}

## Code Anchor

${bulletList(slide.code)}
`;
}

function promptFor(slide) {
  const isCover = slide.n === 1;

  return `---
slide: ${slideIndex(slide)}
title: "${slide.title.replaceAll('"', '\\"')}"
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
- ${isCover ? "Make the cover simple, clear, and calm." : "Make diagrams clear, precise, and information-rich."}
- Keep all text in English.
- Do not include slide numbers, footers, logos, watermarks, or Chinese text.

${styleInstructions}

Slide content:
- Slide number for internal tracking only: ${slideIndex(slide)}
- Filename: ${slideIndex(slide)}-slide-${slide.slug}.png
- Type: ${slide.type}
- Layout: ${slide.layout}
- Narrative goal: ${slide.goal}
- Headline text to render: "${slide.headline}"
- Supporting text to render: "${slide.subline}"
- Small labels to render only where useful: ${slide.labels.join(", ")}
- Visual description: ${slide.visual}
- Key points to show visually: ${slide.bullets.join(" | ")}

Rendering instructions:
- Build the slide around the visual description, not around a bullet list.
- Use the headline as the largest text.
- ${isCover ? "Keep the subtitle and speaker/team text smaller than the headline." : "Use at most two short supporting text blocks beyond labels."}
- ${isCover ? "Prefer generous empty space, a clean diagram, and crisp text." : "Prefer diagrams, matrices, arrows, tensor boxes, timelines, and code-like tags."}
- Make every label legible at presentation size.
- Avoid fake dense paragraphs, distorted text, random numbers, and irrelevant formulas.
`;
}

function outline() {
  const rows = slides
    .map(
      (s) =>
        `| ${slideIndex(s)} | ${s.title} | ${s.type} | ${s.layout} | ${slideIndex(s)}-slide-${s.slug}.png |`
    )
    .join("\n");

  return `# Baoyu Slide Deck Outline

Style preset: \`${styleGuide.name}\`
Audience: beginner-to-intermediate engineers, with Chinese listeners in mind
Language: English only for slide-visible text and speaker notes
Aspect ratio: 16:9
Primary delivery: PPTX with speaker notes, plus source prompts under \`share/deck/prompts/\`
Content source: \`docs/00-cover.md\` through \`docs/31-recap.md\`
Reference image: \`${styleGuide.referenceImage}\`

${styleInstructions}

## Slide Plan

| # | Title | Type | Layout | Visual Asset |
|---|---|---|---|---|
${rows}

## Visual Direction

- Every slide image must be generated through the baoyu slide prompt workflow.
- Save every final prompt under \`share/deck/prompts/\` before image generation.
- Match the reference image: dark navy blueprint grid, cyan/electric-blue linework, crisp technical panels, high-contrast text, and precise tensor diagrams.
- Keep visible text short and English-only. Put the full explanation in speaker notes.
- Use running examples: \`I love CIS\`, \`Dennis\`, \`den -> dennis\`, and MicroGPT-style name generation.
`;
}

function source() {
  return `# Build a Mini-GPT from scratch

Speaker: Molin
Team: ECP CIS

This source is compiled from the talk-ordered files in \`docs/\`. The deck follows Andrej Karpathy's MicroGPT learning spirit: build a tiny model, inspect every tensor, and use simple examples to understand GPT mechanics.

## Narrative

The talk starts from neural-network basics, builds up to a simple MLP, then explains tokenizer, embedding, Transformer blocks, QKV attention, training, and generation through a character-level name model.

## Slide Sequence

${slides.map((s) => `${s.n}. ${s.title}.`).join("\n")}

## Required Outputs

- Complete PPTX with at least 30 slides.
- Generated slide PNG for every page.
- Speaker notes written as simple read-aloud English.
- Baoyu prompt file for every generated slide image.
`;
}

function readme() {
  return `# Mini-GPT Talk Source

This directory is the single talk-ordered source for the presentation deck. The current deck has ${slides.length} slides and follows Andrej Karpathy's MicroGPT style: start small, inspect everything, and explain GPT with a character-level name generator.

## Talk Order

${slides
  .map((s) => `${s.n}. [${s.title}](${docIndex(s)}-${s.slug}.md): ${s.goal}`)
  .join("\n")}

Keep slide-visible text and speaker notes English-only. Preserve the dark blueprint visual language shown in \`share/deck/refs/01-ref-blueprint.png\`.
`;
}

function notes() {
  return `# Speaker Notes

These notes are written as complete read-aloud English scripts. They use simple words and short sentences so a Chinese-speaking audience can follow.

${slides
  .map(
    (s) => `## ${slideIndex(s)} ${s.title}

${prose(s.notes)}`
  )
  .join("\n\n")}
`;
}

function html() {
  const renderedSlides = slides
    .map(
      (s) => `  <section class="slide" data-title="${s.title.replaceAll('"', "&quot;")}">
    <img src="../deck/${slideIndex(s)}-slide-${s.slug}.png" alt="${s.title.replaceAll('"', "&quot;")}">
    <div class="speaker-notes">${prose(s.notes).replaceAll("&", "&amp;").replaceAll("<", "&lt;").replaceAll(">", "&gt;")}</div>
  </section>`
    )
    .join("\n\n");

  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Build a Mini-GPT from Scratch</title>
  <style>
    * { box-sizing: border-box; }
    html, body { margin: 0; width: 100%; height: 100%; background: #07182e; color: #f5f9ff; font-family: system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif; overflow: hidden; }
    body::before { content: ""; position: fixed; inset: 0; background: linear-gradient(rgba(85,215,255,.055) 1px, transparent 1px), linear-gradient(90deg, rgba(85,215,255,.055) 1px, transparent 1px); background-size: 42px 42px; pointer-events: none; }
    .slide { width: 100vw; height: 100vh; display: grid; place-items: center; padding: min(3vw, 2rem); }
    .slide[hidden] { display: none; }
    .slide img { width: min(100%, calc(100vh * 16 / 9)); height: min(100%, calc(100vw * 9 / 16)); object-fit: contain; border: 1px solid rgba(85,215,255,.22); border-radius: 8px; box-shadow: 0 24px 54px rgba(0,0,0,.36); background: #07182e; }
    .speaker-notes { display: none; }
    .hud { position: fixed; left: 1rem; bottom: 1rem; z-index: 5; color: rgba(245,249,255,.72); font-size: .82rem; letter-spacing: .08em; text-transform: uppercase; }
    .presenter-toggle { position: fixed; right: 1rem; bottom: 1rem; z-index: 5; border: 1px solid rgba(85,215,255,.35); border-radius: 8px; background: rgba(7,24,46,.86); color: #f5f9ff; padding: .55rem .75rem; font: inherit; font-size: .82rem; cursor: pointer; }
  </style>
</head>
<body>
${renderedSlides}
  <div class="hud" aria-live="polite"></div>
  <button class="presenter-toggle" type="button">Presenter</button>
  <script>
    const slides = Array.from(document.querySelectorAll(".slide"));
    const hud = document.querySelector(".hud");
    const presenterToggle = document.querySelector(".presenter-toggle");
    let current = 0;
    let presenterWindow = null;

    function notes(index) {
      return slides[index].querySelector(".speaker-notes")?.textContent.trim() || "";
    }

    function show(index) {
      current = Math.max(0, Math.min(index, slides.length - 1));
      slides.forEach((slide, i) => slide.hidden = i !== current);
      hud.textContent = "Slide " + (current + 1) + " / " + slides.length;
      updatePresenter();
    }

    function openPresenter() {
      if (!presenterWindow || presenterWindow.closed) {
        presenterWindow = window.open("", "mini-gpt-presenter", "width=1280,height=720");
        if (!presenterWindow) return;
        presenterWindow.document.write('<!DOCTYPE html><html><head><title>Speaker Notes</title><style>body{margin:0;background:#101114;color:#f5f7fb;font-family:system-ui,sans-serif;display:grid;grid-template-columns:1fr 1fr;height:100vh}.preview{display:grid;place-items:center;padding:1rem;background:#07182e}.preview img{max-width:100%;max-height:100%;object-fit:contain}.notes{padding:2rem;overflow:auto;border-left:1px solid #303542}.notes h1{color:#55d7ff;font-size:1rem;letter-spacing:.08em;text-transform:uppercase}.notes p{font-size:1.35rem;line-height:1.5;white-space:pre-wrap}</style></head><body><div class="preview"></div><div class="notes"><h1>Speaker Notes</h1><p></p></div></body></html>');
      }
      presenterWindow.focus();
      updatePresenter();
    }

    function updatePresenter() {
      if (!presenterWindow || presenterWindow.closed) return;
      const img = slides[current].querySelector("img").cloneNode();
      presenterWindow.document.querySelector(".preview").replaceChildren(img);
      presenterWindow.document.querySelector(".notes p").textContent = notes(current);
    }

    document.addEventListener("keydown", (event) => {
      if (event.metaKey || event.ctrlKey || event.altKey) return;
      if (event.key === "ArrowRight" || event.key === "PageDown" || event.key === " ") { event.preventDefault(); show(current + 1); }
      if (event.key === "ArrowLeft" || event.key === "PageUp") { event.preventDefault(); show(current - 1); }
      if (event.key === "Home") { event.preventDefault(); show(0); }
      if (event.key === "End") { event.preventDefault(); show(slides.length - 1); }
      if (event.key.toLowerCase() === "p") { event.preventDefault(); openPresenter(); }
    });
    presenterToggle.addEventListener("click", openPresenter);
    show(0);
  </script>
</body>
</html>
`;
}

for (const slide of slides) {
  writeFileSync(join(docsDir, `${docIndex(slide)}-${slide.slug}.md`), docFor(slide));
  writeFileSync(join(promptsDir, `${slideIndex(slide)}-slide-${slide.slug}.md`), promptFor(slide));
}

writeFileSync(join(docsDir, "README.md"), readme());
writeFileSync(join(deckDir, "outline.md"), outline());
writeFileSync(join(deckDir, "source-mini-gpt.md"), source());
writeFileSync(join(deckDir, "speaker-notes.md"), notes());
writeFileSync(join(slidesDir, "index.html"), html());

console.log(`Generated ${slides.length} docs, ${slides.length} prompts, and HTML viewer.`);
