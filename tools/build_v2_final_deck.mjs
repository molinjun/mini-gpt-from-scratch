import { copyFileSync, existsSync, mkdirSync, readFileSync, readdirSync, rmSync, writeFileSync } from "fs";
import { basename, extname, join } from "path";

const root = process.cwd();
const v2Dir = join(root, "share", "deck", "v2");
const formalDeckDir = join(root, "share", "deck");
const formalSlidesDir = join(root, "share", "slides");
const docsDir = join(root, "docs");
let pptxGenJSModule;

const slides = [
  {
    n: "01",
    title: "Build a Mini-GPT from Scratch",
    file: "01-slide-build-a-mini-gpt-from-scratch.png",
    section: "Opening",
    notes: "Hello everyone. I am Zhiqiang Ge from ECP CIS. Today we will build a Mini-GPT from scratch. The goal is not to build a huge production model. The goal is to understand the Transformer architecture by building a small model that we can inspect step by step.",
  },
  {
    n: "02",
    title: "Agenda",
    file: "02-slide-agenda.png",
    section: "Opening",
    notes: "Here is the plan for the talk. We will move through five parts. First, why we build Mini-GPT. Second, the neural network basics we need. Third, tokenizer and embedding. Fourth, the Transformer architecture itself. Finally, we will train the model and use it to generate names.",
  },
  {
    n: "03",
    title: "Transformer Is the Architecture",
    file: "03-slide-transformer-is-the-architecture.png",
    section: "Why We Build Mini-GPT",
    notes: "The Transformer is one of the main architectures behind modern AI models. The key paper is Attention Is All You Need. For a GPT-style model, the core task is simple to say: read the context, then predict the next token. Everything in this talk is a path toward understanding that one idea.",
  },
  {
    n: "04",
    title: "From MicroGPT to Our Mini-GPT",
    file: "04-slide-from-microgpt-to-our-mini-gpt.png",
    section: "Why We Build Mini-GPT",
    notes: "A full Transformer can feel too large to learn at once. So we borrow the spirit of Andrej Karpathy's MicroGPT and build a tiny GPT for name generation. The task is small, but it still includes the full path: tokenizer, embeddings, Transformer blocks, logits, loss, and sampling.",
  },
  {
    n: "05",
    title: "Neural Network Basics",
    file: "05-slide-neural-network-basics.png",
    section: "Neural Network Basics",
    notes: "Before we enter the Transformer, we only need a small foundation. We need to know how learnable parameters shape predictions, why ReLU and MLPs make a model more flexible, and how loss and gradients drive learning. Later, the Transformer uses the same training idea, just with many more matrices.",
  },
  {
    n: "06",
    title: "A Neural Network Is a Function",
    file: "06-slide-a-neural-network-is-a-function.png",
    section: "Neural Network Basics",
    notes: "The first mental model is simple: a neural network is a function with parameters. It takes input numbers and produces output numbers. At the beginning, the function is usually wrong. Training changes the parameters so the output fits the data better.",
  },
  {
    n: "07",
    title: "One Neuron: y = Wx + b",
    file: "07-slide-one-neuron-y-wx-b.png",
    section: "Neural Network Basics",
    notes: "A very small model is y equals W times x plus b. The weight W controls the slope, and the bias b moves the line up or down. A neuron uses the same idea, often with many inputs. This is the simplest example of learnable parameters changing a prediction.",
  },
  {
    n: "08",
    title: "From Neuron to MLP",
    file: "08-slide-from-neuron-to-mlp.png",
    section: "Neural Network Basics",
    notes: "One neuron can only do a limited job. When the pattern is more complex, we use many neurons and stack layers. That gives us an MLP. In this teaching model, the MLP pattern is Linear, then ReLU, then Linear. We will see the same pattern inside each Transformer block.",
  },
  {
    n: "09",
    title: "ReLU Adds a Bend",
    file: "09-slide-relu-adds-a-bend.png",
    section: "Neural Network Basics",
    notes: "If we only stack linear layers, the result is still linear. ReLU adds a simple bend. Negative values become zero, and positive values stay positive. This gives the model expressive power, so it can fit patterns that a single straight line cannot fit.",
  },
  {
    n: "10",
    title: "Prediction and Loss",
    file: "10-slide-prediction-and-loss.png",
    section: "Neural Network Basics",
    notes: "The model makes a prediction, and the training data gives us a target. Loss measures the gap between them. For a line, the loss can be squared error. For GPT, the loss is cross entropy. The details are different, but the meaning is the same: make the wrongness smaller.",
  },
  {
    n: "11",
    title: "Backprop and AdamW",
    file: "11-slide-backprop-and-adamw.png",
    section: "Neural Network Basics",
    notes: "Backpropagation tells each parameter how it affected the loss. A gradient is the direction that helps reduce the loss. AdamW uses those gradients to update the weights. In a Transformer, we run the same loop, but now the parameters are embeddings, attention matrices, MLP weights, and the final head.",
  },
  {
    n: "12",
    title: "From Text to Token IDs",
    file: "12-slide-from-text-to-token-ids.png",
    section: "Tokenizer and Embedding",
    notes: "Now we start the GPT path. The first problem is that the model cannot read a string like Dennis. It only reads numbers. The tokenizer is the bridge from text to token IDs. Once text becomes IDs, the rest of the model can work with arrays and vectors.",
  },
  {
    n: "13",
    title: "Names as Tiny Documents",
    file: "13-slide-names-as-tiny-documents.png",
    section: "Tokenizer and Embedding",
    notes: "In this project, each name is like a tiny document. We add a special boundary token, then put names into a training stream. This makes the task concrete: given the characters so far, predict the next character in the name.",
  },
  {
    n: "14",
    title: "Why We Need a Tokenizer",
    file: "14-slide-why-we-need-a-tokenizer.png",
    section: "Tokenizer and Embedding",
    notes: "A tokenizer turns pieces of text into integer IDs. The IDs are not meanings by themselves. They are addresses. They let the model look up vectors in an embedding table. That is why the tokenizer is the first important step in the pipeline.",
  },
  {
    n: "15",
    title: "BPE vs Character Tokens",
    file: "15-slide-bpe-vs-character-tokens.png",
    section: "Tokenizer and Embedding",
    notes: "Large GPT systems usually use tokenizers that split text into subword pieces. For Mini-GPT, we use character-level tokens. It is much smaller and easier to inspect. The model is less powerful, but the idea is the same: text becomes a sequence of IDs.",
  },
  {
    n: "16",
    title: "Dennis to Token IDs",
    file: "16-slide-dennis-to-token-ids.png",
    section: "Tokenizer and Embedding",
    notes: "For a character tokenizer, we collect the characters in the dataset and assign each one a small ID. For example, Dennis becomes lowercase character tokens such as d, e, n, n, i, s. Encoding maps text to IDs, and decoding maps IDs back to text.",
  },
  {
    n: "17",
    title: "Inputs and Targets Are Shifted",
    file: "17-slide-inputs-and-targets-are-shifted.png",
    section: "Tokenizer and Embedding",
    notes: "Training uses shifted pairs. If the input is D, e, n, n, then the target is e, n, n, i. At every position, the model learns to predict the next token. This is why one short name gives us several training examples.",
  },
  {
    n: "18",
    title: "From Token IDs to Vectors",
    file: "18-slide-from-token-ids-to-vectors.png",
    section: "Tokenizer and Embedding",
    notes: "Token IDs are still just integers. The next step is embedding. The embedding table turns each ID into a vector, and the position embedding tells the model where that token is in the sequence. From here on, the Transformer works with vectors.",
  },
  {
    n: "19",
    title: "Token IDs Are Not Meaning",
    file: "19-slide-token-ids-are-not-meaning.png",
    section: "Tokenizer and Embedding",
    notes: "It is important not to overread the ID numbers. ID 4 is not semantically close to ID 5 just because the numbers are close. The ID is only an index into a table. The learned vector is what carries useful information for the model.",
  },
  {
    n: "20",
    title: "Token Embedding",
    file: "20-slide-token-embedding.png",
    section: "Tokenizer and Embedding",
    notes: "An embedding layer is a learned lookup table. When the model sees a token ID, it selects one row from the table. At first these vectors are random. During training, they move so character patterns become easier for the Transformer to use.",
  },
  {
    n: "21",
    title: "Position Embedding",
    file: "21-slide-position-embedding.png",
    section: "Tokenizer and Embedding",
    notes: "Token embeddings tell the model what the token is. Position embeddings tell it where the token is. This matters because the two n characters in Denn have the same token ID, but they are in different positions. We add token and position vectors together.",
  },
  {
    n: "22",
    title: "The Hidden Stream",
    file: "22-slide-the-hidden-stream.png",
    section: "Tokenizer and Embedding",
    notes: "After embeddings, we have a hidden stream. Its shape is batch size, sequence length, and model dimension. Each position has one vector. Transformer blocks update this stream. Attention mixes information across positions, and the MLP refines each position.",
  },
  {
    n: "23",
    title: "Inside the Transformer Block",
    file: "23-slide-inside-the-transformer-block.png",
    section: "Transformer Architecture",
    notes: "Now we enter one Transformer block. The block has two main jobs. Attention lets positions look at the context. The MLP transforms each position's vector. RMSNorm and residual connections keep the stream stable and make the block easier to train.",
  },
  {
    n: "24",
    title: "Decoder-Only Map",
    file: "24-slide-decoder-only-map.png",
    section: "Transformer Architecture",
    notes: "Mini-GPT uses a decoder-only Transformer. There is no separate encoder. The model reads previous tokens and predicts the next token. We repeat the same block several times, then use a linear head to map hidden vectors back to vocabulary scores.",
  },
  {
    n: "25",
    title: "Attention Intuition",
    file: "25-slide-attention-intuition.png",
    section: "Transformer Architecture",
    notes: "Attention is a learned way for one position to look back at useful context. For the prefix d, e, n, n, the last n may need information from earlier characters to predict i. Attention scores visible positions and mixes their value vectors.",
  },
  {
    n: "26",
    title: "Q, K, V Roles",
    file: "26-slide-q-k-v-roles.png",
    section: "Transformer Architecture",
    notes: "For each hidden vector, the model makes three learned projections: query, key, and value. The query asks what the current token needs. The keys describe the context tokens. The values carry the information that will be mixed. Q and K choose the weights; V is what gets combined.",
  },
  {
    n: "27",
    title: "Scores and Softmax",
    file: "27-slide-scores-and-softmax.png",
    section: "Transformer Architecture",
    notes: "The model compares queries and keys with a dot product. That gives attention scores, or match strengths. Then softmax turns those scores into weights that add up to one. The final attention output is a weighted mix of the value vectors.",
  },
  {
    n: "28",
    title: "Causal Mask",
    file: "28-slide-causal-mask.png",
    section: "Transformer Architecture",
    notes: "During training, the full sequence is available, but GPT must not cheat by looking at future tokens. The causal mask blocks future positions. Each token can only attend to itself and earlier tokens, so the next-token prediction stays honest.",
  },
  {
    n: "29",
    title: "Multi-Head Attention",
    file: "29-slide-multi-head-attention.png",
    section: "Transformer Architecture",
    notes: "One attention head can learn one kind of relation. Multi-head attention runs several heads in parallel, so different heads can learn different views of the same context. Then the head outputs are joined together and projected back to the model dimension.",
  },
  {
    n: "30",
    title: "RMSNorm and Residuals",
    file: "30-slide-rmsnorm-and-residuals.png",
    section: "Transformer Architecture",
    notes: "Residual connections add the old signal back after a layer. This helps information and gradients flow through deep blocks. RMSNorm keeps the vector scale stable. Together, they make repeated Transformer blocks much easier to train.",
  },
  {
    n: "31",
    title: "The MLP Block",
    file: "31-slide-the-mlp-block.png",
    section: "Transformer Architecture",
    notes: "Attention mixes information across tokens. The MLP works inside each token position. In this teaching version, the MLP is Linear, ReLU, and Linear. So the block first shares context with attention, then computes new features at each position.",
  },
  {
    n: "32",
    title: "Linear Head to Logits",
    file: "32-slide-linear-head-to-logits.png",
    section: "Transformer Architecture",
    notes: "At the end, the linear head maps each hidden vector to vocabulary size. The output numbers are logits, which means raw scores. Softmax turns logits into probabilities, and sampling chooses the next token. For Denn, we hope i becomes likely.",
  },
  {
    n: "33",
    title: "Training Mini-GPT",
    file: "33-slide-training-mini-gpt.png",
    section: "Training and Inference",
    notes: "Now we train the model. Each batch contains many shifted next-token examples. The model produces logits, the loss measures how wrong they are, and the optimizer updates all learnable weights. The whole model learns from this same loop.",
  },
  {
    n: "34",
    title: "Training Loop: PyTorch View",
    file: "34-slide-training-loop-pytorch-view.png",
    section: "Training and Inference",
    notes: "This is the training loop in a short PyTorch-style view. First we run the model to get logits. Then cross entropy compares logits with the target tokens. Backward computes gradients, and AdamW uses those gradients to update the parameters.",
  },
  {
    n: "35",
    title: "Loss Goes Down",
    file: "35-slide-loss-goes-down.png",
    section: "Training and Inference",
    notes: "At the beginning, the model's generated names are mostly random. As training continues, the loss goes down. That means the model is becoming less surprised by real name patterns. The samples start to look more like plausible names.",
  },
  {
    n: "36",
    title: "Generating Names",
    file: "36-slide-generating-names.png",
    section: "Training and Inference",
    notes: "Generation is autoregressive. We start with a seed token. The model predicts one next token. We append that token to the context, then ask again. Repeating this step grows a name one character at a time.",
  },
  {
    n: "37",
    title: "Sampling Loop",
    file: "37-slide-sampling-loop.png",
    section: "Training and Inference",
    notes: "At each generation step, the model only needs the latest context window. It produces logits for the next token. We turn logits into probabilities, sample one token, append it, and continue. This is the same next-token idea used during training.",
  },
  {
    n: "38",
    title: "Temperature Controls Creativity",
    file: "38-slide-temperature-controls-creativity.png",
    section: "Training and Inference",
    notes: "Temperature changes the probability distribution. Low temperature makes the model safer and more predictable. Higher temperature spreads probability across more choices, so the output becomes more surprising. It is a simple control for creativity versus stability.",
  },
  {
    n: "39",
    title: "Recap: Dennis Through Mini-GPT",
    file: "39-slide-recap-dennis-through-mini-gpt.png",
    section: "Recap and References",
    notes: "Let us follow Denn through the full path. Text becomes character tokens. Tokens become IDs. IDs become vectors with token and position embeddings. Transformer blocks update the hidden stream. The head produces logits, softmax gives probabilities, we sample i, append it, and continue.",
  },
  {
    n: "40",
    title: "What to Inspect in Code",
    file: "40-slide-what-to-inspect-in-code.png",
    section: "Recap and References",
    notes: "After the talk, these are the best places to inspect in code. Start with the tokenizer to see text and IDs. Then read the model to see blocks and logits. Finally, inspect the training file for loss, optimization, and the sampling loop.",
  },
  {
    n: "41",
    title: "References",
    file: "41-slide-references.png",
    section: "Recap and References",
    notes: "These references are good next steps. The original Transformer paper gives the architecture. Karpathy's microgpt, makemore, and nanoGPT are great for small GPT learning. The videos from 3Blue1Brown and Mu Li are helpful for building intuition.",
  },
  {
    n: "42",
    title: "Q&A / Thank You",
    file: "42-slide-qanda-thank-you.png",
    section: "Recap and References",
    notes: "Thank you for listening. I hope this Mini-GPT path makes the Transformer feel more concrete. I am happy to take questions.",
  },
];

