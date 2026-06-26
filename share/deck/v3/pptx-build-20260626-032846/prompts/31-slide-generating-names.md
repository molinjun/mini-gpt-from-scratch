Generating Names

Generation is autoregressive. We start with a seed token, ask the model to predict one next token, append that token to the context, and ask again. Each new character becomes part of the input for the next step, so a name grows one token at a time.

