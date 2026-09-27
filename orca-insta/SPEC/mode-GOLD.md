# 金句/短句模式

**适用**：一段核心引用，最有 teaching 感的原话；或极短金句（≤30字）。

---

## 风格

- **文艺暖调**，miracle-card 风格
- 暖白底 `#fffdf9`，衬线体
- Hero 图 → 中文金句 → 分割线 → 英文翻译 → 来源

---

## 硬规格

| 参数 | 值 |
|------|-----|
| 画布 | **1080px 宽**，高度 **按内容自适应** |
| Hero 图高度 | 16:9 原图 → **607px**（推荐） |
| 中文金句字号 | **38–42px**，font-weight 600 |
| 英文翻译字号 | **20–22px**，Lora italic |
| 分割线 | 宽 40–48px，高 1px，灰色居中 |
| 来源字号 | **13px**，灰色 |

---

## 结构

```
┌─────────────────────────────┐
│  .hero-wrap (607px高)      │  ← Hero 图（image_generate）
│                             │
│  中文金句（居中，断句）      │  ← 38-42px，600
│  ────── 分割线 ──────      │  ← 48px 宽
│  英文翻译（居中，斜体）      │  ← 20-22px，Lora italic
│  来源标签                   │  ← 13px，灰色
└─────────────────────────────┘
```

---

## Step 1: 选择金句

从 teaching 正文/核心引用中选最有力的一句。标准：
- **具象**，不是抽象概括
- **有声音**，不是分析描述
- 中文 ≤ 50 字（短句模式 ≤ 30 字）

---

## Step 2: 生成 Hero 图

**仅金句模式使用 image_generate**（生成主题匹配氛围图，无文字）：
```bash
mmx image generate --prompt "<具体意象，≤3词>" --aspect-ratio 16:9 --out-dir /tmp/orca-insta/
```

关键词：从金句提取具体意象（冥想→宁静/黎明/山湖；三角关系→三人/圆圈/手；给建议→手/触碰/距离）

---

## Step 3: 断句（强制）

读取中文金句，识别逗号/句号位置，用 `<br>` 替换需要断句处的标点。
- **保留**：`?`、`!`、`——`、`：`
- **删除**断句处的 `,` 和 `.`
- 禁止用破折号替代句号/逗号
- 每行不宜单字成行

---

## Step 4: 翻译（信达雅）

1. **信**：忠实原文内容和节奏，不增减原意
2. **达**：自然流畅，不生硬
3. **雅**：通过断行创造节奏，不靠词汇修饰

---

## Step 5: 注入模板

使用 `templates/gold.html` 模板（见下）。

---

## HTML 模板

```html
<body>
  <div class="hero-wrap">
    <img src="{{HERO_IMG}}" alt="hero">
  </div>
  <div class="content">
    <p class="quote-zh">{{中文金句（已断句）}}</p>
    <div class="divider"></div>
    <p class="quote-en">{{英文翻译}}</p>
    <p class="source">{{来源}}</p>
  </div>
</body>
```

对应 CSS：
```css
body { width: 1080px; background: #fffdf9; min-height: 1440px; display: flex; flex-direction: column; align-items: center; }
.hero-wrap { width: 1080px; height: 607px; overflow: hidden; }
.hero-wrap img { width: 1080px; height: 607px; object-fit: cover; }
.content { width: 100%; padding: 80px 120px; display: flex; flex-direction: column; align-items: center; }
.quote-zh { font-size: 40px; font-weight: 600; line-height: 2.2; text-align: center; color: #2a2a2a; margin-bottom: 48px; letter-spacing: 0.04em; }
.divider { width: 48px; height: 1px; background: #c8c0b4; margin: 0 auto 48px; }
.quote-en { font-family: 'Lora', serif; font-size: 22px; font-style: italic; line-height: 2.2; text-align: center; color: #666666; margin-bottom: 56px; letter-spacing: 0.02em; }
.source { font-size: 13px; color: #aaaaaa; text-align: center; letter-spacing: 0.12em; }
```

---

## 截图

```bash
node ~/.openclaw/extensions/ljg-skills/skills/ljg-card/assets/capture.js \
  /tmp/orca-insta/gold.html \
  /tmp/orca-insta/gold.png \
  1080 1440 fullpage
```

---

## 边界

- **禁止**无 Hero 图的金句卡
- **禁止** image_generate 直接生成含文字的图
- 短句模式（≤30字）中文金句可用稍大字号（44px）
