BPE vs Character Tokens

In real GPT systems, a common tokenizer style is subword tokenization, and tools like tiktoken can show how text becomes word pieces or subword pieces. For our Mini-GPT, the data is just names, so we use a much simpler tokenizer: 26 letters plus one BOS token. That gives us a vocabulary size of 27.

