#!/usr/bin/env node
/**
 * markdown-to-image.js
 * 将 Markdown 转换为 HTML 并截图
 * 
 * 用法: node markdown-to-image.js <markdown内容> <输出图片路径> [宽度]
 * 
 * 示例:
 *   node markdown-to-image.js "# Hello\n\nWorld" /tmp/test.png 1080
 */

const fs = require('fs');
const path = require('path');

const SKILL_DIR = path.dirname(__dirname);
const CAPTURE_SCRIPT = path.join(SKILL_DIR, 'assets/capture.js');

// 如果没有传入内容，从 stdin 读取
function parseMarkdown(md) {
  // 移除末尾空白
  md = md.trim();
  
  // 简单的 Markdown 转 HTML（支持基本元素）
  let html = md;
  
  // 代码块
  html = html.replace(/```(\w*)\n([\s\S]*?)```/g, (_, lang, code) => {
    return `<pre><code class="language-${lang}">${escapeHtml(code.trim())}</code></pre>`;
  });
  
  // 行内代码
  html = html.replace(/`([^`]+)`/g, '<code>$1</code>');
  
  // 标题
  html = html.replace(/^#### (.+)$/gm, '<h4>$1</h4>');
  html = html.replace(/^### (.+)$/gm, '<h3>$1</h3>');
  html = html.replace(/^## (.+)$/gm, '<h2>$1</h2>');
  html = html.replace(/^# (.+)$/gm, '<h1>$1</h1>');
  
  // 引用
  html = html.replace(/^> (.+)$/gm, '<blockquote><p>$1</p></blockquote>');
  
  // 无序列表
  html = html.replace(/^- (.+)$/gm, '<li>$1</li>');
  html = html.replace(/(<li>.*<\/li>\n?)+/g, '<ul>$&</ul>');
  
  // 有序列表
  html = html.replace(/^\d+\. (.+)$/gm, '<li>$1</li>');
  
  // 粗体和斜体
  html = html.replace(/\*\*([^*]+)\*\*/g, '<strong>$1</strong>');
  html = html.replace(/\*([^*]+)\*/g, '<em>$1</em>');
  html = html.replace(/__([^_]+)__/g, '<strong>$1</strong>');
  html = html.replace(/_([^_]+)_/g, '<em>$1</em>');
  
  // 分割线
  html = html.replace(/^---$/gm, '<div class="visual-break"></div>');
  html = html.replace(/^\*\*\*$/gm, '<div class="visual-break"></div>');
  
  // 段落（双换行分隔）
  html = html.replace(/\n\n/g, '</p><p>');
  html = '<p>' + html + '</p>';
  
  // 清理空段落
  html = html.replace(/<p>\s*<\/p>/g, '');
  html = html.replace(/<p>(<h[1-6]>)/g, '$1');
  html = html.replace(/(<\/h[1-6]>)<\/p>/g, '$1');
  html = html.replace(/<p>(<ul>)/g, '$1');
  html = html.replace(/(<\/ul>)<\/p>/g, '$1');
  html = html.replace(/<p>(<pre>)/g, '$1');
  html = html.replace(/(<\/pre>)<\/p>/g, '$1');
  html = html.replace(/<p>(<blockquote>)/g, '$1');
  html = html.replace(/(<\/blockquote>)<\/p>/g, '$1');
  html = html.replace(/<p>(<div class="visual-break">)/g, '$1');
  html = html.replace(/(<\/div>)<\/p>/g, '$1');
  
  return html;
}

function escapeHtml(text) {
  return text
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;');
}

function buildHTML(bodyContent, width = 1080) {
  return `<!DOCTYPE html>
