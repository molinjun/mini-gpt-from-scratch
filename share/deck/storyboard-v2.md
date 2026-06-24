# Mini-GPT Deck Storyboard V2

Review status: Phase 2 pilot in progress. Pilot images live under `share/deck/pilot/`. No changes to `docs/`, `share/slides/index.html`, PPTX, or existing formal PNGs.

Language rule: slide-visible titles, bullets, code, and speaker notes are English-only. Chinese text appears only in review notes.

Implementation stance: use PyTorch-style snippets for teaching clarity in slides. Keep the current NumPy from-scratch code as the repository implementation and reference path.

Visual style: dark blueprint, navy grid, cyan/electric-blue lines, crisp technical panels, short readable text, no decorative clutter.

Generation rules:
- Prefer familiar running examples: `ECP CIS` and `Dennis`.
- Use `Dennis` as the main model example. Transformer slides should use character-level tokens such as `d e n n -> i`.
- Use `ECP CIS` only as a team/context label, not as the main model token sequence.
- Avoid unfamiliar generic filler words; prefer project-specific terms from this deck.
- For the character tokenizer, keep token IDs small and realistic: `vocab_size = 27`, IDs in the `0..26` range.
- Add short concept definition chips on technical slides, for example `logits = raw scores`, `gradient = direction to reduce loss`, and `softmax = scores to probabilities`.

## 01. Build a Mini-GPT from Scratch

Section: Opening

Slide-visible bullets:
- Understand Transformer architecture and how it works
- Build a tiny name generator
- Speaker: Zhiqiang Ge, ECP CIS

Speaker notes:
Hello everyone. I am Zhiqiang Ge from ECP CIS. Today we will build a Mini-GPT from scratch. The goal is to understand the Transformer architecture with a small model we can explain step by step.

Visual direction:
Simple cover. Left side title, subtitle, speaker, and team. Render `Understand Transformer Architecture and How It Works` as a subtitle, not as a bullet list. Right side a compact token flow: `ECP CIS` -> `next token` -> `Awesome`.

Code snippet intent:
None.

Review note:
封面保持简洁，重点是标题、讲者、团队和一个带 ECP CIS 熟悉感的小图。

## 02. Agenda

Section: Opening

Slide-visible bullets:
- Session 1: Why We Build Mini-GPT
- Session 2: Neural Network Basics
- Session 3: Tokenizer and Embedding
- Session 4: Transformer Architecture
- Session 5: Training and Inference

Speaker notes:
Here is the map for the talk. We will move through five sessions. First, we explain why we build Mini-GPT and how it is inspired by MicroGPT. Second, we cover the neural network basics we need for training. Third, we turn text into token IDs and vectors. Fourth, we study the Transformer architecture. Fifth, we train the model and use it for inference.

Visual direction:
Blueprint roadmap with five large session columns: Why We Build Mini-GPT, Neural Network Basics, Tokenizer and Embedding, Transformer, Training and Inference. The tokenizer panel should show `Dennis` character token boxes, not arbitrary numeric token IDs.

Code snippet intent:
None.

Review note:
Agenda 按用户定义的 5 个 session 组织：为什么构建 Mini-GPT、神经网络基础、Tokenizer/Embedding、Transformer 架构、Training/Inference。

## 03. Transformer Is the Architecture

Section: Why We Build Mini-GPT

Slide-visible bullets:
- Transformer powers modern AI
- Attention Is All You Need, 2017
- GPT predicts the next token

Speaker notes:
Transformer is one of the most important architectures behind modern AI models. The key paper is Attention Is All You Need. We will start from the big picture: tokens go into a Transformer architecture, the model reads the context, and a GPT-style model predicts the next token.

Visual direction:
Use the Transformer paper architecture as the main reference: show a simplified blueprint version of the original encoder-decoder figure, then highlight the decoder/GPT path. Add a small next-token example: `Denn` -> `i`. Include source chip: `arxiv.org/abs/1706.03762`.

Code snippet intent:
None.

Review note:
这一页只负责建立大背景：Transformer 很重要，引出 Attention Is All You Need 的架构图，并点出 GPT 的 next-token 本质。

## 04. From MicroGPT to Our Mini-GPT

Section: Why We Build Mini-GPT

Slide-visible bullets:
- Inspired by Andrej Karpathy's MicroGPT
- Build a tiny GPT to generate names
- Use it to inspect the full path

