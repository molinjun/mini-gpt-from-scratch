# Mini-GPT Talk Source

This directory is the single content source for the presentation deck. The order follows the talk narrative: Cover -> Goals -> Neural Network Basics -> Tokenizer -> Embedding -> Transformer -> Linear & Norm -> Softmax Output -> Recap.

## Talk Order

1. [Cover](00-cover.md): title, subtitle, speaker, and session context.
2. [Goals](01-goals.md): train a character-level GPT on roughly 3k English names, then generate new names.
3. [Neural Network Basics](02-neural-network-basics.md): function, neuron, MLP, loss, backpropagation, and Adam at a talk level.
4. [Tokenizer](03-tokenizer.md): raw text becomes token ids, with a high-level ChatGPT-style tokenizer comparison.
5. [Embedding](04-embedding.md): token and position ids become vectors.
6. [Transformer](05-transformer.md): decoder-only GPT, Q/K/V attention, causal mask, multi-head attention, MLP, and residual paths.
7. [Linear & Norm](06-linear-norm.md): linear layers, current `LayerNorm` + `GELU`, and target deck variant `RMSNorm` + `ReLU`.
8. [Softmax Output](07-softmax-output.md): logits, softmax, cross-entropy, and generation.
9. [Recap](08-recap.md): names -> tokenizer -> ids -> embedding -> Transformer -> logits -> loss/generation.
10. [References](09-references.md): Karpathy, Attention Is All You Need, OpenAI tiktoken material, and repo paths.
11. [QA](10-qa.md): discussion prompts.
12. [Thank You](11-thank-you.md): closing and next actions.

Keep these files presentation-oriented. Source-code mechanics may be referenced as anchors, but avoid reintroducing separate implementation chapters such as tokenizer, embedding, attention, autograd, or optimizer notes.

## Deck Asset Workflow

Generated slide visuals live under `share/deck/`. Keep prompt files there before generating raster images, and keep authoritative text in HTML rather than inside generated images when crispness matters.

The HTML deck at `share/slides/index.html` should stay English-only and use the dark blueprint style from the `06 / Attention` slide.
