---
name: orca-insta
description: 视觉卡片生成 — 三种模式：杂志分页、杂志长图、文章模式
---

# orca-insta — 视觉卡片生成

## 核心原则

> ⚠️ **生成方式**：HTML + Playwright 截图（优先）。**禁止** `image_generate` 直接生成含文字的卡片。
>
> **截图不可用时（云平台等受限环境）**：直接输出完整单 HTML 文件，用户可在浏览器中打开。
>
> **截图工具**：
> ```bash
> node <skill_dir>/assets/capture.js <html> <png> <width> <height> fullpage
> ```
>
> **HTML 输出降级规则**：当 Playwright / Node.js 环境不可用时，跳过截图步骤，直接将生成的 HTML 文件路径或内容返回给用户。

---

## 三种模式

| 模式 | 输出 | 画布 | 风格 |
|------|------|------|------|
| **杂志分页** | 分页图片（每页独立） | **1080×1440px**（3:4） | 冷文艺，衬线体 |
| **杂志长图** | 单页超长图片 | **1080px 宽**，高度无限 | 冷文艺，衬线体 |
| **文章模式** | 单页长图 | **1080px 宽**，高度无限 | 暖白，无衬线，GitHub风 |

---

## 执行流程

### Step 0：读 references（必读）

生成前必须读取以下文件，理解硬约束和 CSS 参数：

```
SPEC/guide.md             — 设计品味指南 + 硬约束
SPEC/mode-MAGAZINE.md     — 杂志分页详细规格
SPEC/mode-MAGAZINE_LONG.md— 杂志长图详细规格
SPEC/mode-ARTICLE.md      — 文章模式详细规格
```

### Step 1：读用户偏好（如存在）

**通过 memory API 读取偏好**（不硬编码路径，通用于所有 skill）：

1. 先用 `memory_search(query="orca-insta preference", corpus=memory)` 搜索已存储的偏好
2. 若有结果，解析 `key:: value` 格式并应用
若无，用 guide.md 默认值

偏好值覆盖 guide.md 的默认值。格式为 `key:: value` 每行。

**偏好写入**：偏好变更时，用 `memory_store(text="...key:: value...")` 写入长期记忆，下次运行时可被检索。

### Step 2：判断模式

| 条件 | 推荐模式 |
|------|---------|
| 内容 300–600 字，单段落核心引用 | 杂志分页 |
| 内容 600–2000 字，有章节结构 | 杂志分页（多页）或杂志长图 |
| 内容 2000+ 字，长篇叙事 | 杂志长图 或 文章模式 |
| 内容为 teaching 正文，要求连贯阅读 | 文章模式 |

---

### Step 3：选择/生成配图（杂志/文章模式）

**仅文章模式使用 image_generate**（生成 hero 图）：
```bash
mmx image generate --prompt "<具体意象，≤3词>" --aspect-ratio 16:9 --out-dir /tmp/orca-insta/
```

**杂志/杂志长图使用 Unsplash**：
```
https://images.unsplash.com/photo-{id}?w=810&h={h}&fit=crop&q=80   # 杂志分页
https://images.unsplash.com/photo-{id}?w=1080&h={h}&fit=crop&q=80  # 杂志长图
https://images.unsplash.com/photo-{id}?w=1080&h=480&fit=crop&q=80   # 文章 hero
https://images.unsplash.com/photo-{id}?w=720&h=360&fit=crop&q=80   # 文章内容配图
```
关键词：自然风景、抽象纹理、极简几何。**避免人物**。

---

### Step 4：注入内容到模板

每种模式有独立 HTML 模板文件（见 `templates/`）：

| 模式 | 模板文件 |
|------|---------|
| 杂志分页 | `templates/magazine.html` |
| 杂志长图 | `templates/magazine-long.html` |
| 文章模式 | `templates/article.html` |

**流程**：读取模板 → 替换 `{{placeholder}}` → 输出 HTML 文件

---

### Step 5：截图

输出目录（跨平台自动识别）：
- 默认：`~/Downloads`（macOS/Linux）或 `~/downloads`（不区分大小写）
- 可通过 `OUTPUT_DIR` 环境变量覆盖（如 `OUTPUT_DIR=/tmp`）
- `capture.js` 内部用 Node.js `path.resolve()` 处理 `~` 路径

**杂志分页**（每页单独截图）：
```bash
node <skill_dir>/assets/capture.js \
  /tmp/orca-insta/mag-{n}.html \
  ~/Downloads/orca-mag-{n}.png \
  1080 1440 fullpage
```

**杂志长图**：
```bash
node <skill_dir>/assets/capture.js \
  /tmp/orca-insta/mag-long.html \
  ~/Downloads/orca-mag-long.png \
  1080 2000 fullpage
```

**文章模式**：
```bash
node <skill_dir>/assets/capture.js \
  /tmp/orca-insta/article.html \
  ~/Downloads/orca-article.png \
  1080 1600 fullpage
```

> `fullpage` 模式根据 body.scrollHeight 自动截图，不裁剪。

---

## 外部依赖说明

### capture.js

截图引擎，**已复制**到 `assets/capture.js`。
原始来源：[ljg-skills/ljg-card](https://github.com/lijigang/ljg-skills)，MIT License。
复制目的：解除外部依赖，保证 skill 独立运行。
如需更新版本，请参考 ljg-card 的最新 capture.js。

### Unsplash API

需要有效的 Unsplash API Key。见 `.env.example` 配置。

---

## 边界

- **禁止** `image_generate` 直接生成含文字的卡片
- **禁止** Inter 字体
- 三种模式 CSS 各自独立，不混用
- **可读性第一**：字数、字号、行高必须符合 SPEC/ 中的硬约束
- 正文基准字号（--BASESIZE）修改后，所有字号自动跟随

---

## EvolvTrace

| 时间 | Round | 触发 | 结果 |
|------|-------|------|------|
| 2026-04-22 | R0 | 骨架 | skeleton |
| 2026-04-22 | R1–3 | 8-cuts 挑战 | 通过验证 |
| 2026-04-22 | R4 | Bos 反馈 | 三种模式定义；短卡是错误输出 |
| 2026-04-22 | R5 | Bos 原始设计 | 重写 skill，3种模式 |
| 2026-04-22 | R6 | Bos 第2轮 | 杂志:3:4(810×1080)+margin平衡+页码在margin |
| 2026-04-22 | R7 | Bos 第3轮 | 杂志图多字少→减图加字；文章用笺theme |
| 2026-04-24 | R8 | Bos + Cody 重构 | SPEC/ 外置；SKILL.md 简化为执行流程；templates/ 抽离HTML |
| 2026-04-24 | R9 | Bos 反馈 v2 | 杂志高对比冷黑白；文章内容区加宽；正文 18px→32px；边距 80px→24px |
| 2026-04-25 | R10 | Bos 开源反馈 | BASESIZE系统；杂志样式统一；capture.js内联；.env.example；目录重组；用户偏好系统 |
| 2026-04-26 | R12 | Bos 重新对齐 taste | guide.md 替代 taste.md；字号改用 1.333³ 推导；硬约束精简为 H1–H4；PAD_H 修正；生成新参考 HTML |
| 2026-04-26 | R12b | 应用参考 HTML 为模板 | ref-magazine/long/article.html → templates/ 覆盖原文件 |