Speaker notes:
The full Transformer is still too large to learn all at once. So we borrow the spirit of Andrej Karpathy's MicroGPT and build our own Mini-GPT. The task is simple: generate names. This small task still shows the full path: tokenizer, embeddings, Transformer blocks, logits, and sampling.

Visual direction:
Source-and-task slide with no human portrait: Andrej Karpathy name as a source label, MicroGPT code card, makemore names dataset card, then our Mini-GPT workbench producing sample names such as `Dennis`. Include source chips: `MicroGPT gist` and `github.com/karpathy/makemore`.

Code snippet intent:
None.

Review note:
这一页合并 MicroGPT 来源和我们 Mini-GPT 的功能：生成名字，同时说明它是用来观察完整 GPT 路径的教学工具。

## 05. Neural Network Basics

Section: Neural Network Basics

Slide-visible bullets:
- `W` and `b` shape predictions
- ReLU and MLP add flexibility
- Loss and gradients drive learning

Speaker notes:
Before the Transformer, we only need a small base. We want three ideas. First, learnable parameters like `W` and `b` shape the model's predictions. Second, ReLU and MLP make the function more flexible. Third, loss and gradients tell the optimizer how to improve the parameters. Later, the Transformer will use the same training idea, but with many learned matrices.

Visual direction:
Section divider with three goal panels: `W` and `b` shaping a fitted line, ReLU/MLP bending the function, and loss/gradients updating parameters. Add a bridge label: "later: many learned Transformer matrices".

Code snippet intent:
None.

Review note:
这页改成目标式导航，而不是操作步骤：参数如何影响预测、MLP 为什么有用、训练如何更新参数。

## 06. A Neural Network Is a Function

Section: Neural Network Basics

Slide-visible bullets:
- Input `x` maps to output `y`
- Weights choose the line
- Training fits the data

Speaker notes:
The first mental model is simple. A network is a function with parameters. For example, we may have points near the rule `y = 2x + 1`. At the beginning, the model line is wrong. Training changes the parameters so the line fits the data.

Visual direction:
Line-fitting example: data points on a small plot, a wrong initial line, and adjustable knobs labeled `W` and `b`.

Code snippet intent:
None.

Review note:
用拟合直线作为贯穿例子，从函数视角进入，避免一开始就被神经网络术语吓到。

## 07. One Neuron: y = Wx + b

Section: Neural Network Basics

Slide-visible bullets:
- Multiply by `W`
- Add bias
- Produce one new number

Speaker notes:
A very small model is `y = W x + b`. The weight `W` controls the slope, and the bias `b` moves the line up or down. A neuron does the same idea, but often with many inputs.

Visual direction:
Equation-centered slide: `y = W x + b`, with a plot showing slope `W`, intercept `b`, and the predicted point `y_hat`.

Code snippet intent:
PyTorch teaching snippet: `nn.Linear(1, 1)`.

Review note:
继续沿用拟合直线例子：`W` 是斜率，`b` 是截距，帮助听众把可训练参数和图联系起来。

## 08. From Neuron to MLP

Section: Neural Network Basics

Slide-visible bullets:
- Many neurons form a layer
- Layers create hidden features
- MLP means Linear -> ReLU -> Linear

Speaker notes:
One neuron can fit a straight line. When the pattern is more complex, we use many neurons and layers. An MLP stacks linear layers with a nonlinearity between them. In the Transformer, this becomes the feed-forward part of each block.

Visual direction:
Start from one fitted line, then show a small MLP: input `x`, hidden features, ReLU gate, output `y_hat`. Add a small note: "later: Transformer MLP block".

Code snippet intent:
PyTorch teaching snippet: `nn.Sequential(nn.Linear(...), nn.ReLU(), nn.Linear(...))`.

Review note:
把“拟合直线”自然扩展到 MLP，并提前连接到后面的 Transformer FFN/MLP block。

## 09. ReLU Adds a Bend

Section: Neural Network Basics

Slide-visible bullets:
- Linear layers alone stay linear
- ReLU keeps positive values
- Nonlinearity adds expressive power

Speaker notes:
If we only stack linear layers, the result is still a linear function. ReLU adds a simple bend. This lets the model build piecewise lines, so it can fit patterns that a single straight line cannot fit.

Visual direction:
Side-by-side plot: a straight line underfitting curved data, then a piecewise line after ReLU bends the function.

