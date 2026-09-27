# 杂志分页模式

**适用**：文章内容，分页输出，1080×1440px（3:4），适合小红书。

---

## 风格

- **冷文艺**，清凉色调（白底 + 深灰文字）
- 衬线字体（Noto Serif SC）
- 分页，每页固定三区：Header | Body | Footer

---

## 硬规格

| 参数 | 值 |
|------|-----|
| 画布 | **1080 × 1440px**（3:4，适合小红书） |
| 左右边距 | **96px**（更大左右边距保证阅读） |
| 上边距 | **48px** |
| 下边距 | **40px**（含 footer） |
| 正文字号 | **20px** |
| 行高 | **2.0** |
| 段间距 | **> 行高** |
| 字数/页 | **300–500 字，不超 600 字** |
| 配图 | 每 800–1000 字配 1 张（自然风景/抽象纹理，避免人物） |
| 页码 | **在 margin 里**，9px 灰色，负空间不占内容区 |

---

## 页面结构

```
┌────────────────────────────┐
│  .header                  │  ← tag + h1 + h2 + 分割线
│                            │
│  .body                    │  ← 正文段落 + 可选图片
│  （flex: 1, margin-top:auto）  │
│                            │
│  .footer                  │  ← 来源标签（居左）+ 页码（居右）
└────────────────────────────┘
```

---

## 区块样式

| 区块 | 样式 |
|------|------|
| 标签（tag） | sans-serif, 11px, `#aaaaaa`, 大写字母间距 |
| H1 | serif, 36px, font-weight 600, `#1a1a1a` |
| H2（副标题）| serif, 20px, font-weight 400, `#888888` |
| 正文段落 | serif, 20px, line-height 2.0, `#333333`, font-weight 300 |
| 引用块 | `background: #f2efe9`, `border-left: 2px solid #bbbbbb`, padding 16px 20px |
| 引用正文 | 18px, `#555555`, line-height 1.9 |
| 高亮句 | 22px, font-weight 600, `#1a1a1a`, 上下边框分割 |
| 分割线 | `height: 1px`, `background: #e8e6e0` |
| Footer 来源 | sans-serif, 10px, `#cccccc`, 大写字母间距 |
| 页码 | sans-serif, 9px, `#dddddd`, 放 margin 内 |

---

## HTML 结构

```html
<div class="page">
  <div class="header">
    <div class="tag">{{页码}} · {{章节名}}</div>
    <h1>{{标题}}</h1>
    <h2>{{副标题}}</h2>
    <div class="divider"></div>
  </div>
  <div class="body">
    <p>{{段落正文}}...</p>
    <!-- 可选图片 -->
    <blockquote><p>{{引用}}</p></blockquote>
  </div>
  <div class="footer">
    <span class="source">{{来源}}</span>
    <span class="page-num">{{页码}}</span>
  </div>
</div>
```

---

## 可读性标准

- 正文字号 **≥18px，不超过 22px**
- 行高 **1.8–2.2**
- 段间距 **> 行间距**
- 每页 **300–500 字，不超 600 字**
- **每 800–1000 字配 1 张图**
