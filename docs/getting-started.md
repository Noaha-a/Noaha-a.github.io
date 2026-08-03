# 知识库使用说明

这里是一个基于 Markdown 的个人知识库。左侧是文档目录，点击文档后，右侧会加载对应的 Markdown 内容。

## 添加文档

1. 在 `docs` 文件夹中新建一个 `.md` 文件。
2. 打开 `index.js`，在 `documents` 数组中添加文档信息。
3. 提交并发布网站。

例如：

```javascript
{
  id: "my-new-document",
  title: "我的新文档",
  description: "文档简介",
  path: "docs/my-new-document.md"
}
```

支持标题、列表、引用、链接、粗体、斜体和代码块等常用 Markdown 语法。
