import React from "react";
import { cn } from "@/lib/utils";

export interface SpecItem {
  label: string;
  value: string;
}

export interface ComponentSpecDetailProps {
  title: string;
  badge?: string;
  summary: React.ReactNode;
  specs?: SpecItem[];
  tip?: string;
  className?: string;
}

/**
 * Common specification detail card rendered inside ShowcaseCard's info popover.
 * Eliminates redundant per-component description files.
 */
export function ComponentSpecDetail({
  title,
  badge,
  summary,
  specs,
  tip,
  className,
}: ComponentSpecDetailProps) {
  return (
    <div className={cn("space-y-3", className)}>
      {/* Header */}
      <div className="flex items-center justify-between pb-2 border-b border-zinc-200/80 dark:border-zinc-800/80">
        <div className="flex items-center gap-1.5 font-bold text-zinc-900 dark:text-zinc-100 text-xs">
          <span className="w-2 h-2 rounded-full bg-[var(--theme-primary)]" />
          <span>{title}</span>
        </div>
        {badge && (
          <span className="text-[10px] font-mono font-semibold uppercase tracking-wider px-2 py-0.5 rounded-full bg-[var(--theme-primary)]/10 text-[var(--theme-primary)] border border-[var(--theme-primary)]/20">
            {badge}
          </span>
        )}
      </div>

      {/* Deep Summary */}
      <div className="text-zinc-600 dark:text-zinc-300 text-[11.5px] leading-relaxed">
        {summary}
      </div>

      {/* Structured Technical Specs */}
      {specs && specs.length > 0 && (
        <div className="space-y-1.5 bg-zinc-50 dark:bg-zinc-900/60 p-2.5 rounded-xl border border-zinc-200/60 dark:border-zinc-800/60">
          <div className="text-[9.5px] font-mono font-bold tracking-wider uppercase text-zinc-400 dark:text-zinc-500 mb-1">
            Technical Specifications
          </div>
          {specs.map((spec, i) => (
            <div
              key={i}
              className="flex items-start justify-between gap-2 text-[11px]"
            >
              <span className="text-zinc-500 dark:text-zinc-400 font-medium shrink-0">
                {spec.label}
              </span>
              <span className="font-mono text-zinc-800 dark:text-zinc-200 text-right font-medium">
                {spec.value}
              </span>
            </div>
          ))}
        </div>
      )}

      {/* Best Practice Tip */}
      {tip && (
        <div className="text-[10.5px] text-zinc-500 dark:text-zinc-400 italic bg-amber-500/5 dark:bg-amber-400/5 border border-amber-500/15 rounded-lg px-2.5 py-1.5">
          💡 {tip}
        </div>
      )}
    </div>
  );
}

// Convenient aliases for different mental models
export const SpecDetail = ComponentSpecDetail;
export const ComponentDescription = ComponentSpecDetail;
export type SpecDetailProps = ComponentSpecDetailProps;
export type ComponentDescriptionProps = ComponentSpecDetailProps;
