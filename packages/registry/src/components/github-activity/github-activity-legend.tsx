"use client";

import React from "react";
import { cn } from "@/lib/utils";
import { THEME_LEVEL_CLASSES } from "./constants";
import type { GithubActivityLegendProps, GithubContributionLevel } from "./types";

const LEVELS: GithubContributionLevel[] = [0, 1, 2, 3, 4];

export function GithubActivityLegend({
  theme = "github",
  totalCount,
  yearLabel,
  className,
}: GithubActivityLegendProps) {
  const themeClasses = THEME_LEVEL_CLASSES[theme] || THEME_LEVEL_CLASSES.github;

  return (
    <div className={cn("flex items-center justify-between gap-2 text-xs text-zinc-500 dark:text-zinc-400 select-none pt-1.5", className)}>
      {typeof totalCount === "number" ? (
        <span className="text-[11px] font-medium text-zinc-600 dark:text-zinc-300 truncate">
          <strong className="text-zinc-900 dark:text-white font-semibold">{totalCount.toLocaleString()}</strong>{" "}
          <span className="hidden sm:inline">contributions {yearLabel || "in the past year"}</span>
          <span className="sm:hidden">contributions</span>
        </span>
      ) : (
        <span />
      )}

      <div className="flex items-center gap-1.5 shrink-0 ml-auto">
        <span className="text-[10px] text-zinc-400">Less</span>
        <div className="flex items-center gap-1">
          {LEVELS.map((level) => (
            <div
              key={level}
              className={cn("w-2.5 h-2.5 rounded-[2px] border transition-transform hover:scale-125 cursor-pointer", themeClasses[level])}
              title={`Level ${level}`}
              aria-label={`Contribution level ${level}`}
            />
          ))}
        </div>
        <span className="text-[10px] text-zinc-400">More</span>
      </div>
    </div>
  );
}
