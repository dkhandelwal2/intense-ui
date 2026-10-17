"use client";

import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Code } from "lucide-react";
import { cn } from "@/lib/utils";
import { CodeBlock } from "@/components/ui/code-block";
import { SectionHeader } from "@/components/docs";
import { ComponentCodeLang } from "./types";
import { SidebarMotionSection } from "./sidebar-motion-section";

export interface CodeTabContentProps {
  codeLang: ComponentCodeLang;
  onCodeLangChange: (lang: ComponentCodeLang) => void;
  isCodeLoading: boolean;
  activeTocId?: string;
  codeContent?: string;
  codeContentJs?: string;
  codes?: Record<string, string>;
  codesJs?: Record<string, string>;
}

export function CodeTabContent({
  codeLang,
  onCodeLangChange,
  isCodeLoading,
  activeTocId,
  codeContent,
  codeContentJs,
  codes,
  codesJs,
}: CodeTabContentProps) {
  const getActiveCode = () => {
    if (codeLang === "tsx") {
      return codes && activeTocId && codes[activeTocId]
        ? codes[activeTocId]
        : codeContent || "// No TSX code available";
    }
    return codesJs && activeTocId && codesJs[activeTocId]
      ? codesJs[activeTocId]
      : codeContentJs || "// No JSX code available";
  };

  return (
    <motion.div
      key="code"
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: 20 }}
      transition={{ duration: 0.2 }}
      className="flex flex-col h-full gap-4"
    >
      {/* Header: Code Reference & TSX/JSX language toggle */}
      <SidebarMotionSection>
        <div className="flex items-center justify-between pb-1">
          <SectionHeader
            icon={Code}
            colorScheme="primary"
            title="Code Reference"
            subtitle="Component source code implementation"
            action={
              <div className="flex bg-zinc-100 dark:bg-white/5 p-1 rounded-lg">
                <button
                  onClick={() => onCodeLangChange("tsx")}
                  className={cn(
                    "text-xs px-2.5 py-1 rounded-md transition-colors cursor-pointer",
                    codeLang === "tsx"
                      ? "bg-[var(--theme-primary)] text-white"
                      : "text-zinc-500 hover:text-zinc-900 dark:hover:text-zinc-300"
                  )}
                >
                  TSX
                </button>
                <button
                  onClick={() => onCodeLangChange("js")}
                  className={cn(
                    "text-xs px-2.5 py-1 rounded-md transition-colors cursor-pointer",
                    codeLang === "js"
                      ? "bg-[var(--theme-primary)] text-white"
                      : "text-zinc-500 hover:text-zinc-900 dark:hover:text-zinc-300"
                  )}
                >
                  JSX
                </button>
              </div>
            }
          />
        </div>
        <div className="h-[1px] w-full bg-gradient-to-r from-transparent via-[var(--theme-primary)]/25 to-transparent mt-3 mb-1 shrink-0" />
      </SidebarMotionSection>

      {/* Code Block Content with Skeleton Loading State */}
      <SidebarMotionSection
        delay={0.04}
        className="flex-1 overflow-hidden rounded-xl border border-zinc-200 dark:border-zinc-800 bg-zinc-50/80 dark:bg-[#0c0c0e] relative"
      >
        <AnimatePresence mode="wait">
          {isCodeLoading ? (
            <motion.div
              key="skeleton"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.15 }}
              className="absolute inset-0 p-6 flex flex-col gap-4 bg-zinc-50/80 dark:bg-[#0c0c0e] z-10"
            >
              <div className="h-4 w-3/4 bg-black/5 dark:bg-white/5 rounded-md animate-pulse" />
              <div className="h-4 w-1/2 bg-black/5 dark:bg-white/5 rounded-md animate-pulse [animation-delay:75ms]" />
              <div className="h-4 w-5/6 bg-black/5 dark:bg-white/5 rounded-md animate-pulse [animation-delay:150ms]" />
              <div className="h-4 w-2/3 bg-black/5 dark:bg-white/5 rounded-md animate-pulse [animation-delay:200ms]" />
              <div className="h-4 w-1/3 bg-black/5 dark:bg-white/5 rounded-md animate-pulse [animation-delay:300ms]" />
            </motion.div>
          ) : (
            <motion.div
              key="code"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.15 }}
              className="h-full"
            >
              <CodeBlock
                code={getActiveCode()}
                language={codeLang === "tsx" ? "tsx" : "jsx"}
                className="h-full rounded-none border-0 bg-transparent"
              />
            </motion.div>
          )}
        </AnimatePresence>
      </SidebarMotionSection>
    </motion.div>
  );
}
