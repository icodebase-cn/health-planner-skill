# 杂志长图模式

**适用**：单页超长图片，冷文艺风格，不分页，全内容一图。

---

## 风格

- **冷文艺**，白底 `#FAFAF8` + 深灰文字，与杂志分页完全一致
- 不分页，全内容一张图
- 3–4 张 Unsplash 配图（自然风景/抽象纹理，避免人物）

---

## 硬规格

| 参数 | 值 |
|------|-----|
| 画布宽 | **1080px** |
| 高度 | **无限**，fullpage 自动截图 |
| 左右边距 | **72px** |
| 正文字号 | **20px** |
| 行高 | **2.0** |
| 段间距 | **> 行高** |
| 配图节奏 | **每 800–1000px 有一个视觉打断**（标题/引用/分割线/图片） |

---

## 与杂志分页的差异

| 项目 | 杂志分页 | 杂志长图 |
|------|---------|---------|
| 宽度 | 810px | 1080px |
| 高度 | 1080px（固定） | 无限（内容决定） |
| 分页 | 分页，每页独立截图 | 不分页，单张 fullpage |
| 页码 | 有（margin 内） | 无 |

---

## 视觉打断设计

长图每 800–1000px 内容需要一个视觉节奏点：
- 标题（H2）插入 → 48px 额外上方间距
- 引用块 → 天然节奏点
- 分割线 → 替代分页边界
- 配图 → 强烈视觉锚点，插入后重新校准周围间距

---

## 区块样式

（与杂志分页完全一致，尺寸等比放大至 1080px 宽度）

| 区块 | 规格 |
|------|------|
| H1 | serif, 42–48px, font-weight 600 |
| H2 | serif, 28–32px, font-weight 600 |
| 正文 | serif, 20px, line-height 2.0, `#333333` |
| 引用块 | `background: #f2efe9`, `border-left: 2px solid #bbbbbb` |
| 配图 | `width: 1080px`, 高度按比例，object-fit: cover |

---

## HTML 结构

```html
<div class="long-mag">
  <div class="header">
    <h1>{{标题}}</h1>
    <h2>{{副标题}}</h2>
    <div class="divider"></div>
  </div>
  <div class="body">
    <p>{{段落正文}}</p>
    <blockquote><p>{{引用}}</p></blockquote>
    <img class="content-img" src="{{unsplash}}">
    <!-- 重复内容块，每 800-1000px 有视觉打断 -->
  </div>
  <div class="footer">
    <span class="source">{{来源}}</span>
  </div>
</div>
```

---

## 配图 Unsplash 格式

```
https://images.unsplash.com/photo-{id}?w=1080&h={h}&fit=crop&q=80
```
关键词：自然风景、抽象纹理、极简几何。避免人物。
