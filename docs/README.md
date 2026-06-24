# Mini-GPT Talk Source

This directory is the single talk-ordered source for the presentation deck. The current deck has 32 slides and follows Andrej Karpathy's MicroGPT style: start small, inspect everything, and explain GPT with a character-level name generator.

## Talk Order

1. [Build a Mini-GPT from scratch](00-cover.md): Open the talk with a simple title page and set the topic.
2. [Why Build a Tiny GPT](01-why-small.md): Explain why a tiny model is useful for learning.
3. [The Demo Target](02-demo-target.md): Make the task concrete before theory.
4. [A Neural Network Is a Function](03-function-view.md): Start from the simplest mental model of a neural network.
5. [One Neuron](04-single-neuron.md): Explain weighted sum and activation with a small example.
6. [From Neuron to MLP](05-mlp-stack.md): Show how many neurons become a small network.
7. [Prediction and Loss](06-prediction-loss.md): Connect scores to probability and loss.
8. [Backprop and Update](07-backprop-update.md): Explain how training changes parameters.
9. [Names as Tiny Documents](08-name-data.md): Show the MicroGPT name-data framing.
10. [The Next-Token Task](09-next-token-task.md): Show shifted input and target windows.
11. [What a Tokenizer Does](10-tokenizer-idea.md): Define tokenizer as the boundary from text to ids.
12. [Tokenizer Example: I love CIS](11-tiktoken-example.md): Compare subword tokenization to character tokenization.
13. [Character Tokenizer: Dennis](12-char-tokenizer-dennis.md): Make the project tokenizer fully concrete.
14. [Token IDs Are Not Meaning](13-ids-are-not-meaning.md): Prevent the common misunderstanding that ids contain meaning.
15. [Token Embedding](14-token-embedding.md): Show embedding lookup as table selection.
16. [Position Embedding](15-position-embedding.md): Explain why order must be added.
17. [The Hidden Stream](16-hidden-stream.md): Introduce the vector stream that moves through the model.
18. [MicroGPT Decoder-Only Map](17-decoder-only-map.md): Show the full MicroGPT path.
19. [Inside One Transformer Block](18-block-map.md): Show the two main jobs inside a block.
20. [Attention Intuition](19-attention-intuition.md): Explain attention before formulas.
21. [Q, K, V Roles](20-qkv-roles.md): Explain query, key, and value with simple words.
22. [Attention Scores](21-attention-scores.md): Show dot product, mask, and softmax as a sequence.
23. [QKV Animation Plan](22-qkv-animation-plan.md): Describe the animation/video sequence requested for QKV.
24. [Causal Mask](23-causal-mask.md): Explain why GPT cannot look right during training.
25. [Multi-Head Attention](24-multi-head.md): Explain why multiple heads are useful.
26. [RMSNorm and Residuals](25-rmsnorm-residual.md): Explain stability pieces in simple terms.
27. [The MLP Inside the Block](26-mlp-in-block.md): Connect the early MLP explanation to the Transformer block.
28. [Linear Head to Logits](27-linear-head.md): Show how hidden vectors become next-token scores.
29. [Training Loop in Code](28-training-loop-code.md): Connect the theory to the training function.
30. [Sampling Loop](29-sampling-loop.md): Explain generation as repeated forward passes.
31. [What to Inspect](30-what-to-inspect.md): Give the audience practical checkpoints.
32. [Recap](31-recap.md): Close with the full connected path.

Keep slide-visible text and speaker notes English-only. Preserve the dark blueprint visual language shown in `share/deck/refs/01-ref-blueprint.png`.
