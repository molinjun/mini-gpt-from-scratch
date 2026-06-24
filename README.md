# mini-gpt-from-scratch

> **A guide to LLM internals. Build a generative Transformer from scratch.**

Languages: **English** | [中文](README.zh-CN.md)

---

This repository contains a minimalist, PyTorch-free educational implementation of a generative Transformer (GPT). By stripping away heavy deep learning frameworks, this project models the forward pass, autograd, and training loop using nothing but **pure Python and NumPy**.

It is designed as a dual-purpose project: an inspectable **Mini-GPT implementation** and a **technical slide deck** for sharing Transformer mechanics through a tiny name generator inspired by Karpathy's microgpt.

## Project Structure

```text
mini-gpt-from-scratch/
├── data/              # Optional local datasets such as names.txt
├── assets/            # Minimalist technical architecture diagrams
├── docs/              # Talk-ordered slide source (00-24)
├── src/               # Core source code implemented in pure NumPy
│   ├── tokenizer.py   # Character tokenizer plus BOS delimiter support
│   ├── model.py       # GPT architecture with RMSNorm, ReLU, and autograd
│   └── train.py       # Name training loop, AdamW, and sampling
└── share/
    └── slides/        # HTML-native presentation deck
```

## Quick Start

```bash
python3 -m py_compile src/*.py
python3 -m unittest discover tests
python3 src/train.py
```

To preview the slide deck on macOS:

```bash
open share/slides/index.html
```

If relative assets need an HTTP server:

```bash
python3 -m http.server 8000 -d share/slides
```

## Contributing

See [CONTRIBUTING.md](CONTRIBUTING.md) for development guidelines, local checks, and commit message conventions.
