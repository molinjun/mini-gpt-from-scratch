# 02 Why MicroGPT

## Slide Goal

Introduce the learning project: use a tiny MicroGPT-style name generator so the Transformer ideas become concrete.

## Key Points

- Tiny, inspectable GPT-style project
- Inspired by Andrej Karpathy and trained on names
- Full path: tokens -> blocks -> logits -> sampling

## Source Links

- MicroGPT code: karpathy.ai/microgpt.html (https://karpathy.ai/microgpt.html)
- makemore: github.com/karpathy/makemore (https://github.com/karpathy/makemore)

## Speaker Notes

If we only talk about concepts, Transformer can feel too abstract.

So we will use a small project and build it step by step. The project is inspired by Andrej Karpathy's MicroGPT code and makemore style.

The model trains on about 32K names. After training, it can generate new name-like strings.

The source links are on the slide, so you can explore the original code and dataset later.

The task is small, but it contains the same path: tokens, Transformer blocks, logits, loss, and sampling.

## Visual Idea

Dark-blueprint slide with one clear information panel and one project pipeline. Show a 32K names dataset flowing into a small MicroGPT training loop, then output generated name samples. Include compact source chips for MicroGPT code and makemore.

## Code Anchor

- src/tokenizer.py
- src/model.py
- src/train.py
