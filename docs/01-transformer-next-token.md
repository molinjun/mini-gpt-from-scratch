# 01 Transformer Is the Foundation

## Slide Goal

Set the technical context: Transformer is the main architecture behind many modern AI models, and GPT-style models predict the next token.

## Key Points

- Modern AI models share this architecture
- Attention Is All You Need, 2017
- GPT reads context and predicts the next token

## Source Links

- Paper: arxiv.org/abs/1706.03762 (https://arxiv.org/abs/1706.03762)

## Speaker Notes

Before we build anything, let us set the map.

Many modern AI models are based on the Transformer architecture. The Transformer was introduced in the paper Attention Is All You Need in 2017.

For a GPT-style model, the main job is simple to say: read the tokens so far, and predict the next token.

The paper link is on the slide, so you can find the original source after the talk.

In this talk, we will see the pieces that make this possible.

## Visual Idea

Dark-blueprint slide with one clear information panel and one visual flow. Show Attention Is All You Need as a paper card, connect it to a compact Transformer block, feed context token boxes into the block, and show one highlighted next-token output. Include a small source chip for the paper URL.

## Code Anchor

- src/model.py
- src/train.py
