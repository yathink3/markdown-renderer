# React Custom Markdown Renderer

This template provides a minimal setup to get React working in Vite with HMR, ESLint, and a lightweight markdown renderer.

## Included Features

- **React** via Vite
- **TypeScript**
- **ESLint** with optional stricter configurations
- **Custom JSX Markdown Renderer** with support for:
  - Headings (`#` to `####`)
  - Inline styles: **bold**, *italic*, ~~strike~~, `inline code`
  - Links: `[text](url)`
  - Images: `![alt](src)`
  - Code blocks: <pre><code>``` code ```</code></pre>

## Markdown Renderer Example

The `MarkdownRenderer` component allows rendering markdown to JSX directly with no external dependencies.

```tsx
import MarkdownRenderer from 'react-markdown-renderer-regie';

<MarkdownRenderer content={markdownString} />
