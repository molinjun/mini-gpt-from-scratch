# Baoyu Slide Deck Outline

Style preset: `dark-blueprint`
Audience: beginner-to-intermediate engineers, with Chinese listeners in mind
Language: English only for slide-visible text and speaker notes
Aspect ratio: 16:9
Primary delivery: PPTX with speaker notes, plus source prompts under `share/deck/prompts/`
Content source: `docs/00-cover.md` through `docs/31-recap.md`
Reference image: `share/deck/refs/01-ref-blueprint.png`

<STYLE_INSTRUCTIONS>
Design aesthetic: dark technical blueprint, inspired by the provided reference image.
Background: deep navy to near-black grid, subtle engineering paper texture, no light theme.
Palette: cyan #55d7ff, electric blue #2f80ed, deep navy #07182e, teal accents, small amber highlights only for warnings or targets.
Typography: crisp sans-serif, high contrast, clear labels, all English text, no Chinese text.
Visual elements: precise rectangular panels, 8px or smaller corner radius, thin technical strokes, orthogonal arrows, matrix cells, tensor labels, small code-like tags.
Density: detailed and educational, but each slide must have one main visual message.
Style rules: no slide numbers, no logos, no decorative blobs, no stock photos, no blurry text, no extra unexplained labels.
Reference style image: share/deck/refs/01-ref-blueprint.png
</STYLE_INSTRUCTIONS>

## Slide Plan

| # | Title | Type | Layout | Visual Asset |
|---|---|---|---|---|
| 01 | Build a Mini-GPT from scratch | Cover | simple-title-cover | 01-slide-cover.png |
| 02 | Why Build a Tiny GPT | Motivation | binary-comparison | 02-slide-why-small.png |
| 03 | The Demo Target | Outcome | linear-progression | 03-slide-demo-target.png |
| 04 | A Neural Network Is a Function | Neural Network Basics | linear-progression | 04-slide-function-view.png |
| 05 | One Neuron | Neural Network Basics | hub-spoke | 05-slide-single-neuron.png |
| 06 | From Neuron to MLP | Neural Network Basics | hierarchical-layers | 06-slide-mlp-stack.png |
| 07 | Prediction and Loss | Training Basics | dashboard | 07-slide-prediction-loss.png |
| 08 | Backprop and Update | Training Basics | circular-flow | 08-slide-backprop-update.png |
| 09 | Names as Tiny Documents | Data | two-columns | 09-slide-name-data.png |
| 10 | The Next-Token Task | Core Idea | linear-progression | 10-slide-next-token-task.png |
| 11 | What a Tokenizer Does | Tokenizer | linear-progression | 11-slide-tokenizer-idea.png |
| 12 | Tokenizer Example: I love CIS | Tokenizer | binary-comparison | 12-slide-tiktoken-example.png |
| 13 | Character Tokenizer: Dennis | Tokenizer | dashboard | 13-slide-char-tokenizer-dennis.png |
| 14 | Token IDs Are Not Meaning | Embedding | quote-callout | 14-slide-ids-are-not-meaning.png |
| 15 | Token Embedding | Embedding | comparison-matrix | 15-slide-token-embedding.png |
| 16 | Position Embedding | Embedding | linear-progression | 16-slide-position-embedding.png |
| 17 | The Hidden Stream | Embedding | linear-progression | 17-slide-hidden-stream.png |
| 18 | MicroGPT Decoder-Only Map | Transformer | hierarchical-layers | 18-slide-decoder-only-map.png |
| 19 | Inside One Transformer Block | Transformer | hierarchical-layers | 19-slide-block-map.png |
| 20 | Attention Intuition | Attention | hub-spoke | 20-slide-attention-intuition.png |
| 21 | Q, K, V Roles | Attention | three-columns | 21-slide-qkv-roles.png |
| 22 | Attention Scores | Attention | dashboard | 22-slide-attention-scores.png |
| 23 | QKV Animation Plan | Attention | winding-roadmap | 23-slide-qkv-animation-plan.png |
| 24 | Causal Mask | Attention | comparison-matrix | 24-slide-causal-mask.png |
| 25 | Multi-Head Attention | Attention | three-columns | 25-slide-multi-head.png |
| 26 | RMSNorm and Residuals | Transformer | linear-progression | 26-slide-rmsnorm-residual.png |
| 27 | The MLP Inside the Block | Transformer | hierarchical-layers | 27-slide-mlp-in-block.png |
| 28 | Linear Head to Logits | Output | dashboard | 28-slide-linear-head.png |
| 29 | Training Loop in Code | Implementation | split-screen | 29-slide-training-loop-code.png |
| 30 | Sampling Loop | Implementation | linear-progression | 30-slide-sampling-loop.png |
| 31 | What to Inspect | Engineering | dashboard | 31-slide-what-to-inspect.png |
| 32 | Recap | Closing | linear-progression | 32-slide-recap.png |

## Visual Direction

- Every slide image must be generated through the baoyu slide prompt workflow.
- Save every final prompt under `share/deck/prompts/` before image generation.
- Match the reference image: dark navy blueprint grid, cyan/electric-blue linework, crisp technical panels, high-contrast text, and precise tensor diagrams.
- Keep visible text short and English-only. Put the full explanation in speaker notes.
- Use running examples: `I love CIS`, `Dennis`, `den -> dennis`, and MicroGPT-style name generation.
