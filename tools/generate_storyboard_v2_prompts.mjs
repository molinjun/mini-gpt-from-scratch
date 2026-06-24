import { mkdirSync, writeFileSync } from "fs";
import { join } from "path";
import { readFileSync } from "fs";

const root = process.cwd();
const storyboardPath = join(root, "share", "deck", "storyboard-v2.md");
const rulesPath = join(root, "share", "deck", "generation-rules.md");
const outDir = join(root, "share", "deck", "v2");
const promptsDir = join(outDir, "prompts");

const storyboard = readFileSync(storyboardPath, "utf8");
const rules = readFileSync(rulesPath, "utf8");

mkdirSync(promptsDir, { recursive: true });

function slugify(title) {
  return title
    .toLowerCase()
    .replace(/`/g, "")
    .replace(/&/g, "and")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "")
    .slice(0, 64);
}

function field(block, label) {
  const labels = [
    "Section:",
    "Slide-visible bullets:",
    "Speaker notes:",
    "Visual direction:",
    "Code snippet intent:",
    "Review note:",
  ];
  const start = block.indexOf(label);
  if (start === -1) return "";
  const from = start + label.length;
  const after = labels
    .filter((item) => item !== label)
    .map((item) => block.indexOf(item, from))
    .filter((index) => index !== -1)
    .sort((a, b) => a - b)[0];
  return block.slice(from, after ?? block.length).trim();
}

function parseSlides(markdown) {
  const chunks = markdown.split(/\n(?=## \d{2}\. )/g);
  return chunks
    .filter((chunk) => chunk.startsWith("## "))
    .map((chunk) => {
      const heading = chunk.match(/^## (\d{2})\. (.+)$/m);
      if (!heading) throw new Error(`Invalid slide heading:\n${chunk.slice(0, 120)}`);
      const n = Number(heading[1]);
      const title = heading[2].trim();
      return {
        n,
        title,
        slug: slugify(title),
        section: field(chunk, "Section:"),
        bullets: field(chunk, "Slide-visible bullets:"),
        notes: field(chunk, "Speaker notes:"),
        visual: field(chunk, "Visual direction:"),
        code: field(chunk, "Code snippet intent:"),
      };
    });
}

function promptFor(slide) {
  const number = String(slide.n).padStart(2, "0");
  const filename = `${number}-slide-${slide.slug}.png`;
  return `---
slide: ${number}
title: "${slide.title.replaceAll('"', '\\"')}"
section: "${slide.section.replaceAll('"', '\\"')}"
output: "${filename}"
references:
  - ref_id: 01
    filename: "../refs/01-ref-blueprint.png"
    usage: style
---

Create one complete 16:9 presentation slide image.

Slide title to render:
${slide.title}

Slide-visible text to render:
${slide.bullets}

Speaker-note intent, for context only:
${slide.notes}

Visual direction:
${slide.visual}

Code snippet intent:
${slide.code}

Approved deck generation rules:
${rules}

Rendering instructions:
- Output is a single polished slide PNG.
- Keep all visible text in English.
- Use the approved dark blueprint style.
- Use diagrams plus short definition chips where useful.
- Keep text readable at presentation size.
- Do not include slide numbers, logos, watermarks, or Chinese text.
- Do not add unrelated examples, random tokens, or generic filler words.
- Target output filename for the production batch: ${filename}
`;
}

function outline(slides) {
  const rows = slides
    .map((slide) => {
      const number = String(slide.n).padStart(2, "0");
      return `| ${number} | ${slide.title} | ${slide.section} | ${number}-slide-${slide.slug}.png |`;
    })
    .join("\n");

  return `# Mini-GPT Deck V2 Production Outline

Source storyboard: \`share/deck/storyboard-v2.md\`

Rules: \`share/deck/generation-rules.md\`

Status: production prompt scaffold only. These files do not replace the current formal deck until images are generated and explicitly promoted.

| # | Title | Section | Target Image |
|---|---|---|---|
${rows}
`;
}

const slides = parseSlides(storyboard);

for (const slide of slides) {
  const number = String(slide.n).padStart(2, "0");
  writeFileSync(join(promptsDir, `${number}-slide-${slide.slug}.md`), promptFor(slide));
}

writeFileSync(join(outDir, "outline.md"), outline(slides));
writeFileSync(
  join(outDir, "README.md"),
  `# Mini-GPT Deck V2 Workspace

This workspace is generated from \`share/deck/storyboard-v2.md\`.

- Production prompts: \`prompts/\`
- Production outline: \`outline.md\`
- Approved rules: \`../generation-rules.md\`

Do not overwrite the current formal deck from this directory until a batch has been reviewed and explicitly promoted.
`
);

console.log(`Generated ${slides.length} v2 prompt files in share/deck/v2/prompts.`);
