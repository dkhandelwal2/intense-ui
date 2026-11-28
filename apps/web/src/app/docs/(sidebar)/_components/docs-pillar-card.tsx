"use client";

import React from "react";
import { Check } from "lucide-react";
import { cn } from "@/lib/utils";
import type { DocPillar } from "./types";

interface DocsPillarCardProps {
  pillar: DocPillar;
  index: number;
  isLocked?: boolean;
}

export function DocsPillarCard({ pillar, index: _index }: DocsPillarCardProps) {
  const Icon = pillar.icon;

  return (
    <div
      className="group relative flex flex-col justify-between rounded-3xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-950 p-5 sm:p-6 shadow-2xl shadow-zinc-950/10 dark:shadow-black/70 hover:border-[var(--theme-primary)]/50 transition-all duration-500 overflow-hidden select-none w-full max-w-3xl mx-auto"
    >
      {/* Corner Blueprint Crosshairs */}
      <span className="pointer-events-none absolute top-2 left-3 text-[10px] font-mono text-zinc-400/40 select-none">+</span>
      <span className="pointer-events-none absolute top-2 right-3 text-[10px] font-mono text-zinc-400/40 select-none">+</span>
      <span className="pointer-events-none absolute bottom-2 left-3 text-[10px] font-mono text-zinc-400/40 select-none">+</span>
      <span className="pointer-events-none absolute bottom-2 right-3 text-[10px] font-mono text-zinc-400/40 select-none">+</span>

      {/* Radial Glow on Hover */}
      <div
        className={cn(
          "pointer-events-none absolute -top-20 -right-20 w-64 h-64 rounded-full blur-3xl transition-opacity duration-700 bg-gradient-to-tr -z-10 opacity-30 group-hover:opacity-70",
          pillar.glowColor
        )}
      />

      {/* Watermark Pillar Number */}
      <span className="pointer-events-none select-none absolute -bottom-4 right-4 font-black text-8xl tracking-tighter text-zinc-200/40 dark:text-zinc-800/25 group-hover:text-[var(--theme-primary)]/15 transition-colors -z-10">
        {pillar.number}
      </span>

      {/* Header Row: Pillar Info + Category */}
      <div className="flex items-center justify-between gap-3 relative z-10 mb-4 pb-3 border-b border-zinc-200/60 dark:border-zinc-800/60">
        <div className="flex items-center gap-3">
          <div
            className={cn(
              "w-10 h-10 rounded-xl flex items-center justify-center border border-zinc-200 dark:border-zinc-800 bg-zinc-100 dark:bg-zinc-900 group-hover:scale-105 transition-transform duration-300 shrink-0",
              pillar.accentColor
            )}
          >
            <Icon className="w-5 h-5" />
          </div>
          <div>
            <span className="text-[10px] font-mono font-bold tracking-widest uppercase text-zinc-400 dark:text-zinc-500 block">
              PILLAR {pillar.number}
            </span>
            <span className="text-xs font-mono font-semibold text-zinc-700 dark:text-zinc-300">
              {pillar.tagline}
            </span>
          </div>
        </div>

        {/* Clean Pillar Index Indicator */}
        <span className="text-xs font-mono font-medium text-zinc-400 dark:text-zinc-500 shrink-0">
          {pillar.number} / 04
        </span>
      </div>

      {/* Card Body: 2-Column Responsive Layout */}
      <div className="grid grid-cols-1 sm:grid-cols-12 gap-5 relative z-10 items-start">
        {/* Left Column: Title & Full Description */}
        <div className="sm:col-span-7 flex flex-col justify-center">
          <h3 className="text-xl sm:text-2xl font-black tracking-tight text-zinc-900 dark:text-zinc-100 leading-snug">
            {pillar.title}
          </h3>

          <p className="mt-2 text-xs sm:text-sm text-zinc-600 dark:text-zinc-400 leading-relaxed">
            {pillar.description}
          </p>
        </div>

        {/* Right Column: Architectural Highlights Panel */}
        <div className="sm:col-span-5 bg-zinc-100/70 dark:bg-zinc-900/60 rounded-2xl p-3.5 sm:p-4 border border-zinc-200/70 dark:border-zinc-800/70 flex flex-col gap-2">
          <span className="text-[10px] font-mono font-bold tracking-widest uppercase text-zinc-400 dark:text-zinc-500 block mb-0.5">
            CORE TENETS
          </span>
          {pillar.highlights.map((item) => (
            <div
              key={item}
              className="flex items-center gap-2 text-[11px] sm:text-xs font-mono text-zinc-700 dark:text-zinc-300"
            >
              <Check className="w-3.5 h-3.5 text-emerald-500 shrink-0" />
              <span className="leading-tight">{item}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Bottom Accent Beam */}
      <div
        className={cn(
          "absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r opacity-100",
          pillar.gradient
        )}
      />
    </div>
  );
}
