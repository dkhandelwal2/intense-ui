"use client";

import React, { useState, useRef, useEffect, useMemo } from "react";
import { motion, AnimatePresence, type Variants } from "framer-motion";
import { Check, ChevronDown, Layers, GitCommit, GitPullRequest, AlertCircle, Tag, ArrowDownWideNarrow, ArrowUpWideNarrow, RotateCcw } from "lucide-react";
import { AnimatedFilterIcon } from "@/assets/svg";
import { cn } from "@/lib/utils";
import type { GithubEventType, GithubActivityEvent, GithubActivitySortOrder } from "./types";

export interface TimelineFilterOption {
  label: string;
  value: "all" | GithubEventType;
  icon: React.ComponentType<{ className?: string }>;
}

export const TIMELINE_FILTER_OPTIONS: TimelineFilterOption[] = [
  { label: "All", value: "all", icon: Layers }, { label: "Commits", value: "commit", icon: GitCommit },
  { label: "Pull Requests", value: "pull_request", icon: GitPullRequest }, { label: "Issues", value: "issue", icon: AlertCircle },
  { label: "Releases", value: "release", icon: Tag },
];

const curtainVariants: Variants = {
  hidden: { opacity: 0, y: -10, scaleY: 0.82, filter: "blur(8px)", transition: { duration: 0.18 } },
  visible: { opacity: 1, y: 0, scaleY: 1, filter: "blur(0px)", transition: { type: "spring", damping: 24, stiffness: 280, staggerChildren: 0.035 } },
  exit: { opacity: 0, y: -8, scale: 0.94, filter: "blur(4px)", transition: { duration: 0.16 } },
};
const itemVariants: Variants = {
  hidden: { opacity: 0, x: -8 },
  visible: { opacity: 1, x: 0, transition: { type: "spring", damping: 20, stiffness: 300 } },
};

export interface GithubActivityTimelineFilterProps {
  activeFilter: "all" | GithubEventType;
  onFilterChange: (filter: "all" | GithubEventType) => void;
  events: GithubActivityEvent[];
  defaultOpen?: boolean;
  onOpenChange?: (open: boolean) => void;
  sortOrder?: GithubActivitySortOrder;
  onSortOrderChange?: (sort: GithubActivitySortOrder) => void;
  showSort?: boolean;
  staticIcons?: boolean;
  className?: string;
}

