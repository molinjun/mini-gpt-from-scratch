# Mini-GPT from Scratch Master Plan

Global rule: every chapter ships three artifacts together: `src/` mechanics, `docs/0N-*.md` explanation, and one matching slide section using Cyber Blue tokens:

```css
--bg-color: #0d0e15;
--text-color: #f5f8ff;
--accent-color: #2f80ed;
--meta-color: #8a93a6;
--border-color: #1c2333;
```

Each teaching slide uses a `4.5fr 5.5fr` asymmetric grid: left column for conceptual bullets, right column for a compact code snapshot.

## Chapter 01: Tokenizer

### Build Layer Goal

Implement `src/tokenizer.py`.

- `CharTokenizer`
- `fit(text)`
- `encode(text) -> list[int]`
- `decode(ids) -> str`
- `vocab_size`
- `save(path)` / `load(path)`

Mathematics/mechanics:

- Build deterministic symbol-to-index and index-to-symbol maps.
- Convert raw Unicode characters into integer token streams.
- Preserve round-trip identity: `decode(encode(x)) == x`.
- Produce training pairs later consumed as `x[t] -> x[t+1]`.

### Guide Layer Goal

Write `docs/01-tokenizer.md`.

- Tokens as discrete coordinates into a learned vector table.
- Why language modeling begins as next-token prediction.
- Difference between raw text, token ids, vocabulary, and sequence length.
- Reference ideas: Shannon information, autoregressive sequence modeling, Karpathy-style character-level minimalism.

### Share Layer Blueprint

Slide title: `01 / Text Becomes Indices`

Left column bullets:

- Text is not numeric; the model only sees ids.
- Vocabulary defines the closed symbol universe.
- Encoding maps characters to stable integer coordinates.
- Decoding proves the interface is lossless.

Right column code snapshot:

```python
tok = CharTokenizer()
tok.fit(text)

ids = tok.encode("hello")
text_back = tok.decode(ids)

assert text_back == "hello"
```

Speaker notes:

> We start at the boundary between language and arithmetic. A character tokenizer is intentionally primitive, but that is the point: it lets us see the entire pipeline without hidden machinery. Once text becomes integer ids, every later layer is just NumPy arrays transforming coordinates.

## Chapter 02: Embedding

### Build Layer Goal

Implement embedding and logits path in `src/model.py`.

- `Parameter`
- `Embedding`
- `Linear`
- `MiniGPTConfig`
- initial `MiniGPT.forward(idx)`

Mathematics/mechanics:

- Token embedding table: `W_token[vocab_size, n_embd]`.
- Position embedding table: `W_pos[block_size, n_embd]`.
- Hidden state: `x = W_token[idx] + W_pos[positions]`.
- Output projection: `logits = x @ W_lm + b_lm`.
- Cross-entropy loss over next-token labels.
- Stable softmax using shifted logits.

### Guide Layer Goal

Write `docs/02-embedding.md`.

- Embedding lookup as table indexing, not symbolic understanding.
- Positional information as learned offsets.
- Logits as unnormalized evidence for the next token.
- Cross-entropy as pressure toward the correct next token.
- Shape discipline: `(batch, time)` ids become `(batch, time, channels)` activations.

### Share Layer Blueprint

Slide title: `02 / Indices Become Vectors`

Left column bullets:

- Token ids select rows from an embedding matrix.
- Position ids inject order into otherwise parallel vectors.
- Logits score every possible next token.
- Loss measures distribution mismatch.

Right column code snapshot:

```python
tok = token_embedding[idx]
pos = position_embedding[np.arange(T)]

x = tok + pos
logits = x @ lm_head_w + lm_head_b
loss = cross_entropy(logits, targets)
```

Speaker notes:

> The first learned object is a table. Each token id selects one row, and each position selects another row. Their sum becomes the model's working representation. At this stage the model has no attention yet; it can only learn local statistical preferences through embeddings and the output projection.

## Chapter 03: Causal Attention

### Build Layer Goal

