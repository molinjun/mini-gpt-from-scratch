#!/usr/bin/env python3
"""Verify generated deck assets stay in sync.

The source of truth for slide titles and image slugs is
tools/microgpt_deck_data.mjs. This check makes sure the browser deck and PPTX
actually reference the same generated PNG assets.
"""

from __future__ import annotations

import json
import re
import subprocess
import sys
import zipfile
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]
DECK_DIR = ROOT / "share" / "deck"
HTML = ROOT / "share" / "slides" / "index.html"
PPTX = DECK_DIR / "build-mini-gpt-from-scratch.pptx"


def load_slides() -> list[dict]:
    js = (
        "import('./tools/microgpt_deck_data.mjs').then(m=>"
        "process.stdout.write(JSON.stringify(m.slides)))"
    )
    result = subprocess.run(
        ["node", "-e", js],
        cwd=ROOT,
        check=True,
        text=True,
        stdout=subprocess.PIPE,
    )
    return json.loads(result.stdout)


def slide_filename(slide: dict) -> str:
    return f"{slide['n']:02d}-slide-{slide['slug']}.png"


def prompt_filename(slide: dict) -> str:
    return f"{slide['n']:02d}-slide-{slide['slug']}.md"


def xml_text(text: str) -> str:
    return (
        str(text)
        .replace("&", "&amp;")
        .replace("<", "&lt;")
        .replace(">", "&gt;")
        .replace("'", "&apos;")
        .replace('"', "&quot;")
    )


def html_image_sources() -> list[str]:
    html = HTML.read_text()
    sources = []
    for tag in re.findall(r"<img\b[^>]*>", html):
        match = re.search(r'\bsrc="([^"]+)"', tag)
        if match:
            sources.append(match.group(1).split("?", 1)[0])
    return sources


def verify_files(slides: list[dict], errors: list[str]) -> None:
    for slide in slides:
        image = DECK_DIR / slide_filename(slide)
        prompt = DECK_DIR / "prompts" / prompt_filename(slide)
        if not image.exists():
            errors.append(f"missing image: {image.relative_to(ROOT)}")
        if not prompt.exists():
            errors.append(f"missing prompt: {prompt.relative_to(ROOT)}")
        elif slide_filename(slide) not in prompt.read_text():
            errors.append(f"prompt does not mention expected image: {prompt.relative_to(ROOT)}")


def verify_html(slides: list[dict], errors: list[str]) -> None:
    html = HTML.read_text()
    sources = html_image_sources()
    expected = [f"../deck/{slide_filename(slide)}" for slide in slides]
    if sources != expected:
        errors.append("HTML image order does not match slide data")
        errors.append(f"expected: {expected[:5]} ...")
        errors.append(f"actual:   {sources[:5]} ...")

    for slide in slides:
        if f'data-title="{slide["title"]}"' not in html:
            errors.append(f"HTML missing title: {slide['title']}")
        if f'alt="{slide["title"]}"' not in html:
            errors.append(f"HTML missing alt text: {slide['title']}")

    if re.search(r"[\u3400-\u9fff]", html):
        errors.append("HTML contains CJK text; deck-visible text and notes must be English-only")


def verify_pptx(slides: list[dict], errors: list[str]) -> None:
    if not PPTX.exists():
        errors.append(f"missing PPTX: {PPTX.relative_to(ROOT)}")
        return

    with zipfile.ZipFile(PPTX) as pptx:
        names = pptx.namelist()
        media = sorted(name for name in names if name.startswith("ppt/media/image"))
        if len(media) != len(slides):
            errors.append(f"PPTX media count {len(media)} != slide count {len(slides)}")

        for index, slide in enumerate(slides, start=1):
            rel_name = f"ppt/slides/_rels/slide{index}.xml.rels"
            notes_name = f"ppt/notesSlides/notesSlide{index}.xml"
            media_name = f"ppt/media/image{index}.png"
            if rel_name not in names:
                errors.append(f"PPTX missing slide rels: {rel_name}")
                continue
            rels = pptx.read(rel_name).decode("utf-8")
            if f"../media/image{index}.png" not in rels:
                errors.append(f"PPTX slide {index} does not reference image{index}.png")
            if media_name not in names:
                errors.append(f"PPTX missing media: {media_name}")
            if notes_name not in names:
                errors.append(f"PPTX missing notes: {notes_name}")
                continue
            notes = pptx.read(notes_name).decode("utf-8")
            for block in slide["notes"]:
                expected = (
                    block.replace("&", "&amp;")
                    .replace("<", "&lt;")
                    .replace(">", "&gt;")
                    .replace("'", "&apos;")
                    .replace('"', "&quot;")
                )
                if expected not in notes:
                    errors.append(f"PPTX notes for slide {index} missing: {block}")


def main() -> int:
    slides = load_slides()
    errors: list[str] = []
    verify_files(slides, errors)
    verify_html(slides, errors)
    verify_pptx(slides, errors)

    if errors:
        print("Deck sync check failed:")
        for error in errors:
            print(f"- {error}")
        return 1

    print(f"Deck sync OK: {len(slides)} slides, HTML and PPTX reference shared PNG assets.")
    return 0


if __name__ == "__main__":
    sys.exit(main())
