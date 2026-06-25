# Mini-GPT Deck V2 Talk Flow

This deck is a technical teaching talk. The central idea is:

> Build a tiny character-level GPT so the audience can see every major Transformer concept in a concrete path.

## Narrative Arc

1. Start with the big picture: Transformer is the architecture, and GPT predicts the next token.
2. Make the problem small: use a MicroGPT-inspired name generator instead of a production-scale model.
3. Build the minimum neural-network foundation: parameters, MLP, ReLU, loss, gradients, and AdamW.
4. Turn text into model input: tokenizer, character IDs, embeddings, position embeddings, and hidden vectors.
5. Open the Transformer block: attention, Q/K/V, scores, softmax, causal masking, multi-head attention, RMSNorm, residuals, and the MLP block.
6. Train and sample: next-token loss, training loop, loss curve, autoregressive generation, sampling, and temperature.
7. Recap the full path with `Dennis`, then point the audience to code and references.

## Section Map

| Slides | Section | Purpose |
|---|---|---|
| 01-04 | Opening and Why Mini-GPT | Establish the goal, the Transformer context, and why a tiny name generator is useful. |
| 05-11 | Neural Network Basics | Give just enough training intuition to understand how the Transformer learns. |
| 12-22 | Tokenizer and Embedding | Show how strings become IDs, IDs become vectors, and vectors become the hidden stream. |
| 23-32 | Transformer Architecture | Explain the decoder-only block and each core mechanism in the forward pass. |
| 33-38 | Training and Inference | Connect the architecture to training, sampling, and generation behavior. |
| 39-42 | Recap and Closing | Reassemble the whole path, show where to inspect the code, and close with references. |

## Presenter Intent

- Keep the talk practical and concrete.
- Use `Dennis` as the main running example.
- Avoid turning the neural-network section into a full neural-network course.
- Keep every new term attached to a visible diagram or short definition.
- Read the speaker notes naturally, but feel free to pause at diagrams and point to the flow.

## Transition Guide

- Slide 04 to 05: "Before we inspect the Transformer, we need a small training foundation."
- Slide 11 to 12: "Now that we know how parameters learn, let's look at what the model actually receives."
- Slide 22 to 23: "We now have hidden vectors. The Transformer block is what updates them."
- Slide 32 to 33: "That completes the forward path. Now we need to train it."
- Slide 38 to 39: "Let's put all the pieces back together with one example."

## Final Deliverables

- HTML deck: `share/slides/index.html`
- Final PPTX: `share/deck/build-mini-gpt-from-scratch.pptx`
- V2 workspace HTML: `share/deck/v2/index.html`
- V2 workspace PPTX: `share/deck/v2/build-mini-gpt-from-scratch-v2.pptx`
- Speaker notes source: `share/deck/v2/speaker-notes.md`
- Talk-ordered source: `docs/00-cover.md` through `docs/41-qanda-thank-you.md`
