#!/usr/bin/env python3
"""Verify the promoted Mini-GPT V2 deck assets stay in sync."""

from __future__ import annotations

import html
import re
import sys
import zipfile
import xml.etree.ElementTree as ET
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]
DECK_DIR = ROOT / "share" / "deck"
V2_DIR = DECK_DIR / "v2"
OUTLINE = V2_DIR / "outline.md"
NOTES = V2_DIR / "speaker-notes.md"
FORMAL_HTML = ROOT / "share" / "slides" / "index.html"
V2_HTML = V2_DIR / "index.html"
FORMAL_PPTX = DECK_DIR / "build-mini-gpt-from-scratch.pptx"
V2_PPTX = V2_DIR / "build-mini-gpt-from-scratch-v2.pptx"
DOCS_DIR = ROOT / "docs"

STALE_TEXT_PATTERNS = [
    "I love CIS",
    "CIS love I",
    "Tokenizer Example: I love CIS",
    "QKV uses `I love CIS`",
    "QKV Animation Plan",
    "50256",
    "100000",
]


def load_slides(errors: list[str]) -> list[dict]:
    if not OUTLINE.exists():
        errors.append(f"missing outline: {OUTLINE.relative_to(ROOT)}")
        return []

    slides: list[dict] = []
    row_pattern = re.compile(r"^\| (\d{2}) \| ([^|]+?) \| ([^|]+?) \| ([^|]+?) \|$")
    for line in OUTLINE.read_text().splitlines():
        match = row_pattern.match(line)
        if not match:
            continue
        number, title, section, image = (part.strip() for part in match.groups())
        slides.append(
            {
                "n": int(number),
                "label": number,
                "title": title,
                "section": section,
                "image": image,
            }
        )

    expected_numbers = list(range(1, len(slides) + 1))
    actual_numbers = [slide["n"] for slide in slides]
    if actual_numbers != expected_numbers:
        errors.append(f"outline slide numbers are not contiguous: {actual_numbers}")
    return slides


def parse_attrs(tag: str) -> dict[str, str]:
    return {
        key: html.unescape(value)
        for key, value in re.findall(r'([:\w-]+)="([^"]*)"', tag)
    }


def parse_notes(errors: list[str]) -> dict[int, dict]:
    if not NOTES.exists():
        errors.append(f"missing speaker notes: {NOTES.relative_to(ROOT)}")
        return {}

    notes: dict[int, dict] = {}
    pattern = re.compile(
        r"^## (?P<n>\d{2})\. (?P<title>.*?)\n\n"
        r"Section: (?P<section>.*?)\n\n"
        r"(?P<body>.*?)(?=^## \d{2}\. |\Z)",
        re.M | re.S,
    )
    for match in pattern.finditer(NOTES.read_text()):
        notes[int(match.group("n"))] = {
            "title": match.group("title").strip(),
            "section": match.group("section").strip(),
            "body": match.group("body").strip(),
        }
    return notes


def xml_text(source: bytes) -> str:
    root = ET.fromstring(source)
    return "".join(root.itertext())


def prompt_path(slide: dict) -> Path:
    return V2_DIR / "prompts" / Path(slide["image"]).with_suffix(".md").name


def doc_path(slide: dict) -> Path:
    index = f"{slide['n'] - 1:02d}"
    if slide["n"] == 1:
        slug = "cover"
    else:
        slug = Path(slide["image"]).stem.replace(f"{slide['label']}-slide-", "", 1)
    return DOCS_DIR / f"{index}-{slug}.md"


def verify_files(slides: list[dict], errors: list[str]) -> None:
    for slide in slides:
        image = V2_DIR / slide["image"]
        prompt = prompt_path(slide)
        doc = doc_path(slide)

        if not image.exists():
            errors.append(f"missing image: {image.relative_to(ROOT)}")
        if not prompt.exists():
            errors.append(f"missing prompt: {prompt.relative_to(ROOT)}")
        else:
            prompt_text = prompt.read_text()
            if f'output: "{slide["image"]}"' not in prompt_text:
                errors.append(f"prompt missing output filename: {prompt.relative_to(ROOT)}")
            if slide["title"] not in prompt_text:
                errors.append(f"prompt missing slide title: {prompt.relative_to(ROOT)}")
        if not doc.exists():
            errors.append(f"missing docs source: {doc.relative_to(ROOT)}")
        else:
            doc_text = doc.read_text()
            if slide["title"] not in doc_text:
                errors.append(f"docs source missing title: {doc.relative_to(ROOT)}")
            if f"share/deck/v2/{slide['image']}" not in doc_text:
                errors.append(f"docs source missing target image: {doc.relative_to(ROOT)}")


