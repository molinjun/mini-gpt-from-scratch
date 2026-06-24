# Build a Mini-GPT from scratch

Speaker: Molin
Team: ECP CIS

This source is compiled from the talk-ordered files in `docs/`. The deck follows Andrej Karpathy's MicroGPT learning spirit: build a tiny model, inspect every tensor, and use simple examples to understand GPT mechanics.

## Narrative

The talk first explains why Transformer and next-token prediction matter, then uses a tiny MicroGPT-style name generator to make the ideas concrete. From there it builds up from neural-network basics to tokenizer, embedding, Transformer blocks, QKV attention, training, and generation.

## Slide Sequence

1. Build a Mini-GPT from scratch.
2. Transformer Is the Foundation.
3. Why MicroGPT.
4. A Neural Network Is a Function.
5. One Neuron.
6. From Neuron to MLP.
7. Prediction and Loss.
8. Backprop and Update.
9. Names as Tiny Documents.
10. The Next-Token Task.
11. What a Tokenizer Does.
12. Tokenizer Example: I love CIS.
13. Character Tokenizer: Dennis.
14. Token IDs Are Not Meaning.
15. Token Embedding.
16. Position Embedding.
17. The Hidden Stream.
18. MicroGPT Decoder-Only Map.
19. Inside One Transformer Block.
20. Attention Intuition.
21. Q, K, V Roles.
22. Attention Scores.
23. QKV Animation Plan.
24. Causal Mask.
25. Multi-Head Attention.
26. RMSNorm and Residuals.
27. The MLP Inside the Block.
28. Linear Head to Logits.
29. Training Loop in Code.
30. Sampling Loop.
31. What to Inspect.
32. Recap.

## Required Outputs

- Complete PPTX with at least 30 slides.
- Generated slide PNG for every page.
- Speaker notes written as simple read-aloud English.
- Baoyu prompt file for every generated slide image.
