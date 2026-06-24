# Contributing

Thanks for helping improve `mini-gpt-from-scratch`. This project is meant to stay small, readable, and educational, so the best contributions make the implementation easier to understand without hiding the mechanics behind heavy abstractions.

## What to Contribute

- Improve the pure Python / NumPy implementation in `src/`.
- Add focused minibook explanations in `docs/`.
- Refine the teaching slide deck in `share/slides/`.
- Add small tests for tokenizer behavior, tensor shapes, loss calculations, gradients, or optimizer updates.
- Fix wording, diagrams, comments, or examples that make the learning path clearer.

## Development Guidelines

- Keep changes focused and easy to review.
- Preserve the pure Python and NumPy learning path.
- Avoid adding heavyweight frameworks unless the project direction changes.
- Prefer small functions that map clearly to Transformer concepts.
- Update `docs/` when source behavior, terminology, or learning flow changes.
- Avoid committing large datasets or generated token streams under `data/`.

## Local Checks

Run the lightweight syntax and test checks before submitting changes:

```bash
python3 -m py_compile src/*.py
python3 -m unittest discover tests
```

Preview the slide deck on macOS:

```bash
open share/slides/index.html
```

Or serve it locally:

```bash
python3 -m http.server 8000 -d share/slides
```

## Commit Messages

Use short, imperative commit messages. The preferred format is:

```text
feat(scope): summary
fix(scope): summary
docs(scope): summary
test(scope): summary
```

Examples:

```text
feat(model): implement causal attention
docs(readme): add Chinese translation
test(tokenizer): add round-trip coverage
```

## Pull Requests

Pull requests should include:

- A short purpose statement.
- A summary of changed files.
- Verification commands that were run.
- Screenshots for slide or visual changes.
- Any intentionally skipped tests or follow-up work.
