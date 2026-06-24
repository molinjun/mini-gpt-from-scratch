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
const escapeHtml = (value) =>
  String(value)
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;");
const escapeAttr = (value) => escapeHtml(value).replaceAll('"', "&quot;");
const sourceList = (sources = []) =>
  sources.map((source) => `- ${source.label}: ${source.display || source.url} (${source.url})`).join("\n");
const sourcePrompt = (sources = []) =>
  sources.map((source) => `${source.label}: ${source.display || source.url}`).join(" | ");

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
  const sourcesSection = slide.sources
    ? `\n\n## Source Links\n\n${sourceList(slide.sources)}`
    : "";

  return `# ${docIndex(slide)} ${slide.title}

## Slide Goal

${slide.goal}

## Key Points

${bulletList(slide.bullets)}${sourcesSection}

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
  const sourcesInstruction = slide.sources
    ? `\n- Render source chips in the PNG using this exact short text: ${sourcePrompt(slide.sources)}.`
    : "";
  const sourceChipLine = slide.sources
    ? `\n- Source chips to show visually: ${sourcePrompt(slide.sources)}`
    : "";
  const supportingInstruction = isCover
    ? "Keep the subtitle and speaker/team text smaller than the headline."
    : slide.sources
      ? "Use concise source-rich callouts: three key points plus compact source chips. Keep the diagram clear and avoid covering it with paragraphs."
      : "Use at most two short supporting text blocks beyond labels.";

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
- ${isCover ? "Make the cover simple, clear, and calm." : "Make diagrams clear, precise, and information-rich."}${sourcesInstruction}
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
- Key points to show visually: ${slide.bullets.join(" | ")}${sourceChipLine}

Rendering instructions:
- Build the slide around the visual description, not around a bullet list.
- Use the headline as the largest text.
- ${supportingInstruction}
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

The talk first explains why Transformer and next-token prediction matter, then uses a tiny MicroGPT-style name generator to make the ideas concrete. From there it builds up from neural-network basics to tokenizer, embedding, Transformer blocks, QKV attention, training, and generation.

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
  const renderImage = (s) =>
    `    <img class="slide-image" src="../deck/${slideIndex(s)}-slide-${s.slug}.png" alt="${escapeAttr(s.title)}">`;

  const renderedSlides = slides
    .map(
      (s) => `  <section class="slide" data-title="${escapeAttr(s.title)}">
