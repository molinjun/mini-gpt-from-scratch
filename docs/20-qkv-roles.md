# 20 Q, K, V Roles

## Slide Goal

Explain query, key, and value with simple words.

## Key Points

- Query: what do I need?
- Key: what do I contain?
- Value: what should I send?

## Speaker Notes

For each position, the model makes three vectors: query, key, and value.

The query is like a question from the current position: what information do I need? The key is like a description of each visible position: what do I contain?

The value is the information that will be sent if that position is useful. Q and K decide the attention weights. V is what gets mixed.

## Visual Idea

Three-column blueprint diagram for Query, Key, Value, with arrows from the same hidden vector into Wq, Wk, Wv.

## Code Anchor

- src/model.py: CausalSelfAttention.forward