Code snippet intent:
PyTorch teaching snippet: `torch.relu(x)` or `nn.ReLU()`.

Review note:
用“给线加弯折”的图解释 ReLU，不展开复杂数学。

## 10. Prediction and Loss

Section: Neural Network Basics

Slide-visible bullets:
- Prediction is `y_hat`
- Target is the real `y`
- Loss measures the gap

Speaker notes:
The model makes a prediction, `y_hat`. The target is the real `y` from the data. For line fitting, loss can be the squared error between them. For GPT later, the loss is cross entropy, but the idea is the same: make the wrongness smaller.

Visual direction:
Line-fitting plot with one point highlighted: vertical gap between predicted `y_hat` and target `y`, connected to a loss meter. Add a small callout: "GPT later uses cross entropy".

Code snippet intent:
PyTorch teaching snippets: `loss = F.mse_loss(y_hat, y)` for the line example, then a small callout `F.cross_entropy(logits, targets)` for GPT.

Review note:
先用 MSE 讲拟合直线的 loss，再提示 GPT 使用 cross entropy，避免概念跳太快。

## 11. Backprop and AdamW

Section: Neural Network Basics

Slide-visible bullets:
- Backprop computes gradients
- Gradient = direction to reduce loss
- AdamW updates weights

Speaker notes:
Backprop tells each parameter how it affected the loss. A gradient is the direction that helps reduce the loss. AdamW uses gradients to update the weights. In the line example, this means `W` and `b` move a little each step until the line fits better. A Transformer trains many matrices in the same loop.

Visual direction:
Circular training loop around the line plot: forward prediction, loss gap, backward gradients on `W` and `b`, AdamW update, improved line. Add definition chips: "gradient = direction to reduce loss" and "same loop for Transformer matrices".

Code snippet intent:
PyTorch teaching snippet: `optimizer.zero_grad()`, `loss.backward()`, `optimizer.step()`.

Review note:
用拟合直线把 backprop/AdamW 变具体：每一步都在调整 `W` 和 `b`；后面 Transformer 只是把这个扩展到很多矩阵。

## 12. From Text to Token IDs

Section: Tokenizer and Embedding

Slide-visible bullets:
- Models do not read strings
- Text must become numbers
- Tokenizer builds that bridge

Speaker notes:
Now we can start the GPT path. The first problem is simple: the model cannot read strings like `Dennis`. It only reads numbers. The tokenizer is the bridge.

Visual direction:
Section divider: string text on one side, token ID boxes on the other.

Code snippet intent:
None.

Review note:
章节标题直接说明任务，比 Text Becomes Training Data 更清楚。

## 13. Names as Tiny Documents

Section: Tokenizer and Embedding

Slide-visible bullets:
- Each name is a short document
- A special token separates names
- The dataset becomes one token stream

Speaker notes:
For this project, names are tiny documents. We use a special token to separate them. Then all names become one long stream for training.

Visual direction:
Name list flowing into one token stream with separator markers.

Code snippet intent:
None.

Review note:
解释为什么名字数据也能当语言建模任务。

## 14. Why We Need a Tokenizer

Section: Tokenizer and Embedding

Slide-visible bullets:
- Strings are symbols for humans
- Models need integer IDs
- IDs index into tables

Speaker notes:
A tokenizer turns text pieces into integer IDs. Those IDs are not meaning by themselves. They are indexes that let the model look up vectors later.

Visual direction:
`Dennis` -> token boxes -> ID boxes -> lookup table.

Code snippet intent:
None.

Review note:
为 embedding 做铺垫：token ID 只是索引。

## 15. BPE vs Character Tokens

Section: Tokenizer and Embedding

Slide-visible bullets:
- Production models use larger tokenizers
- Mini-GPT uses character tokens
- Same idea, smaller scale

Speaker notes:
Large GPT systems use tokenizers that split text into subwords. For Mini-GPT, we use character-level tokens. It is much smaller, but the idea is the same: text becomes token IDs.

Visual direction:
Two-column comparison: production tokenizer vs character tokenizer. Use `Dennis` as the example: production tokenizer may use a larger word/subword token, while Mini-GPT splits it into `d e n n i s`.

Code snippet intent:
Optional teaching mention: `tiktoken` for checking real tokenizer behavior, but no dependency in this deck.

Review note:
避免说太多 BPE 细节，只建立工业级和教学级的尺度对比。