function escapeHtml(value) {
  return String(value)
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;");
}

function escapeAttr(value) {
  return escapeHtml(value).replaceAll('"', "&quot;");
}

function backupIfExists(path) {
  if (!existsSync(path)) return;
  const now = new Date();
  const stamp = [
    now.getFullYear(),
    String(now.getMonth() + 1).padStart(2, "0"),
    String(now.getDate()).padStart(2, "0"),
    "-",
    String(now.getHours()).padStart(2, "0"),
    String(now.getMinutes()).padStart(2, "0"),
    String(now.getSeconds()).padStart(2, "0"),
  ].join("");
  const ext = extname(path);
  const backup = path.slice(0, -ext.length) + `-backup-${stamp}` + ext;
  copyFileSync(path, backup);
  console.log(`Backed up ${path} -> ${backup}`);
}

function assertAssets() {
  for (const slide of slides) {
    const imagePath = join(v2Dir, slide.file);
    if (!existsSync(imagePath)) {
      throw new Error(`Missing slide image: ${imagePath}`);
    }
  }
}

function renderNotesMarkdown() {
  return `# Mini-GPT Deck V2 Speaker Notes

These are polished read-aloud English speaker notes for the 42-slide V2 deck.

${slides
  .map(
    (slide) => `## ${slide.n}. ${slide.title}

Section: ${slide.section}

${slide.notes}`
  )
  .join("\n\n")}
`;
}

