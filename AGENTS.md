# Repository Guidelines

## Project Structure & Module Organization

This repository is an educational Mini-GPT implementation with a companion teaching deck.

- `src/` contains the core Python source: model code in `model.py`, tokenization in `tokenizer.py`, and training/demo flow in `train.py`.
- `docs/` contains minibook chapters (`01-tokenizer.md` through `06-optimizer.md`). Keep chapter names numbered so reading order remains obvious.
- `share/slides/` contains the browser-based presentation deck: `index.html`, `app.js`, and `style.css`.
- `data/` is reserved for local datasets and token streams. Avoid committing large generated datasets.
- `assets/` is for diagrams and reusable visuals.

## Build, Test, and Development Commands

No package manager, test runner, or build system is currently checked in. Use lightweight commands:

- `python src/train.py` runs the training entry point once it is implemented.
- `python -m py_compile src/*.py` checks Python files for syntax errors.
- `open share/slides/index.html` previews the slide deck in a browser on macOS.
- `python -m http.server 8000 -d share/slides` serves the deck locally if relative assets require HTTP.

## Coding Style & Naming Conventions

Use clear, direct Python with NumPy as the expected numerical dependency. Prefer 4-space indentation, `snake_case` for functions and variables, `PascalCase` for classes, and small functions that map to transformer concepts explained in `docs/`.

For HTML/CSS/JS in `share/slides/`, use semantic sections, descriptive class names, and consistent 2-space indentation.

## Testing Guidelines

There is no formal test suite yet. When adding behavior, create focused tests under a future `tests/` directory using `pytest`, with names like `test_tokenizer.py` and `test_attention_shapes.py`. Cover tensor shapes, tokenizer round-trips, loss calculations, and gradient/update behavior. Until tests exist, run `python -m py_compile src/*.py` and any relevant demo command before submitting changes.

## Commit & Pull Request Guidelines

This repository currently has no commit history, so use simple, imperative commit messages such as `Add tokenizer round-trip tests` or `Implement causal attention`. Pull requests should include a short purpose statement, a summary of changed files, verification commands run, and screenshots for slide or visual changes. Link related issues when available and call out any intentionally skipped tests.

## Agent-Specific Instructions

Keep changes small and aligned with the educational goal. Do not introduce heavyweight frameworks unless the repository direction changes. Preserve the pure-Python/NumPy learning path and update `docs/` alongside source changes when behavior or terminology changes.
