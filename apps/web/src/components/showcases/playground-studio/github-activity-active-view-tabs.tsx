"use client";

import React from "react";
import { cn } from "@/lib/utils";
import type { GithubActivityVariant } from "@/components/ui/github-activity";

export interface GithubActivityActiveViewTabsProps {
  activeTab: GithubActivityVariant;
  onChange: (tab: GithubActivityVariant) => void;
  className?: string;
}

const TABS: Array<{ id: GithubActivityVariant; label: string }> = [
  { id: "heatmap", label: "Heatmap" },
  { id: "timeline", label: "Timeline" },
  { id: "stats", label: "Stats" },
];

export function GithubActivityActiveViewTabs({
  activeTab,
  onChange,
  className,
}: GithubActivityActiveViewTabsProps) {
  return (
    <div className={cn("flex flex-col gap-1 pb-2 border-b border-zinc-100 dark:border-zinc-800/80", className)}>
      <div className="flex items-center justify-between">
        <span className="text-xs font-semibold text-zinc-700 dark:text-zinc-300">Active View</span>
        <span className="text-[11px] font-mono font-semibold text-[var(--theme-primary)] uppercase">{activeTab}</span>
      </div>
      <div className="grid grid-cols-2 gap-1.5">
        {TABS.map((t, idx) => {
          const isActive = activeTab === t.id;
          return (
            <button
              key={t.id}
              type="button"
              onClick={() => onChange(t.id)}
              className={cn(
                "py-1.5 px-2 rounded-lg border text-xs font-semibold transition-all text-center cursor-pointer truncate",
                idx === 2 ? "col-span-2" : "",
                isActive
                  ? "border-[var(--theme-primary)] bg-[var(--theme-primary)]/10 text-[var(--theme-primary)] ring-1 ring-[var(--theme-primary)]/30 font-bold"
                  : "border-zinc-200/80 dark:border-zinc-800 text-zinc-600 dark:text-zinc-400 hover:bg-zinc-100 dark:hover:bg-zinc-800"
              )}
            >
              {t.label}
            </button>
          );
        })}
      </div>
    </div>
  );
}
