"use client";

import React, { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { RotateCcw, SlidersHorizontal, Info } from "lucide-react";
import { cn } from "@/lib/utils";
import { CustomizerTab, TABS } from "./constants";

export interface CustomizerHeaderProps {
  activeTab: CustomizerTab;
  onTabChange: (tab: CustomizerTab) => void;
  modifiedCount: number;
  onReset: () => void;
}

export function CustomizerHeader({
  activeTab,
  onTabChange,
  modifiedCount,
  onReset,
}: CustomizerHeaderProps) {
  const [isInfoOpen, setIsInfoOpen] = useState(false);
  const infoRef = useRef<HTMLDivElement>(null);
  const activeTabRef = useRef<HTMLButtonElement | null>(null);
  const tabContainerRef = useRef<HTMLDivElement>(null);

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

  // Keep active tab fully visible and centered in horizontal scroll container
  useEffect(() => {
    if (activeTabRef.current && tabContainerRef.current) {
      const container = tabContainerRef.current;
      const tab = activeTabRef.current;
      const tabLeft = tab.offsetLeft;
      const tabWidth = tab.offsetWidth;
      const containerWidth = container.offsetWidth;
      const targetScroll = tabLeft - (containerWidth - tabWidth) / 2;
      container.scrollTo({
        left: Math.max(0, targetScroll),
        behavior: "smooth",
      });
    }
  }, [activeTab]);

  return (
    <>
      {/* ── Playground Header & Live Activity Notice ── */}
      <div ref={infoRef} className="relative flex items-center sm:items-start justify-between gap-3 pb-3 sm:pb-3.5 border-b border-zinc-200/50 dark:border-zinc-800/50">
        <div className="flex items-center sm:items-start gap-2.5 sm:gap-3 min-w-0 flex-1">
          <div className="p-1.5 sm:p-2 rounded-xl bg-[var(--theme-primary)]/10 text-[var(--theme-primary)] shrink-0 mt-0.5">
            <SlidersHorizontal className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
          </div>
          <div className="min-w-0 flex-1">
            <div className="flex items-center gap-2 flex-wrap">
              <h3 className="text-xs sm:text-sm font-semibold text-zinc-900 dark:text-zinc-100 tracking-tight">
                Interactive Props Playground
              </h3>
              <span className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded-full text-[10px] font-mono font-medium bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/20 shrink-0">
                <span className="relative flex h-1.5 w-1.5 sm:h-2 sm:w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
                  <span className="relative inline-flex rounded-full h-1.5 w-1.5 sm:h-2 sm:w-2 bg-emerald-500" />
                </span>
                LIVE SYNC
              </span>

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

      {/* ── Category Navigation Tabs & Toolbar Actions ── */}
      <div className="flex items-center justify-between gap-3 pb-1">
        <div
          ref={tabContainerRef}
          className="flex-1 min-w-0 overflow-x-auto no-scrollbar py-0.5 scroll-smooth [scroll-padding:12px]"
        >
          <div className="inline-flex items-center gap-1 p-1 rounded-full bg-black/5 dark:bg-white/[0.04] shrink-0">
            {TABS.map((tab) => {
              const Icon = tab.icon;
              const isActive = activeTab === tab.id;
              return (
                <button
                  key={tab.id}
                  ref={isActive ? activeTabRef : null}
                  type="button"
                  onClick={() => onTabChange(tab.id)}
                  className={cn(
                    "relative flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-medium transition-colors cursor-pointer select-none shrink-0 whitespace-nowrap",
                    isActive
                      ? "text-zinc-950 dark:text-white"
                      : "text-zinc-500 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-zinc-200"
                  )}
                >
                  {isActive && (
                    <motion.div
                      layoutId="customizerActiveTab"
                      className="absolute inset-0 rounded-full bg-white dark:bg-zinc-800 shadow-sm"
                      transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                    />
                  )}
                  <Icon className="w-3.5 h-3.5 relative z-10 shrink-0" />
                  <span className="relative z-10">{tab.label}</span>
                </button>
              );
            })}
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
      </div>
    </>
  );
}
