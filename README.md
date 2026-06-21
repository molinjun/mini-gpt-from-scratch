# mini-gpt-from-scratch

> **A guide to LLM internals. Build a generative Transformer from scratch.**

Languages: **English** | [中文](README.zh-CN.md)

---

This repository contains a minimalist, PyTorch-free educational implementation of a generative Transformer (GPT). By stripping away heavy deep learning frameworks, this project models the entire forward pass, autograd, and training loop using nothing but **pure Python and NumPy**.

It is designed as a dual-purpose project: a **Minibook** for line-by-line code anatomy, and a **Designer-Grade Slide Deck** built with HTML-native aesthetics for technical sharing.

## Project Structure

```text
mini-gpt-from-scratch/
├── data/              # Training datasets and token streams
├── assets/            # Minimalist technical architecture diagrams
├── docs/              # Minibook: line-by-line anatomy chapters (01-06)
├── src/               # Core source code implemented in pure NumPy
│   ├── tokenizer.py   # Character-level / token-level mappings
│   ├── model.py       # GPT architecture & manual backpropagation
│   └── train.py       # Local training loop & optimization
└── share/
    └── slides/        # HTML-native presentation deck
```

## Quick Start

```bash
python -m py_compile src/*.py
python src/train.py
```

To preview the slide deck on macOS:

```bash
open share/slides/index.html
```

If relative assets need an HTTP server:

```bash
python -m http.server 8000 -d share/slides
```

## Contributing

See [CONTRIBUTING.md](CONTRIBUTING.md) for development guidelines, local checks, and commit message conventions.
