"use client";

import React from "react";
import { Flame, GitCommit, Calendar, TrendingUp, GitPullRequest, Eye, AlertCircle } from "lucide-react";
import { cn } from "@/lib/utils";
import type { GithubActivityStatsData } from "./types";

export interface GithubActivityStatsCardsProps {
  stats: GithubActivityStatsData;
  activeCategory: string | null;
  activeBreakdownCat: { id: string; label: string; count: number; pct: number; color: string; textColor: string; desc: string; icon: any };
  handleToggle: (id: string) => void;
  setHoveredCat: (id: string | null) => void;
  showStreaks?: boolean;
  isLoading?: boolean;
}

export function GithubActivityStatsCards({
  stats,
  activeCategory,
  activeBreakdownCat,
  handleToggle,
  setHoveredCat,
  showStreaks = true,
  isLoading = false,
}: GithubActivityStatsCardsProps) {
  const { totalContributions, currentStreak, longestStreak, commitsCount, prsCount, issuesCount, reviewsCount } = stats;

  const catMap: Record<string, {
    label: string; value: string | number; sub: string; icon: any;
    bg: string; activeBg: string; iconBox: string; activeRing: string;
    valColor: string; badgeBg: string; dotColor: string; iconAnim: string;
  }> = {
    commits: {
      label: "Commits", value: commitsCount.toLocaleString(), sub: "Pushed code", icon: GitCommit,
      bg: "from-emerald-500/10 via-zinc-50 to-white dark:via-zinc-900/40 dark:to-zinc-900/20 border-emerald-500/25",
      activeBg: "from-emerald-500/20 via-emerald-500/10 to-transparent dark:from-emerald-500/25 dark:via-zinc-900/60 dark:to-zinc-900/40 border-emerald-500/60 shadow-lg shadow-emerald-500/20",
      iconBox: "bg-emerald-500/15 text-emerald-500",
      activeRing: "border-emerald-500 ring-2 ring-emerald-500/40 shadow-lg shadow-emerald-500/25",
      valColor: "text-zinc-900 dark:text-white",
      badgeBg: "bg-emerald-500/15 text-emerald-600 dark:text-emerald-400 border-emerald-500/30",
      dotColor: "bg-emerald-500",
      iconAnim: "group-aria-pressed:animate-[spin_4s_linear_infinite] group-hover:rotate-180 transition-transform duration-500",
    },
    prs: {
      label: "Pull Requests", value: prsCount.toLocaleString(), sub: "Merged PRs", icon: GitPullRequest,
      bg: "from-purple-500/10 via-zinc-50 to-white dark:via-zinc-900/40 dark:to-zinc-900/20 border-purple-500/25",
      activeBg: "from-purple-500/20 via-purple-500/10 to-transparent dark:from-purple-500/25 dark:via-zinc-900/60 dark:to-zinc-900/40 border-purple-500/60 shadow-lg shadow-purple-500/20",
      iconBox: "bg-purple-500/15 text-purple-500",
      activeRing: "border-purple-500 ring-2 ring-purple-500/40 shadow-lg shadow-purple-500/25",
      valColor: "text-zinc-900 dark:text-white",
      badgeBg: "bg-purple-500/15 text-purple-600 dark:text-purple-400 border-purple-500/30",
      dotColor: "bg-purple-500",
      iconAnim: "group-aria-pressed:animate-bounce group-hover:-translate-y-1 transition-transform duration-300",
    },
    reviews: {
      label: "Reviews", value: reviewsCount.toLocaleString(), sub: "Code reviews", icon: Eye,
      bg: "from-blue-500/10 via-zinc-50 to-white dark:via-zinc-900/40 dark:to-zinc-900/20 border-blue-500/25",
      activeBg: "from-blue-500/20 via-blue-500/10 to-transparent dark:from-blue-500/25 dark:via-zinc-900/60 dark:to-zinc-900/40 border-blue-500/60 shadow-lg shadow-blue-500/20",
      iconBox: "bg-blue-500/15 text-blue-500",
      activeRing: "border-blue-500 ring-2 ring-blue-500/40 shadow-lg shadow-blue-500/25",
      valColor: "text-zinc-900 dark:text-white",
      badgeBg: "bg-blue-500/15 text-blue-600 dark:text-blue-400 border-blue-500/30",
      dotColor: "bg-blue-500",
      iconAnim: "group-aria-pressed:animate-[pulse_1.5s_ease-in-out_infinite] group-hover:scale-125 transition-transform duration-300",
    },
    issues: {
      label: "Issues", value: issuesCount.toLocaleString(), sub: "Resolved issues", icon: AlertCircle,
      bg: "from-amber-500/10 via-zinc-50 to-white dark:via-zinc-900/40 dark:to-zinc-900/20 border-amber-500/25",
      activeBg: "from-amber-500/20 via-amber-500/10 to-transparent dark:from-amber-500/25 dark:via-zinc-900/60 dark:to-zinc-900/40 border-amber-500/60 shadow-lg shadow-amber-500/20",
      iconBox: "bg-amber-500/15 text-amber-500",
      activeRing: "border-amber-500 ring-2 ring-amber-500/40 shadow-lg shadow-amber-500/25",
      valColor: "text-zinc-900 dark:text-white",
      badgeBg: "bg-amber-500/15 text-amber-600 dark:text-amber-400 border-amber-500/30",
      dotColor: "bg-amber-500",
      iconAnim: "group-aria-pressed:animate-pulse group-hover:rotate-12 transition-transform duration-300",
    },
  };

  const dynamicCard = catMap[activeBreakdownCat.id] || catMap.commits;

  const metricCards = [
    {
      id: "total", label: "Total", value: totalContributions.toLocaleString(), unit: "", sub: "Contributions", icon: TrendingUp,
      bg: "from-emerald-500/10 via-zinc-50 to-white dark:via-zinc-900/40 dark:to-zinc-900/20 border-emerald-500/20",
      activeBg: "from-emerald-500/20 via-emerald-500/10 to-transparent border-emerald-500/60 shadow-lg shadow-emerald-500/20",
      iconBox: "bg-emerald-500/10 text-emerald-500", valColor: "text-zinc-900 dark:text-white",
      activeRing: "border-emerald-500 ring-2 ring-emerald-500/30 shadow-lg shadow-emerald-500/10",
      badgeBg: "bg-emerald-500/15 text-emerald-500 border-emerald-500/30", dotColor: "bg-emerald-500",
      iconAnim: "group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform", visible: true,
    },
    {
      id: "current", label: "Current", value: currentStreak, unit: "days", sub: "Active streak", icon: Flame,
      bg: "from-amber-500/15 via-amber-500/5 to-transparent border-amber-500/25",
      activeBg: "from-amber-500/25 via-amber-500/10 to-transparent border-amber-500/60 shadow-lg shadow-amber-500/20",
      iconBox: "bg-amber-500/20 text-amber-500", valColor: "text-amber-600 dark:text-amber-400",
      activeRing: "border-amber-500 ring-2 ring-amber-500/30 shadow-lg shadow-amber-500/10",
      badgeBg: "bg-amber-500/15 text-amber-500 border-amber-500/30", dotColor: "bg-amber-500",
      iconAnim: "fill-amber-500 animate-pulse group-hover:scale-125 transition-transform", visible: showStreaks,
    },
    {
      id: "longest", label: "Longest", value: longestStreak, unit: "days", sub: "Best record", icon: Calendar,
      bg: "from-blue-500/10 via-zinc-50 to-white dark:via-zinc-900/40 dark:to-zinc-900/20 border-blue-500/20",
      activeBg: "from-blue-500/20 via-blue-500/10 to-transparent border-blue-500/60 shadow-lg shadow-blue-500/20",
      iconBox: "bg-blue-500/10 text-blue-500", valColor: "text-zinc-900 dark:text-white",
      activeRing: "border-blue-500 ring-2 ring-blue-500/30 shadow-lg shadow-blue-500/10",
      badgeBg: "bg-blue-500/15 text-blue-500 border-blue-500/30", dotColor: "bg-blue-500",
      iconAnim: "group-hover:scale-110 transition-transform", visible: showStreaks,
    },
    {
      id: "category", label: dynamicCard.label, value: dynamicCard.value, unit: "", sub: dynamicCard.sub, icon: dynamicCard.icon,
      bg: dynamicCard.bg, activeBg: dynamicCard.activeBg, iconBox: dynamicCard.iconBox, valColor: dynamicCard.valColor,
      activeRing: dynamicCard.activeRing, badgeBg: dynamicCard.badgeBg, dotColor: dynamicCard.dotColor,
      iconAnim: dynamicCard.iconAnim, visible: true,
    },
  ].filter((c) => c.visible);

  const isAnyActive = Boolean(activeCategory);

  return (
    <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
      {isLoading ? (
        Array.from({ length: 4 }).map((_, idx) => (
          <div key={idx} className="flex flex-col items-center justify-center gap-2 p-3 rounded-xl bg-zinc-50 dark:bg-zinc-800/40 border border-zinc-200/50 dark:border-zinc-700/50">
            <div className="h-3 w-16 rounded bg-zinc-200/70 dark:bg-zinc-800/70 animate-pulse" />
            <div className="h-6 w-20 rounded bg-zinc-200/80 dark:bg-zinc-800 animate-pulse" />
            <div className="h-2.5 w-14 rounded bg-zinc-200/50 dark:bg-zinc-800/50 animate-pulse" />
          </div>
        ))
      ) : (
        metricCards.map(({ id, label, value, unit, sub, icon: Icon, bg, activeBg, iconBox, valColor, activeRing, badgeBg, dotColor, iconAnim }) => {
          const isHighlighted = isAnyActive && (id === activeCategory || (id === "category" && ["commits", "prs", "reviews", "issues"].includes(activeCategory!)));
          const isDimmed = isAnyActive && !isHighlighted;
          return (
            <button
              key={id}
              type="button"
              onClick={() => handleToggle(id === "category" ? activeBreakdownCat.id : id)}
              onMouseEnter={() => id === "category" && setHoveredCat(activeBreakdownCat.id)}
              onMouseLeave={() => setHoveredCat(null)}
              aria-pressed={isHighlighted}
              className={cn(
                "group relative flex flex-col items-center justify-center p-3 rounded-xl border transition-all duration-300 text-center cursor-pointer select-none overflow-hidden",
                isHighlighted ? activeBg : bg,
                isDimmed && "opacity-35 blur-[1.5px] scale-[0.98] grayscale-[25%]",
                isHighlighted && cn("opacity-100 scale-[1.03] z-10", activeRing),
                !isAnyActive && "hover:-translate-y-0.5 hover:shadow-xs"
              )}
            >
              <div className="flex items-center justify-center gap-1.5 text-xs text-zinc-500 dark:text-zinc-400">
                <div className={cn("p-1.5 rounded-lg transition-all duration-300", iconBox, isHighlighted && "scale-110 shadow-xs")}>
                  <Icon className={cn("w-3.5 h-3.5", iconAnim)} />
                </div>
                <span className="font-semibold tracking-tight">{label}</span>
              </div>
              <div className="my-1.5 flex items-baseline justify-center gap-1">
                <span className={cn("text-2xl sm:text-3xl font-black tracking-tight transition-colors duration-300", valColor)}>{value}</span>
                {unit && <span className="text-xs font-semibold text-zinc-500 dark:text-zinc-400">{unit}</span>}
              </div>
              <div className="flex items-center justify-center gap-1.5 min-h-[18px]">
                <span className="text-[10px] text-zinc-400 dark:text-zinc-400 font-medium">{sub}</span>
                {isHighlighted && (
                  <span className={cn("inline-flex items-center gap-1 text-[9px] font-semibold px-1.5 py-0.5 rounded-full border shadow-2xs transition-all duration-300", badgeBg)}>
                    <span className={cn("w-1 h-1 rounded-full animate-ping", dotColor)} />
                    <span>active</span>
                  </span>
                )}
              </div>
            </button>
          );
        })
      )}
    </div>
  );
}
