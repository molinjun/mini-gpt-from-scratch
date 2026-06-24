---
slide: 34
title: "Training Loop: PyTorch View"
pilot: true
---

Create one 16:9 presentation slide image in a dark technical blueprint style.

Visible text to render exactly:
- Training Loop: PyTorch View
- Forward pass makes logits
- Loss compares logits to targets
- Gradients guide AdamW updates
- logits = raw scores
- gradient = direction to improve parameters
- logits = model(x)
- loss = F.cross_entropy(logits.view(-1, vocab), y.view(-1))
- optimizer.zero_grad()
- loss.backward()
- optimizer.step()

Layout:
- Split screen.
- Left side: compact code panel with the five code lines.
- Right side: circular loop diagram: batch -> logits -> loss -> gradients -> AdamW step -> updated weights.
- Add two small definition chips: "logits = raw scores" and "gradient = direction to improve parameters".
- Keep the code readable and not too small.

Visual style:
- Deep navy blueprint grid background.
- Cyan and electric-blue strokes.
- Monospace code in a dark panel with subtle border.
- Small amber accent on "loss.backward()".
- No slide number, no logo, no watermark, no Chinese text.

Avoid:
- More code than listed.
- Tiny unreadable text.
- Decorative UI chrome.