function extractPromptField(prompt, label) {
  const labels = [
    "Slide title to render:",
    "Slide-visible text to render:",
    "Speaker-note intent, for context only:",
    "Visual direction:",
    "Code snippet intent:",
    "Approved deck generation rules:",
    "Rendering instructions:",
  ];
  const start = prompt.indexOf(label);
  if (start === -1) return "";
  const from = start + label.length;
  const after = labels
    .filter((item) => item !== label)
    .map((item) => prompt.indexOf(item, from))
    .filter((index) => index !== -1)
    .sort((a, b) => a - b)[0];
  return prompt.slice(from, after ?? prompt.length).trim();
}

function docSlug(slide) {
  const slug = slide.file
    .replace(/^\d+-slide-/, "")
    .replace(/\.(png|jpg|jpeg)$/i, "");
  if (slide.n === "01") return "cover";
  return slug;
}

function renderDoc(slide) {
  const promptPath = join(v2Dir, "prompts", `${slide.n}-slide-${docSlug(slide) === "cover" ? "build-a-mini-gpt-from-scratch" : docSlug(slide)}.md`);
  const prompt = existsSync(promptPath) ? readFileSync(promptPath, "utf8") : "";
  const visibleText = extractPromptField(prompt, "Slide-visible text to render:") || "- See slide image";
  const visual = extractPromptField(prompt, "Visual direction:") || "See generated slide image.";

  return `# ${slide.n} ${slide.title}

## Section

${slide.section}

## Slide-Visible Text

${visibleText}

## Speaker Notes

${slide.notes}

## Visual Direction

${visual}

## Target Image

\`share/deck/v2/${slide.file}\`
`;
}

