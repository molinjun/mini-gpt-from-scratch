# mini-gpt-from-scratch

> **一份面向 LLM 内部原理的指南：从零实现一个生成式 Transformer。**

语言：[English](README.md) | **中文**

---

本仓库是一个极简、无 PyTorch 依赖的生成式 Transformer（GPT）教学实现。项目刻意避开大型深度学习框架，只使用 **纯 Python 和 NumPy** 来展示完整的前向传播、自动求导和训练循环。

它同时服务于两个学习场景：一套用于逐行理解代码结构的 **Minibook**，以及一份适合技术分享的 **HTML 原生演示文稿**。

## 项目结构

```text
mini-gpt-from-scratch/
├── data/              # 训练数据集与 token 流
├── assets/            # 极简技术架构图与可复用视觉素材
├── docs/              # Minibook：按章节拆解实现细节（01-06）
├── src/               # 使用纯 NumPy 实现的核心源码
│   ├── tokenizer.py   # 字符级 / token 级映射
│   ├── model.py       # GPT 架构与手写反向传播
│   └── train.py       # 本地训练循环与优化过程
└── share/
    └── slides/        # HTML 原生演示文稿
```

## 快速开始

```bash
python -m py_compile src/*.py
python src/train.py
```

在 macOS 上预览幻灯片：

```bash
open share/slides/index.html
```

如果相对路径资源需要通过 HTTP 加载：

```bash
python -m http.server 8000 -d share/slides
```
