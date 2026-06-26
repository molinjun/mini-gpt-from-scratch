import { existsSync, readdirSync, readFileSync } from "fs";
import { basename, extname, join } from "path";
import PptxGenJS from "pptxgenjs";

interface SlideInfo {
  filename: string;
  path: string;
  index: number;
  notesPath?: string;
}

function parseArgs(): { dir: string; output: string } {
  const args = process.argv.slice(2);
  const dir = args[0];
  const outputFlag = args.findIndex((arg) => arg === "--output" || arg === "-o");
  const output = outputFlag >= 0 ? args[outputFlag + 1] : "";

  if (!dir || !output) {
    console.error("Usage: bun merge-pptx-fixed.ts <slide-dir> --output <file.pptx>");
    process.exit(1);
  }

  return { dir, output };
}

function findSlides(dir: string): SlideInfo[] {
  const slidePattern = /^(\d+)-slide-.*\.(png|jpg|jpeg)$/i;
  const promptsDir = join(dir, "prompts");
  const hasPrompts = existsSync(promptsDir);

  return readdirSync(dir)
    .filter((filename) => slidePattern.test(filename))
    .map((filename) => {
      const match = filename.match(slidePattern);
      const stem = filename.replace(extname(filename), "");
      const notesPath = hasPrompts ? join(promptsDir, `${stem}.md`) : undefined;

      return {
        filename,
        path: join(dir, filename),
        index: Number(match?.[1]),
        notesPath: notesPath && existsSync(notesPath) ? notesPath : undefined,
      };
    })
    .sort((a, b) => a.index - b.index);
}

async function main() {
  const { dir, output } = parseArgs();
  const slides = findSlides(dir);

  if (slides.length === 0) {
    console.error(`No slide images found in ${dir}`);
    process.exit(1);
  }

  const pptx = new PptxGenJS();
  pptx.layout = "LAYOUT_WIDE";
  pptx.author = "baoyu-slide-deck";
  pptx.subject = "Build a Mini-GPT from Scratch";
  pptx.title = "Build a Mini-GPT from Scratch";

  let notesCount = 0;
  for (const slide of slides) {
    const s = pptx.addSlide();
    s.background = { color: "000915" };
    s.addImage({
      path: slide.path,
      x: 0,
      y: 0,
      w: 13.333333,
      h: 7.5,
    });

    if (slide.notesPath) {
      const notes = readFileSync(slide.notesPath, "utf-8");
      s.addNotes(notes);
      notesCount++;
    }

    console.log(`Added: ${basename(slide.path)}${slide.notesPath ? " (with notes)" : ""}`);
  }

  await pptx.writeFile({ fileName: output });
  console.log(`Created: ${output}`);
  console.log(`Slides: ${slides.length}`);
  console.log(`Slides with notes: ${notesCount}`);
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