function rebuildDocs() {
  mkdirSync(docsDir, { recursive: true });
  for (const entry of readdirSync(docsDir)) {
    if (/^\d{2}-.+\.md$/.test(entry)) {
      rmSync(join(docsDir, entry));
    }
  }

  for (const slide of slides) {
    const index = String(Number(slide.n) - 1).padStart(2, "0");
    const filename = `${index}-${docSlug(slide)}.md`;
    writeFileSync(join(docsDir, filename), renderDoc(slide));
  }

  writeFileSync(
    join(docsDir, "README.md"),
    `# Mini-GPT Talk Source

This directory is the single talk-ordered source for the presentation deck.

Current deck: **Build a Mini-GPT from Scratch**

Slides: ${slides.length}

Rules:

- Keep slide-visible text and speaker notes in English.
- Keep the dark blueprint visual language used in \`share/deck/v2/\`.
- Use the tiny character-level name generator as the running example.
- The teaching implementation explains RMSNorm + ReLU.

## Talk Order

${slides
  .map((slide) => {
    const index = String(Number(slide.n) - 1).padStart(2, "0");
    return `- ${slide.n}. [${slide.title}](${index}-${docSlug(slide)}.md)`;
  })
  .join("\n")}
`
  );
}

function renderHtml({ imagePrefix }) {
  const renderedSlides = slides
    .map(
      (slide, index) => `      <article class="slide${index === 0 ? " active" : ""}" data-title="${escapeAttr(slide.title)}" data-notes="${escapeAttr(slide.notes)}">
        <img src="${imagePrefix}${slide.file}" alt="${escapeAttr(slide.title)}">
      </article>`
    )
    .join("\n");

  return `<!doctype html>
<html lang="en">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <title>Build a Mini-GPT from Scratch</title>
  <style>
    :root {
      color-scheme: dark;
      --bg: #030a16;
      --panel: #07182e;
      --text: #f5f9ff;
      --muted: #9cb7cf;
      --accent: #55d7ff;
    }

    * { box-sizing: border-box; }

    body {
      margin: 0;
      min-height: 100vh;
      background: radial-gradient(circle at top, #0a2443 0, var(--bg) 48%);
      color: var(--text);
      font-family: Inter, ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif;
      letter-spacing: 0;
    }

    .stage {
      display: grid;
      grid-template-rows: auto 1fr auto;
      min-height: 100vh;
      padding: 18px;
      gap: 14px;
    }

    header,
    footer {
      display: flex;
      align-items: center;
      justify-content: space-between;
      gap: 12px;
      max-width: 1280px;
      width: 100%;
      margin: 0 auto;
    }

    h1 {
      margin: 0;
      font-size: 18px;
      font-weight: 700;
    }

    .meta {
      color: var(--muted);
      font-size: 14px;
      white-space: nowrap;
    }

    .viewer {
      display: grid;
      place-items: center;
      min-height: 0;
    }

    .slide {
      display: none;
      width: min(100%, 1280px);
      aspect-ratio: 16 / 9;
      border: 1px solid rgba(85, 215, 255, 0.28);
      background: #07182e;
      box-shadow: 0 24px 70px rgba(0, 0, 0, 0.36);
      overflow: hidden;
    }

    .slide.active { display: block; }

    .slide img {
      display: block;
      width: 100%;
      height: 100%;
      object-fit: contain;
    }

    .controls {
      display: flex;
      align-items: center;
      gap: 10px;
    }

    button {
      min-width: 92px;
      border: 1px solid rgba(85, 215, 255, 0.42);
      border-radius: 8px;
      background: rgba(7, 24, 46, 0.86);
      color: var(--text);
      padding: 9px 12px;
      font: inherit;
      cursor: pointer;
    }

    button:hover {
      border-color: var(--accent);
      color: var(--accent);
    }

    .notes-panel {
      position: fixed;
      top: 18px;
      right: 18px;
      z-index: 10;
      display: none;
      width: min(420px, calc(100vw - 36px));
      max-height: calc(100vh - 36px);
      overflow: auto;
      border: 1px solid rgba(85, 215, 255, 0.34);
      border-radius: 8px;
      background: rgba(3, 10, 22, 0.94);
      box-shadow: 0 24px 70px rgba(0, 0, 0, 0.45);
      padding: 16px;
      backdrop-filter: blur(14px);
    }

    .notes-panel.open { display: block; }

    .notes-panel h2 {
      margin: 0 0 10px;
      color: var(--accent);
      font-size: 13px;
      letter-spacing: 0;
    }

    .notes-panel p {
      margin: 0;
      color: rgba(245, 249, 255, 0.92);
      font-size: 16px;
      line-height: 1.5;
    }

    @media (max-width: 760px) {
      .stage { padding: 12px; }
      header,
      footer { align-items: flex-start; flex-direction: column; }
      .controls { width: 100%; }
      button { flex: 1; min-width: 0; }
    }
  </style>
</head>
<body>
  <main class="stage">
    <header>
      <h1>Build a Mini-GPT from Scratch</h1>
      <div class="meta" id="status">1 / ${slides.length}</div>
    </header>

    <section class="viewer" aria-label="Mini-GPT slide deck">
${renderedSlides}
    </section>

    <footer>
      <div class="meta" id="title">${escapeHtml(slides[0].title)}</div>
      <div class="controls">
        <button type="button" data-action="prev">Prev</button>
        <button type="button" data-action="next">Next</button>
        <button type="button" data-action="presenter">Presenter</button>
        <button type="button" data-action="notes">Notes</button>
      </div>
    </footer>
  </main>

  <aside class="notes-panel" id="notesPanel" aria-live="polite">
    <h2 id="notesTitle">${escapeHtml(slides[0].title)}</h2>
    <p id="notesBody">${escapeHtml(slides[0].notes)}</p>
  </aside>

  <script>
    const slides = Array.from(document.querySelectorAll(".slide"));
    const status = document.querySelector("#status");
    const title = document.querySelector("#title");
    const notesPanel = document.querySelector("#notesPanel");
    const notesTitle = document.querySelector("#notesTitle");
    const notesBody = document.querySelector("#notesBody");
    let current = 0;
    let presenterWindow = null;

    function show(index) {
      current = Math.max(0, Math.min(slides.length - 1, index));
      slides.forEach((slide, i) => slide.classList.toggle("active", i === current));
      const active = slides[current];
      status.textContent = \`\${current + 1} / \${slides.length}\`;
      title.textContent = active.dataset.title;
      notesTitle.textContent = active.dataset.title;
      notesBody.textContent = active.dataset.notes;
      updatePresenter();
    }

    function openPresenter() {
      presenterWindow = window.open("", "miniGptPresenter", "width=1120,height=760");
      if (!presenterWindow) return;

      const doc = presenterWindow.document;
      doc.documentElement.lang = "en";
      doc.title = "Presenter - Build a Mini-GPT from Scratch";

      const metaCharset = doc.createElement("meta");
      metaCharset.setAttribute("charset", "utf-8");
      const metaViewport = doc.createElement("meta");
      metaViewport.setAttribute("name", "viewport");
      metaViewport.setAttribute("content", "width=device-width, initial-scale=1");
      const titleEl = doc.createElement("title");
      titleEl.textContent = "Presenter - Build a Mini-GPT from Scratch";
      const style = doc.createElement("style");
      style.textContent = [
        ":root {",
        "  color-scheme: dark;",
        "  --bg: #030a16;",
        "  --panel: #07182e;",
        "  --text: #f5f9ff;",
        "  --muted: #9cb7cf;",
        "  --accent: #55d7ff;",
        "}",
        "* { box-sizing: border-box; }",
        "body {",
        "  margin: 0;",
        "  min-height: 100vh;",
        "  display: grid;",
        "  grid-template-columns: minmax(0, 1.8fr) minmax(320px, 0.8fr);",
        "  gap: 18px;",
        "  padding: 18px;",
        "  background: radial-gradient(circle at top, #0a2443 0, var(--bg) 52%);",
        "  color: var(--text);",
        "  font-family: Inter, ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;",
        "}",
        ".preview {",
        "  align-self: center;",
        "  border: 1px solid rgba(85, 215, 255, 0.28);",
        "  background: var(--panel);",
        "  aspect-ratio: 16 / 9;",
        "  overflow: hidden;",
        "  box-shadow: 0 24px 70px rgba(0, 0, 0, 0.36);",
        "}",
        ".preview img {",
        "  display: block;",
        "  width: 100%;",
        "  height: 100%;",
        "  object-fit: contain;",
        "}",
        ".notes {",
        "  border: 1px solid rgba(85, 215, 255, 0.34);",
        "  border-radius: 8px;",
        "  background: rgba(7, 24, 46, 0.86);",
        "  padding: 18px;",
        "  overflow: auto;",
        "}",
        ".notes .count {",
        "  margin: 0 0 12px;",
        "  color: var(--muted);",
        "  font-size: 14px;",
        "}",
        ".notes h1 {",
        "  margin: 0 0 14px;",
        "  color: var(--accent);",
        "  font-size: 22px;",
        "  line-height: 1.2;",
        "}",
        ".notes p {",
        "  margin: 0;",
        "  font-size: 19px;",
        "  line-height: 1.55;",
        "}",
        "@media (max-width: 860px) {",
        "  body { grid-template-columns: 1fr; }",
        "}",
      ].join("\\n");
      doc.head.replaceChildren(metaCharset, metaViewport, titleEl, style);

      const preview = doc.createElement("main");
      preview.className = "preview";
      const notes = doc.createElement("aside");
      notes.className = "notes";
      const count = doc.createElement("div");
      count.className = "count";
      const heading = doc.createElement("h1");
      const body = doc.createElement("p");
      notes.append(count, heading, body);
      doc.body.replaceChildren(preview, notes);

      updatePresenter();
      presenterWindow.focus();
    }

    function updatePresenter() {
      if (!presenterWindow || presenterWindow.closed) return;
      const active = slides[current];
      const sourceImg = active.querySelector("img");
      const preview = presenterWindow.document.querySelector(".preview");
      const count = presenterWindow.document.querySelector(".count");
      const heading = presenterWindow.document.querySelector(".notes h1");
      const body = presenterWindow.document.querySelector(".notes p");
      if (!sourceImg || !preview || !count || !heading || !body) return;

      const img = sourceImg.cloneNode(false);
      img.src = sourceImg.src;
      img.alt = sourceImg.alt;
      preview.replaceChildren(img);
      count.textContent = \`\${current + 1} / \${slides.length}\`;
      heading.textContent = active.dataset.title;
      body.textContent = active.dataset.notes;
    }

    document.addEventListener("click", (event) => {
      const button = event.target.closest("[data-action]");
      if (!button) return;
      if (button.dataset.action === "prev") show(current - 1);
      if (button.dataset.action === "next") show(current + 1);
      if (button.dataset.action === "presenter") openPresenter();
      if (button.dataset.action === "notes") notesPanel.classList.toggle("open");
    });

    document.addEventListener("keydown", (event) => {
      if (event.metaKey || event.ctrlKey || event.altKey) return;
      if (event.key === "ArrowRight" || event.key === "PageDown" || event.key === " ") {
        event.preventDefault();
        show(current + 1);
      }
      if (event.key === "ArrowLeft" || event.key === "PageUp") {
        event.preventDefault();
        show(current - 1);
      }
      if (event.key === "Home") {
        event.preventDefault();
        show(0);
      }
      if (event.key === "End") {
        event.preventDefault();
        show(slides.length - 1);
      }
      if (event.key.toLowerCase() === "n") {
        event.preventDefault();
        notesPanel.classList.toggle("open");
      }
      if (event.key.toLowerCase() === "p") {
        event.preventDefault();
        openPresenter();
      }
    });
  </script>
</body>
</html>
`;
}