## 16. Dennis to Token IDs

Section: Tokenizer and Embedding

Slide-visible bullets:
- Build a small vocabulary
- Map each character to an ID
- Encode and decode text

Speaker notes:
For a character tokenizer, we collect all characters in the data. Each character gets one ID. Encoding maps text to IDs, and decoding maps IDs back to text.

Visual direction:
`Dennis` split into character tokens `d e n n i s`, each connected to a small ID card: `d=4`, `e=5`, `n=14`, `i=9`, `s=19`. Add a compact label: `vocab_size = 27`, `token IDs: 0..26`.

Code snippet intent:
Teaching snippet:
`stoi = {ch: i for i, ch in enumerate(chars)}`
`encode = lambda s: [stoi[c] for c in s]`

Review note:
这是一个适合放代码的 slide，但代码必须短。注意 token ID 要符合教学模型规模，不能画成几千或几万的大 token ID。

## 17. Inputs and Targets Are Shifted

Section: Tokenizer and Embedding

Slide-visible bullets:
- Input: `D e n n`
- Target: `e n n i`
- Learn one-step prediction

Speaker notes:
Training uses shifted pairs. If the input is `D e n n`, the target is `e n n i`. At each position, the model learns to predict the next token.

Visual direction:
Two aligned rows of token boxes with a one-position shift arrow.

Code snippet intent:
PyTorch-style teaching snippet: `x = data[i:i+block_size]`, `y = data[i+1:i+block_size+1]`.

Review note:
把 next-token prediction 和训练数据构造合起来讲。

## 18. From Token IDs to Vectors

Section: Tokenizer and Embedding

Slide-visible bullets:
- Token IDs are only indexes
- Embeddings turn IDs into vectors
- Position tells order

Speaker notes:
Now we have token IDs, but IDs are not meaning. The next step is embedding. Embeddings turn IDs into vectors, and position embeddings tell the model where each token is.

Visual direction:
Section divider: ID boxes entering embedding tables and producing vector rows.

Code snippet intent:
None.

Review note:
章节标题更直观：从数字 ID 到向量。

## 19. Token IDs Are Not Meaning

Section: Tokenizer and Embedding

Slide-visible bullets:
- ID 4 is not smaller than ID 9
- IDs do not show similarity
- Vectors can carry learned meaning

Speaker notes:
The ID number itself is not semantic. ID 4 is not more meaningful than ID 9. It is just an index. The model needs vectors that can be learned from data.

Visual direction:
Warning-style comparison: raw IDs as index cards vs vector points in space.

Code snippet intent:
None.

Review note:
纠正“数字大小等于意义”的误解。

## 20. Token Embedding

Section: Tokenizer and Embedding

Slide-visible bullets:
- Embedding is a lookup table
- Each token gets a vector
- The vectors are learned

Speaker notes:
An embedding layer is a table. When we pass token IDs into it, it returns one vector for each token. During training, the vectors change like other parameters.

Visual direction:
Embedding table with token IDs selecting vector rows.

Code snippet intent:
PyTorch teaching snippet: `tok_emb = nn.Embedding(vocab_size, n_embd)`.

Review note:
这里适合用 PyTorch 一行代码表达。

## 21. Position Embedding

Section: Tokenizer and Embedding

Slide-visible bullets:
- Attention sees tokens in parallel
- Order must be added
- Token vector + position vector

Speaker notes:
Self-attention processes positions in parallel. Without position information, order is unclear. So we add a learned position vector to each token vector.

Visual direction:
Character token row `d e n n` plus position row `0 1 2 3` equals hidden vector row. Include a small contrast row `n n e d` to show that the same characters in a different order get different position vectors.

Code snippet intent:
PyTorch teaching snippet: `x = tok_emb(idx) + pos_emb(pos)`.

Review note:
这里也使用 Dennis 字符级例子，避免和 Mini-GPT 的 character tokenizer 冲突。

## 22. The Hidden Stream

Section: Tokenizer and Embedding

Slide-visible bullets:
- Hidden vectors flow through blocks
- Each block refines the stream
- Final vectors predict tokens

Speaker notes:
After embeddings, we have a stream of hidden vectors. Transformer blocks update this stream. At the end, the model converts the final vectors into scores for the next token.

Visual direction:
Horizontal river of vectors passing through repeated blocks.

Code snippet intent:
None.

Review note:
建立 hidden stream 心智模型，后面讲 block 会更顺。