export function GithubActivityTimelineFilter({
  activeFilter,
  onFilterChange,
  events,
  defaultOpen = false,
  onOpenChange,
  sortOrder = "desc",
  onSortOrderChange,
  showSort = false,
  staticIcons = false,
  className,
}: GithubActivityTimelineFilterProps) {
  const [isOpen, setIsOpenState] = useState(defaultOpen);
  const containerRef = useRef<HTMLDivElement>(null);

  const setIsOpen = (val: boolean | ((prev: boolean) => boolean)) => {
    setIsOpenState((prev) => { const next = typeof val === "function" ? val(prev) : val; onOpenChange?.(next); return next; });
  };

  useEffect(() => {
    if (!isOpen) return;
    const handleClick = (e: MouseEvent | TouchEvent) => {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) setIsOpen(false);
    };
    const handleKey = (e: KeyboardEvent) => { if (e.key === "Escape") setIsOpen(false); };
    ["mousedown", "touchstart"].forEach((evt) => document.addEventListener(evt, handleClick as EventListener));
    document.addEventListener("keydown", handleKey);
    return () => {
      ["mousedown", "touchstart"].forEach((evt) => document.removeEventListener(evt, handleClick as EventListener));
      document.removeEventListener("keydown", handleKey);
    };
  }, [isOpen]);

  const counts = useMemo(() => {
    const map: Record<string, number> = { all: events.length };
    for (const ev of events) map[ev.type] = (map[ev.type] || 0) + 1;
    return map;
  }, [events]);

  const activeOption = TIMELINE_FILTER_OPTIONS.find((opt) => opt.value === activeFilter);
  const hasActiveModifiers = activeFilter !== "all" || (sortOrder && sortOrder !== "desc");
  const handleReset = () => { onFilterChange("all"); onSortOrderChange?.("desc"); };

  return (
    <div ref={containerRef} className={cn("relative inline-block", className)}>
      <button
        type="button"
        onClick={() => setIsOpen((prev) => !prev)}
        aria-label="Filter activity"
        aria-expanded={isOpen}
        className={cn(
          "flex items-center gap-1.5 h-7.5 rounded-full text-xs font-medium transition-all duration-300 ease-out cursor-pointer border select-none active:scale-95 touch-manipulation shrink-0",
          isOpen || hasActiveModifiers
            ? "px-2.5 bg-zinc-900 text-white dark:bg-zinc-100 dark:text-zinc-900 border-zinc-900 dark:border-zinc-100 shadow-xs"
            : "w-7.5 justify-center bg-zinc-100/70 dark:bg-zinc-800/50 text-zinc-600 dark:text-zinc-400 border-zinc-200/80 dark:border-zinc-700/60 hover:text-zinc-900 dark:hover:text-zinc-100 hover:bg-zinc-200/70 dark:hover:bg-zinc-700/60"
        )}
      >
        <AnimatedFilterIcon animate={!staticIcons} className={cn("w-3.5 h-3.5 shrink-0 transition-transform duration-200", isOpen && "scale-110 text-[var(--theme-primary)]")} />
        {(isOpen || hasActiveModifiers) && (
          <>
            <span className="text-[11px] font-medium">{activeFilter === "all" ? "Filter" : activeOption?.label}</span>
            {hasActiveModifiers && <span className="w-1.5 h-1.5 rounded-full bg-[var(--theme-primary)] shrink-0 animate-pulse" />}
            <ChevronDown className={cn("w-3 h-3 opacity-60 transition-transform duration-200", isOpen && "rotate-180")} />
          </>
        )}
      </button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            variants={curtainVariants} initial="hidden" animate="visible" exit="exit"
            className="absolute right-0 top-full mt-1.5 z-50 min-w-[200px] max-h-[220px] overflow-y-auto p-1.5 rounded-2xl border border-zinc-200/90 dark:border-zinc-800/90 bg-white/95 dark:bg-zinc-900/95 shadow-xl shadow-zinc-950/10 dark:shadow-black/50 backdrop-blur-md subtle-scrollbar"
          >
            {showSort && onSortOrderChange && (
              <div className="pb-1.5 mb-1 border-b border-zinc-100 dark:border-zinc-800/60">
                <div className="px-2 py-0.5 mb-1 text-[10px] font-semibold uppercase tracking-wider text-zinc-400 dark:text-zinc-500">Sort Order</div>
                <div className="grid grid-cols-2 gap-1 px-1">
                  {(["desc", "asc"] as const).map((order) => (
                    <button
                      key={order} type="button" onClick={() => onSortOrderChange(order)}
                      className={cn(
                        "flex items-center justify-center gap-1.5 py-1 px-2 rounded-lg text-[11px] font-medium transition-colors cursor-pointer",
                        sortOrder === order ? "bg-zinc-900 text-white dark:bg-zinc-100 dark:text-zinc-900 shadow-xs" : "text-zinc-600 dark:text-zinc-400 hover:bg-zinc-100 dark:hover:bg-zinc-800"
                      )}
                    >
                      {order === "desc" ? <ArrowDownWideNarrow className="w-3 h-3" /> : <ArrowUpWideNarrow className="w-3 h-3" />}
                      <span>{order === "desc" ? "Latest" : "Oldest"}</span>
                    </button>
                  ))}
                </div>
              </div>
            )}

            <div className="px-2 py-1 mb-1 border-b border-zinc-100 dark:border-zinc-800/60 flex items-center justify-between">
              <span className="text-[10px] font-semibold uppercase tracking-wider text-zinc-400 dark:text-zinc-500">Filter Events</span>
              <div className="flex items-center gap-1.5">
                <span className="text-[10px] font-medium text-zinc-400">{events.length} total</span>
                {hasActiveModifiers && (
                  <button type="button" onClick={handleReset} className="text-[10px] font-semibold text-[var(--theme-primary)] hover:underline cursor-pointer flex items-center gap-0.5">
                    <RotateCcw className="w-2.5 h-2.5" />
                    <span>Reset</span>
                  </button>
                )}
              </div>
            </div>

            <div className="flex flex-col gap-0.5">
              {TIMELINE_FILTER_OPTIONS.map((opt) => {
                const Icon = opt.icon;
                const isSelected = activeFilter === opt.value;
                const count = counts[opt.value] ?? 0;
                return (
                  <motion.button
                    key={opt.value} variants={itemVariants} type="button"
                    onClick={() => { onFilterChange(opt.value); setIsOpen(false); }}
                    className={cn(
                      "flex items-center justify-between gap-2 px-2 py-1 rounded-lg text-xs font-medium transition-colors cursor-pointer text-left w-full",
                      isSelected ? "bg-zinc-100 dark:bg-zinc-800 text-zinc-900 dark:text-zinc-100 font-semibold" : "text-zinc-600 dark:text-zinc-400 hover:bg-zinc-50 dark:hover:bg-zinc-800/50 hover:text-zinc-900 dark:hover:text-zinc-100"
                    )}
                  >
                    <div className="flex items-center gap-2 min-w-0">
                      <Icon className={cn("w-3.5 h-3.5 shrink-0", isSelected ? "text-[var(--theme-primary)]" : "text-zinc-400")} />
                      <span className="truncate text-[11px]">{opt.label}</span>
                    </div>
                    <div className="flex items-center gap-1.5 shrink-0">
                      {isSelected && <Check className="w-3.5 h-3.5 text-[var(--theme-primary)] shrink-0" />}
                      <span className="text-[10px] px-1.5 py-0.2 rounded-full bg-zinc-200/50 dark:bg-zinc-800 text-zinc-500 dark:text-zinc-400">{count}</span>
                    </div>
                  </motion.button>
                );
              })}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
