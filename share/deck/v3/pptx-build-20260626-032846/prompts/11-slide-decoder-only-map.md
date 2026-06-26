Decoder-Only Map

Now that text has become token and position vectors, let's zoom out and see the whole GPT path. Mini-GPT is decoder-only: it reads the previous tokens and predicts the next token. The embeddings go into repeated Transformer blocks, then RMSNorm and the linear head turn the final vectors into logits over the vocabulary. This map is the bridge between the input pipeline we just built and the Transformer blocks we are about to open.

