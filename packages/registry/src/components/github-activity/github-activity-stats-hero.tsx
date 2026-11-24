"use client";

import React, { useMemo } from "react";
import { AnimatedTrendingIcon } from "@/assets/svg";
import { cn } from "@/lib/utils";
import { GithubActivityInfoTooltip } from "./github-activity-info-tooltip";
import type { GithubContributionDay, GithubActivityStatsHeroProps } from "./types";

function computeVelocity(
  totalContributions: number,
  contributions?: GithubContributionDay[],
  currentStreak = 0,
  longestStreak = 0
) {
  if (contributions && contributions.length >= 14) {
    const totalDays = contributions.length;
    const totalCount = contributions.reduce((acc, d) => acc + d.count, 0) || totalContributions || 1;
    const dailyAvg = totalCount / totalDays;

    const recentWindow = contributions.slice(-28);
    const recentDaily = recentWindow.reduce((acc, d) => acc + d.count, 0) / recentWindow.length;
    let diffPct = dailyAvg > 0 ? Math.round(((recentDaily - dailyAvg) / dailyAvg) * 100) : 0;
    diffPct = Math.max(-99, Math.min(999, diffPct));

    const sliceSize = Math.max(1, Math.floor(totalDays / 12));
    const points: number[] = [];
    for (let i = 0; i < 12; i++) {
      const start = i * sliceSize;
      const end = Math.min(totalDays, start + sliceSize);
      points.push(contributions.slice(start, end).reduce((acc, d) => acc + d.count, 0));
    }

    const isPositive = diffPct >= 0;
    return { text: isPositive ? `+${diffPct}% vs avg` : `${diffPct}% vs avg`, isPositive, points };
  }

  const streakFactor = longestStreak > 0 ? currentStreak / longestStreak : 0.5;
  const diffPct = Math.round((streakFactor - 0.5) * 50);
  const isPositive = diffPct >= 0;
  const base = Math.max(1, Math.round(totalContributions / 12));
  const points = [
    Math.round(base * 0.7), Math.round(base * 0.9), Math.round(base * 0.8),
    Math.round(base * 1.1), Math.round(base * 1.0), Math.round(base * 1.3),
    Math.round(base * 1.2), Math.round(base * (1 + streakFactor * 0.6)),
  ];

  return { text: isPositive ? `+${diffPct}% vs avg` : `${diffPct}% vs avg`, isPositive, points };
}

function generateSparklinePaths(points: number[], width = 120, height = 28, padY = 4) {
  if (!points || points.length === 0) {
    return { path: "M 0 24 L 120 24", area: "M 0 24 L 120 24 L 120 28 L 0 28 Z", lastX: 120, lastY: 24 };
  }
  const max = Math.max(...points, 1), min = Math.min(...points, 0);
  const range = max - min || 1, usableH = height - padY * 2;
  const coords = points.map((p, i) => ({
    x: Math.round((i / (points.length - 1)) * width),
    y: Math.round(height - padY - ((p - min) / range) * usableH),
  }));

  const path = coords.reduce((acc, pt, i) => (i === 0 ? `M ${pt.x} ${pt.y}` : `${acc} L ${pt.x} ${pt.y}`), "");
  const last = coords[coords.length - 1];
  return { path, area: `${path} L ${width} ${height} L 0 ${height} Z`, lastX: last.x, lastY: last.y };
}

