"use client";

import React, { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { RotateCcw, SlidersHorizontal, Info } from "lucide-react";
import { cn } from "@/lib/utils";

export interface CustomizerHeaderProps {
  modifiedCount: number;
  onReset: () => void;
}

export function CustomizerHeader({
  modifiedCount,
  onReset,
}: CustomizerHeaderProps) {
  const [isInfoOpen, setIsInfoOpen] = useState(false);
  const infoRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!isInfoOpen) return;
    const handleClickOutside = (e: MouseEvent | TouchEvent) => {
      if (infoRef.current && !infoRef.current.contains(e.target as Node)) {
        setIsInfoOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    document.addEventListener("touchstart", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("touchstart", handleClickOutside);
    };
  }, [isInfoOpen]);

  return (
    <div
      ref={infoRef}
      className="relative flex items-center justify-between gap-3 pb-3 border-b border-zinc-200/50 dark:border-zinc-800/50"
    >
      {/* Playground Title & Info */}
      <div className="flex items-center sm:items-start gap-2.5 sm:gap-3 min-w-0 flex-1">
        <div className="p-1.5 sm:p-2 rounded-xl bg-[var(--theme-primary)]/10 text-[var(--theme-primary)] shrink-0 mt-0.5">
          <SlidersHorizontal className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
        </div>
        <div className="min-w-0 flex-1">
          <div className="flex items-center gap-2 flex-wrap">
            <h3 className="text-xs sm:text-sm font-semibold text-zinc-900 dark:text-zinc-100 tracking-tight">
              Interactive Props Playground
            </h3>

            <button
              type="button"
              onClick={() => setIsInfoOpen((prev) => !prev)}
              className={cn(
                "sm:hidden w-5 h-5 rounded-full flex items-center justify-center transition-colors cursor-pointer select-none shrink-0",
                isInfoOpen
                  ? "bg-[var(--theme-primary)] text-white"
                  : "bg-zinc-200/80 dark:bg-zinc-800 text-zinc-600 dark:text-zinc-300 hover:text-zinc-900 dark:hover:text-white"
              )}
              aria-label="Toggle playground information"
            >
              <Info className="w-3 h-3" />
            </button>
          </div>
          <p className="text-[11px] text-zinc-500 dark:text-zinc-400 leading-tight hidden sm:block mt-0.5">
            Test and tweak styles, separators, sizing, and colors live
          </p>
        </div>
      </div>

      {/* Reset & Modified Badge */}
      <div className="flex items-center gap-2 shrink-0">
        {modifiedCount > 0 && (
          <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-[var(--theme-primary)]/10 text-[var(--theme-primary)] border border-[var(--theme-primary)]/20 font-semibold animate-in fade-in zoom-in-95">
            {modifiedCount} {modifiedCount === 1 ? "prop" : "props"}
          </span>
        )}

        <button
          type="button"
          onClick={onReset}
          disabled={modifiedCount === 0}
          className={cn(
            "flex items-center gap-1.5 px-2.5 py-1 text-xs font-medium rounded-lg transition-all cursor-pointer border",
            modifiedCount > 0
              ? "border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 text-zinc-700 dark:text-zinc-300 hover:text-zinc-900 dark:hover:text-white hover:border-zinc-300 dark:hover:border-zinc-700 shadow-2xs"
              : "opacity-40 cursor-not-allowed border-transparent text-zinc-400"
          )}
        >
          <RotateCcw className="w-3 h-3" />
          <span className="hidden sm:inline">Reset</span>
        </button>
      </div>

      {/* Mobile Tooltip Popover */}
      <AnimatePresence>
        {isInfoOpen && (
          <motion.div
            initial={{ opacity: 0, y: 6, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 6, scale: 0.96 }}
            transition={{ duration: 0.15, ease: "easeOut" }}
            className="sm:hidden absolute top-full left-0 right-0 mt-2 z-30 p-3 rounded-xl border border-zinc-200 dark:border-zinc-800 bg-white/95 dark:bg-zinc-900/95 shadow-xl shadow-zinc-950/10 dark:shadow-black/50 backdrop-blur-md text-xs text-zinc-600 dark:text-zinc-400 space-y-1"
          >
            <p className="font-semibold text-zinc-900 dark:text-zinc-100 flex items-center gap-1.5">
              <Info className="w-3.5 h-3.5 text-[var(--theme-primary)]" />
              Live Breadcrumb Playground
            </p>
            <p className="text-[11px] leading-relaxed">
              Tweak variants, separators, icons, colors, and dropdown toggles to generate production-ready code in real-time.
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
