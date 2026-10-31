"use client";

import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Sliders, Layers } from "lucide-react";
import { cn } from "@/lib/utils";
import { CodeBlock } from "@/components/ui/code-block";

export interface DeckCodeViewerProps {
  activeCodeTab: "example" | "custom" | "props";
  setActiveCodeTab: (tab: "example" | "custom" | "props") => void;
  activeTocId: string;
  currentDisplayedCode: string;
  propsTable?: React.ReactNode;
}

export const DeckCodeViewer = React.memo(function DeckCodeViewer({
  activeCodeTab,
  setActiveCodeTab,
  activeTocId,
  currentDisplayedCode,
  propsTable,
}: DeckCodeViewerProps) {
  const tabs = [
    {
      id: "example" as const,
      label: "Active",
      indicator: (isActive: boolean) => (
        <span
          className={cn(
            "w-1.5 h-1.5 rounded-full shrink-0",
            isActive ? "bg-emerald-500 animate-pulse" : "bg-muted-foreground/40"
          )}
        />
      ),
    },
    {
      id: "custom" as const,
      label: "Custom",
      indicator: () => <Sliders className="w-3.5 h-3.5 shrink-0 text-orange-500" />,
    },
    {
      id: "props" as const,
      label: "Props",
      indicator: () => <Layers className="w-3.5 h-3.5 shrink-0 text-indigo-500" />,
    },
  ];

  return (
    <div className="flex-1 min-h-0 flex flex-col h-full w-full select-text">
      {/* Top Tab Bar: Active, Custom, Props */}
      <div className="mb-2.5 p-1 rounded-xl bg-zinc-100 dark:bg-zinc-800/80 border border-zinc-200 dark:border-zinc-700/80 flex items-center gap-1 w-full select-none overflow-hidden shrink-0">
        {tabs.map((tab) => {
          const isActive = activeCodeTab === tab.id;
          return (
            <button
              key={tab.id}
              type="button"
              onClick={() => setActiveCodeTab(tab.id)}
              className={cn(
                "flex-1 min-w-0 flex items-center justify-center gap-1.5 py-1.5 px-2 rounded-lg text-xs font-semibold transition-all cursor-pointer",
                isActive
                  ? "bg-white dark:bg-zinc-900 text-foreground shadow-xs border border-zinc-200 dark:border-zinc-700"
                  : "text-muted-foreground hover:text-foreground hover:bg-zinc-200/50 dark:hover:bg-zinc-800"
              )}
            >
              {tab.indicator(isActive)}
              <span className="truncate">{tab.label}</span>
            </button>
          );
        })}
      </div>

      {/* Code & Props Panel Area */}
      {activeCodeTab === "props" ? (
        <div className="p-3 rounded-xl bg-muted/40 border border-border text-foreground overflow-y-auto subtle-scrollbar flex-1 min-h-0">
          {propsTable || (
            <p className="text-xs text-muted-foreground">No props documentation available.</p>
          )}
        </div>
      ) : (
        <div className="relative rounded-xl border border-border flex-1 min-h-0 flex flex-col overflow-hidden w-full h-full">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeCodeTab + (activeCodeTab === "example" ? activeTocId : "")}
              initial={{ opacity: 0, y: 6 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -6 }}
              transition={{ duration: 0.16 }}
              className="absolute inset-0 flex flex-col w-full h-full min-h-0 overflow-hidden"
            >
              <CodeBlock
                code={currentDisplayedCode}
                language="tsx"
                className="w-full h-full flex-1 min-h-0 rounded-none border-0 bg-transparent shadow-none"
              />
            </motion.div>
          </AnimatePresence>
        </div>
      )}
    </div>
  );
});
