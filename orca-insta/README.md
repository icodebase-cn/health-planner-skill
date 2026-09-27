# orca-insta 视觉卡片生成技能

**三种模式**：杂志分页 / 杂志长图 / 文章模式

通过 HTML + Playwright 截图生成精美图片，零依赖外部图像生成 API。

---

## ✨ 核心功能

| 模式 | 画布 | 输出 | 风格 |
|------|------|------|------|
| **杂志分页** | 810×1440px（3:4） | 分页独立图片 | 冷文艺，衬线体 |
| **杂志长图** | 1080px 宽，无限高 | 单页超长图片 | 冷文艺，衬线体 |
| **文章模式** | 1080px 宽，无限高 | 单页长图 | 暖白，无衬线 |

---

## 📁 项目结构

```
orca-insta/
├── SKILL.md                    # 主技能文件
├── SPEC/
│   ├── guide.md               # 设计品味指南 + 硬约束
│   ├── mode-MAGAZINE.md       # 杂志分页详细规格
│   ├── mode-MAGAZINE_LONG.md  # 杂志长图详细规格
│   ├── mode-ARTICLE.md        # 文章模式详细规格
│   └── mode-GOLD.md           # 金句模式规格
├── templates/
│   ├── magazine.html          # 杂志分页 HTML 模板
│   ├── magazine-long.html     # 杂志长图 HTML 模板
│   ├── article.html           # 文章模式 HTML 模板
│   └── gold.html              # 金句模式 HTML 模板
├── assets/
│   ├── capture.js             # 截图引擎（基于 Playwright）
│   └── markdown-to-image.js    # Markdown 转图片工具
├── PREFERENCES.md             # 用户视觉偏好（可自定义）
├── .env.example               # 环境变量模板
└── README.md
```

---

## 🚀 快速开始

### 安装依赖

```bash
cd orca-insta
npm install
npx playwright install chromium
```

### 配置环境变量

```bash
cp .env.example .env
# 编辑 .env，填入 Unsplash API Key
```

### 使用方式一：截图模式（优先）

当环境支持 Playwright / Node.js 时，生成 PNG 图片：

```bash
# 生成杂志长图
node assets/capture.js \
  templates/magazine-long.html \
  ~/Downloads/output.png \
  1080 2000 fullpage
```

### 使用方式二：HTML 单文件输出（降级）

当平台**无法运行 Playwright**（如 Coze 云电脑等受限环境）时，
**直接使用 HTML 模板文件**，无需任何 Node.js 依赖：

1. 将 `templates/` 下的 HTML 模板作为参考，注入内容
2. 将生成的完整 HTML 文件提供给用户
3. 用户在浏览器中打开即可查看完整方案

**优点**：所有 CSS 内联，无需 CDN，零依赖，真正的单文件交付。

---

## 🎨 视觉规格

### 杂志分页 / 长图

| 参数 | 值 |
|------|-----|
| 宽度 | 810px（分页）/ 1080px（长图） |
| 高度 | 1440px（分页固定）/ 无限（长图） |
| 背景色 | #FAFAF8 |
| 标题字体 | Noto Serif SC |
| 正文字号 | 22-24px |
| 行高 | ≥1.8 |
| 左右边距 | 48-72px |

### 文章模式

| 参数 | 值 |
|------|-----|
| 宽度 | 1080px |
| 高度 | 无限 |
| 背景色 | #f8f4e9 |
| 正文字号 | 32px（2x 缩放后 16sp） |
| 行高 | ≥2.0 |
| 左右边距 | 24px |

---

## ⚠️ 重要约束

1. **禁止**使用 `image_generate` 直接生成含文字的卡片
2. **禁止** Inter 字体
3. 三种模式 CSS 各自独立，不混用
4. 正文行高 **禁止** 低于 1.8
5. 所有文字色/边框色/分割线 **禁止** 使用纯黑 `#000000`，一律用 `#1a1a1a` 或更浅的深灰

---

## 📚 License

MIT License