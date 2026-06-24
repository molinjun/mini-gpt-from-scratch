import unittest

import numpy as np

from src.model import MiniGPT, MiniGPTConfig, RMSNorm, Tensor, relu
from src.tokenizer import CharTokenizer
from src.train import generate_name


class TokenizerTests(unittest.TestCase):
    def test_character_round_trip_without_special_tokens(self):
        tokenizer = CharTokenizer().fit("emma")

        ids = tokenizer.encode("emma")

        self.assertEqual(tokenizer.decode(ids), "emma")

    def test_bos_wrapping_uses_one_token_for_start_and_end(self):
        tokenizer = CharTokenizer().fit_names(["emma", "olivia"])

        ids = tokenizer.encode("emma", wrap_bos=True)

        self.assertEqual(ids[0], tokenizer.bos_id)
        self.assertEqual(ids[-1], tokenizer.bos_id)
        self.assertEqual(tokenizer.decode(ids), "emma")
        self.assertEqual(tokenizer.decode(ids, skip_special=False), "<BOS>emma<BOS>")


class ModelComponentTests(unittest.TestCase):
    def test_rmsnorm_preserves_shape_and_controls_rms(self):
        norm = RMSNorm(3)
        x = Tensor(np.array([[1.0, 2.0, 3.0], [2.0, -2.0, 1.0]]))

        out = norm(x)

        self.assertEqual(out.shape, x.shape)
        rms = np.sqrt(np.mean(out.data * out.data, axis=-1))
        np.testing.assert_allclose(rms, np.ones(2), atol=1e-4)

    def test_relu_backward_blocks_negative_values(self):
        x = Tensor(np.array([-1.0, 0.0, 2.0]))

        relu(x).sum().backward()

        np.testing.assert_allclose(x.grad, np.array([0.0, 0.0, 1.0]))

    def test_minigpt_forward_shapes_and_backward(self):
        config = MiniGPTConfig(vocab_size=6, block_size=4, n_layer=1, n_head=2, n_embd=8, seed=7)
        model = MiniGPT(config)
        idx = np.array([[0, 1, 2, 3], [2, 3, 4, 5]], dtype=np.int64)
        targets = np.array([[1, 2, 3, 4], [3, 4, 5, 0]], dtype=np.int64)

        logits, loss = model.forward(idx, targets)
        loss.backward()

        self.assertEqual(logits.shape, (2, 4, 6))
        self.assertEqual(loss.shape, ())
        total_grad = sum(float(np.sum(np.abs(param.grad))) for param in model.parameters())
        self.assertGreater(total_grad, 0.0)


class GenerationTests(unittest.TestCase):
    def test_generate_name_stops_when_bos_is_sampled_again(self):
        tokenizer = CharTokenizer().fit_names(["a"])
        a_id = tokenizer.stoi["a"]

        class StopAfterA:
            config = MiniGPTConfig(vocab_size=tokenizer.vocab_size, block_size=4)

            def __init__(self):
                self.calls = 0

            def forward(self, idx):
                next_id = a_id if self.calls == 0 else tokenizer.bos_id
                self.calls += 1
                logits = np.full((idx.shape[0], idx.shape[1], tokenizer.vocab_size), -1e9)
                logits[:, -1, next_id] = 0.0
                return Tensor(logits, requires_grad=False), None

        model = StopAfterA()

        name = generate_name(model, tokenizer, max_length=8, rng=np.random.default_rng(1))

        self.assertEqual(name, "a")
        self.assertEqual(model.calls, 2)


if __name__ == "__main__":
    unittest.main()