<html lang="zh">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>Markdown Image</title>
<style>
  @import url('https://fonts.googleapis.com/css2?family=Noto+Serif+SC:wght@300;400;600&family=Noto+Sans+SC:wght@300;400;600&family=Fira+Code:wght@400&display=swap');

  :root {
    --BASESIZE: 34px;
    --LINEHEIGHT: 2.0;
    --BGCOLOR: #FAFAF8;
    --TEXTCOLOR: #333333;
    --TEXTHARD: #1a1a1a;
    --MUTED: #888888;
    --BORDER: #e8e6e0;
    --SURFACE: #f2efe9;
    --CANVAS_W: ${width}px;
    --PAD_H: calc(var(--BASESIZE) * 2.0);
  }

  * { margin: 0; padding: 0; box-sizing: border-box; }

  body {
    width: var(--CANVAS_W);
    background: var(--BGCOLOR);
    font-family: 'Noto Serif SC', serif;
    padding: 0 var(--PAD_H) calc(var(--BASESIZE) * 2.4);
    font-size: var(--BASESIZE);
    line-height: var(--LINEHEIGHT);
    color: var(--TEXTCOLOR);
  }

  .content {
    padding-top: calc(var(--BASESIZE) * 1.65);
  }

  h1 {
    font-size: calc(var(--BASESIZE) * 1.333 * 1.333 * 1.333);
    font-weight: 600;
    color: var(--TEXTHARD);
    line-height: 1.3;
    letter-spacing: 0.01em;
    margin-bottom: calc(var(--BASESIZE) * 0.24);
  }

  h2 {
    font-size: calc(var(--BASESIZE) * 1.333 * 1.333);
    font-weight: 600;
    color: var(--TEXTHARD);
    line-height: 1.4;
    margin-top: calc(var(--BASESIZE) * 1.4);
    margin-bottom: calc(var(--BASESIZE) * 0.71);
  }

  h3 {
    font-size: calc(var(--BASESIZE) * 1.333);
    font-weight: 600;
    color: var(--TEXTHARD);
    line-height: 1.5;
    margin-top: calc(var(--BASESIZE) * 1.0);
    margin-bottom: calc(var(--BASESIZE) * 0.59);
  }

  h4 {
    font-size: var(--BASESIZE);
    font-weight: 600;
    color: var(--TEXTHARD);
    line-height: 1.5;
    margin-top: calc(var(--BASESIZE) * 0.71);
    margin-bottom: calc(var(--BASESIZE) * 0.47);
  }

  p {
    font-size: var(--BASESIZE);
    line-height: var(--LINEHEIGHT);
    color: var(--TEXTCOLOR);
    margin-bottom: calc(var(--BASESIZE) * 0.71);
    font-weight: 300;
    letter-spacing: 0.01em;
  }

  blockquote {
    border-left: 2px solid #bbbbbb;
    padding: calc(var(--BASESIZE) * 0.47) calc(var(--BASESIZE) * 0.71);
    margin: calc(var(--BASESIZE) * 0.47) 0 calc(var(--BASESIZE) * 0.82);
  }

  blockquote p {
    font-size: calc(var(--BASESIZE) * 0.65);
    line-height: 1.9;
    color: var(--MUTED);
    margin-bottom: 0;
    font-style: italic;
  }

  pre {
    background: var(--SURFACE);
    border: 1px solid var(--BORDER);
    border-left: 3px solid var(--BORDER);
    padding: calc(var(--BASESIZE) * 0.59) calc(var(--BASESIZE) * 0.71);
    margin: calc(var(--BASESIZE) * 0.47) 0 calc(var(--BASESIZE) * 0.94);
    overflow-x: auto;
  }

  pre code {
    font-family: 'Fira Code', monospace;
    font-size: calc(var(--BASESIZE) * 0.59);
    background: none;
    padding: 0;
    line-height: 1.8;
    color: var(--TEXTHARD);
  }

  code {
    font-family: 'Fira Code', monospace;
    font-size: calc(var(--BASESIZE) * 0.59);
    background: var(--SURFACE);
    padding: 0.1em 0.3em;
    border-radius: 2px;
  }

  ul, ol {
    margin: calc(var(--BASESIZE) * 0.47) 0 calc(var(--BASESIZE) * 0.82);
    padding-left: 1.5em;
  }

  li {
    font-size: var(--BASESIZE);
    line-height: var(--LINEHEIGHT);
    color: var(--TEXTCOLOR);
    margin-bottom: calc(var(--BASESIZE) * 0.35);
    font-weight: 300;
  }

  ul li::marker { color: var(--TEXTHARD); }
  ol li::marker { color: var(--TEXTHARD); font-weight: 600; }

  strong { font-weight: 600; color: var(--TEXTHARD); }
  em { font-style: italic; }

  .visual-break {
    width: 100%;
    height: 1px;
    background: var(--BORDER);
    margin: calc(var(--BASESIZE) * 1.9) 0;
  }
</style>
</head>
<body>
<div class="content">
${bodyContent}
</div>
</body>
</html>`;
}

// 主逻辑
async function main() {
  let markdown = '';
  let outputPath = '';
  let width = 1080;

  // 从命令行参数或 stdin 获取输入
  const args = process.argv.slice(2);
  
  if (args.length >= 2) {
    // 第一个参数是 markdown 内容（或者文件名带 @ 前缀表示从文件读取）
    const input = args[0];
    outputPath = args[1];
    if (args[2]) width = parseInt(args[2], 10);
    
    if (input.startsWith('@')) {
      // 从文件读取
      markdown = fs.readFileSync(input.slice(1), 'utf-8');
    } else {
      markdown = input;
    }
  } else {
    console.error('用法: node markdown-to-image.js <markdown> <输出路径> [宽度]');
    process.exit(1);
  }

  // 解析 Markdown 为 HTML
  const bodyContent = parseMarkdown(markdown);
  
  // 构建完整 HTML
  const html = buildHTML(bodyContent, width);
  
  // 写入临时 HTML 文件
  const tmpHtml = path.join('/tmp', `md-img-${Date.now()}.html`);
  fs.writeFileSync(tmpHtml, html, 'utf-8');
  
  // 计算高度（估算：每 100 字符约 80px 高）
  const estimatedHeight = Math.max(2000, Math.ceil(markdown.length * 0.8));
  
  // 调用 capture.js 截图
  const captureCmd = `node "${CAPTURE_SCRIPT}" "${tmpHtml}" "${outputPath}" ${width} ${estimatedHeight} fullpage`;
  
  return new Promise((resolve, reject) => {
    require('child_process').exec(captureCmd, (err, stdout, stderr) => {
      // 清理临时文件
      try { fs.unlinkSync(tmpHtml); } catch (e) {}
      
      if (err) {
        console.error('截图失败:', stderr);
        reject(err);
      } else {
        console.log('图片已生成:', outputPath);
        resolve(outputPath);
      }
    });
  });
}

main().catch(console.error);