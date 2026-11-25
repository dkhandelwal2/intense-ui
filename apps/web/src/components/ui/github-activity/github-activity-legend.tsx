"use client";

import React, { useMemo, useState } from "react";
import { motion } from "framer-motion";
import { AnimatedDropletIcon } from "@/assets/svg";
import { cn } from "@/lib/utils";
import { resolveGithubTheme } from "./github-activity-theme-helpers";
import type { GithubActivityLegendProps, GithubContributionLevel } from "./types";

export function GithubActivityLegend({
  theme = "github",
  totalCount,
  yearLabel,
  showStreaks = true,
  streakCount,
  staticIcons = false,
  className,
}: GithubActivityLegendProps) {
  const [isStreakExpanded, setIsStreakExpanded] = useState(false);
  const { themeClasses, themeStyle } = useMemo(() => resolveGithubTheme(theme), [theme]);

  return (
    <div className={cn("flex items-center justify-between gap-2.5 text-xs text-zinc-500 dark:text-zinc-400 select-none h-full", className)}>
      <div className="flex items-center gap-2.5 min-w-0">
        {typeof totalCount === "number" ? (
          <span className="text-[11px] font-medium text-zinc-600 dark:text-zinc-300 truncate">
            <strong className="text-zinc-900 dark:text-white font-semibold">{totalCount.toLocaleString()}</strong>{" "}
            <span className="hidden sm:inline">contributions {yearLabel || "in the past year"}</span>
            <span className="sm:hidden">contributions</span>
          </span>
        ) : null}
        {showStreaks && streakCount !== undefined && streakCount > 0 && (
          <button
            type="button"
            onClick={() => setIsStreakExpanded((prev) => !prev)}
            aria-expanded={isStreakExpanded}
            aria-label={`${streakCount} day streak`}
            title={isStreakExpanded ? "Collapse streak" : `${streakCount} day streak - Click to view`}
            className="inline-flex items-center px-2 py-0.5 rounded-full bg-amber-500/10 text-amber-600 dark:text-amber-400 border border-amber-500/20 text-[11px] font-semibold shrink-0 shadow-2xs cursor-pointer hover:bg-amber-500/15 active:scale-95 transition-colors focus:outline-none focus:ring-1 focus:ring-amber-500/40 select-none overflow-hidden"
          >
            <AnimatedDropletIcon className="w-3.5 h-3.5 fill-amber-500 text-amber-500 shrink-0" animate={!staticIcons} />
            <motion.span
              initial={false}
              animate={{
                maxWidth: isStreakExpanded ? 100 : 0,
                opacity: isStreakExpanded ? 1 : 0,
                marginLeft: isStreakExpanded ? 6 : 0,
              }}
              transition={{
                type: "spring",
                stiffness: 400,
                damping: 28,
              }}
              className="whitespace-nowrap overflow-hidden inline-block font-semibold"
            >
              {streakCount}d streak
            </motion.span>
          </button>
        )}
      </div>

      <div className="flex items-center gap-1.5 shrink-0 ml-auto">
        <span className="text-[10px] text-zinc-400">Less</span>
        <div className="flex items-center gap-[3px]" style={themeStyle}>
          {([0, 1, 2, 3, 4] as GithubContributionLevel[]).map((level) => (
            <div
              key={level}
              className={cn("w-2.5 h-2.5 rounded-xs transition-colors", themeClasses[level])}
            />
          ))}
        </div>
        <span className="text-[10px] text-zinc-400">More</span>
      </div>
    </div>
  );
}