def verify_notes(slides: list[dict], notes: dict[int, dict], errors: list[str]) -> None:
    if len(notes) != len(slides):
        errors.append(f"speaker notes count {len(notes)} != slide count {len(slides)}")

    for slide in slides:
        note = notes.get(slide["n"])
        if not note:
            errors.append(f"missing speaker notes for slide {slide['label']}")
            continue
        if note["title"] != slide["title"]:
            errors.append(
                f"speaker note title mismatch for slide {slide['label']}: "
                f"{note['title']} != {slide['title']}"
            )
        if note["section"] != slide["section"]:
            errors.append(
                f"speaker note section mismatch for slide {slide['label']}: "
                f"{note['section']} != {slide['section']}"
            )
        if not note["body"]:
            errors.append(f"empty speaker notes for slide {slide['label']}")


def html_articles(path: Path, errors: list[str]) -> list[dict]:
    if not path.exists():
        errors.append(f"missing HTML: {path.relative_to(ROOT)}")
        return []

    text = path.read_text()
    articles: list[dict] = []
    pattern = re.compile(r"(<article\b[^>]*>)(.*?</article>)", re.S)
    for article_tag, body in pattern.findall(text):
        img_match = re.search(r"(<img\b[^>]*>)", body)
        articles.append(
            {
                "article": parse_attrs(article_tag),
                "img": parse_attrs(img_match.group(1)) if img_match else {},
            }
        )
    return articles


def verify_html(
    path: Path,
    slides: list[dict],
    notes: dict[int, dict],
    image_prefix: str,
    errors: list[str],
) -> None:
    text = path.read_text() if path.exists() else ""
    articles = html_articles(path, errors)
    sources = [entry["img"].get("src", "").split("?", 1)[0] for entry in articles]
    expected_sources = [f"{image_prefix}{slide['image']}" for slide in slides]

    if sources != expected_sources:
        errors.append(f"{path.relative_to(ROOT)} image order does not match v2 outline")
        errors.append(f"expected first: {expected_sources[:3]}")
        errors.append(f"actual first:   {sources[:3]}")

    if len(articles) != len(slides):
        errors.append(f"{path.relative_to(ROOT)} article count {len(articles)} != {len(slides)}")

    for slide, entry in zip(slides, articles):
        note = notes.get(slide["n"], {})
        title = entry["article"].get("data-title")
        body = entry["article"].get("data-notes")
        alt = entry["img"].get("alt")
        if title != slide["title"]:
            errors.append(f"{path.relative_to(ROOT)} title mismatch for slide {slide['label']}")
        if alt != slide["title"]:
            errors.append(f"{path.relative_to(ROOT)} alt mismatch for slide {slide['label']}")
        if note and body != note["body"]:
            errors.append(f"{path.relative_to(ROOT)} notes mismatch for slide {slide['label']}")

    for action in ("prev", "next", "presenter", "notes"):
        if f'data-action="{action}"' not in text:
            errors.append(f"{path.relative_to(ROOT)} missing {action} control")
    if "function openPresenter()" not in text:
        errors.append(f"{path.relative_to(ROOT)} missing presenter window script")
    if 'event.key.toLowerCase() === "p"' not in text:
        errors.append(f"{path.relative_to(ROOT)} missing presenter keyboard shortcut")
    if "document.write(" in text:
        errors.append(f"{path.relative_to(ROOT)} uses document.write in presenter script")
    for script in re.findall(r"<script>(.*?)</script>", text, re.S):
        if "</body>" in script or "</html>" in script:
            errors.append(f"{path.relative_to(ROOT)} has closing page tags inside a script block")
    if re.search(r"[\u3400-\u9fff]", text):
        errors.append(f"{path.relative_to(ROOT)} contains CJK text")