## 23. Inside the Transformer Block

Section: Transformer Architecture

Slide-visible bullets:
- Attention mixes information across positions
- MLP refines each position
- Residual paths keep information flowing

Speaker notes:
Now we enter the Transformer block. The block has two main jobs. Attention lets tokens look at other tokens. The MLP refines each position. Residual connections keep the signal moving.

Visual direction:
Section divider with one Transformer block exploded into Attention, MLP, Norm, and Residual paths. Show the running character context `d e n n` entering the block and a likely next token `i` after the block path.

Code snippet intent:
None.

Review note:
这个章节是全场核心，先给完整地图再拆细节。

## 24. Decoder-Only Map

Section: Transformer Architecture

Slide-visible bullets:
- GPT uses decoder-only blocks
- Blocks repeat the same pattern
- The head maps vectors to logits

Speaker notes:
Mini-GPT uses a decoder-only Transformer. We repeat the same block several times. After the blocks, a linear head maps each hidden vector to logits over the vocabulary.

Visual direction:
Full architecture map: `d e n n` -> small token IDs `[4, 5, 14, 14]` -> embeddings -> repeated decoder-only blocks -> final norm -> linear head -> logits for next character, with `i` highlighted.

Code snippet intent:
PyTorch class skeleton only if space allows: `token_embedding`, `position_embedding`, `blocks`, `lm_head`.

Review note:
对应当前 deck 的 decoder map，但标题更贴近 GPT 架构。

## 25. Attention Intuition

Section: Transformer Architecture

Slide-visible bullets:
- Each token looks at earlier tokens
- Important tokens get more weight
- The result is a mixed vector

Speaker notes:
Attention is a way for each position to look back at the context. Some earlier tokens matter more than others. The output is a weighted mix of useful information.

Visual direction:
Current character token `n` in the context `d e n n` looking backward with weighted blue lines to earlier character tokens `d`, `e`, and `n`. Add a definition chip: "attention = weighted mixing".

Code snippet intent:
None.

Review note:
先讲直觉，再讲 QKV 和公式。

## 26. Q, K, V Roles

Section: Transformer Architecture

Slide-visible bullets:
- Query asks what this token needs
- Key describes each context token
- Value carries information to mix

Speaker notes:
Q, K, and V are three learned projections of the same hidden vector. In our Mini-GPT, the tokens are characters. For the context `d e n n`, the last `n` makes a Query. The Keys describe `d`, `e`, `n`, and `n`. The Values carry the information that will be mixed before predicting `i`.

Visual direction:
Three-panel diagram using the exact character tokens `d e n n`. Highlight the current token, the last `n`. Show Query from that `n` matching Keys from `d`, `e`, `n`, and `n`, then Values carrying information into a mixed vector for next-token prediction. Add definition chips: "Q/K/V = learned projections" and "tokens are characters here".

Code snippet intent:
PyTorch teaching snippet: `q, k, v = self.q(x), self.k(x), self.v(x)`.

Review note:
QKV 是重点，用类比讲，但不要太花。

## 27. Scores and Softmax

Section: Transformer Architecture

Slide-visible bullets:
- Score = Q dot K match strength
- Softmax turns scores into weights
- Weights mix the values

Speaker notes:
We compare queries with keys using a dot product. This gives attention scores, which mean match strength. We scale the scores, then softmax turns them into weights that add up to one. Those weights decide how much value information to mix.

Visual direction:
Matrix multiplication view over the character context `d e n n`: `Q @ K.T`, scale, softmax, attention matrix. Add definition chips: "score = match strength" and "softmax = scores to weights".

Code snippet intent:
PyTorch teaching snippet: `scores = q @ k.transpose(-2, -1) / sqrt(d_k)`.

Review note:
公式只放核心一行，避免数学密度太高。

## 28. Causal Mask

Section: Transformer Architecture

Slide-visible bullets:
- GPT must not see future tokens
- The mask blocks future positions
- Prediction stays honest

Speaker notes:
During training, the full sequence is available, but GPT should not look at future tokens. A causal mask blocks future positions, so each token only learns from the past.

Visual direction:
Attention matrix for character positions `d e n n`, with the upper triangle blocked out. Show that each position can only attend to itself and earlier character tokens.

Code snippet intent:
PyTorch teaching snippet: `scores = scores.masked_fill(mask == 0, -inf)`.

