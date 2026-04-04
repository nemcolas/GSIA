"use client";

import { Fragment, ReactElement } from "react";

// ── Types ──────────────────────────────────────────────────────────────────

type Output = {
  output_type: "stream" | "display_data" | "execute_result" | "error";
  text?: string[];
  data?: {
    "image/png"?: string;
    "text/plain"?: string[];
    "text/html"?: string[];
  };
  name?: string; // "stdout" | "stderr"
};

export type NotebookCell = {
  cell_type: "code" | "markdown" | "raw";
  source: string[];
  outputs?: Output[];
  execution_count?: number | null;
};

// ── Helpers ────────────────────────────────────────────────────────────────

function joinSource(src: string[]) {
  return src.join("");
}

function isInsightCell(src: string) {
  // Markdown cells that contain analysis conclusions
  return (
    src.length > 60 &&
    !src.startsWith("##") &&
    !src.startsWith("*") &&
    !src.startsWith("-") &&
    src.trim() !== ""
  );
}

// Very small markdown → JSX (handles what the notebooks actually use)
function MarkdownContent({ src }: { src: string }) {
  const lines = src.split("\n");
  const out: ReactElement[] = [];
  let i = 0;

  while (i < lines.length) {
    const line = lines[i];

    if (line.startsWith("### ")) {
      out.push(
        <h4 key={i} className="text-base font-semibold text-white mt-3 mb-1">
          {line.slice(4)}
        </h4>
      );
    } else if (line.startsWith("## ")) {
      out.push(
        <h3 key={i} className="text-lg font-semibold text-white mt-4 mb-2">
          {line.slice(3)}
        </h3>
      );
    } else if (line.startsWith("# ")) {
      out.push(
        <h2 key={i} className="text-xl font-bold text-white mt-4 mb-2">
          {line.slice(2)}
        </h2>
      );
    } else if (line.startsWith("* ") || line.startsWith("- ")) {
      const items: string[] = [];
      while (i < lines.length && (lines[i].startsWith("* ") || lines[i].startsWith("- "))) {
        items.push(lines[i].slice(2));
        i++;
      }
      out.push(
        <ul key={`ul-${i}`} className="space-y-1 my-2">
          {items.map((item, j) => (
            <li key={j} className="flex gap-2 text-gray-300 text-sm leading-relaxed">
              <span className="text-green-500 mt-0.5 flex-shrink-0">▸</span>
              <InlineMarkdown text={item} />
            </li>
          ))}
        </ul>
      );
      continue;
    } else if (line.trim() === "") {
      out.push(<div key={`sp-${i}`} className="h-1.5" />);
    } else {
      out.push(
        <p key={i} className="text-gray-300 text-sm leading-relaxed">
          <InlineMarkdown text={line} />
        </p>
      );
    }
    i++;
  }

  return <>{out}</>;
}

// Handle **bold** and `code` inline
function InlineMarkdown({ text }: { text: string }) {
  const parts: ReactElement[] = [];
  let remaining = text;
  let idx = 0;

  while (remaining.length > 0) {
    const boldMatch = remaining.match(/\*\*(.+?)\*\*/);
    const codeMatch = remaining.match(/`(.+?)`/);

    let nextBold = boldMatch ? remaining.indexOf(boldMatch[0]) : Infinity;
    let nextCode = codeMatch ? remaining.indexOf(codeMatch[0]) : Infinity;

    if (nextBold === Infinity && nextCode === Infinity) {
      parts.push(<Fragment key={idx++}>{remaining}</Fragment>);
      break;
    }

    if (nextBold <= nextCode && boldMatch) {
      if (nextBold > 0) parts.push(<Fragment key={idx++}>{remaining.slice(0, nextBold)}</Fragment>);
      parts.push(<strong key={idx++} className="text-white font-semibold">{boldMatch[1]}</strong>);
      remaining = remaining.slice(nextBold + boldMatch[0].length);
    } else if (codeMatch) {
      if (nextCode > 0) parts.push(<Fragment key={idx++}>{remaining.slice(0, nextCode)}</Fragment>);
      parts.push(
        <code key={idx++} className="px-1.5 py-0.5 bg-gray-800 rounded text-green-400 text-xs font-mono">
          {codeMatch[1]}
        </code>
      );
      remaining = remaining.slice(nextCode + codeMatch[0].length);
    }
  }

  return <>{parts}</>;
}

