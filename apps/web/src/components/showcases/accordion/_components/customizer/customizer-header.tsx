"use client";

import React, { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { RotateCcw, SlidersHorizontal, Info } from "lucide-react";
import { cn } from "@/lib/utils";
import { CustomizerTab } from "./constants";

export interface CustomizerHeaderProps {
  modifiedCount: number;
  onReset: () => void;
  activeTab?: CustomizerTab;
  onTabChange?: (tab: CustomizerTab) => void;
}

export function CustomizerHeader({
  modifiedCount,
  onReset,
}: CustomizerHeaderProps) {
  const [isInfoOpen, setIsInfoOpen] = useState(false);
  const infoRef = useRef<HTMLDivElement>(null);

  // Close info tooltip when clicking/tapping outside
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
    <div ref={infoRef} className="relative flex items-center justify-between gap-3 pb-3 border-b border-zinc-200/50 dark:border-zinc-800/50">
      {/* ── Playground Title & Info ── */}
      <div className="flex items-center sm:items-start gap-2.5 sm:gap-3 min-w-0 flex-1">
        <div className="p-1.5 sm:p-2 rounded-xl bg-[var(--theme-primary)]/10 text-[var(--theme-primary)] shrink-0 mt-0.5">
          <SlidersHorizontal className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
        </div>
        <div className="min-w-0 flex-1">
          <div className="flex items-center gap-2 flex-wrap">
            <h3 className="text-xs sm:text-sm font-semibold text-zinc-900 dark:text-zinc-100 tracking-tight">
              Interactive Props Playground
            </h3>

            {/* Mobile Info "i" Tooltip Button (Shown on mobile < sm to save viewport space) */}
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
              title="View playground details"
            >
              <Info className="w-3 h-3" />
            </button>
          </div>

          {/* Desktop Description Paragraph (Hidden on mobile < sm to keep customizer in viewport) */}
          <p className="hidden sm:block text-xs text-zinc-500 dark:text-zinc-400 mt-0.5 leading-relaxed">
            Change any prop below — adjustments reflect instantly on the preview canvas above and generate live TSX code in the right sidebar.
          </p>
        </div>
      </div>

      {/* Right side: Refined Toolbar Reset Button */}
      <div className="shrink-0 pl-1">
        {modifiedCount > 0 ? (
          <motion.button
            type="button"
            onClick={onReset}
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.96 }}
            className="group relative inline-flex items-center gap-1.5 px-2.5 sm:px-3 py-1.5 rounded-full text-xs font-medium text-zinc-900 dark:text-zinc-100 bg-white dark:bg-zinc-800 hover:bg-zinc-50 dark:hover:bg-zinc-700/80 border border-zinc-200/80 dark:border-zinc-700/80 shadow-sm transition-all cursor-pointer select-none"
            title={`Reset ${modifiedCount} modified prop${modifiedCount > 1 ? "s" : ""} to default`}
          >
            <RotateCcw className="w-3.5 h-3.5 text-zinc-500 dark:text-zinc-400 group-hover:-rotate-180 transition-transform duration-500 ease-out" />
            <span className="hidden xs:inline sm:inline">Reset</span>
            <span className="px-1.5 py-0.5 rounded-full text-[10px] font-mono font-bold bg-[var(--theme-primary)] text-white leading-none">
              {modifiedCount}
            </span>
          </motion.button>
        ) : (
          <button
            type="button"
            disabled
            className="inline-flex items-center gap-1.5 px-2.5 sm:px-3 py-1.5 rounded-full text-xs font-medium text-zinc-400 dark:text-zinc-600 bg-transparent cursor-not-allowed opacity-40 select-none"
            title="All props are at default"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span className="hidden xs:inline sm:inline">Reset</span>
          </button>
        )}
      </div>

      {/* Animated Popover Tooltip for Mobile (Full-width within card bounds, never cut off) */}
      <AnimatePresence>
        {isInfoOpen && (
          <motion.div
            initial={{ opacity: 0, y: -4, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -4, scale: 0.98 }}
            transition={{ duration: 0.16, ease: "easeOut" }}
            className="absolute left-0 right-0 top-full mt-1.5 z-50 p-3 rounded-xl bg-white/95 dark:bg-zinc-900/95 backdrop-blur-xl border border-zinc-200/90 dark:border-zinc-800/90 shadow-2xl text-xs text-zinc-600 dark:text-zinc-300 leading-relaxed sm:hidden"
          >
            <div className="font-semibold text-zinc-900 dark:text-zinc-100 mb-1 text-[11px] flex items-center gap-1.5">
              <Info className="w-3.5 h-3.5 text-[var(--theme-primary)] shrink-0" />
              Playground Details
            </div>
            Change any prop below — adjustments reflect instantly on the preview canvas above and generate live TSX code in the right sidebar.
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
