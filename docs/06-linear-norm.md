# 06 Linear & Norm

## Slide Goal

Explain linear layers, normalization, and activation functions in the target micro-gpt teaching version.

## Key Points

- Linear is the basic trainable transform: `y = xW + b`.
- Q/K/V projections, output projections, and MLP layers all depend on Linear.
- RMSNorm rescales by root mean square without subtracting the mean.
- ReLU is the most direct nonlinearity: `max(0, x)`.
- This talk explains the target RMSNorm + ReLU version; current source alignment can be a follow-up.

## Current Source: LayerNorm + GELU

The current implementation uses LayerNorm:

```text
norm(x) = (x - mean(x)) / sqrt(var(x) + eps)
```

Learned `gamma` and `beta` let the model restore useful scale and offset after normalization.

The feed-forward network expands and contracts channels:

```text
C -> 4C -> C
```

GELU provides the nonlinear gate:

```python
0.5 * x * (1 + tanh(sqrt(2 / pi) * (x + 0.044715 * x**3)))
```

## Deck Target: RMSNorm + ReLU

The presentation deck explains a target teaching variant that uses `RMSNorm` and `ReLU`. Keep the distinction explicit when updating slides or code.

RMSNorm stabilizes scale without subtracting the mean:

```text
rms(x) = sqrt(mean(x^2) + eps)
norm(x) = x / rms(x) * weight
```

ReLU is the most direct nonlinear gate:

```text
relu(x) = max(0, x)
```

This variant is easier to explain in a talk because normalization is just scale control and the activation is visually obvious. If the source code is later changed to `RMSNorm` + `ReLU`, this chapter should be updated so the implementation path and deck path fully match.

## Speaker Notes

Normalization stabilizes the scale entering each layer. LayerNorm subtracts the mean and divides by standard deviation; RMSNorm is simpler and controls scale through root mean square. ReLU is easy to explain: negative values are clipped, positive values pass through. For a teaching-oriented micro-gpt, this keeps attention on the Transformer structure itself.

## Visual Idea

Small comparison: Linear rotates/scales vectors, RMSNorm stabilizes scale, and ReLU introduces nonlinearity.

## Code Anchor

- Target concept: `RMSNorm`, `ReLU`
- Current repo note: `src/model.py` currently contains `LayerNorm`, `gelu`
