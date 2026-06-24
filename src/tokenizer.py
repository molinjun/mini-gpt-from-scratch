"""Character-level tokenizer for the Mini-GPT teaching project."""

from __future__ import annotations

import json
from pathlib import Path


class CharTokenizer:
    """A deterministic, lossless character tokenizer.

    The implementation is deliberately small: every unique character becomes a
    vocabulary entry, and encoding is direct table lookup. A single BOS token
    can also be used as both the beginning and end delimiter for name documents.
    """

    bos_token = "<BOS>"

    def __init__(self, stoi: dict[str, int] | None = None, bos_token: str | None = None):
        self.bos_token = bos_token or self.bos_token
        self.stoi: dict[str, int] = dict(stoi or {})
        self.itos: dict[int, str] = {idx: ch for ch, idx in self.stoi.items()}

    @property
    def vocab_size(self) -> int:
        return len(self.stoi)

    @property
    def bos_id(self) -> int:
        if self.bos_token not in self.stoi:
            raise ValueError("Tokenizer has no BOS token. Call fit(..., add_bos=True) first.")
        return self.stoi[self.bos_token]

    def fit(self, text: str, add_bos: bool = False) -> "CharTokenizer":
        chars = sorted(set(text))
        self.stoi = {ch: idx for idx, ch in enumerate(chars)}
        if add_bos:
            self.stoi[self.bos_token] = len(self.stoi)
        self.itos = {idx: ch for ch, idx in self.stoi.items()}
        return self

    def fit_names(self, names: list[str] | tuple[str, ...]) -> "CharTokenizer":
        """Fit on a list of names and reserve BOS as the document delimiter."""

        return self.fit("".join(names), add_bos=True)

    def encode(self, text: str, wrap_bos: bool = False) -> list[int]:
        if not self.stoi:
            raise ValueError("Tokenizer is empty. Call fit(text) first.")
        try:
            ids = [self.stoi[ch] for ch in text]
        except KeyError as exc:
            ch = exc.args[0]
            raise ValueError(f"Character {ch!r} is not in the vocabulary.") from exc
        if wrap_bos:
            bos = self.bos_id
            return [bos, *ids, bos]
        return ids

    def decode(self, ids: list[int] | tuple[int, ...], skip_special: bool = True) -> str:
        if not self.itos:
            raise ValueError("Tokenizer is empty. Call fit(text) first.")
        try:
            pieces = [self.itos[int(idx)] for idx in ids]
        except KeyError as exc:
            idx = exc.args[0]
            raise ValueError(f"Token id {idx!r} is not in the vocabulary.") from exc
        if skip_special:
            pieces = [piece for piece in pieces if piece != self.bos_token]
        return "".join(pieces)

    def save(self, path: str | Path) -> None:
        payload = {"stoi": self.stoi, "bos_token": self.bos_token}
        Path(path).write_text(json.dumps(payload, ensure_ascii=False, indent=2), encoding="utf-8")

    @classmethod
    def load(cls, path: str | Path) -> "CharTokenizer":
        payload = json.loads(Path(path).read_text(encoding="utf-8"))
        return cls(
            stoi={str(ch): int(idx) for ch, idx in payload["stoi"].items()},
            bos_token=payload.get("bos_token"),
        )