Review note:
这里解释为什么训练时也要 mask。

## 29. Multi-Head Attention

Section: Transformer Architecture

Slide-visible bullets:
- One head sees one relation pattern
- Many heads learn different views
- Outputs are joined together

Speaker notes:
One attention head can learn one kind of relation. Multi-head attention runs several heads in parallel. Then the outputs are joined and projected back to the model size.

Visual direction:
Several parallel attention heads over the same character context `d e n n`, with different highlighted relation patterns, merging into one output vector.

Code snippet intent:
None, or a shape-only note if needed.

Review note:
讲概念即可，不展开复杂 reshape。

## 30. RMSNorm and Residuals

Section: Transformer Architecture

Slide-visible bullets:
- Residual adds the old signal back
- RMSNorm stabilizes the stream
- Deep blocks become easier to train

Speaker notes:
Residual connections add the input back to the output of a layer. This helps information and gradients flow. RMSNorm keeps the hidden stream stable as it passes through many operations.

Visual direction:
Block diagram with main path and skip path, plus RMSNorm gate. Label the stream as character hidden vectors for `d e n n`.

Code snippet intent:
Teaching snippet: `x = x + attention(norm(x))`.

Review note:
项目用 RMSNorm，不用 Gemini 大纲里的 LayerNorm，保持口径一致。

## 31. The MLP Block

Section: Transformer Architecture

Slide-visible bullets:
- Attention mixes across tokens
- MLP works inside each token
- Linear -> ReLU -> Linear

Speaker notes:
Attention shares information across positions. The MLP then processes each position separately. In this teaching project, the MLP is Linear, ReLU, and Linear.

Visual direction:
Per-position MLP pipeline repeated under character token columns `d`, `e`, `n`, `n`. Show that the MLP does not mix positions; attention already did that.

Code snippet intent:
PyTorch teaching snippet: `nn.Sequential(nn.Linear(n, 4*n), nn.ReLU(), nn.Linear(4*n, n))`.

Review note:
项目讲 ReLU，不讲 GELU，避免和源码不一致。

## 32. Linear Head to Logits

Section: Transformer Architecture

Slide-visible bullets:
- Logits are raw vocab scores
- Softmax gives probabilities
- Sampling picks the next token

Speaker notes:
At the end, a linear head maps the hidden vector back to vocabulary size. The output numbers are logits, which are raw scores before softmax. Softmax turns logits into probabilities, and sampling picks the next token.

Visual direction:
Hidden vector for the last `n` entering the linear head, raw logit bars for character tokens `a`, `e`, `i`, `n`, `s`, then softmax probability bars. Highlight `i` as the likely next token. Add definition chips: "logits = raw scores" and "softmax = scores to probabilities".

Code snippet intent:
PyTorch teaching snippet: `logits = self.lm_head(x)`.

Review note:
结束 Transformer 架构，连接到训练和采样。

## 33. Training Mini-GPT

Section: Training and Inference

Slide-visible bullets:
- Use many shifted examples
- Minimize next-token loss
- Update all learnable weights

Speaker notes:
Now we train the model. Each batch gives the model many next-token examples. The loss tells us how wrong the logits are. The optimizer updates all learnable weights.

Visual direction:
Section divider showing batches flowing through model into loss and weight updates.

Code snippet intent:
None.

Review note:
进入训练章节，避免架构讲完直接跳到代码。

## 34. Training Loop: PyTorch View

Section: Training and Inference

Slide-visible bullets:
- Forward pass makes logits
- Loss compares logits to targets
- Gradients guide AdamW updates

Speaker notes:
This is the full training loop in a short form. We run the model to get logits. Cross entropy compares logits with the target token. Backward computes gradients, and AdamW uses those gradients to update the parameters.

Visual direction:
Split screen: left minimal code, right loop diagram. Add definition chips: "logits = raw scores" and "gradient = direction to improve parameters".

Code snippet intent:
PyTorch teaching snippet:
`logits = model(x)`
`loss = F.cross_entropy(logits.view(-1, vocab), y.view(-1))`
`optimizer.zero_grad(); loss.backward(); optimizer.step()`

Review note:
这是用户希望的 PyTorch 精简展示，不新增源码依赖。

## 35. Loss Goes Down

Section: Training and Inference

Slide-visible bullets:
- Early predictions are noisy
- Loss drops with training
- Names become more realistic

