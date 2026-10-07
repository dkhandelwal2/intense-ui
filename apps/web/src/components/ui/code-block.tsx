"use client";

import * as React from "react";
import { Check, Copy } from "lucide-react";
import { toast } from "sonner";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { vscDarkPlus } from "react-syntax-highlighter/dist/esm/styles/prism";

interface CodeBlockProps {
  code: string;
  language?: string;
  filename?: string;
}

export function CodeBlock({ code, language = "tsx", filename }: CodeBlockProps) {
  const [hasCopied, setHasCopied] = React.useState(false);

  const onCopy = React.useCallback(() => {
    navigator.clipboard.writeText(code);
    setHasCopied(true);
    toast.success("Copied to clipboard!");
    setTimeout(() => {
      setHasCopied(false);
    }, 2000);
  }, [code]);

  return (
    <div className="relative group rounded-xl bg-zinc-950 border dark:border-zinc-800 overflow-hidden">
      {filename && (
        <div className="flex items-center justify-between px-4 py-2 border-b border-zinc-800 bg-zinc-900/50 text-xs text-zinc-400 font-mono">
          <span>{filename}</span>
          <button
            onClick={onCopy}
            className="inline-flex h-6 w-6 items-center justify-center rounded-md text-zinc-400 hover:text-white hover:bg-[var(--theme-primary)] transition-colors"
          >
            {hasCopied ? <Check className="h-3 w-3 text-[var(--theme-primary)] group-hover:text-white" /> : <Copy className="h-3 w-3" />}
            <span className="sr-only">Copy</span>
          </button>
        </div>
      )}
      {!filename && (
        <div className="absolute right-4 top-4 z-10">
          <button
            onClick={onCopy}
            className="inline-flex h-8 w-8 items-center justify-center rounded-md text-zinc-400 hover:text-white hover:bg-[var(--theme-primary)] transition-colors bg-zinc-950/50 backdrop-blur-sm border border-transparent"
          >
            {hasCopied ? <Check className="h-4 w-4 text-[var(--theme-primary)] group-hover:text-white" /> : <Copy className="h-4 w-4" />}
            <span className="sr-only">Copy</span>
          </button>
        </div>
      )}
      <div className=" overflow-auto text-sm">
        <SyntaxHighlighter
          language={language}
          style={vscDarkPlus}
          customStyle={{
            margin: 0,
            padding: "1rem",
            background: "transparent",
            fontSize: "0.875rem",
          }}
        >
          {code}
        </SyntaxHighlighter>
      </div>
    </div>
  );
}
