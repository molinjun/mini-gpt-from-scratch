# Mini-GPT Deck V3 Talk Flow

This deck is a technical teaching talk. The central idea is:

> Build a tiny character-level GPT so the audience can see every major Transformer concept in a concrete path.

## Narrative Arc

1. Start with the big picture: Transformer is the architecture, and GPT predicts the next token.
2. Make the problem small: use a MicroGPT-inspired name generator instead of a production-scale model.
3. Turn text into model input: tokenizer, character IDs, embeddings, position embeddings, and hidden vectors.
4. Build the minimum neural-network foundation: parameters, MLP, ReLU, loss, gradients, and AdamW.
5. Open the Transformer block: attention, Q/K/V, scores, softmax, causal masking, multi-head attention, RMSNorm, residuals, and the MLP block.
6. Train and sample: next-token loss, training loop, loss curve, autoregressive generation, sampling, and temperature.
7. Recap the full path with `Dennis`, then point the audience to code and references.

## Section Map

| Slides | Section | Purpose |
|---|---|---|
| 01-04 | Opening and Why Mini-GPT | Establish the goal, the Transformer context, and why a tiny name generator is useful. |
| 05-11 | Tokenizer and Embedding | Show why text needs tokenization, how names become IDs, and how IDs become the hidden stream. |
| 12-18 | Neural Network Basics | Give just enough training intuition to understand how the Transformer learns. |
| 19-28 | Transformer Architecture | Explain the decoder-only block and each core mechanism in the forward pass. |
| 29-34 | Training and Inference | Connect the architecture to training, sampling, and generation behavior. |
| 35-38 | Recap and Closing | Reassemble the whole path, show where to inspect the code, and close with references. |

## Presenter Intent

- Keep the talk practical and concrete.
- Use `Dennis` as the main running example.
- Avoid turning the neural-network section into a full neural-network course.
- Keep every new term attached to a visible diagram or short definition.
- Read the speaker notes naturally, but feel free to pause at diagrams and point to the flow.

## Transition Guide

- Slide 04 to 05: "Now let's start with the first problem: text has to become numbers."
- Slide 11 to 12: "Before we open the Transformer block, we need a small training foundation."
- Slide 18 to 19: "We now have token vectors, and we know the training idea. The Transformer block is what updates them."
- Slide 28 to 29: "That completes the forward path. Now we need to train it."
- Slide 34 to 35: "Let's put all the pieces back together with one example."

## Final Deliverables

- HTML deck: `share/slides/index.html`
- Final PPTX: `share/deck/build-mini-gpt-from-scratch.pptx`
- V3 workspace HTML: `share/deck/v3/index.html`
- V3 workspace PPTX: `share/deck/v3/build-mini-gpt-from-scratch-v3.pptx`
- Speaker notes source: `share/deck/v3/speaker-notes.md`
- Talk-ordered source: update `docs/` after V3 order is final.
