"use client";

import React, { useState, useRef, useEffect, useCallback, useId } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Check } from "lucide-react";
import { cn } from "@/lib/utils";
import {
  NAV_ITEMS,
  NavAvatar,
  Chevron,
  SPRING,
  HEADER_SPRING,
  ROW_SPRING,
  LIST_MOTION,
  getNavMetric,
  getNavZIndex,
} from "./github-activity-header-nav-badge";
import type { GithubActivityHeaderNavProps } from "./types";

export function GithubActivityHeaderNav({
  activeVariant = "heatmap",
  onVariantChange,
  stats,
  totalContributions,
  label = "Switch view:",
  staticIcons = false,
  className,
}: GithubActivityHeaderNavProps) {
  const [open, setOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const uid = useId();

  const activeIndex = Math.max(0, NAV_ITEMS.findIndex((item) => item.value === activeVariant));
  const toggle = useCallback(() => setOpen((prev) => !prev), []);

  const handleClickOutside = useCallback((e: MouseEvent) => {
    if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
      setOpen(false);
    }
  }, []);

  useEffect(() => {
    if (!open) return;
    document.addEventListener("mousedown", handleClickOutside);
    const handleKeyDown = (e: KeyboardEvent) => { if (e.key === "Escape") setOpen(false); };
    document.addEventListener("keydown", handleKeyDown);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [open, handleClickOutside]);

  return (
    <div ref={containerRef} className={cn("relative inline-flex items-center shrink-0 h-8 w-[110px]", className)}>
      {/* Morphing Card / Pill Container with RareUI Spring Transition */}
      <motion.div
        layout
        id={`${uid}-panel`}
        data-slot="github-activity-panel"
        data-state={open ? "open" : "closed"}
        className={cn(
          "absolute right-0 top-0 shadow-sm flex items-center justify-between flex-col border border-zinc-200/80 dark:border-zinc-800",
          open
            ? "w-[272px] max-w-[calc(100vw-2.5rem)] bg-white/95 dark:bg-zinc-900/95 shadow-xl backdrop-blur-xl p-2.5 z-50"
            : "w-[110px] h-8 bg-zinc-100/80 dark:bg-zinc-800/70 p-0.5 pr-1 z-10"
        )}
        style={{ borderRadius: open ? 18 : 9999 }}
        transition={SPRING}
      >
        {/* Header Bar */}
        <motion.div layout="position" transition={HEADER_SPRING} className="flex items-center justify-between w-full h-full">
          {open ? (
            <span className="text-xs font-semibold text-zinc-800 dark:text-zinc-200 select-none pl-1 truncate">
              {label}
            </span>
          ) : (
            <div role="tablist" aria-label="Activity views" className="flex items-center">
              {NAV_ITEMS.map((item, index) => (
                <NavAvatar
                  key={item.value}
                  item={item}
                  layoutId={`${uid}-${item.value}`}
                  transition={SPRING}
                  asButton
                  isSelected={activeVariant === item.value}
                  staticIcons={staticIcons}
                  onClick={() => onVariantChange?.(item.value)}
                  className="-ml-1.5 first:ml-0"
                  style={{ zIndex: getNavZIndex(index, activeIndex) }}
                />
              ))}
            </div>
          )}

          <button
            type="button"
            onClick={toggle}
            aria-expanded={open}
            aria-controls={`${uid}-panel`}
            aria-label={open ? "Hide activity views" : "Show activity views"}
            className="grid size-6 shrink-0 place-items-center rounded-full text-zinc-500 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-white hover:bg-zinc-200/60 dark:hover:bg-zinc-700/60 transition-colors cursor-pointer"
          >
            <Chevron open={open} transition={SPRING} />
          </button>
        </motion.div>

        {/* Staggered Rows with RareUI PopLayout & Spring Motion */}
        <AnimatePresence initial={false} mode="popLayout">
          {open && (
            <motion.ul
              key="list"
              layout="position"
              {...LIST_MOTION}
              transition={ROW_SPRING}
              role="tablist"
              aria-label="Activity views"
              className="flex flex-col gap-1 w-full pt-1.5"
            >
              <div className="border-t border-zinc-100 dark:border-zinc-800/80 mb-0.5" />
              {NAV_ITEMS.map((item) => {
                const isSelected = activeVariant === item.value;
                return (
                  <li key={item.value}>
                    <button
                      type="button"
                      role="tab"
                      aria-selected={isSelected}
                      aria-label={item.label}
                      onClick={() => { onVariantChange?.(item.value); setOpen(false); }}
                      className={cn(
                        "flex w-full items-center justify-between py-1.5 px-2 rounded-xl transition-all cursor-pointer group text-left select-none",
                        isSelected ? "bg-zinc-100/90 dark:bg-zinc-800/90 font-medium" : "hover:bg-zinc-50 dark:hover:bg-zinc-800/50"
                      )}
                    >
                      <div className="flex items-center gap-2.5 min-w-0">
                        <NavAvatar item={item} layoutId={`${uid}-${item.value}`} transition={SPRING} asButton={false} isSelected={isSelected} staticIcons={staticIcons} />
                        <div className="flex flex-col min-w-0">
                          <span className={cn("text-xs font-semibold truncate", isSelected ? "text-zinc-900 dark:text-white" : "text-zinc-700 dark:text-zinc-300 group-hover:text-zinc-900 dark:group-hover:text-white")}>
                            {item.label}
                          </span>
                          <span className="text-[10px] text-zinc-400 dark:text-zinc-500 font-mono">
                            {item.sublabel}
                          </span>
                        </div>
                      </div>

                      <div className="flex items-center gap-2 pl-2 shrink-0">
                        {isSelected && <Check className="size-3.5 text-[var(--theme-primary)] shrink-0" />}
                        <span className="text-xs font-mono font-medium text-zinc-500 dark:text-zinc-400">
                          {getNavMetric(item.value, stats, totalContributions)}
                        </span>
                      </div>
                    </button>
                  </li>
                );
              })}
            </motion.ul>
          )}
        </AnimatePresence>
      </motion.div>
    </div>
  );
}