Implement attention mechanics in `src/model.py`.

- `CausalSelfAttention`
- `MultiHeadAttention`
- `causal_mask(block_size)`
- `softmax(x, axis=-1)`

Mathematics/mechanics:

- Query/key/value projections: `q = x @ Wq`, `k = x @ Wk`, `v = x @ Wv`.
- Attention scores: `scores = q @ k.transpose(...) / sqrt(head_dim)`.
- Causal mask: future positions receive large negative score before softmax.
- Attention output: `weights = softmax(masked_scores)`, `out = weights @ v`.
- Multi-head split/merge: `(B, T, C) -> (B, H, T, D) -> (B, T, C)`.

### Guide Layer Goal

Write `docs/03-attention.md`.

- Attention as content-addressed lookup.
- Queries ask, keys advertise, values carry payload.
- Causal masking preserves autoregressive order.
- Multi-head attention as multiple learned relation spaces.
- Reference: "Attention Is All You Need", decoder-only causal self-attention.

### Share Layer Blueprint

Slide title: `03 / Tokens Look Backward`

Left column bullets:

- Queries choose what each position needs.
- Keys expose what each previous position contains.
- Values carry information forward through weighted mixing.
- The triangular mask blocks future leakage.

Right column code snapshot:

```python
scores = q @ np.swapaxes(k, -1, -2)
scores = scores / np.sqrt(head_dim)

scores = np.where(mask, scores, -1e9)
weights = softmax(scores, axis=-1)

out = weights @ v
```

Speaker notes:

> Attention is the first real communication mechanism. Every position builds a query, compares it against keys from earlier positions, then mixes values according to the resulting weights. The mask is non-negotiable: position five may learn from positions one through five, never from six.

## Chapter 04: Blocks, Normalization, Activation

### Build Layer Goal

Implement the Transformer block stack in `src/model.py`.

- `LayerNorm`
- `GELU`
- `FeedForward`
- `TransformerBlock`
- full `MiniGPT`

Mathematics/mechanics:

- Pre-normalization: `x = x + attention(layer_norm_1(x))`, then `x = x + mlp(layer_norm_2(x))`.
- Layer normalization: mean/variance across channel dimension, learned `gamma` and `beta`.
- GELU approximation: `0.5 * x * (1 + tanh(sqrt(2/pi) * (x + 0.044715*x^3)))`.
- MLP expansion: `C -> 4C -> C`.
- Residual stream as the persistent information highway.

### Guide Layer Goal

Write `docs/04-activation.md`.

- Residual connections preserve gradient and information flow.
- Normalization stabilizes activation scale.
- MLP layers transform each token independently after attention mixing.
- GELU as smooth gating.
- Transformer block as repeated "communicate, compute" cycle.

### Share Layer Blueprint

Slide title: `04 / The Transformer Block`

Left column bullets:

- Attention mixes information across time.
- MLP transforms each position's representation.
- Residual paths keep the stream editable.
- Normalization controls scale before each operation.

Right column code snapshot:

```python
x = x + self.attn(self.ln1(x))
x = x + self.mlp(self.ln2(x))

def gelu(x):
    return 0.5 * x * (
        1 + np.tanh(np.sqrt(2 / np.pi) *
        (x + 0.044715 * x**3))
    )
```

Speaker notes:

> A Transformer block alternates between communication and computation. Attention lets tokens exchange information; the MLP rewrites each token's internal state. Residual connections make every block an edit to the stream rather than a replacement of the stream.

## Chapter 05: Manual Gradients

### Build Layer Goal

Implement explicit backward mechanics for educational layers.

- `Tensor` and `Parameter`
- backward paths for `Linear`, `Embedding`, `LayerNorm`, `GELU`, `softmax_cross_entropy`, attention projections, and score flow
- `zero_grad()`
- `parameters()`

Mathematics/mechanics:

- Manual chain rule through matrix multiply: `dW = x.T @ dout`, `dx = dout @ W.T`, `db = dout.sum(axis=...)`.
- Embedding gradient accumulation with `np.add.at`.
- Softmax-cross-entropy gradient: `dlogits = probs`, `dlogits[target] -= 1`, normalize by batch/time count.
- Backprop through attention: `out = weights @ v`, `weights = softmax(scores)`, `scores = q @ k.T / sqrt(d)`.
- Respect shape transforms during head split/merge.

### Guide Layer Goal

Write `docs/05-autograd.md`.

- Backpropagation as reverse execution of cached operations.
- Local derivatives compose through the chain rule.
- Why caches are required for backward passes.
- Gradient shapes mirror parameter shapes.
- Attention backward as a graph of matmul, softmax, masking, and reshape operations.

### Share Layer Blueprint

Slide title: `05 / Gradients by Hand`

Left column bullets:

- Forward pass stores the values needed for derivatives.
- Backward pass walks the computation graph in reverse.
- Parameters collect gradients with matching shapes.
- Embedding rows receive sparse accumulated updates.

Right column code snapshot:

```python
dlogits = probs.copy()
dlogits[np.arange(N), targets] -= 1
dlogits /= N

dW = x_flat.T @ dlogits
db = dlogits.sum(axis=0)
dx = dlogits @ W.T

np.add.at(d_embed, idx, dx)
```

Speaker notes:

> This chapter is where the glass box becomes fully transparent. We are no longer asking a library to differentiate for us. Every gradient is a NumPy array produced by the chain rule, and every parameter update can be traced back to one local derivative.

## Chapter 06: Optimizer, Training Loop, Generation

### Build Layer Goal

Implement training and sampling in `src/train.py` and final model utilities.

- `get_batch(data, batch_size, block_size)`
- `AdamW`
- `clip_grad_norm(parameters, max_norm)`
- `estimate_loss(...)`
- `train(...)`
- `generate(model, idx, max_new_tokens, temperature, top_k=None)`
- CLI-friendly script constants.

Mathematics/mechanics:

- AdamW first and second moments: `m = beta1*m + (1-beta1)*g`, `v = beta2*v + (1-beta2)*g*g`, bias correction, decoupled weight decay.
- Mini-batch next-token objective.
- Autoregressive sampling: crop context to `block_size`, compute next-token logits, apply temperature, optional top-k filter, sample from softmax probabilities.
- Loss tracking over train/validation splits.

### Guide Layer Goal

Write `docs/06-optimizer.md`.

- Optimization as iterative movement through parameter space.
- AdamW versus plain gradient descent at the equation level.
- Weight decay as parameter magnitude control.
- Temperature and top-k as sampling-time distribution shaping.
- The complete loop: text -> ids -> logits -> loss -> gradients -> update -> generated text.

### Share Layer Blueprint

Slide title: `06 / Train, Update, Generate`

Left column bullets:

- Batches create many next-token prediction tasks.
- Loss drives gradients through the whole stack.
- AdamW converts gradients into stable parameter updates.
- Generation feeds predictions back as new context.

Right column code snapshot:

```python
for step in range(max_steps):
    x, y = get_batch(train_ids, B, T)

    logits, loss = model.forward(x, y)
    loss.backward()
    clip_grad_norm(model.parameters(), 1.0)
    optimizer.step()
    optimizer.zero_grad()

sample = generate(model, seed_ids, 200)
```

Speaker notes:

> Now the system closes. We sample batches from tokenized text, predict the next token, compute loss, run the backward pass, and update every parameter with AdamW. Generation is the same model run in a loop: predict one token, append it, and let the context grow.

## Execution Order

1. Normalize slide tokens to Cyber Blue in `share/slides/style.css`.
2. Implement each chapter in order: source first, docs second, slide third.
3. After each chapter, run `python -m py_compile src/*.py`.
4. Add focused checks for tokenizer round-trip, shape invariants, masking, loss gradients, and optimizer updates when a formal test suite is introduced.
5. Keep `docs/` and `share/slides/` synchronized with the exact mechanics implemented in `src/`.