def verify_pptx(path: Path, slides: list[dict], notes: dict[int, dict], errors: list[str]) -> None:
    if not path.exists():
        errors.append(f"missing PPTX: {path.relative_to(ROOT)}")
        return

    with zipfile.ZipFile(path) as pptx:
        names = set(pptx.namelist())
        slide_xml = sorted(name for name in names if re.fullmatch(r"ppt/slides/slide\d+\.xml", name))
        notes_xml = sorted(
            name for name in names if re.fullmatch(r"ppt/notesSlides/notesSlide\d+\.xml", name)
        )
        media = sorted(name for name in names if re.fullmatch(r"ppt/media/image-\d+-1\.png", name))

        if len(slide_xml) != len(slides):
            errors.append(f"{path.relative_to(ROOT)} slide count {len(slide_xml)} != {len(slides)}")
        if len(notes_xml) != len(slides):
            errors.append(f"{path.relative_to(ROOT)} notes count {len(notes_xml)} != {len(slides)}")
        if len(media) != len(slides):
            errors.append(f"{path.relative_to(ROOT)} media count {len(media)} != {len(slides)}")

        for slide in slides:
            index = slide["n"]
            rel_name = f"ppt/slides/_rels/slide{index}.xml.rels"
            media_name = f"ppt/media/image-{index}-1.png"
            notes_name = f"ppt/notesSlides/notesSlide{index}.xml"

            if rel_name not in names:
                errors.append(f"{path.relative_to(ROOT)} missing slide rels: {rel_name}")
            else:
                rels = pptx.read(rel_name).decode("utf-8")
                if f"../media/image-{index}-1.png" not in rels:
                    errors.append(f"{path.relative_to(ROOT)} slide {index} missing image rel")
                if f"../notesSlides/notesSlide{index}.xml" not in rels:
                    errors.append(f"{path.relative_to(ROOT)} slide {index} missing notes rel")
            if media_name not in names:
                errors.append(f"{path.relative_to(ROOT)} missing media: {media_name}")
            if notes_name not in names:
                errors.append(f"{path.relative_to(ROOT)} missing notes: {notes_name}")
            else:
                note = notes.get(index, {})
                note_text = xml_text(pptx.read(notes_name))
                if note and note["body"] not in note_text:
                    errors.append(f"{path.relative_to(ROOT)} notes text mismatch for slide {index}")


def verify_language_and_stale_text(errors: list[str]) -> None:
    active_files = [
        DECK_DIR / "generation-rules.md",
        V2_DIR / "batch-plan.md",
        V2_DIR / "talk-flow.md",
        V2_HTML,
        FORMAL_HTML,
        NOTES,
        *sorted((V2_DIR / "prompts").glob("*.md")),
        *sorted(DOCS_DIR.glob("*.md")),
    ]

    for path in active_files:
        if not path.exists():
            continue
        text = path.read_text()
        for stale in STALE_TEXT_PATTERNS:
            if stale in text:
                errors.append(f"stale text `{stale}` in {path.relative_to(ROOT)}")
        if re.search(r"[\u3400-\u9fff]", text):
            errors.append(f"CJK text in active deck source: {path.relative_to(ROOT)}")


def main() -> int:
    errors: list[str] = []
    slides = load_slides(errors)
    notes = parse_notes(errors)

    if slides:
        verify_files(slides, errors)
        verify_notes(slides, notes, errors)
        verify_html(V2_HTML, slides, notes, "", errors)
        verify_html(FORMAL_HTML, slides, notes, "../deck/v2/", errors)
        verify_pptx(V2_PPTX, slides, notes, errors)
        verify_pptx(FORMAL_PPTX, slides, notes, errors)
    verify_language_and_stale_text(errors)

    if errors:
        print("Deck sync check failed:")
        for error in errors:
            print(f"- {error}")
        return 1

    print(
        f"Deck sync OK: {len(slides)} V2 slides, prompts, docs, HTML, notes, "
        "Presenter controls, and PPTX exports are in sync."
    )
    return 0


if __name__ == "__main__":
    sys.exit(main())
