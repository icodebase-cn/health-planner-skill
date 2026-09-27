# 文章模式

**适用**：长篇内容，渲染为一张长图，OrcaInsta 笺 theme 样式。

---

## 风格

- **轻松易读**，手机版友好
- 无衬线字体（Noto Sans SC / PingFang SC）
- **暖白底** `#f8f4e9`，暖灰文字（**严禁纯黑 `#000000`**）
- 固定宽度 1080px，高度无限，fullpage 自动截图

---

## 硬规格

| 参数 | 值 |
|------|-----|
| 画布宽 | **1080px** |
| 高度 | **无限**，fullpage 自动截图 |
| 左右边距 | **各 24px**（手机友好，10–30px 范围） |
| 内容区最大宽 | **≈1032px**（1080 – 24×2） |
| Hero 图 | **1080px 宽，480px 高** |
| 正文字号 | **32px**（手机 2x 缩放后 16sp，符合 ≥16sp 标准） |
| 行高 | **2.2** |
| H2 字 | **36px**，font-weight 600 |
| H2 左边框 | **3px solid #1a1a1a**（暖调近黑，非纯黑） |
| H3 字 | **28px** |
| 引用字 | **28px**，斜体 |
| 段间距 | **> 行高** |

---

## 与杂志长图的关键差异

| 项目 | 杂志长图（冷） | 文章模式 |
|------|--------------|---------|
| 色调 | 冷白底 `#FAFAF8`，深灰文字 `#1a1a1a` | 暖白底 `#f8f4e9`，深灰文字 `#333333` |
| 字体 | 衬线（Noto Serif SC）| 无衬线（Noto Sans SC）|
| H2 左边框 | `#1a1a1a` | `#1a1a1a` |
| 正文字号 | 20px | **32px** |
| 左右边距 | 72px | **24px** |

---

## 区块样式

| 区块 | 规格 |
|------|------|
| Hero 图 | 1080×480px, object-fit: cover |
| eyebrow | sans-serif, 12px, `#888888`, 大写字母间距 |
| H1 | sans-serif, 52px, font-weight 600, `#1a1a1a`, 底边 2px solid `#1a1a1a` |
| 副标题 | sans-serif, 20px, `#555555` |
| 正文 | sans-serif, 32px, line-height 2.2, `#333333`, font-weight 300 |
| 引导段 | 36px, line-height 2.0, `#333333`, font-weight 400 |
| H2 | sans-serif, 36px, font-weight 600, `#1a1a1a`, **border-left: 3px solid #1a1a1a** |
| H3 | sans-serif, 28px, font-weight 600, `#1a1a1a` |
| 引用块 | `border-left: 3px solid #1a1a1a`, padding 20px 28px |
| 引用正文 | 28px, `#555555`, italic, line-height 2.0 |
| 底部来源条 | border-top: 1px solid `#d4cfc5`, padding-top: 20px |

---

## HTML 结构

```html
<body>
  <img class="hero-img" src="{{unsplash}}">
  <div class="inner">
    <div class="eyebrow">{{来源}}</div>
    <h1>{{标题}}</h1>
    <p class="subtitle">{{副标题}}</p>
    <p class="lead">{{引导段}}</p>

    <h2>{{小节标题}}</h2>
    <p>{{正文段落}}</p>
    <blockquote><p>{{引用}}</p></blockquote>

    <h2>{{小节标题}}</h2>
    <p>{{正文段落}}</p>
  </div>
  <div class="bottom-bar">
    <span class="source-tag">{{来源}}</span>
  </div>
</body>
```

---

## 可读性标准

- 正文字号 **32px**（≥16sp × 2x 缩放）
- 行高 **≥1.8**
- 左右边距 **各 10–30px**
- 内容区宽 **≈1032px**（1080px 画布）
- 段间距 **> 行高**