async function createPptx(outputPath) {
  const PptxGenJS = await getPptxGenJS();
  if (!PptxGenJS) {
    if (existsSync(outputPath)) {
      console.warn(`Skipped PPTX export because pptxgenjs is not installed: ${outputPath}`);
      return;
    }
    throw new Error(`Cannot create PPTX without pptxgenjs: ${outputPath}`);
  }

  const pptx = new PptxGenJS();
  pptx.layout = "LAYOUT_16x9";
  pptx.author = "Zhiqiang Ge";
  pptx.subject = "Build a Mini-GPT from Scratch";
  pptx.title = "Build a Mini-GPT from Scratch";
  pptx.company = "ECP CIS";
  pptx.lang = "en-US";

  for (const slide of slides) {
    const imagePath = join(v2Dir, slide.file);
    const imageData = readFileSync(imagePath).toString("base64");
    const ext = extname(slide.file).toLowerCase().replace(".", "");
    const mimeType = ext === "png" ? "image/png" : "image/jpeg";
    const s = pptx.addSlide();
    s.addImage({
      data: `data:${mimeType};base64,${imageData}`,
      x: 0,
      y: 0,
      w: "100%",
      h: "100%",
      sizing: { type: "cover", w: "100%", h: "100%" },
    });
    s.addNotes(slide.notes);
  }

  await pptx.writeFile({ fileName: outputPath });
  console.log(`Created PPTX: ${outputPath}`);
}

