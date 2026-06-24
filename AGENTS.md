# Repository Guidelines

## Project Structure & Module Organization

This repository is an educational Mini-GPT implementation with a companion teaching deck.

- `src/` contains the core Python source: model code in `model.py`, tokenization in `tokenizer.py`, and training/demo flow in `train.py`.
- `docs/` contains the single talk-ordered content source (`00-cover.md` through `18-thank-you.md`). Keep chapter names numbered so reading order remains obvious.
- `docs/` is the single talk-ordered source for the presentation deck. Keep all slide-visible text and speaker notes in English, and avoid recreating separate implementation-note chapters.
- `share/deck/` contains the baoyu slide asset workspace: compiled source, outline, reproducible prompts, generated PNG visuals, and QA screenshots.
- `share/slides/` contains the final browser-based presentation deck. It is currently a single-file deck at `index.html`.
- `data/` is reserved for local datasets and token streams. Avoid committing large generated datasets.
- `assets/` is for diagrams and reusable visuals.

## Build, Test, and Development Commands

No package manager, test runner, or build system is currently checked in. Use lightweight commands:

- `python3 src/train.py` runs the training entry point.
- `python3 -m py_compile src/*.py` checks Python files for syntax errors.
- `python3 -m unittest discover tests` runs the lightweight test suite.
- `open share/slides/index.html` previews the slide deck in a browser on macOS.
- `python3 -m http.server 8000 -d share/slides` serves the deck locally if relative assets require HTTP.

## Coding Style & Naming Conventions

Use clear, direct Python with NumPy as the expected numerical dependency. Prefer 4-space indentation, `snake_case` for functions and variables, `PascalCase` for classes, and small functions that map to transformer concepts explained in `docs/`.

For HTML/CSS/JS in `share/slides/`, use semantic sections, descriptive class names, and consistent 2-space indentation. Preserve the current single-file deck unless there is a clear reason to split files.

## Testing Guidelines

Use focused tests under `tests/` with `unittest` unless the project later adopts a package manager. Cover tensor shapes, tokenizer round-trips, loss calculations, and gradient/update behavior. Run `python3 -m py_compile src/*.py`, `python3 -m unittest discover tests`, and any relevant demo command before submitting changes.

## Commit & Pull Request Guidelines

This repository currently has no commit history, so use simple, imperative commit messages such as `Add tokenizer round-trip tests` or `Implement causal attention`. Pull requests should include a short purpose statement, a summary of changed files, verification commands run, and screenshots for slide or visual changes. Link related issues when available and call out any intentionally skipped tests.

## Agent-Specific Instructions

Keep changes small and aligned with the educational goal. Do not introduce heavyweight frameworks unless the repository direction changes. Preserve the pure-Python/NumPy learning path and update `docs/` alongside source changes when behavior or terminology changes.

## Slide Deck Continuation Instructions

The deck goal is an English-only technical presentation titled **Build a Mini-GPT from Scratch**. It teaches GPT and Transformer mechanics through a tiny character-level name generator inspired by Karpathy's microgpt and the roughly 32K-name makemore dataset.

- Use `docs/` as the source of truth for slide outline, key points, speaker notes, and visual plans. Do not recreate a separate `docs/talk/` tree.
- Use `baoyu-slide-deck` for slide image planning and prompt workflow. Save every final image prompt under `share/deck/prompts/` before generating images.
- Use Codex `imagegen` for raster image generation when a project-bound diagram or visual asset is needed, then copy the selected image into `share/deck/`.
- Keep generated images as visual aids. Keep titles, bullets, equations, formulas, and code in HTML for crisp rendering.
- Follow the `06 / Attention` slide visual language across the entire deck: dark blueprint background, navy grid, cyan/electric-blue accents, high-contrast text, technical diagram styling, and 8px-or-less rounded panels. Do not reintroduce light keynote-style slides.
- Reuse the existing generated PNG style in `share/deck/`: `01-slide-training-flow.png`, `02-slide-tokenizer-comparison.png`, `03-slide-transformer-overview-v2.png`, and `04-slide-attention-mechanism.png`.
- All slide-visible content and speaker notes must be English only. Do not introduce Chinese text into `share/slides/index.html`, `docs/`, or new generated-image prompts.
- The talk and source explain the teaching version with `RMSNorm` + `ReLU`.
- After slide edits, verify with a browser check when possible: slide count, keyboard navigation, presenter view, image loading, and no viewport overflow at desktop/presenter sizes.
