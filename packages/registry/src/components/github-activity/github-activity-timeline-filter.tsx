"use client";

import React, { useState, useRef, useEffect, useMemo } from "react";
import { motion, AnimatePresence, type Variants } from "framer-motion";
import { Filter, Check, ChevronDown, Layers, GitCommit, GitPullRequest, AlertCircle, Tag } from "lucide-react";
import { cn } from "@/lib/utils";
import type { GithubEventType, GithubActivityEvent } from "./types";

export interface TimelineFilterOption {
  label: string;
  value: "all" | GithubEventType;
  icon: React.ComponentType<{ className?: string }>;
}

export const TIMELINE_FILTER_OPTIONS: TimelineFilterOption[] = [
  { label: "All", value: "all", icon: Layers },
  { label: "Commits", value: "commit", icon: GitCommit },
  { label: "Pull Requests", value: "pull_request", icon: GitPullRequest },
  { label: "Issues", value: "issue", icon: AlertCircle },
  { label: "Releases", value: "release", icon: Tag },
];

const curtainVariants: Variants = {
  hidden: {
    opacity: 0,
    y: -10,
    scaleY: 0.82,
    clipPath: "inset(0% 0% 100% 0% round 16px)",
    filter: "blur(8px)",
    transformOrigin: "top right",
    transition: { duration: 0.18, ease: [0.4, 0, 0.2, 1] },
  },
  visible: {
    opacity: 1,
    y: 0,
    scaleY: 1,
    clipPath: "inset(0% 0% 0% 0% round 16px)",
    filter: "blur(0px)",
    transformOrigin: "top right",
    transition: {
      type: "spring",
      damping: 24,
      stiffness: 280,
      mass: 0.8,
      staggerChildren: 0.035,
      delayChildren: 0.04,
    },
  },
  exit: {
    opacity: 0,
    y: -8,
    scale: 0.94,
    clipPath: "inset(0% 0% 100% 0% round 16px)",
    filter: "blur(4px)",
    transformOrigin: "top right",
    transition: { duration: 0.16, ease: [0.4, 0, 1, 1] },
  },
};

const itemVariants: Variants = {
  hidden: { opacity: 0, x: -8, y: -4, filter: "blur(2px)" },
  visible: { opacity: 1, x: 0, y: 0, filter: "blur(0px)", transition: { type: "spring", damping: 20, stiffness: 350 } },
  exit: { opacity: 0, x: -4, transition: { duration: 0.1 } },
};

export interface GithubActivityTimelineFilterProps {
  activeFilter: "all" | GithubEventType;
  onFilterChange: (filter: "all" | GithubEventType) => void;
  events?: GithubActivityEvent[];
  defaultOpen?: boolean;
  className?: string;
}

export function GithubActivityTimelineFilter({
  activeFilter,
  onFilterChange,
  events = [],
  defaultOpen = false,
  className,
}: GithubActivityTimelineFilterProps) {
  const [isOpen, setIsOpen] = useState(defaultOpen);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!isOpen) return;
    const handleKeyDown = (e: KeyboardEvent) => { if (e.key === "Escape") setIsOpen(false); };
    const handleClickOutside = (e: MouseEvent | TouchEvent) => {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) setIsOpen(false);
    };
    document.addEventListener("keydown", handleKeyDown);
    document.addEventListener("mousedown", handleClickOutside);
    document.addEventListener("touchstart", handleClickOutside);
    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("touchstart", handleClickOutside);
    };
  }, [isOpen]);

  const counts = useMemo(() => {
    const map: Record<string, number> = { all: events.length };
    for (const ev of events) map[ev.type] = (map[ev.type] || 0) + 1;
    return map;
  }, [events]);

  const activeOption = TIMELINE_FILTER_OPTIONS.find((opt) => opt.value === activeFilter);

  return (
    <div ref={containerRef} className={cn("relative inline-block", className)}>
      <button
        type="button"
        onClick={() => setIsOpen((prev) => !prev)}
        aria-label="Filter activity"
        aria-expanded={isOpen}
        aria-haspopup="true"
        className={cn(
          "flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium transition-all duration-200 cursor-pointer border select-none active:scale-95 touch-manipulation",
          isOpen || activeFilter !== "all"
            ? "bg-zinc-900 text-white dark:bg-zinc-100 dark:text-zinc-900 border-zinc-900 dark:border-zinc-100 shadow-xs"
            : "bg-zinc-100/70 dark:bg-zinc-800/50 text-zinc-600 dark:text-zinc-400 border-zinc-200/80 dark:border-zinc-700/60 hover:text-zinc-900 dark:hover:text-zinc-100 hover:bg-zinc-200/70 dark:hover:bg-zinc-700/60"
        )}
      >
        <Filter className={cn("w-3.5 h-3.5 shrink-0 transition-transform duration-200", isOpen && "scale-110 text-emerald-500")} />
        <span className="text-[11px] font-medium">{activeFilter === "all" ? "Filter" : activeOption?.label}</span>
        {activeFilter !== "all" && <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 dark:bg-emerald-500 shrink-0 animate-pulse" />}
        <ChevronDown className={cn("w-3 h-3 opacity-60 transition-transform duration-200", isOpen && "rotate-180")} />
      </button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            variants={curtainVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            className="absolute right-0 top-full mt-1.5 z-40 min-w-[190px] p-1.5 rounded-2xl border border-zinc-200/90 dark:border-zinc-800/90 bg-white/95 dark:bg-zinc-900/95 shadow-xl shadow-zinc-950/10 dark:shadow-black/50 backdrop-blur-md"
          >
            <div className="px-2 py-1 mb-1 border-b border-zinc-100 dark:border-zinc-800/60 flex items-center justify-between">
              <span className="text-[10px] font-semibold uppercase tracking-wider text-zinc-400 dark:text-zinc-500">Filter Events</span>
              <span className="text-[10px] font-medium text-zinc-400">{events.length} total</span>
            </div>
            <div className="flex flex-col gap-0.5">
              {TIMELINE_FILTER_OPTIONS.map((opt) => {
                const Icon = opt.icon;
                const isSelected = activeFilter === opt.value;
                const count = counts[opt.value] ?? 0;
                return (
                  <motion.button
                    key={opt.value}
                    variants={itemVariants}
                    type="button"
                    onClick={() => { onFilterChange(opt.value); setIsOpen(false); }}
                    className={cn(
                      "flex items-center justify-between gap-2 px-2.5 py-1.5 rounded-xl text-xs font-medium transition-colors cursor-pointer text-left w-full",
                      isSelected
                        ? "bg-zinc-100 dark:bg-zinc-800 text-zinc-900 dark:text-zinc-100 font-semibold"
                        : "text-zinc-600 dark:text-zinc-400 hover:bg-zinc-50 dark:hover:bg-zinc-800/50 hover:text-zinc-900 dark:hover:text-zinc-100"
                    )}
                  >
                    <div className="flex items-center gap-2 min-w-0">
                      <Icon className={cn("w-3.5 h-3.5 shrink-0", isSelected ? "text-emerald-500" : "text-zinc-400")} />
                      <span className="truncate text-[11px]">{opt.label}</span>
                    </div>
                    <div className="flex items-center gap-1.5 shrink-0">
                      <span className="text-[10px] px-1.5 py-0.2 rounded-full bg-zinc-200/50 dark:bg-zinc-800 text-zinc-500 dark:text-zinc-400">{count}</span>
                      {isSelected && <Check className="w-3.5 h-3.5 text-emerald-500 shrink-0" />}
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
