# 05 Training and Inference

Purpose: connect the Transformer architecture to the two practical workflows: training the model, then using the trained model to generate names.

## Core Story

Training teaches Mini-GPT to predict the next token from many shifted examples. The model produces logits, cross entropy measures the mistake, backpropagation computes gradients, and AdamW updates all learnable weights. Generation reuses the same model, but runs one token at a time: context -> logits -> probabilities -> sample -> append. Temperature changes the sharpness of the probability distribution and controls the tradeoff between safe and creative samples.

## Recommended Image Order

| # | Title | Image | Role |
|---|---|---|---|
| 28 | Training Mini-GPT | `01-training-mini-gpt.png` | Training objective and shifted next-token examples |
| 29 | Training Loop: PyTorch View | `02-training-loop-pytorch-view.png` | Forward, loss, backward, AdamW update |
| 30 | Loss Goes Down | `03-loss-goes-down.png` | What successful training looks like |
| 31 | Generating Names | `04-generating-names.png` | Autoregressive generation intuition |
| 32 | Sampling Loop | `05-sampling-loop.png` | Context, logits, probabilities, sample, append |
| 33 | Temperature Controls Creativity | `06-temperature-controls-creativity.png` | Probability sharpness and output variety |

## Speaker Notes

### 28. Training Mini-GPT

Now that we have the full forward path, training is simple to describe. We take name text and turn it into many shifted next-token examples. Given `d e n n`, the target might be `i`; given `e n n i`, the target might be `s`. Mini-GPT predicts logits, cross entropy measures the mistake, and the optimizer updates all learnable weights.

### 29. Training Loop: PyTorch View

In code, the loop is small. Get a batch, run the model forward to produce logits, compare logits with target tokens using cross entropy, run backward to compute gradients, and let AdamW update the parameters. The embeddings, attention matrices, MLP weights, and linear head all learn through this same loop.

### 30. Loss Goes Down

Loss going down means the model is becoming less surprised by real name patterns. At the beginning, generated names are mostly random letters. As training continues, the model puts more probability on realistic character sequences, and the samples start to look like names.

### 31. Generating Names

Generation is autoregressive. We start with a seed token, ask the model to predict one next token, append that token to the context, and ask again. Each new character becomes part of the input for the next step, so a name grows one token at a time.

### 32. Sampling Loop

At each generation step, we keep the latest context window and run Mini-GPT. The model returns logits for the next token. We turn those logits into probabilities with softmax, sample one token, append it, and repeat. Training predicts many positions in parallel, but generation moves left to right one step at a time.

### 33. Temperature Controls Creativity

Temperature changes how sharp the probability distribution is before sampling. Low temperature makes the model safer and more predictable. Higher temperature spreads probability across more choices, so the output becomes more varied, but also more risky. For name generation, temperature is a simple creativity knob.

## Archived Alternates

The unused candidates were moved out of this module folder to keep the top-level order clean:

`../_unused/05-training-inference/`

| Image | Reason |
|---|---|
| `29-slide-training-loop-code.png` | More code-heavy; better saved for the code inspection section. |
| `30-slide-sampling-loop.png` | Good detailed generation view, but overlaps with the selected sampling-loop slide. |
