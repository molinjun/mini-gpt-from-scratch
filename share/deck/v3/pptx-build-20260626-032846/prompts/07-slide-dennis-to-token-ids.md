Dennis to Token IDs

Now we make the Mini-GPT tokenizer concrete. We build a small vocabulary, map each character to an ID, and use that mapping both ways. For example, Dennis becomes d, e, n, n, i, s, and then 4, 5, 14, 14, 9, 19. Encoding means text to IDs; decoding means IDs back to text.

