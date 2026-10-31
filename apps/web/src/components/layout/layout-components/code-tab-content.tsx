"use client";

import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Code, Code2, Sparkles, SlidersHorizontal } from "lucide-react";
import { cn } from "@/lib/utils";
import { CodeBlock } from "@/components/ui/code-block";
import { LAYOUT_CUSTOM_EVENTS } from "../constants";
import { SectionHeader } from "@/components/docs";
import { Separator } from "@/components/ui/separator";
import { CodeSkeleton } from "@/components/ui/skeleton";
import { ComponentCodeLang } from "./types";

export interface CodeTabContentProps {
  codeLang?: ComponentCodeLang;
  onCodeLangChange?: (lang: ComponentCodeLang) => void;
  isCodeLoading?: boolean;
  activeTocId?: string;
  codeContent?: string;
  codeContentJs?: string;
  codes?: Record<string, string>;
  codesJs?: Record<string, string>;
  customizedCode?: string | null;
}

export function CodeTabContent({
  isCodeLoading,
  activeTocId,
  codeContent,
  codes,
  customizedCode,
}: CodeTabContentProps) {
  const [dynamicCodes, setDynamicCodes] = React.useState<Record<string, string>>({});
  const [activeOverrideId, setActiveOverrideId] = React.useState<string | null>(null);

  // Effective customized code from props or dynamic events
  const effectiveCustomCode = customizedCode || dynamicCodes["customization"] || null;

  React.useEffect(() => {
    // When activeTocId changes, reset any override so active card option takes precedence
    setActiveOverrideId(null);
  }, [activeTocId]);

  React.useEffect(() => {
    const handleCodeUpdate = (e: Event) => {
      const customEvent = e as CustomEvent<{ id: string; code: string }>;
      if (customEvent.detail?.id && customEvent.detail?.code) {
        setDynamicCodes((prev) => ({
          ...prev,
          [customEvent.detail.id]: customEvent.detail.code,
        }));
      }
    };

    const handleOpenCode = (e: Event) => {
      const customEvent = e as CustomEvent<{ id?: string }>;
      if (customEvent.detail?.id) {
        setActiveOverrideId(customEvent.detail.id);
      } else {
        setActiveOverrideId("customization");
      }
    };

    window.addEventListener(LAYOUT_CUSTOM_EVENTS.CODE_UPDATE, handleCodeUpdate);
    window.addEventListener(LAYOUT_CUSTOM_EVENTS.OPEN_CODE, handleOpenCode);

    return () => {
      window.removeEventListener(LAYOUT_CUSTOM_EVENTS.CODE_UPDATE, handleCodeUpdate);
      window.removeEventListener(LAYOUT_CUSTOM_EVENTS.OPEN_CODE, handleOpenCode);
    };
  }, []);

  const isCustomizing =
    (activeOverrideId === "customization" || activeTocId === "customization") &&
    Boolean(effectiveCustomCode);

  const getActiveCode = () => {
    // 1. Explicit override from "View Code" event or action
    if (activeOverrideId === "customization" && effectiveCustomCode) {
      return effectiveCustomCode;
    }
    if (activeOverrideId && dynamicCodes[activeOverrideId]) {
      return dynamicCodes[activeOverrideId];
    }
    if (activeOverrideId && codes && codes[activeOverrideId]) {
      return codes[activeOverrideId];
    }

    // 2. Active card's dynamic code (if registered via event)
    if (activeTocId && dynamicCodes[activeTocId]) {
      return dynamicCodes[activeTocId];
    }

    // 3. Active card's example code from dictionary (e.g. dropdown, gooey, chips, basic)
    if (activeTocId && codes && codes[activeTocId]) {
      return codes[activeTocId];
    }

    // 4. Customization card active (if TOC section is customization)
    if (activeTocId === "customization" && effectiveCustomCode) {
      return effectiveCustomCode;
    }

    // 5. Fallback to first available example in codes
    if (codes && Object.keys(codes).length > 0) {
      const firstKey = Object.keys(codes)[0];
      return dynamicCodes[firstKey] || codes[firstKey];
    }

    // 6. Fallback to customized code or default content
    return effectiveCustomCode || codeContent || "";
  };

  const activeCode = getActiveCode();

  return (
    <div className="flex flex-col flex-1 min-h-0 h-full gap-3">
      {/* Header: Code Reference with TSX badge */}
      <div className="shrink-0 space-y-2">
        <div className="flex items-center justify-between pb-1">
          <SectionHeader
            icon={Code}
            colorScheme="primary"
            title="Code Reference"
            badge="TSX"
            subtitle={
              isCustomizing
                ? "Live code updated with your custom props"
                : "Ready-to-use snippet for this variant"
            }
          />
        </div>

        <Separator className="mt-1 mb-1" />
      </div>

      {/* Code Block Content with Skeleton Loading State */}
      <div className="flex-1 min-h-0 flex flex-col relative rounded-xl border border-zinc-200 dark:border-zinc-800 bg-zinc-50/80 dark:bg-[#0c0c0e] overflow-hidden">
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
              <CodeSkeleton lines={5} />
            </motion.div>
          ) : !activeCode || activeCode.trim() === "" ? (
            <motion.div
              key="empty"
              initial={{ opacity: 0, scale: 0.98 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.98 }}
              transition={{ duration: 0.2 }}
              className="h-full min-h-[300px] flex flex-col items-center justify-center p-6 text-center select-none"
            >
              <div className="relative mb-3.5 flex items-center justify-center">
                <div className="w-12 h-12 rounded-2xl bg-zinc-100 dark:bg-white/5 border border-zinc-200 dark:border-zinc-800 flex items-center justify-center shadow-xs">
                  <Code2 className="w-5 h-5 text-zinc-400 dark:text-zinc-500" />
                </div>
                <div className="absolute -bottom-1 -right-1 w-4 h-4 rounded-full bg-[var(--theme-primary)]/15 border border-[var(--theme-primary)]/30 flex items-center justify-center">
                  <Sparkles className="w-2.5 h-2.5 text-[var(--theme-primary)]" />
                </div>
              </div>

              <h4 className="text-xs font-semibold uppercase tracking-wider text-zinc-900 dark:text-zinc-200 mb-1">
                No Code Preview
              </h4>
              <p className="text-xs text-zinc-500 dark:text-zinc-400 max-w-[220px] leading-relaxed">
                Code examples for this component are currently being documented.
              </p>
            </motion.div>
          ) : (
            <motion.div
              key="code"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.15 }}
              className="h-full flex-1 min-h-0 flex flex-col"
            >
              <CodeBlock
                code={activeCode}
                language="tsx"
                className="h-full flex-1 min-h-0 rounded-none border-0 bg-transparent shadow-none"
              />
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
