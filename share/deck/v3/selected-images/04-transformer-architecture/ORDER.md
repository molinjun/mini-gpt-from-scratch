# 04 Transformer Architecture

Purpose: explain the core Transformer block through Mini-GPT's character-level next-token path. Keep the math light and use the diagrams to anchor every concept.

## Core Story

One Transformer block has two main halves: Attention and MLP. Attention looks up useful context with QKV, turns scores into weights with softmax, blocks the future with a causal mask, and repeats this lookup through multiple heads. The MLP refines each token position. RMSNorm and residual connections keep the stream stable. Finally, the linear head produces logits, and a second softmax turns those logits into next-token probabilities.

## Recommended Image Order

| # | Title | Image | Role |
|---|---|---|---|
| 19 | Inside the Transformer Block | `01-inside-the-transformer-block.png` | Whole block: attention, MLP, residual paths |
| 20 | Attention Intuition | `02-attention-intuition.png` | Attention as learned lookup and weighted mixing |
| 21 | Q, K, V Roles | `03-qkv-roles.png` | Q asks, K matches, V carries |
| 22 | Scores and Softmax | `04-scores-and-softmax.png` | Attention scores become attention weights |
| 23 | Causal Mask | `05-causal-mask.png` | Future tokens are blocked inside attention |
| 24 | Multi-Head Attention | `06-multi-head-attention.png` | Several attention views run in parallel |
| 25 | The MLP Block | `07-mlp-block.png` | MLP refines each token position |
| 26 | RMSNorm and Residuals | `08-rmsnorm-and-residuals.png` | Normalize, compute update, add back |
| 27 | Linear Head to Logits | `09-linear-head-to-logits.png` | Logits and final next-token softmax |

## Speaker Notes

### 19. Inside the Transformer Block

Now we open one Transformer block. The block has two main parts: attention and MLP. Attention lets each position read useful information from earlier positions. The MLP then computes new features inside each position. Residual paths keep the hidden vectors flowing through the block.

### 20. Attention Intuition

Attention is a learned lookup mechanism. For the last `n` in `Denn`, the model asks: which earlier characters matter for predicting the next one? It gives visible positions different weights, then mixes their value vectors into a new vector for this position.

### 21. Q, K, V Roles

Q, K, and V are three learned projections from the same hidden vectors. Query means: what am I looking for? Key means: what does each context position contain? Value means: what information can this position send? Q and K decide the weights. V carries the information that gets mixed.

### 22. Scores and Softmax

The model compares Q and K to get attention scores. A higher score means a stronger match. Then softmax turns those scores into attention weights that add up to one. This is the first softmax in the story: it is inside attention, and it decides how much each visible token contributes.

### 23. Causal Mask

Before the attention weights are finalized, GPT must block the future. During training, the full sequence is available, but the model is only allowed to use current and past positions. The causal mask makes training match left-to-right generation, so the prediction stays honest.

### 24. Multi-Head Attention

One attention head gives one view of the context. Multi-head attention runs several heads in parallel. One head may focus on nearby spelling patterns, another may focus on endings or repeated characters. Then the head outputs are merged back into one hidden stream.

### 25. The MLP Block

After attention shares information across tokens, the MLP works inside each token position. This is the neural network idea from the previous section: Linear, ReLU, Linear. The same MLP weights are reused at every position, but each position has its own hidden vector.

### 26. RMSNorm and Residuals

RMSNorm and residual connections make the repeated block stable. The pattern is: normalize the stream, compute an update, and add the old stream back. RMSNorm controls the scale, and residuals preserve information as the model passes through many layers.

### 27. Linear Head to Logits

At the end, the linear head maps the hidden vector to vocabulary logits. Logits are raw scores for possible next tokens. Here we use a second softmax: earlier, softmax turned attention scores into attention weights; now, softmax turns vocabulary logits into next-token probabilities. Then we sample the next token.

## Archived Alternates

The unused candidates were moved out of this module folder to keep the top-level order clean:

`../_unused/04-transformer-architecture/`

| Image | Reason |
|---|---|
| `18-slide-decoder-only-map.png` | Better used as the bridge after embeddings. |
| `19-slide-block-map.png` | Useful alternate, but the selected block image better matches the existing story. |
| `21-slide-q-k-v-roles.png` | Simpler QKV version; keep as backup. |
| `22-slide-attention-scores.png` | More detailed attention-score version; keep as backup. |
| `23-slide-causal-mask.png` | Simpler mask version; selected causal-mask image connects training and generation better. |
| `23-slide-qkv-animation-plan.png` | Animation planning aid; not needed in the final static sequence. |
| `24-slide-multi-head-attention.png` | Cleaner alternate; selected multi-head image shows split, parallel heads, and merge. |
| `25-slide-rmsnorm-and-residuals.png` | Good summary; selected RMSNorm/residual image explains the repeated stability pattern better. |
| `26-slide-the-mlp-block.png` | Simpler MLP version; selected MLP image better shows per-position shared MLP. |
| `28-slide-linear-head.png` | More tensor-shape focused; keep as backup. |

## Key Reminder

There are two softmax moments:

1. Attention softmax turns QK scores into attention weights.
2. Final vocabulary softmax turns logits into next-token probabilities.
