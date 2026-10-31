"use client";

import * as React from "react";
import { Check, Copy, Terminal } from "lucide-react";
import { toast } from "sonner";
import { useTheme } from "next-themes";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { vscDarkPlus } from "react-syntax-highlighter/dist/esm/styles/prism";
import { cn } from "@/lib/utils";
import { modernLightTheme } from "@/lib/code-theme";
import { PackageManager, PackageManagerDropdown } from "@/components/ui/package-manager";
import { WindowDots } from "./window-header";

export interface CodeBlockProps {
  code: string;
  language?: string;
  filename?: string;
  terminalTitle?: string;
  headerAction?: React.ReactNode;
  className?: string;
  showLineNumbers?: boolean;
  packageManager?: PackageManager;
  onPackageManagerChange?: (pm: PackageManager) => void;
}

export const CodeBlock = React.memo(function CodeBlock({
  code,
  language = "tsx",
  filename,
  terminalTitle,
  headerAction,
  className,
  showLineNumbers = false,
  packageManager,
  onPackageManagerChange,
}: CodeBlockProps) {
  const [hasCopied, setHasCopied] = React.useState(false);
  const [mounted, setMounted] = React.useState(false);
  const { resolvedTheme } = useTheme();

  React.useEffect(() => {
    setMounted(true);
  }, []);

  const onCopy = React.useCallback(() => {
    navigator.clipboard.writeText(code);
    setHasCopied(true);
    toast.success("Copied to clipboard!");
    setTimeout(() => {
      setHasCopied(false);
    }, 2000);
  }, [code]);

  const isLight = mounted && resolvedTheme === "light";
  const syntaxStyle = isLight ? modernLightTheme : vscDarkPlus;

  const hasHeader = Boolean(filename || terminalTitle || headerAction);
  const isSingleLine = !code.includes("\n") && !hasHeader;

  // Single-line CLI command strip (e.g., npx shadcn@latest add ...)
  if (isSingleLine) {
    return (
      <div className={cn("w-full rounded-xl border border-zinc-200 dark:border-zinc-800 bg-zinc-50/80 dark:bg-[#0c0c0e] px-2.5 sm:px-3 py-2 flex items-center justify-between gap-2.5 shadow-xs transition-colors relative", className)}>
        {packageManager && onPackageManagerChange && (
          <div className="flex items-center gap-2 shrink-0">
            <PackageManagerDropdown value={packageManager} onChange={onPackageManagerChange} size="sm" />
            <div className="w-[1px] h-4 bg-zinc-200 dark:bg-zinc-800 shrink-0" />
          </div>
        )}
        <div className="flex items-center gap-2.5 overflow-x-auto hide-scrollbar min-w-0 flex-1 font-mono text-xs sm:text-[13px]">
          <span className="text-[var(--theme-primary)] font-bold select-none shrink-0">&gt;</span>
          <span className="text-zinc-800 dark:text-zinc-200 whitespace-nowrap select-all font-medium">{code}</span>
        </div>
        <button
          type="button"
          onClick={onCopy}
          className="inline-flex h-7 w-7 items-center justify-center rounded-full text-zinc-500 hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-white bg-white dark:bg-zinc-900 hover:bg-zinc-100 dark:hover:bg-zinc-800 border border-zinc-200 dark:border-zinc-800 shadow-xs transition-all shrink-0 active:scale-95 cursor-pointer"
          title="Copy command"
        >
          {hasCopied ? <Check className="h-3.5 w-3.5 text-emerald-500 dark:text-emerald-400" /> : <Copy className="h-3.5 w-3.5" />}
          <span className="sr-only">Copy</span>
        </button>
      </div>
    );
  }

  return (
    <div
      className={cn(
        "relative group rounded-xl border border-zinc-200 dark:border-zinc-800 bg-zinc-50/80 dark:bg-[#0c0c0e] overflow-hidden shadow-xs transition-colors flex flex-col",
        className
      )}
    >
      {/* Header bar (when filename, terminal title, or custom header action is passed) */}
      {hasHeader && (
        <div className="flex items-center justify-between px-3.5 sm:px-4 py-2 border-b border-zinc-200/80 dark:border-zinc-800/80 bg-zinc-100/50 dark:bg-white/[0.02] text-xs font-mono shrink-0">
          <div className="flex items-center gap-2 min-w-0">
            {terminalTitle ? (
              <>
                <WindowDots size="sm" />
                <div className="h-3.5 w-px bg-zinc-200 dark:bg-zinc-800 mx-0.5" />
                <span className="text-zinc-600 dark:text-zinc-400 flex items-center gap-1.5 truncate">
                  <Terminal className="w-3.5 h-3.5 text-[var(--theme-primary)] shrink-0" />
                  <span className="truncate">{terminalTitle}</span>
                </span>
              </>
            ) : (
              <span className="text-zinc-600 dark:text-zinc-400 truncate">{filename}</span>
            )}
          </div>

          <div className="flex items-center gap-2 shrink-0">
            {packageManager && onPackageManagerChange && (
              <PackageManagerDropdown
                value={packageManager}
                onChange={onPackageManagerChange}
                size="sm"
              />
            )}
            {headerAction}
            <button
              type="button"
              onClick={onCopy}
              className="inline-flex h-6 w-6 items-center justify-center rounded-full text-zinc-500 hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-white hover:bg-zinc-200/60 dark:hover:bg-white/10 transition-colors cursor-pointer"
              title="Copy code"
            >
              {hasCopied ? (
                <Check className="h-3.5 w-3.5 text-emerald-500 dark:text-emerald-400" />
              ) : (
                <Copy className="h-3.5 w-3.5" />
              )}
              <span className="sr-only">Copy</span>
            </button>
          </div>
        </div>
      )}

      {/* Floating copy button (when no header) */}
      {!hasHeader && (
        <div className="absolute right-2.5 top-2.5 z-10">
          <button
            type="button"
            onClick={onCopy}
            className="inline-flex h-7 w-7 items-center justify-center rounded-full text-zinc-500 hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-white bg-white/90 dark:bg-zinc-900/90 hover:bg-zinc-100 dark:hover:bg-zinc-800 border border-zinc-200 dark:border-zinc-800 shadow-xs backdrop-blur-md transition-all active:scale-95 cursor-pointer"
            title="Copy code"
          >
            {hasCopied ? (
              <Check className="h-3.5 w-3.5 text-emerald-500 dark:text-emerald-400" />
            ) : (
              <Copy className="h-3.5 w-3.5" />
            )}
            <span className="sr-only">Copy</span>
          </button>
        </div>
      )}

      {/* Code Area */}
      <div className="overflow-auto subtle-scrollbar text-xs sm:text-[13px] flex-1 min-h-0 w-full">
        {!mounted ? (
          <pre
            className="text-xs sm:text-[13px] text-zinc-800 dark:text-zinc-200 overflow-visible"
            style={{
              margin: 0,
              padding: hasHeader ? "0.875rem 1rem" : "0.875rem 3.5rem 0.875rem 1rem",
              lineHeight: "1.65",
              fontFamily: 'ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, "Liberation Mono", "Courier New", monospace',
            }}
          >
            <code>{code}</code>
          </pre>
        ) : (
          <SyntaxHighlighter
            language={language}
            style={syntaxStyle}
            showLineNumbers={showLineNumbers}
            customStyle={{
              margin: 0,
              padding: hasHeader ? "0.875rem 1rem" : "0.875rem 3.5rem 0.875rem 1rem",
              background: "transparent",
              fontSize: "inherit",
              lineHeight: "1.65",
              overflow: "visible",
            }}
            codeTagProps={{
              style: {
                background: "transparent",
                fontFamily: 'ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, "Liberation Mono", "Courier New", monospace',
              },
            }}
          >
            {code}
          </SyntaxHighlighter>
        )}
      </div>
    </div>
  );
});

export { TerminalWindow } from "./terminal-window";