export function GithubActivityStatsHero({
  totalContributions, contributions, currentStreak = 0, longestStreak = 0,
  isHighlighted, isDimmed, isAnyActive, handleToggle, isLoading = false, staticIcons = false,
}: GithubActivityStatsHeroProps) {
  const velocity = useMemo(
    () => computeVelocity(totalContributions, contributions, currentStreak, longestStreak),
    [totalContributions, contributions, currentStreak, longestStreak]
  );

  const sparkline = useMemo(
    () => generateSparklinePaths(velocity.points, 120, 28, 4),
    [velocity.points]
  );

  if (isLoading) {
    return (
      <div className="flex flex-col justify-between p-3.5 sm:p-4 rounded-xl bg-zinc-50 dark:bg-zinc-800/40 border border-zinc-200/50 dark:border-zinc-700/50 h-full animate-pulse">
        <div className="h-5 w-20 rounded-full bg-zinc-200/70 dark:bg-zinc-800/70" />
        <div className="space-y-1.5 my-auto">
          <div className="h-8 w-28 rounded bg-zinc-200/80 dark:bg-zinc-800" />
          <div className="h-3 w-16 rounded bg-zinc-200/50 dark:bg-zinc-800/50" />
        </div>
        <div className="h-8 w-full rounded bg-zinc-200/40 dark:bg-zinc-800/40" />
      </div>
    );
  }

  const accentColor = velocity.isPositive ? "rgb(16, 185, 129)" : "rgb(245, 158, 11)";

  return (
    <div
      role="button"
      tabIndex={0}
      onClick={() => handleToggle("total")}
      onKeyDown={(e) => {
        if (e.key === "Enter" || e.key === " ") {
          e.preventDefault();
          handleToggle("total");
        }
      }}
      aria-label="Filter by total contributions"
      aria-pressed={isHighlighted}
      className={cn(
        "group relative flex flex-col justify-between p-3.5 sm:p-4 rounded-xl border transition-all duration-300 text-left cursor-pointer select-none overflow-visible h-full hover:z-30 focus-within:z-30 has-[[role=tooltip]]:z-50",
        isHighlighted
          ? "from-emerald-500/20 via-emerald-500/10 to-transparent dark:from-emerald-500/25 dark:via-zinc-900/60 dark:to-zinc-900/40 border-emerald-500 ring-2 ring-emerald-500/30 shadow-lg shadow-emerald-500/20 opacity-100 scale-[1.01] z-10"
          : "bg-gradient-to-br from-emerald-500/10 via-zinc-50/80 to-white dark:via-zinc-900/40 dark:to-zinc-900/20 border-emerald-500/20 hover:border-emerald-500/40",
        isDimmed && "opacity-35 blur-[1.5px] scale-[0.98] grayscale-[25%]",
        !isAnyActive && "hover:-translate-y-0.5 hover:shadow-xs"
      )}
    >
      <div className="flex items-center justify-between w-full">
        <div className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded-full bg-emerald-500/15 text-emerald-600 dark:text-emerald-400 text-xs font-semibold">
          <AnimatedTrendingIcon className="size-3.5 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" animate={!staticIcons} />
          <span>Total</span>
          <GithubActivityInfoTooltip
            title="Total Contributions"
            description="Combined sum of code commits, PR merges, peer reviews, and issue tickets across your profile."
            position="bottom"
            align="left"
            iconClassName="text-emerald-600/70 dark:text-emerald-400/70 hover:text-emerald-700 dark:hover:text-emerald-300"
          />
        </div>
        {isHighlighted && (
          <span className="inline-flex items-center gap-1 text-[9px] font-semibold px-1.5 py-0.5 rounded-full border bg-emerald-500/15 text-emerald-500 border-emerald-500/30">
            <span className="w-1 h-1 rounded-full animate-ping bg-emerald-500" />
            <span>active</span>
          </span>
        )}
      </div>

      <div className="my-auto py-1 sm:py-2">
        <div className="text-3xl sm:text-4xl font-black tracking-tight text-zinc-900 dark:text-white leading-none">
          {totalContributions.toLocaleString()}
        </div>
        <div className="text-xs text-zinc-500 dark:text-zinc-400 font-medium mt-1">
          Contributions
        </div>
      </div>

      <div className="w-full pt-1.5 border-t border-emerald-500/15 dark:border-emerald-500/10">
        <div className="flex items-center justify-between text-[10px] text-zinc-400 dark:text-zinc-500 font-mono mb-1">
          <div className="flex items-center gap-1">
            <span>Velocity pace</span>
            <GithubActivityInfoTooltip
              title="Velocity Pace"
              description="Compares recent 28-day daily activity against your yearly baseline average."
              position="top"
              align="left"
            />
          </div>
          <span className={cn("font-semibold", velocity.isPositive ? "text-emerald-600 dark:text-emerald-400" : "text-amber-500 dark:text-amber-400")}>
            {velocity.text}
          </span>
        </div>
        <svg viewBox="0 0 120 28" className="w-full h-5 sm:h-6 overflow-visible">
          <defs>
            <linearGradient id="hero-spark-grad" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor={accentColor} stopOpacity="0.35" />
              <stop offset="100%" stopColor={accentColor} stopOpacity="0.0" />
            </linearGradient>
          </defs>
          <path d={sparkline.area} fill="url(#hero-spark-grad)" />
          <path d={sparkline.path} fill="none" stroke={accentColor} strokeWidth="2" strokeLinecap="round" />
          <circle cx={sparkline.lastX} cy={sparkline.lastY} r="2.5" fill={accentColor} className="animate-pulse" />
        </svg>
      </div>
    </div>
  );
}
