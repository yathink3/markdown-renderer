import React from "react";

type Pattern = {
  name: string;
  regex: RegExp;
  render: (match: RegExpExecArray, key: number) => React.ReactNode;
};

const inlinePatterns: Pattern[] = [
  {
    name: "image",
    regex: /!\[([^\]]+)\]\(([^)]+)\)/g,
    render: (m, k) => (
      <img key={k} src={m[2]} alt={m[1]} className="inline-block" />
    ),
  },
  {
    name: "link",
    regex: /\[([^\]]+)\]\(([^)]+)\)/g,
    render: (m, k) => (
      <a key={k} href={m[2]} className="text-blue-600 underline">
        {m[1]}
      </a>
    ),
  },
  {
    name: "code",
    regex: /`([^`]+)`/g,
    render: (m, k) => <code key={k}>{m[1]}</code>,
  },
  {
    name: "bold",
    regex: /\*\*([^*]+)\*\*/g,
    render: (m, k) => <strong key={k}>{m[1]}</strong>,
  },
  {
    name: "italic",
    regex: /\*([^*]+)\*/g,
    render: (m, k) => <em key={k}>{m[1]}</em>,
  },
  {
    name: "strike",
    regex: /~~([^~]+)~~/g,
    render: (m, k) => <s key={k}>{m[1]}</s>,
  },
];

const applyInlinePatterns = (text: string): React.ReactNode[] => {
  for (const { regex, render } of inlinePatterns) {
    const matches = Array.from(text.matchAll(regex));
    if (matches.length === 0) continue;
    const result: React.ReactNode[] = [];
    let lastIndex = 0;
    matches.forEach((match) => {
      const [fullMatch] = match;
      const index = match.index ?? 0;
      if (index > lastIndex) {
        result.push(text.slice(lastIndex, index));
      }
      result.push(render(match, result.length));
      lastIndex = index + fullMatch.length;
    });
    if (lastIndex < text.length) {
      result.push(text.slice(lastIndex));
    }
    return result.flatMap((el) =>
      typeof el === "string" ? applyInlinePatterns(el) : el
    );
  }

  return [text];
};

const headingParsers: Pattern[] = [
  {
    name: "h4",
    regex: /^#### (.+)/,
    render: (m, k) => <h4 key={k}>{applyInlinePatterns(m[1])}</h4>,
  },
  {
    name: "h3",
    regex: /^### (.+)/,
    render: (m, k) => <h3 key={k}>{applyInlinePatterns(m[1])}</h3>,
  },
  {
    name: "h2",
    regex: /^## (.+)/,
    render: (m, k) => <h2 key={k}>{applyInlinePatterns(m[1])}</h2>,
  },
  {
    name: "h1",
    regex: /^# (.+)/,
    render: (m, k) => <h1 key={k}>{applyInlinePatterns(m[1])}</h1>,
  },
];

type MarkdownRendererProps = {
  content: string;
};

const MarkdownRenderer: React.FC<MarkdownRendererProps> = ({ content }) => {
  const lines = content.split(/\r?\n/);
  const output: React.ReactNode[] = [];

  let insideCodeBlock = false;
  let codeBuffer: string[] = [];

  lines.forEach((line, i) => {
    if (line.trim().startsWith("```")) {
      if (insideCodeBlock) {
        output.push(
          <pre key={`code${i}`}>
            <code>{codeBuffer.join("\n")}</code>
          </pre>
        );
        insideCodeBlock = false;
      } else {
        insideCodeBlock = true;
        codeBuffer = [];
      }
      return;
    }

    if (insideCodeBlock) {
      codeBuffer.push(line);
      return;
    }

    for (const { regex, render } of headingParsers) {
      const match = regex.exec(line);
      if (match) {
        output.push(render(match, i));
        return;
      }
    }

    if (line.trim()) {
      output.push(<p key={`p${i}`}>{applyInlinePatterns(line)}</p>);
    }
  });

  return <div className="prose">{output}</div>;
};

export default MarkdownRenderer;
