Causal Mask

Before the attention weights are finalized, GPT must block the future. During training, the full sequence is available, but the model is only allowed to use current and past positions. The causal mask makes training match left-to-right generation, so the prediction stays honest.

