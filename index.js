const documents = [
  {
    id: "getting-started",
    title: "知识库使用说明",
    description: "如何添加和维护 Markdown 文档",
    path: "docs/getting-started.md"
  },
  {
    id: "learning-notes",
    title: "学习笔记",
    description: "记录日常学习和思考",
    path: "docs/learning-notes.md"
  },
  {
    id: "gpt-use",
    title: "gpt 模型使用手册",
    description: "gpt 模型的基本使用",
    path: "docs/gpt-use.md"
  }
];

const documentList = document.querySelector("#document-list");
const documentCount = document.querySelector("#document-count");
const markdownContent = document.querySelector("#markdown-content");

function escapeHtml(value) {
  return value
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");
}

function decodeHtmlAttribute(value) {
  return value
    .replaceAll("&quot;", '"')
    .replaceAll("&#039;", "'")
    .replaceAll("&amp;", "&")
    .replaceAll("&lt;", "<")
    .replaceAll("&gt;", ">");
}

function createImageHtml(attributes) {
  attributes = decodeHtmlAttribute(attributes);
  const sourceMatch = attributes.match(/\bsrc\s*=\s*["']([^"']+)["']/i);
  if (!sourceMatch) {
    return "";
  }

  const source = decodeHtmlAttribute(sourceMatch[1]);
  if (/^(javascript|vbscript|data):/i.test(source)) {
    return "";
  }

  const altMatch = attributes.match(/\balt\s*=\s*["']([^"']*)["']/i);
  const titleMatch = attributes.match(/\btitle\s*=\s*["']([^"']*)["']/i);
  const widthMatch = attributes.match(/\bwidth\s*=\s*["']?([\d.]+%?)(?:px)?["']?/i);
  const alt = altMatch ? decodeHtmlAttribute(altMatch[1]) : "";
  const title = titleMatch ? decodeHtmlAttribute(titleMatch[1]) : "";
  const width = widthMatch ? widthMatch[1] : "";

  return `<img src="${escapeHtml(source)}" alt="${escapeHtml(alt)}"${title ? ` title="${escapeHtml(title)}"` : ""}${width ? ` width="${escapeHtml(width)}"` : ""} loading="lazy" decoding="async" referrerpolicy="no-referrer">`;
}

function renderInlineMarkdown(value) {
  const codePlaceholders = [];
  const imagePlaceholders = [];

  let source = value.replace(/`([^`]+)`/g, (_, code) => {
    codePlaceholders.push(`<code>${escapeHtml(code)}</code>`);
    return `@@CODE_${codePlaceholders.length - 1}@@`;
  });

  source = source.replace(/<img\b([^>]*)>/gi, (_, attributes) => {
    const imageHtml = createImageHtml(attributes);
    if (!imageHtml) {
      return "";
    }
    imagePlaceholders.push(imageHtml);
    return `@@IMAGE_${imagePlaceholders.length - 1}@@`;
  });

  let html = escapeHtml(source);
  html = html.replace(/!\[([^\]]*)\]\(([^\s)]+)(?:\s+["'][^"']*["'])?\)/g, (_, alt, source) => {
    if (/^(javascript|vbscript|data):/i.test(source)) {
      return `![${alt}](${source})`;
    }
    return `<img src="${source}" alt="${alt}" loading="lazy" decoding="async">`;
  });
  html = html.replace(/\[([^\]]+)\]\((https?:\/\/[^\s)]+)\)/g, '<a href="$2" target="_blank" rel="noopener noreferrer">$1</a>');
  html = html.replace(/\*\*([^*]+)\*\*/g, "<strong>$1</strong>");
  html = html.replace(/__([^_]+)__/g, "<strong>$1</strong>");
  html = html.replace(/\*([^*]+)\*/g, "<em>$1</em>");
  html = html.replace(/_([^_]+)_/g, "<em>$1</em>");

  return html
    .replace(/@@CODE_(\d+)@@/g, (_, index) => codePlaceholders[index])
    .replace(/@@IMAGE_(\d+)@@/g, (_, index) => imagePlaceholders[index]);
}

function renderMarkdown(markdown) {
  const lines = markdown.replaceAll("\r\n", "\n").split("\n");
  const html = [];
  let inCodeBlock = false;
  let codeLanguage = "";
  let codeLines = [];
  let listType = null;

  const closeList = () => {
    if (listType) {
      html.push(`</${listType}>`);
      listType = null;
    }
  };

  const closeCodeBlock = () => {
    const languageClass = codeLanguage ? ` class="language-${escapeHtml(codeLanguage)}"` : "";
    html.push(`<pre><code${languageClass}>${escapeHtml(codeLines.join("\n"))}</code></pre>`);
    codeLines = [];
    codeLanguage = "";
  };

  for (const line of lines) {
    const codeFence = line.match(/^\s*```\s*([\w-]*)\s*$/);
    if (codeFence) {
      closeList();
      if (inCodeBlock) {
        closeCodeBlock();
      } else {
        inCodeBlock = true;
        codeLanguage = codeFence[1];
      }
      continue;
    }

    if (inCodeBlock) {
      codeLines.push(line);
      continue;
    }

    if (!line.trim()) {
      closeList();
      continue;
    }

    const heading = line.match(/^(#{1,6})\s+(.+)$/);
    if (heading) {
      closeList();
      const level = heading[1].length;
      html.push(`<h${level}>${renderInlineMarkdown(heading[2])}</h${level}>`);
      continue;
    }

    const unorderedItem = line.match(/^\s*[-*+]\s+(.+)$/);
    const orderedItem = line.match(/^\s*\d+\.\s+(.+)$/);
    if (unorderedItem || orderedItem) {
      const nextListType = unorderedItem ? "ul" : "ol";
      if (listType !== nextListType) {
        closeList();
        listType = nextListType;
        html.push(`<${listType}>`);
      }
      html.push(`<li>${renderInlineMarkdown((unorderedItem || orderedItem)[1])}</li>`);
      continue;
    }

    const quote = line.match(/^\s*>\s?(.*)$/);
    if (quote) {
      closeList();
      html.push(`<blockquote>${renderInlineMarkdown(quote[1])}</blockquote>`);
      continue;
    }

    closeList();
    html.push(`<p>${renderInlineMarkdown(line)}</p>`);
  }

  closeList();
  if (inCodeBlock) {
    closeCodeBlock();
  }
  return html.join("\n");
}

function renderDocumentList(activeId) {
  documentCount.textContent = `${documents.length} 篇`;
  documentList.innerHTML = documents.map((documentItem) => `
    <li>
      <a class="document-item${documentItem.id === activeId ? " is-active" : ""}" href="#knowledge-base/${documentItem.id}">
        <strong>${escapeHtml(documentItem.title)}</strong>
        <span>${escapeHtml(documentItem.description)}</span>
      </a>
    </li>
  `).join("");
}

async function loadDocument(documentItem) {
  renderDocumentList(documentItem.id);
  markdownContent.innerHTML = '<p class="loading-state">正在加载文档……</p>';

  try {
    const response = await fetch(documentItem.path);
    if (!response.ok) {
      throw new Error(`HTTP ${response.status}`);
    }
    const markdown = await response.text();
    markdownContent.innerHTML = renderMarkdown(markdown);
  } catch (error) {
    markdownContent.innerHTML = `
      <div class="error-state">
        <h2>文档加载失败</h2>
        <p>请确认文件 <code>${escapeHtml(documentItem.path)}</code> 存在，并通过网站服务器打开页面。</p>
      </div>
    `;
    console.error("Failed to load Markdown document:", error);
  }
}

function getDocumentIdFromHash() {
  const match = window.location.hash.match(/^#knowledge-base\/([^/]+)$/);
  return match ? decodeURIComponent(match[1]) : documents[0].id;
}

function handleDocumentRoute() {
  const documentId = getDocumentIdFromHash();
  const documentItem = documents.find((item) => item.id === documentId) || documents[0];
  loadDocument(documentItem);
}

window.addEventListener("hashchange", handleDocumentRoute);
handleDocumentRoute();
