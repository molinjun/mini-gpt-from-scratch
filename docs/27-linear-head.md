# 27 Linear Head to Logits

## Slide Goal

Show how hidden vectors become next-token scores.

## Key Points

- Use the last position for generation
- One score per token id
- Softmax turns scores into probabilities

## Speaker Notes

After the Transformer blocks, the model still has one vector for each position.

A final linear head maps each vector from model dimension D to vocabulary size V. That gives one logit score for each possible next token.

During generation, we usually read the logits at the final position. Those logits tell us what the model thinks the next token could be.

## Visual Idea

Final hidden vector entering a linear head, expanding into a vertical list of vocabulary logits for next characters.

## Code Anchor

- src/model.py: MiniGPT.forward
