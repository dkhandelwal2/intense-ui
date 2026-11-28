"use client";

import React from "react";
import { Check, Sparkles } from "lucide-react";
import { cn } from "@/lib/utils";

interface DocsPillarsHudProps {
  lockedCount: number;
  alignPct: number;
}

const STEP_LABELS = [
  { id: "01", name: "Physics" },
  { id: "02", name: "Ownership" },
  { id: "03", name: "Vitals" },
  { id: "04", name: "Strict TS" },
];

export function DocsPillarsHud({ lockedCount, alignPct }: DocsPillarsHudProps) {
  const isFullyAligned = lockedCount === 4;

  return (
    <div className="flex flex-col items-center text-center w-full max-w-3xl mx-auto select-none px-2 sm:px-4">
      {/* Top Badge */}
      <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[10px] sm:text-[11px] font-mono font-bold uppercase tracking-wider text-[var(--theme-primary)] bg-[var(--theme-primary)]/10 border border-[var(--theme-primary)]/20 mb-1">
        <Sparkles className="w-3 h-3 animate-pulse" />
        <span>Kinetic Architecture Engine</span>
      </div>

      {/* Main Heading */}
      <h2 className="text-xl sm:text-2xl md:text-3xl font-black tracking-tight text-zinc-900 dark:text-zinc-50">
        The Four Architectural Pillars
      </h2>

      {/* Dynamic Subtitle */}
      <p className="mt-1 text-xs sm:text-sm text-zinc-600 dark:text-zinc-400 max-w-xl text-center">
        Scroll to drive kinetic architecture. Four foundational pillars stack with tactile depth and precision.
      </p>

      {/* Interactive Alignment Status HUD - Clean, Balanced, Never Clipped */}
      <div className="mt-2.5 inline-flex items-center justify-center gap-2 sm:gap-3 px-3 sm:px-4 py-1.5 rounded-xl border border-zinc-200/80 dark:border-zinc-800/80 bg-zinc-100/90 dark:bg-zinc-900/90 backdrop-blur-md text-xs font-mono shadow-sm">
        {/* Step Indicators */}
        <div className="flex items-center gap-1 sm:gap-1.5 shrink-0">
          {STEP_LABELS.map((step, idx) => {
            const isLocked = lockedCount >= idx + 1;
            return (
              <span
                key={step.id}
                className={cn(
                  "inline-flex items-center gap-1 px-1.5 sm:px-2 py-0.5 rounded-md text-[10px] sm:text-[11px] font-bold transition-all duration-300 shrink-0",
                  isLocked
                    ? "bg-emerald-500/15 text-emerald-600 dark:text-emerald-400 border border-emerald-500/30"
                    : "bg-zinc-200/60 dark:bg-zinc-800/60 text-zinc-400 dark:text-zinc-500 border border-zinc-300/40 dark:border-zinc-700/40"
                )}
              >
                {isLocked ? (
                  <Check className="w-2.5 h-2.5 text-emerald-500" />
                ) : (
                  <span className="w-1.5 h-1.5 rounded-full bg-zinc-400 dark:bg-zinc-600 animate-pulse" />
                )}
                <span>{step.id}</span>
                <span className="hidden sm:inline">{step.name}</span>
              </span>
            );
          })}
        </div>

        {/* Vertical Divider */}
        <span className="w-px h-3.5 bg-zinc-300 dark:bg-zinc-700 shrink-0" />

        {/* Progress Counter */}
        <div className="flex items-center shrink-0">
          <div className="flex items-center gap-1 px-2 py-0.5 rounded-md bg-zinc-200/80 dark:bg-zinc-800/80 text-[10px] sm:text-[11px] font-bold">
            <span
              className={cn(
                "w-1.5 h-1.5 rounded-full",
                isFullyAligned ? "bg-emerald-500 shadow-[0_0_8px_#10b981]" : "bg-[var(--theme-primary)]"
              )}
            />
            <span className={cn(isFullyAligned ? "text-emerald-500" : "text-[var(--theme-primary)]")}>
              {alignPct}%
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
