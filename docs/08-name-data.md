# 08 Names as Tiny Documents

## Slide Goal

Show the MicroGPT name-data framing.

## Key Points

- Use short names
- Wrap with BOS
- Train every next-character step

## Speaker Notes

Now we connect the neural network to the data. In a MicroGPT-style name model, each name is a tiny document.

We add a special token called BOS. It can mean beginning of sequence, and in this small project it also marks the end.

So the name dennis becomes BOS, d, e, n, n, i, s, BOS. This one sequence creates many next-character training examples.

## Visual Idea

Two-column blueprint: raw name list on the left and wrapped token sequence boxes on the right.

## Code Anchor

- src.train.build_name_token_stream
