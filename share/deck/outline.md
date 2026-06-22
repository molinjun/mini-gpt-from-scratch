# Baoyu Slide Deck Outline

Style preset: `blueprint`
Audience: beginner-to-intermediate engineers
Language: English only for all slide-visible text and speaker notes
Aspect ratio: 16:9
Primary delivery: HTML deck in `share/slides/index.html`
Content source: `docs/00-cover.md` through `docs/11-thank-you.md`

## Slide Plan

| # | Title | Type | Layout | Visual Asset |
|---|---|---|---|---|
| 01 | Build a Mini-GPT from Scratch | Cover | title + metadata | none |
| 02 | Goal: train a name generator | Concept | text + pipeline visual | `01-slide-training-flow.png` |
| 03 | Neural network basics | Concept | function-to-transformer ladder | none |
| 04 | Tokenizer: text becomes token ids | Explainer | comparison | `02-slide-tokenizer-comparison.png` |
| 05 | Embedding: ids become vectors | Explainer | matrix lookup | none |
| 06 | Transformer architecture overview | Deep dive | architecture map | `03-slide-transformer-overview-v2.png` |
| 07 | Attention: Q/K/V and causal mask | Deep dive | mechanism diagram | `04-slide-attention-mechanism.png` |
| 08 | Multi-head + MLP block | Deep dive | split/merge + compute | HTML/CSS diagram |
| 09 | Linear & Norm | Technical | formulas + comparison | none |
| 10 | Softmax output | Technical | logits to probability | none |
| 11 | Recap / References / QA | Summary | pipeline + links | none |
| 12 | Thank You | Closing | title + generated names | none |

## Prompt Rules

- Generated images should be visual aids, not text-heavy slides.
- Avoid dense labels and paragraphs in images.
- Use clear geometric diagrams, dark blueprint background, cyan/blue accent lines, and high contrast.
- Keep all generated-image text in English only.
- Preserve the `06 / Attention` slide palette and blueprint style across the full HTML deck.
- Authoritative text remains in HTML whenever crispness matters.
