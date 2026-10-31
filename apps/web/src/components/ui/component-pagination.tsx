"use client";

import React from "react";
import Link from "next/link";
import { ArrowLeft, ArrowRight, Ban, Layers } from "lucide-react";
import { componentsConfig } from "@/config/components";
import { cn } from "@/lib/utils";

export interface ComponentPaginationProps {
  currentSlug?: string;
  className?: string;
}

export function ComponentPagination({
  currentSlug = "accordion",
  className,
}: ComponentPaginationProps) {
  const enabledComponents = React.useMemo(
    () => componentsConfig.filter((c) => c.enabled),
    []
  );

  const total = enabledComponents.length;
  const currentIndex = enabledComponents.findIndex(
    (c) => c.slug === currentSlug.toLowerCase()
  );

  if (currentIndex === -1 && total === 0) return null;

  const isFirst = currentIndex === 0;
  const isLast = currentIndex === total - 1;

  const firstComponent = enabledComponents[0];
  const lastComponent = enabledComponents[total - 1];

  const prevComponent = !isFirst && currentIndex > 0 ? enabledComponents[currentIndex - 1] : null;
  const nextComponent = !isLast && currentIndex < total - 1 ? enabledComponents[currentIndex + 1] : null;

  // Format indices with 2 digits (e.g. 01, 02)
  const currentNum = String(currentIndex + 1).padStart(2, "0");
  const totalNum = String(total).padStart(2, "0");
  const prevNum = prevComponent ? String(currentIndex).padStart(2, "0") : "--";
  const nextNum = nextComponent ? String(currentIndex + 2).padStart(2, "0") : "--";

  const progressPercent = total > 0 ? Math.round(((currentIndex + 1) / total) * 100) : 0;

  return (
    <div className={cn("w-full relative select-none", className)}>
      {/* Ambient background bloom underglow */}
      <div
        className="pointer-events-none absolute -top-8 left-1/2 -translate-x-1/2 w-4/5 h-28 bg-[var(--theme-primary)]/10 dark:bg-[var(--theme-primary)]/[0.08] blur-3xl rounded-full"
        aria-hidden="true"
      />

      {/* Cybernetic Status Pill & Progress Bar */}
      <div className="relative z-10 flex items-center justify-between gap-3 pb-3.5 mb-3.5 sm:pb-5 sm:mb-5 border-b border-black/5 dark:border-white/10">
        <div className="flex items-center gap-2 sm:gap-2.5 min-w-0">
          <div className="w-6 h-6 rounded-lg bg-[var(--theme-primary)]/10 text-[var(--theme-primary)] flex items-center justify-center shrink-0 border border-[var(--theme-primary)]/20 shadow-xs">
            <Layers className="w-3.5 h-3.5" />
          </div>
          <div className="flex items-center gap-1.5 sm:gap-2 truncate">
            <span className="text-[10px] sm:text-[11px] font-mono uppercase tracking-widest font-semibold text-zinc-500 dark:text-zinc-400 truncate">
              Component Registry
            </span>
            <span className="w-1 h-1 rounded-full bg-zinc-400 dark:bg-zinc-600 shrink-0" />
            <span className="text-[10px] sm:text-[11px] font-mono text-zinc-700 dark:text-zinc-300 font-bold shrink-0">
              {currentNum} / {totalNum}
            </span>
          </div>
        </div>

        {/* Dynamic Segmented Progress Tracker */}
        <div className="flex items-center gap-2 shrink-0 w-24 sm:w-44">
          <div className="w-full h-1.5 rounded-full bg-zinc-200/80 dark:bg-zinc-800/80 overflow-hidden p-0.5">
            <div
              className="h-full rounded-full bg-gradient-to-r from-[var(--theme-primary)] to-[var(--theme-primary)]/80 transition-all duration-500 ease-out"
              style={{ width: `${progressPercent}%` }}
            />
          </div>
          <span className="text-[10px] font-mono font-semibold text-zinc-500 dark:text-zinc-400 shrink-0">
            {progressPercent}%
          </span>
        </div>
      </div>

      {/* Futuristic Bento Duo Navigation Cards */}
      <div className="grid grid-cols-2 gap-2.5 sm:gap-4 w-full relative z-10">
        {/* PREVIOUS COMPONENT CARD */}
        {prevComponent ? (
          <Link
            href={prevComponent.href}
            className="group relative flex flex-col justify-between p-3 sm:p-5 rounded-xl sm:rounded-3xl border border-black/10 dark:border-white/10 bg-gradient-to-br from-white/90 via-zinc-50/80 to-zinc-100/60 dark:from-[#141418]/90 dark:via-[#111115]/80 dark:to-[#0d0d10]/90 backdrop-blur-xl shadow-[0_4px_20px_rgb(0,0,0,0.03)] hover:shadow-[0_12px_32px_rgb(0,0,0,0.08),0_0_25px_var(--theme-primary)]/15 hover:border-[var(--theme-primary)]/50 dark:hover:border-[var(--theme-primary)]/40 transition-all duration-300 hover:-translate-y-0.5 cursor-pointer overflow-hidden text-left"
          >
            {/* Top accent beam highlight on hover */}
            <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-[var(--theme-primary)]/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

            <div className="flex items-center justify-between gap-1.5 sm:gap-3 mb-2 sm:mb-4">
              <div className="flex items-center gap-1.5 sm:gap-2 min-w-0">
                <span className="w-5 h-5 sm:w-6 sm:h-6 rounded-md bg-black/5 dark:bg-white/5 border border-black/5 dark:border-white/10 flex items-center justify-center text-[9px] sm:text-[10px] font-mono font-bold text-zinc-600 dark:text-zinc-300 group-hover:text-[var(--theme-primary)] group-hover:border-[var(--theme-primary)]/30 transition-colors shrink-0">
                  {prevNum}
                </span>
                <span className="text-[9px] sm:text-[10px] uppercase font-mono font-bold tracking-wider sm:tracking-widest text-zinc-400 dark:text-zinc-500 group-hover:text-zinc-600 dark:group-hover:text-zinc-300 transition-colors truncate">
                  <span className="sm:hidden">Prev</span>
                  <span className="hidden sm:inline">Previous Component</span>
                </span>
              </div>
              <div className="w-6 h-6 sm:w-8 sm:h-8 rounded-full bg-zinc-100 dark:bg-zinc-800/80 border border-black/5 dark:border-white/10 flex items-center justify-center shrink-0 group-hover:bg-[var(--theme-primary)] group-hover:border-transparent transition-all duration-300 shadow-xs">
                <ArrowLeft className="w-3 h-3 sm:w-3.5 sm:h-3.5 text-zinc-600 dark:text-zinc-300 group-hover:text-white group-hover:-translate-x-0.5 transition-all duration-300" />
              </div>
            </div>

            <div className="min-w-0">
              <h3 className="text-sm sm:text-lg font-bold tracking-tight text-zinc-900 dark:text-zinc-100 group-hover:text-[var(--theme-primary)] transition-colors truncate mb-0.5 sm:mb-1">
                {prevComponent.name}
              </h3>
              <p className="hidden sm:block text-xs text-zinc-500 dark:text-zinc-400 line-clamp-1">
                {prevComponent.description || "View component architecture & variants"}
              </p>
            </div>
          </Link>
        ) : (
          /* DISABLED PREVIOUS (Beginning of Library) */
          <div
            aria-disabled="true"
            className="relative flex flex-col justify-between p-3 sm:p-5 rounded-xl sm:rounded-3xl border border-dashed border-black/10 dark:border-white/10 bg-zinc-100/40 dark:bg-white/[0.01] opacity-45 cursor-not-allowed select-none text-left"
          >
            <div className="flex items-center justify-between gap-1.5 sm:gap-3 mb-2 sm:mb-4">
              <div className="flex items-center gap-1.5 sm:gap-2 min-w-0">
                <span className="w-5 h-5 sm:w-6 sm:h-6 rounded-md bg-black/5 dark:bg-white/5 border border-black/5 dark:border-white/5 flex items-center justify-center text-[9px] sm:text-[10px] font-mono font-bold text-zinc-400 dark:text-zinc-600 shrink-0">
                  01
                </span>
                <span className="text-[9px] sm:text-[10px] uppercase font-mono font-bold tracking-wider sm:tracking-widest text-zinc-400 dark:text-zinc-600 truncate">
                  <span className="sm:hidden">Start</span>
                  <span className="hidden sm:inline">First Component</span>
                </span>
              </div>
              <div className="w-6 h-6 sm:w-8 sm:h-8 rounded-full bg-black/5 dark:bg-white/5 flex items-center justify-center shrink-0 text-zinc-400 dark:text-zinc-600">
                <Ban className="w-3 h-3 sm:w-3.5 sm:h-3.5" />
              </div>
            </div>

            <div className="min-w-0">
              <h3 className="text-sm sm:text-lg font-bold tracking-tight text-zinc-400 dark:text-zinc-600 truncate mb-0.5 sm:mb-1">
                {firstComponent?.name || "Accordion"}
              </h3>
              <p className="hidden sm:block text-xs text-zinc-400/80 dark:text-zinc-600 line-clamp-1">
                You are currently viewing the first component
              </p>
            </div>
          </div>
        )}

        {/* NEXT COMPONENT CARD */}
        {nextComponent ? (
          <Link
            href={nextComponent.href}
            className="group relative flex flex-col justify-between p-3 sm:p-5 rounded-xl sm:rounded-3xl border border-black/10 dark:border-white/10 bg-gradient-to-br from-white/90 via-zinc-50/80 to-zinc-100/60 dark:from-[#141418]/90 dark:via-[#111115]/80 dark:to-[#0d0d10]/90 backdrop-blur-xl shadow-[0_4px_20px_rgb(0,0,0,0.03)] hover:shadow-[0_12px_32px_rgb(0,0,0,0.08),0_0_25px_var(--theme-primary)]/15 hover:border-[var(--theme-primary)]/50 dark:hover:border-[var(--theme-primary)]/40 transition-all duration-300 hover:-translate-y-0.5 cursor-pointer overflow-hidden text-right"
          >
            {/* Top accent beam highlight on hover */}
            <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-[var(--theme-primary)]/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

            <div className="flex items-center justify-between gap-1.5 sm:gap-3 mb-2 sm:mb-4">
              <div className="flex items-center gap-1.5 sm:gap-2 min-w-0 order-1">
                <span className="text-[9px] sm:text-[10px] uppercase font-mono font-bold tracking-wider sm:tracking-widest text-zinc-400 dark:text-zinc-500 group-hover:text-zinc-600 dark:group-hover:text-zinc-300 transition-colors truncate">
                  <span className="sm:hidden">Next</span>
                  <span className="hidden sm:inline">Next Component</span>
                </span>
                <span className="w-5 h-5 sm:w-6 sm:h-6 rounded-md bg-black/5 dark:bg-white/5 border border-black/5 dark:border-white/10 flex items-center justify-center text-[9px] sm:text-[10px] font-mono font-bold text-zinc-600 dark:text-zinc-300 group-hover:text-[var(--theme-primary)] group-hover:border-[var(--theme-primary)]/30 transition-colors shrink-0">
                  {nextNum}
                </span>
              </div>
              <div className="w-6 h-6 sm:w-8 sm:h-8 rounded-full bg-zinc-100 dark:bg-zinc-800/80 border border-black/5 dark:border-white/10 flex items-center justify-center shrink-0 group-hover:bg-[var(--theme-primary)] group-hover:border-transparent transition-all duration-300 shadow-xs order-2">
                <ArrowRight className="w-3 h-3 sm:w-3.5 sm:h-3.5 text-zinc-600 dark:text-zinc-300 group-hover:text-white group-hover:translate-x-0.5 transition-all duration-300" />
              </div>
            </div>

            <div className="min-w-0">
              <h3 className="text-sm sm:text-lg font-bold tracking-tight text-zinc-900 dark:text-zinc-100 group-hover:text-[var(--theme-primary)] transition-colors truncate mb-0.5 sm:mb-1">
                {nextComponent.name}
              </h3>
              <p className="hidden sm:block text-xs text-zinc-500 dark:text-zinc-400 line-clamp-1">
                {nextComponent.description || "View component architecture & variants"}
              </p>
            </div>
          </Link>
        ) : (
          /* DISABLED NEXT (End of Library) */
          <div
            aria-disabled="true"
            className="relative flex flex-col justify-between p-3 sm:p-5 rounded-xl sm:rounded-3xl border border-dashed border-black/10 dark:border-white/10 bg-zinc-100/40 dark:bg-white/[0.01] opacity-45 cursor-not-allowed select-none text-right"
          >
            <div className="flex items-center justify-between gap-1.5 sm:gap-3 mb-2 sm:mb-4">
              <div className="flex items-center gap-1.5 sm:gap-2 min-w-0 order-1">
                <span className="text-[9px] sm:text-[10px] uppercase font-mono font-bold tracking-wider sm:tracking-widest text-zinc-400 dark:text-zinc-600 truncate">
                  <span className="sm:hidden">End</span>
                  <span className="hidden sm:inline">Last Component</span>
                </span>
                <span className="w-5 h-5 sm:w-6 sm:h-6 rounded-md bg-black/5 dark:bg-white/5 border border-black/5 dark:border-white/5 flex items-center justify-center text-[9px] sm:text-[10px] font-mono font-bold text-zinc-400 dark:text-zinc-600 shrink-0">
                  {totalNum}
                </span>
              </div>
              <div className="w-6 h-6 sm:w-8 sm:h-8 rounded-full bg-black/5 dark:bg-white/5 flex items-center justify-center shrink-0 text-zinc-400 dark:text-zinc-600 order-2">
                <Ban className="w-3 h-3 sm:w-3.5 sm:h-3.5" />
              </div>
            </div>

            <div className="min-w-0">
              <h3 className="text-sm sm:text-lg font-bold tracking-tight text-zinc-400 dark:text-zinc-600 truncate mb-0.5 sm:mb-1">
                {lastComponent?.name || "Tooltip"}
              </h3>
              <p className="hidden sm:block text-xs text-zinc-400/80 dark:text-zinc-600 line-clamp-1">
                You have reached the final component in the library
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