${renderImage(s)}
    <div class="speaker-notes">${escapeHtml(prose(s.notes))}</div>
  </section>`
    )
    .join("\n\n");

  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Build a Mini-GPT from scratch</title>
  <style>
    * { box-sizing: border-box; }
    html, body { margin: 0; width: 100%; height: 100%; background: #07182e; color: #f5f9ff; font-family: system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif; overflow: hidden; }
    body::before { content: ""; position: fixed; inset: 0; background: linear-gradient(rgba(85,215,255,.055) 1px, transparent 1px), linear-gradient(90deg, rgba(85,215,255,.055) 1px, transparent 1px); background-size: 42px 42px; pointer-events: none; }
    .slide { width: 100vw; height: 100vh; display: none; place-items: center; padding: min(3vw, 2rem); }
    .slide.is-active { display: grid; }
    .slide-image { width: min(100%, calc(100vh * 16 / 9)); height: min(100%, calc(100vw * 9 / 16)); object-fit: contain; border: 1px solid rgba(85,215,255,.22); border-radius: 8px; box-shadow: 0 24px 54px rgba(0,0,0,.36); background: #07182e; }
    .speaker-notes { display: none; }
    .hud { position: fixed; left: 1rem; bottom: 1rem; z-index: 5; color: rgba(245,249,255,.72); font-size: .82rem; letter-spacing: .08em; text-transform: uppercase; }
    .status-message { position: fixed; left: 1rem; top: 1rem; z-index: 8; max-width: min(28rem, calc(100vw - 2rem)); padding: .7rem .85rem; border: 1px solid rgba(85,215,255,.32); border-radius: 8px; background: rgba(5,16,31,.94); color: rgba(245,249,255,.9); font-size: .9rem; line-height: 1.35; box-shadow: 0 18px 36px rgba(0,0,0,.28); opacity: 0; pointer-events: none; transform: translateY(-.25rem); transition: opacity .16s ease, transform .16s ease; }
    .status-message.is-visible { opacity: 1; transform: translateY(0); }
    .controls { position: fixed; left: 50%; bottom: .75rem; transform: translateX(-50%); z-index: 6; display: flex; align-items: center; gap: .5rem; padding: .35rem; border: 1px solid rgba(85,215,255,.24); border-radius: 8px; background: rgba(4,15,30,.76); box-shadow: 0 18px 36px rgba(0,0,0,.28); backdrop-filter: blur(12px); }
    .deck-button,
    .presenter-toggle { border: 1px solid rgba(85,215,255,.35); border-radius: 8px; background: rgba(7,24,46,.9); color: #f5f9ff; min-width: 4.8rem; height: 2.25rem; padding: 0 .75rem; font: inherit; font-size: .82rem; cursor: pointer; }
    .deck-button:hover,
    .presenter-toggle:hover { border-color: rgba(85,215,255,.72); background: rgba(11,39,73,.96); }
    .deck-button:focus-visible,
    .presenter-toggle:focus-visible { outline: 2px solid #55d7ff; outline-offset: 2px; }
    .deck-button:disabled { opacity: .42; cursor: default; }
    .deck-button[aria-pressed="true"] { background: rgba(85,215,255,.2); border-color: rgba(85,215,255,.78); }
    .presenter-toggle { position: fixed; right: 1rem; bottom: 1rem; z-index: 5; }
    .notes-panel { position: fixed; top: 1rem; right: 1rem; z-index: 7; display: none; width: min(28rem, calc(100vw - 2rem)); max-height: calc(100vh - 5rem); overflow: auto; padding: 1rem; border: 1px solid rgba(85,215,255,.32); border-radius: 8px; background: rgba(5,16,31,.94); box-shadow: 0 24px 54px rgba(0,0,0,.38); backdrop-filter: blur(14px); }
    .notes-panel.is-open { display: block; }
    .notes-title { margin: 0 0 .65rem; color: #55d7ff; font-size: .78rem; font-weight: 700; letter-spacing: .08em; text-transform: uppercase; }
    .notes-body { margin: 0; color: rgba(245,249,255,.9); font-size: 1rem; line-height: 1.5; white-space: pre-wrap; }
    @media (max-width: 760px) {
      .slide { padding-bottom: 4.5rem; }
      .slide-image { height: auto; }
      .hud { left: .75rem; bottom: 4rem; }
      .controls { width: calc(100vw - 1.5rem); justify-content: center; }
      .deck-button,
      .presenter-toggle { min-width: 0; flex: 1 1 auto; padding: 0 .55rem; }
      .presenter-toggle { right: .75rem; bottom: .75rem; width: calc((100vw - 2rem) / 4); }
    }
  </style>
</head>
<body>
${renderedSlides}
  <div class="hud" aria-live="polite"></div>
  <div class="status-message" role="status" aria-live="polite"></div>
  <div class="controls" role="group" aria-label="Slide controls">
    <button class="deck-button prev-button" type="button" data-action="prev">Prev</button>
    <button class="deck-button next-button" type="button" data-action="next">Next</button>
    <button class="deck-button notes-toggle" type="button" data-action="notes" aria-controls="notes-panel" aria-expanded="false">Notes</button>
  </div>
  <aside class="notes-panel" id="notes-panel" aria-label="Speaker notes" aria-live="polite">
    <div class="notes-title"></div>
    <p class="notes-body"></p>
  </aside>
  <button class="presenter-toggle" type="button" data-action="presenter">Presenter</button>
  <script>
    const slides = Array.prototype.slice.call(document.querySelectorAll(".slide"));
    const hud = document.querySelector(".hud");
    const statusMessage = document.querySelector(".status-message");
    const prevButton = document.querySelector(".prev-button");
    const nextButton = document.querySelector(".next-button");
    const notesToggle = document.querySelector(".notes-toggle");
    const notesPanel = document.querySelector(".notes-panel");
    const notesTitle = document.querySelector(".notes-title");
    const notesBody = document.querySelector(".notes-body");
    let current = 0;
    let presenterWindow = null;
    let statusTimer = null;

    function notes(index) {
      const node = slides[index] ? slides[index].querySelector(".speaker-notes") : null;
      return node ? node.textContent.trim() : "";
    }

    function showStatus(message) {
      if (!statusMessage) return;
      statusMessage.textContent = message;
      statusMessage.classList.add("is-visible");
      window.clearTimeout(statusTimer);
      statusTimer = window.setTimeout(function () {
        statusMessage.classList.remove("is-visible");
      }, 3600);
    }

    function setChildren(parent) {
      while (parent.firstChild) parent.removeChild(parent.firstChild);
      for (let i = 1; i < arguments.length; i += 1) parent.appendChild(arguments[i]);
    }

    function closestActionButton(target) {
      let node = target;
      while (node && node !== document) {
        if (node.nodeType === 1 && node.hasAttribute("data-action")) return node;
        node = node.parentNode;
      }
      return null;
    }

    function show(index) {
      current = Math.max(0, Math.min(index, slides.length - 1));
      slides.forEach(function (slide, i) {
        slide.classList.toggle("is-active", i === current);
        slide.setAttribute("aria-hidden", String(i !== current));
      });
      hud.textContent = "Slide " + (current + 1) + " / " + slides.length;
      prevButton.disabled = current === 0;
      nextButton.disabled = current === slides.length - 1;
      notesTitle.textContent = "Slide " + (current + 1) + " Notes";
      notesBody.textContent = notes(current);
      updatePresenter();
    }

    function toggleNotes(forceOpen) {
      const open = typeof forceOpen === "boolean" ? forceOpen : !notesPanel.classList.contains("is-open");
      notesPanel.classList.toggle("is-open", open);
      notesToggle.setAttribute("aria-expanded", String(open));
      notesToggle.setAttribute("aria-pressed", String(open));
    }

    function buildPresenterDocument() {
      const doc = presenterWindow.document;
      const root = doc.documentElement || doc.appendChild(doc.createElement("html"));
      if (!doc.head) root.insertBefore(doc.createElement("head"), root.firstChild);
      if (!doc.body) root.appendChild(doc.createElement("body"));
      doc.documentElement.lang = "en";
      setChildren(doc.head);

      const titleTag = doc.createElement("title");
      titleTag.textContent = "Speaker Notes";
      const style = doc.createElement("style");
      const deckStyle = document.querySelector("style");
      style.textContent = (deckStyle ? deckStyle.textContent : "") + [
        "body{margin:0;background:#101114;color:#f5f7fb;font-family:system-ui,sans-serif;display:grid;grid-template-columns:1fr 1fr;height:100vh}",
        ".preview{display:grid;place-items:center;padding:1rem;background:#07182e;overflow:hidden}",
        ".preview .slide-frame,.preview .slide-image{width:100%;height:auto;max-height:100%;box-shadow:none}",
        ".preview .slide-frame{aspect-ratio:16/9}",
        ".notes{padding:2rem;overflow:auto;border-left:1px solid #303542}",
        ".notes h1{color:#55d7ff;font-size:1rem;letter-spacing:0;text-transform:uppercase}",
        ".notes p{font-size:1.35rem;line-height:1.5;white-space:pre-wrap}"
      ].join("");
      doc.head.appendChild(titleTag);
      doc.head.appendChild(style);

      const preview = doc.createElement("div");
      preview.className = "preview";
      const notesWrap = doc.createElement("div");
      notesWrap.className = "notes";
      const title = doc.createElement("h1");
      title.textContent = "Speaker Notes";
      const body = doc.createElement("p");
      setChildren(notesWrap, title, body);
      setChildren(doc.body, preview, notesWrap);
    }

    function openPresenter() {
      if (!presenterWindow || presenterWindow.closed) {
        presenterWindow = window.open("", "mini-gpt-presenter", "width=1280,height=720");
        if (!presenterWindow) {
          showStatus("Presenter window was blocked. Allow pop-ups for this page, then click Presenter again.");
          return;
        }
        buildPresenterDocument();
      }
      presenterWindow.focus();
      updatePresenter();
    }

    function updatePresenter() {
      if (!presenterWindow || presenterWindow.closed) return;
      const sourceFrame = slides[current].querySelector(".slide-frame");
      const sourceImg = slides[current].querySelector("img");
      if (!sourceFrame && !sourceImg) return;
      const preview = presenterWindow.document.querySelector(".preview");
      const notesText = presenterWindow.document.querySelector(".notes p");
      if (!preview || !notesText) return;
      const previewNode = sourceFrame ? sourceFrame.cloneNode(true) : sourceImg.cloneNode(false);
      if (!sourceFrame) previewNode.src = sourceImg.src;
      setChildren(preview, previewNode);
      notesText.textContent = notes(current);
    }

    document.addEventListener("keydown", (event) => {
      if (event.metaKey || event.ctrlKey || event.altKey) return;
      if (event.key === "ArrowRight" || event.key === "PageDown" || event.key === " ") { event.preventDefault(); show(current + 1); }
      if (event.key === "ArrowLeft" || event.key === "PageUp") { event.preventDefault(); show(current - 1); }
      if (event.key === "Home") { event.preventDefault(); show(0); }
      if (event.key === "End") { event.preventDefault(); show(slides.length - 1); }
      if (event.key.toLowerCase() === "p") { event.preventDefault(); openPresenter(); }
      if (event.key.toLowerCase() === "n") { event.preventDefault(); toggleNotes(); }
      if (event.key === "Escape") { toggleNotes(false); }
    });
    document.addEventListener("click", function (event) {
      const button = closestActionButton(event.target);
      if (!button) return;
      const action = button.getAttribute("data-action");
      if (action === "prev") show(current - 1);
      if (action === "next") show(current + 1);
      if (action === "notes") toggleNotes();
      if (action === "presenter") openPresenter();
    });
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
