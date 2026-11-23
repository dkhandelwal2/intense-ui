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
    <div className={cn("flex flex-col gap-1 pb-1.5 border-b border-zinc-100 dark:border-zinc-800/80", className)}>
      <div className="flex items-center justify-between">
        <span className="text-xs font-semibold text-zinc-700 dark:text-zinc-300">Active View</span>
        <span className="text-[10px] font-mono text-[var(--theme-primary)] uppercase font-bold">{activeTab}</span>
      </div>
      <div className="grid grid-cols-3 gap-1 p-0.5 rounded-xl bg-zinc-100/80 dark:bg-zinc-800/60 border border-zinc-200/60 dark:border-zinc-700/60">
        {TABS.map((t) => (
          <button
            key={t.id}
            type="button"
            onClick={() => onChange(t.id)}
            className={cn(
              "py-1 px-0.5 rounded-lg text-[10px] 2xl:text-[10.5px] font-semibold tracking-tight transition-all cursor-pointer text-center whitespace-nowrap",
              activeTab === t.id
                ? "bg-[var(--theme-primary)] text-white shadow-2xs font-bold"
                : "text-zinc-500 hover:text-zinc-800 dark:hover:text-zinc-200"
            )}
          >
            {t.label}
          </button>
        ))}
      </div>
    </div>
  );
}