// ── Cell renderers ─────────────────────────────────────────────────────────

function MarkdownCell({ source, index }: { source: string; index: number }) {
  const insight = isInsightCell(source) && !source.startsWith("#");
  return (
    <div
      className={`px-6 py-4 ${
        insight
          ? "border-l-2 border-green-500/40 bg-green-500/5"
          : "border-l-2 border-transparent"
      }`}
    >
      <MarkdownContent src={source} />
    </div>
  );
}

function StreamOutput({ text, name }: { text: string[]; name?: string }) {
  const content = text
    .join("")
    .split("\n")
    .filter((l) => !l.includes("FutureWarning") && !l.includes("Passing `palette`") && !l.includes("deprecated"))
    .join("\n")
    .trim();

  if (!content) return null;

  return (
    <div className="mt-2 rounded-lg bg-gray-950 border border-gray-800 overflow-hidden">
      <div className="px-3 py-1.5 border-b border-gray-800 flex items-center gap-2">
        <span className="w-1.5 h-1.5 rounded-full bg-gray-600" />
        <span className="text-xs text-gray-600 font-mono">output</span>
      </div>
      <pre className="px-4 py-3 text-xs font-mono text-gray-400 overflow-x-auto whitespace-pre-wrap leading-relaxed">
        {content}
      </pre>
    </div>
  );
}

function ImageOutput({ b64 }: { b64: string }) {
  return (
    <div className="mt-3">
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={`data:image/png;base64,${b64}`}
        alt="Gráfico gerado pelo notebook"
        className="rounded-xl max-w-full border border-gray-800"
      />
    </div>
  );
}

function CellOutputs({ outputs }: { outputs: Output[] }) {
  return (
    <div className="mt-1 space-y-1">
      {outputs.map((out, i) => {
        if (out.output_type === "stream" && out.text) {
          return <StreamOutput key={i} text={out.text} name={out.name} />;
        }
        if (
          (out.output_type === "display_data" || out.output_type === "execute_result") &&
          out.data
        ) {
          const png = out.data["image/png"];
          if (png) return <ImageOutput key={i} b64={png} />;
          const plain = out.data["text/plain"];
          if (plain) {
            const content = plain.join("").trim();
            if (
              content &&
              !content.startsWith("<Axes") &&
              !content.startsWith("<Figure")
            ) {
              return (
                <div key={i} className="mt-2 rounded-lg bg-gray-950 border border-gray-800 overflow-hidden">
                  <pre className="px-4 py-3 text-xs font-mono text-gray-400 overflow-x-auto">
                    {content}
                  </pre>
                </div>
              );
            }
          }
        }
        return null;
      })}
    </div>
  );
}

function CodeCell({
  source,
  outputs,
  count,
}: {
  source: string;
  outputs: Output[];
  count: number | null;
}) {
  return (
    <div className="px-6 py-3">
      <div className="rounded-xl overflow-hidden border border-gray-800">
        <div className="flex items-center justify-between px-4 py-2 bg-gray-900/80 border-b border-gray-800">
          <span className="text-xs font-mono text-gray-600">
            In [{count ?? " "}]
          </span>
          <span className="text-xs text-gray-700 font-mono">python</span>
        </div>
        <pre className="px-4 py-3 text-xs font-mono text-gray-300 overflow-x-auto leading-relaxed bg-gray-950">
          <code>{source}</code>
        </pre>
      </div>
      {outputs.length > 0 && <CellOutputs outputs={outputs} />}
    </div>
  );
}

// ── Public component ───────────────────────────────────────────────────────

export function NotebookViewer({ cells }: { cells: NotebookCell[] }) {
  let codeIndex = 0;

  return (
    <div className="divide-y divide-gray-800/40">
      {cells.map((cell, i) => {
        const src = joinSource(cell.source);
        if (!src.trim()) return null;

        if (cell.cell_type === "markdown") {
          return <MarkdownCell key={i} source={src} index={i} />;
        }

        if (cell.cell_type === "code") {
          codeIndex++;
          return (
            <CodeCell
              key={i}
              source={src}
              outputs={cell.outputs ?? []}
              count={cell.execution_count ?? codeIndex}
            />
          );
        }

        return null;
      })}
    </div>
  );
}
