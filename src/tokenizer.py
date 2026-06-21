"""Character-level tokenizer for the Mini-GPT teaching project."""

from __future__ import annotations

import json
from pathlib import Path


class CharTokenizer:
    """A deterministic, lossless character tokenizer.

    The implementation is deliberately small: every unique character becomes a
    vocabulary entry, and encoding is direct table lookup.
    """

    def __init__(self, stoi: dict[str, int] | None = None):
        self.stoi: dict[str, int] = dict(stoi or {})
        self.itos: dict[int, str] = {idx: ch for ch, idx in self.stoi.items()}

    @property
    def vocab_size(self) -> int:
        return len(self.stoi)

    def fit(self, text: str) -> "CharTokenizer":
        chars = sorted(set(text))
        self.stoi = {ch: idx for idx, ch in enumerate(chars)}
        self.itos = {idx: ch for ch, idx in self.stoi.items()}
        return self

    def encode(self, text: str) -> list[int]:
        if not self.stoi:
            raise ValueError("Tokenizer is empty. Call fit(text) first.")
        try:
            return [self.stoi[ch] for ch in text]
        except KeyError as exc:
            ch = exc.args[0]
            raise ValueError(f"Character {ch!r} is not in the vocabulary.") from exc

    def decode(self, ids: list[int] | tuple[int, ...]) -> str:
        if not self.itos:
            raise ValueError("Tokenizer is empty. Call fit(text) first.")
        try:
            return "".join(self.itos[int(idx)] for idx in ids)
        except KeyError as exc:
            idx = exc.args[0]
            raise ValueError(f"Token id {idx!r} is not in the vocabulary.") from exc

    def save(self, path: str | Path) -> None:
        payload = {"stoi": self.stoi}
        Path(path).write_text(json.dumps(payload, ensure_ascii=False, indent=2), encoding="utf-8")

    @classmethod
    def load(cls, path: str | Path) -> "CharTokenizer":
        payload = json.loads(Path(path).read_text(encoding="utf-8"))
        return cls(stoi={str(ch): int(idx) for ch, idx in payload["stoi"].items()})
