"use client";

import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { cn } from "@/lib/utils";
import { TocItem } from "./types";

function DockActiveIndicator() {
  return (
    <motion.div
      layoutId="dock-active-bg"
      className="absolute bottom-full left-1/2 -translate-x-1/2 w-[70px] sm:w-[100px] h-[16px] sm:h-[24px] z-0"
    >
      <svg
        width="100%"
        height="100%"
        viewBox="0 0 100 24"
        preserveAspectRatio="none"
        className="fill-[#f2f0ef] dark:fill-[#1a1a1a]"
        aria-hidden="true"
      >
        <path d="M0 24 C 15 24, 25 0, 50 0 C 75 0, 85 24, 100 24 Z" />
      </svg>
      <div className="absolute top-[4px] sm:top-[7px] left-1/2 -translate-x-1/2 w-[28px] sm:w-[36px] h-[28px] sm:h-[36px] rounded-full border border-[var(--theme-primary)]/20 bg-[var(--theme-primary)]/10 shadow-[0_0_15px_var(--theme-primary)]/20" />
    </motion.div>
  );
}

export interface ComponentTocDockProps {
  tocItems: TocItem[];
  activeTocId?: string;
  onSelectSection: (id: string, index: number) => void;
}

export function ComponentTocDock({
  tocItems,
  activeTocId,
  onSelectSection,
}: ComponentTocDockProps) {
  if (tocItems.length === 0) return null;

  const allItems = tocItems.map((item, idx) => ({ ...item, idx }));
  const N = allItems.length;
  const MAX = 7;
  const activeIdx = allItems.findIndex((i) => i.id === activeTocId) ?? 0;

  type VisibleBtn =
    | { type: "item"; item: (typeof allItems)[0] }
    | { type: "prev" | "next"; count: number; targetIdx: number };

  let visibleButtons: VisibleBtn[] = [];
  if (N <= MAX) {
    visibleButtons = allItems.map((item) => ({ type: "item", item }));
  } else {
    if (activeIdx < 4) {
      visibleButtons = [
        ...allItems.slice(0, 6).map((item) => ({ type: "item" as const, item })),
        { type: "next", count: N - 6, targetIdx: 6 },
      ];
    } else if (activeIdx >= N - 4) {
      visibleButtons = [
        { type: "prev", count: N - 6, targetIdx: N - 7 },
        ...allItems.slice(N - 6, N).map((item) => ({ type: "item" as const, item })),
      ];
    } else {
      visibleButtons = [
        { type: "prev", count: activeIdx - 2, targetIdx: activeIdx - 3 },
        ...allItems.slice(activeIdx - 2, activeIdx + 3).map((item) => ({ type: "item" as const, item })),
        { type: "next", count: N - (activeIdx + 3), targetIdx: activeIdx + 3 },
      ];
    }
  }

  return (
    <div className="hidden xl:block absolute bottom-6 left-1/2 -translate-x-1/2 z-[60] pointer-events-none">
      <div className="relative">
        {/* Dock pill container */}
        <div className="relative flex items-end px-12 sm:px-12 h-[60px] bg-[#f2f0ef] dark:bg-[#1a1a1a] dark:border-white/5 rounded-[36px] shadow-2xl">
          <AnimatePresence mode="popLayout">
            {visibleButtons.map((btn) => {
              if (btn.type === "item") {
                const item = btn.item;
                const isActive = activeTocId === item.id;
                return (
                  <motion.button
                    layout
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.8 }}
                    transition={{ type: "spring", bounce: 0.25, duration: 0.5 }}
                    key={item.id}
                    onClick={() => onSelectSection(item.id, item.idx)}
                    className="flex flex-col items-center justify-center h-[50px] sm:h-[60px] w-[46px] sm:w-[72px] relative group outline-none shrink-0 pointer-events-auto"
                  >
                    {isActive && <DockActiveIndicator />}

                    <div
                      className={cn(
                        "z-10 absolute left-1/2 -translate-x-1/2 transition-all duration-300 flex items-center justify-center",
                        isActive
                          ? "top-[1px] -translate-y-1/2 w-5 h-5 text-[var(--theme-primary)]"
                          : "top-[22px] -translate-y-1/2 w-4 h-4 text-zinc-500 group-hover:-translate-y-1 group-hover:text-zinc-900 dark:group-hover:text-zinc-300"
                      )}
                    >
                      {item.icon || <div className="w-4 h-4 bg-zinc-700 rounded-sm" />}
                    </div>

                    <span
                      className={cn(
                        "absolute bottom-[10px] left-1/2 -translate-x-1/2 text-[10px] whitespace-nowrap transition-colors duration-300",
                        isActive
                          ? "text-zinc-900 dark:text-white font-bold"
                          : "text-zinc-500 font-medium group-hover:text-zinc-900 dark:group-hover:text-zinc-300"
                      )}
                    >
                      {item.label}
                    </span>
                  </motion.button>
                );
              }

              return (
                <motion.button
                  layout
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.8 }}
                  transition={{ type: "spring", bounce: 0.25, duration: 0.5 }}
                  key={`more-${btn.type}`}
                  onClick={() => onSelectSection(allItems[btn.targetIdx].id, btn.targetIdx)}
                  className="flex flex-col items-center justify-center h-[50px] sm:h-[60px] w-[46px] sm:w-[72px] relative group outline-none shrink-0 pointer-events-auto"
                >
                  <div className="z-10 absolute top-[22px] -translate-y-1/2 left-1/2 -translate-x-1/2 w-4 h-4 text-zinc-500 transition-all duration-300 group-hover:-translate-y-1 group-hover:text-zinc-900 dark:group-hover:text-zinc-300 flex items-center justify-center">
                    {btn.type === "prev" ? (
                      <ChevronLeft className="w-4 h-4" />
                    ) : (
                      <ChevronRight className="w-4 h-4" />
                    )}
                  </div>
                  <span className="absolute bottom-[10px] left-1/2 -translate-x-1/2 text-[10px] whitespace-nowrap transition-colors duration-300 text-zinc-500 font-medium group-hover:text-zinc-900 dark:group-hover:text-zinc-300">
                    +{btn.count} {btn.type === "next" ? "more" : "prev"}
                  </span>
                </motion.button>
              );
            })}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}