async function getPptxGenJS() {
  if (pptxGenJSModule !== undefined) return pptxGenJSModule;
  try {
    pptxGenJSModule = (await import("pptxgenjs")).default;
  } catch {
    pptxGenJSModule = null;
  }
  return pptxGenJSModule;
}

async function main() {
  assertAssets();
  mkdirSync(v2Dir, { recursive: true });
  mkdirSync(formalDeckDir, { recursive: true });
  mkdirSync(formalSlidesDir, { recursive: true });

  const notesPath = join(v2Dir, "speaker-notes.md");
  const v2HtmlPath = join(v2Dir, "index.html");
  const formalHtmlPath = join(formalSlidesDir, "index.html");
  const v2PptxPath = join(v2Dir, "build-mini-gpt-from-scratch-v2.pptx");
  const formalPptxPath = join(formalDeckDir, "build-mini-gpt-from-scratch.pptx");
  const canExportPptx = Boolean(await getPptxGenJS());

  backupIfExists(formalHtmlPath);
  if (canExportPptx) {
    backupIfExists(formalPptxPath);
  } else {
    console.warn("PPTX export disabled because pptxgenjs is not installed; existing PPTX files will be preserved.");
  }

  rebuildDocs();
  writeFileSync(notesPath, renderNotesMarkdown());
  writeFileSync(v2HtmlPath, renderHtml({ imagePrefix: "" }));
  writeFileSync(formalHtmlPath, renderHtml({ imagePrefix: "../deck/v2/" }));

  await createPptx(v2PptxPath);
  await createPptx(formalPptxPath);

  console.log(`Created notes: ${notesPath}`);
  console.log(`Created HTML: ${v2HtmlPath}`);
  console.log(`Created HTML: ${formalHtmlPath}`);
  console.log(`Slides: ${slides.length}`);
  console.log(`Final PPTX basename: ${basename(formalPptxPath)}`);
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
