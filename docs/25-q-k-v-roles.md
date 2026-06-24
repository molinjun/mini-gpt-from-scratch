# 26 Q, K, V Roles

## Section

Transformer Architecture

## Slide-Visible Text

- Query asks what this token needs
- Key describes each context token
- Value carries information to mix

## Speaker Notes

For each hidden vector, the model makes three learned projections: query, key, and value. The query asks what the current token needs. The keys describe the context tokens. The values carry the information that will be mixed. Q and K choose the weights; V is what gets combined.

## Visual Direction

Three-panel diagram using the exact character tokens `d e n n`. Highlight the current token, the last `n`. Show Query from that `n` matching Keys from `d`, `e`, `n`, and `n`, then Values carrying information into a mixed vector for next-token prediction. Add definition chips: "Q/K/V = learned projections" and "tokens are characters here".

## Target Image

`share/deck/v2/26-slide-q-k-v-roles.png`