Speaker notes:
At the start, generated names are mostly random. As training continues, the loss goes down. The model starts to learn character patterns that look like names.

Visual direction:
Loss curve plus before/after generated name samples.

Code snippet intent:
None.

Review note:
用结果建立训练有效性的直觉。

## 36. Generating Names

Section: Training and Inference

Slide-visible bullets:
- Start with a seed token
- Predict one token
- Append and repeat

Speaker notes:
Inference is autoregressive. We start with a seed token, ask the model for the next token, append that token, and repeat until the name ends.

Visual direction:
Section divider with growing string: `<BOS>` -> `D` -> `De` -> `Den` -> `Dennis`.

Code snippet intent:
None.

Review note:
进入 inference，和前面的 next-token story 呼应。

## 37. Sampling Loop

Section: Training and Inference

Slide-visible bullets:
- Use the latest context window
- Convert logits to probabilities
- Sample the next token

Speaker notes:
At each step, the model only needs the latest context window. It produces logits for the next token. We turn logits into probabilities and sample one token.

Visual direction:
Loop diagram: context, model, logits, probabilities, sampled token, append.

Code snippet intent:
PyTorch teaching snippet:
`logits = model(context)[:, -1, :]`
`probs = torch.softmax(logits / temperature, dim=-1)`
`next_id = torch.multinomial(probs, 1)`

Review note:
展示生成核心，不展开 beam search 等高级解码。

## 38. Temperature Controls Creativity

Section: Training and Inference

Slide-visible bullets:
- Low temperature is safer
- Normal temperature is balanced
- High temperature is more random

Speaker notes:
Temperature changes the probability distribution. Low temperature makes the model choose safer tokens. High temperature spreads the probabilities and makes output more surprising.

Visual direction:
Three probability bar charts: low, normal, high temperature, with sample names below.

Code snippet intent:
Teaching snippet: `logits = logits / temperature`.

Review note:
这是很适合视觉化的一页，帮助听众理解 sampling 参数。

## 39. Recap: Dennis Through Mini-GPT

Section: Recap and References

Slide-visible bullets:
- Text -> tokens -> vectors
- Blocks -> logits -> probabilities
- Sample -> append -> repeat

Speaker notes:
Let us follow `Denn` through the full Mini-GPT flow. The text becomes token IDs. IDs become vectors. Transformer blocks process the hidden stream. The head gives logits. Softmax gives probabilities. We sample `i`, append it, and continue.

Visual direction:
Long pipeline from `Denn` to `Dennis`: character tokenizer with small IDs, embedding, position, attention, MLP, logits, softmax, sample. Show character-level tokens such as `d e n n` and small IDs such as `[4, 5, 14, 14]`. Add definition chips: "logits = raw scores" and "softmax = probabilities".

Code snippet intent:
None.

Review note:
全流程沙盘演练，是整场的收束页。

## 40. What to Inspect in Code

Section: Recap and References

Slide-visible bullets:
- Tokenizer: text and IDs
- Model: blocks and logits
- Training: loss and sampling

Speaker notes:
After the talk, these are the best places to inspect in code. Start from the tokenizer, then the model forward pass, and then the training and sampling loops.

Visual direction:
Three code file panels: tokenizer, model, train loop. Use short labels, not dense code.

Code snippet intent:
Reference paths only: `src/tokenizer.py`, `src/model.py`, `src/train.py`.

Review note:
这页帮助听众会后知道从哪里看源码。

## 41. References

Section: Recap and References

Slide-visible bullets:
- Attention Is All You Need
- Karpathy: microgpt, makemore, nanoGPT
- 3Blue1Brown and Mu Li Transformer videos

Speaker notes:
These are useful references for going deeper. The original paper gives the architecture. Karpathy's projects are great for small GPT learning. The videos help build intuition.

Visual direction:
Showcase wall with paper card, code cards, and video cards. Keep URLs readable but short.

Code snippet intent:
None.

Review note:
参考页做成展柜，不要变成密密麻麻的链接列表。

## 42. Q&A / Thank You

Section: Recap and References

Slide-visible bullets:
- Q&A
- Thank you

Speaker notes:
Thank you. I am happy to take questions.

Visual direction:
Very simple closing slide with large `Q&A` and `Thank you`, dark blueprint background, small ECP CIS tag.

Code snippet intent:
None.

Review note:
按用户要求保持极简，只出现 Q&A 和 Thank you。
