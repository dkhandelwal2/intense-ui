"use client";

import React from "react";
import {
  AnimatedDropletIcon,
  AnimatedCalendarIcon,
  AnimatedCommitIcon,
  AnimatedPullRequestIcon,
  AnimatedEyeIcon,
  AnimatedAlertCircleIcon,
} from "@/assets/svg";
import { cn } from "@/lib/utils";
import { GithubActivityStatsHero } from "./github-activity-stats-hero";
import { GithubActivityInfoTooltip } from "./github-activity-info-tooltip";
import type { GithubActivityStatsCardsProps } from "./types";

export function GithubActivityStatsCards({
  stats, contributions, activeCategory, activeBreakdownCat,
  handleToggle, setHoveredCat, showStreaks = true, isLoading = false,
  staticIcons = false, breakdownSlot,
}: GithubActivityStatsCardsProps) {
  const { totalContributions, currentStreak, longestStreak, commitsCount, prsCount, issuesCount, reviewsCount } = stats;

  const catMap: Record<string, {
    label: string; value: string | number; sub: string; icon: any;
    infoTitle: string; infoDesc: string; bg: string; activeBg: string;
    iconBox: string; activeRing: string; valColor: string; badgeBg: string;
    dotColor: string; iconAnim: string;
  }> = {
    commits: {
      label: "Commits", value: commitsCount.toLocaleString(), sub: "Pushed code", icon: AnimatedCommitIcon,
      infoTitle: "Code Commits", infoDesc: "Direct git commits authored and pushed to repository branches.",
      bg: "from-emerald-500/10 via-zinc-50/80 to-white dark:via-zinc-900/40 dark:to-zinc-900/20 border-emerald-500/20",
      activeBg: "from-emerald-500/20 via-emerald-500/10 to-transparent dark:from-emerald-500/25 dark:via-zinc-900/60 dark:to-zinc-900/40 border-emerald-500/60 shadow-lg shadow-emerald-500/20",
      iconBox: "bg-emerald-500/15 text-emerald-500", activeRing: "border-emerald-500 ring-2 ring-emerald-500/40 shadow-lg shadow-emerald-500/25",
      valColor: "text-zinc-900 dark:text-white", badgeBg: "bg-emerald-500/15 text-emerald-600 dark:text-emerald-400 border-emerald-500/30",
      dotColor: "bg-emerald-500", iconAnim: "group-aria-pressed:scale-110 transition-transform duration-300",
    },
    prs: {
      label: "Pull Requests", value: prsCount.toLocaleString(), sub: "Merged PRs", icon: AnimatedPullRequestIcon,
      infoTitle: "Merged Changes", infoDesc: "Code additions and modifications submitted and merged.",
      bg: "from-purple-500/10 via-zinc-50/80 to-white dark:via-zinc-900/40 dark:to-zinc-900/20 border-purple-500/20",
      activeBg: "from-purple-500/20 via-purple-500/10 to-transparent dark:from-purple-500/25 dark:via-zinc-900/60 dark:to-zinc-900/40 border-purple-500/60 shadow-lg shadow-purple-500/20",
      iconBox: "bg-purple-500/15 text-purple-500", activeRing: "border-purple-500 ring-2 ring-purple-500/40 shadow-lg shadow-purple-500/25",
      valColor: "text-zinc-900 dark:text-white", badgeBg: "bg-purple-500/15 text-purple-600 dark:text-purple-400 border-purple-500/30",
      dotColor: "bg-purple-500", iconAnim: "group-aria-pressed:scale-110 transition-transform duration-300",
    },
    reviews: {
      label: "Reviews", value: reviewsCount.toLocaleString(), sub: "Code reviews", icon: AnimatedEyeIcon,
      infoTitle: "Review Activity", infoDesc: "Pull request code reviews and approval comments submitted for peers.",
      bg: "from-blue-500/10 via-zinc-50/80 to-white dark:via-zinc-900/40 dark:to-zinc-900/20 border-blue-500/20",
      activeBg: "from-blue-500/20 via-blue-500/10 to-transparent dark:from-blue-500/25 dark:via-zinc-900/60 dark:to-zinc-900/40 border-blue-500/60 shadow-lg shadow-blue-500/20",
      iconBox: "bg-blue-500/15 text-blue-500", activeRing: "border-blue-500 ring-2 ring-blue-500/40 shadow-lg shadow-blue-500/25",
      valColor: "text-zinc-900 dark:text-white", badgeBg: "bg-blue-500/15 text-blue-600 dark:text-blue-400 border-blue-500/30",
      dotColor: "bg-blue-500", iconAnim: "group-aria-pressed:scale-110 transition-transform duration-300",
    },
    issues: {
      label: "Issues", value: issuesCount.toLocaleString(), sub: "Resolved issues", icon: AnimatedAlertCircleIcon,
      infoTitle: "Issue Tracker", infoDesc: "Issue reports created, tracked, or resolved across repositories.",
      bg: "from-amber-500/10 via-zinc-50/80 to-white dark:via-zinc-900/40 dark:to-zinc-900/20 border-amber-500/20",
      activeBg: "from-amber-500/20 via-amber-500/10 to-transparent dark:from-amber-500/25 dark:via-zinc-900/60 dark:to-zinc-900/40 border-amber-500/60 shadow-lg shadow-amber-500/20",
      iconBox: "bg-amber-500/15 text-amber-500", activeRing: "border-amber-500 ring-2 ring-amber-500/40 shadow-lg shadow-amber-500/25",
      valColor: "text-zinc-900 dark:text-white", badgeBg: "bg-amber-500/15 text-amber-600 dark:text-amber-400 border-amber-500/30",
      dotColor: "bg-amber-500", iconAnim: "group-aria-pressed:scale-110 transition-transform duration-300",
    },
  };

  const dynamicCard = catMap[activeBreakdownCat.id] || catMap.commits;
  const isAnyActive = Boolean(activeCategory);

  const topCards = [
    {
      id: "current", label: "Current", value: currentStreak, unit: "days", sub: "Active streak", icon: AnimatedDropletIcon,
      infoTitle: "Active Streak", infoDesc: "Consecutive days with at least one recorded contribution up to today.",
      align: "left" as const, position: "bottom" as const,
      bg: "from-amber-500/15 via-amber-500/5 to-transparent border-amber-500/25",
      activeBg: "from-amber-500/25 via-amber-500/10 to-transparent border-amber-500/60 shadow-lg shadow-amber-500/20",
      iconBox: "bg-amber-500/20 text-amber-500", valColor: "text-amber-600 dark:text-amber-400",
      activeRing: "border-amber-500 ring-2 ring-amber-500/30 shadow-lg shadow-amber-500/10",
      badgeBg: "bg-amber-500/15 text-amber-500 border-amber-500/30", dotColor: "bg-amber-500",
      iconAnim: "fill-amber-500 group-hover:scale-125 transition-transform", visible: showStreaks,
    },
    {
      id: "longest", label: "Longest", value: longestStreak, unit: "days", sub: "Best record", icon: AnimatedCalendarIcon,
      infoTitle: "Best Record", infoDesc: "All-time longest continuous streak of consecutive active contribution days.",
      align: "center" as const, position: "bottom" as const,
      bg: "from-blue-500/10 via-zinc-50/80 to-white dark:via-zinc-900/40 dark:to-zinc-900/20 border-blue-500/20",
      activeBg: "from-blue-500/20 via-blue-500/10 to-transparent border-blue-500/60 shadow-lg shadow-blue-500/20",
      iconBox: "bg-blue-500/10 text-blue-500", valColor: "text-zinc-900 dark:text-white",
      activeRing: "border-blue-500 ring-2 ring-blue-500/30 shadow-lg shadow-blue-500/10",
      badgeBg: "bg-blue-500/15 text-blue-500 border-blue-500/30", dotColor: "bg-blue-500",
      iconAnim: "group-hover:scale-110 transition-transform", visible: showStreaks,
    },
    {
      id: "category", label: dynamicCard.label, value: dynamicCard.value, unit: "", sub: dynamicCard.sub, icon: dynamicCard.icon,
      infoTitle: dynamicCard.infoTitle, infoDesc: dynamicCard.infoDesc,
      align: "right" as const, position: "bottom" as const,
      bg: dynamicCard.bg, activeBg: dynamicCard.activeBg, iconBox: dynamicCard.iconBox, valColor: dynamicCard.valColor,
      activeRing: dynamicCard.activeRing, badgeBg: dynamicCard.badgeBg, dotColor: dynamicCard.dotColor,
      iconAnim: dynamicCard.iconAnim, visible: true,
    },
  ].filter((c) => c.visible);

  return (
    <div className="grid grid-cols-1 sm:grid-cols-12 gap-2.5 sm:gap-3 h-full">
      {/* 1. Hero Bento Card: Total Contributions & Velocity Wave */}
      <div className="sm:col-span-4 h-full flex flex-col min-h-[140px] sm:min-h-0 relative hover:z-30 focus-within:z-30 has-[[role=tooltip]]:z-50">
        <GithubActivityStatsHero
          totalContributions={totalContributions}
          contributions={contributions}
          currentStreak={currentStreak}
          longestStreak={longestStreak}
          isHighlighted={isAnyActive && activeCategory === "total"}
          isDimmed={isAnyActive && activeCategory !== "total"}
          isAnyActive={isAnyActive}
          handleToggle={handleToggle}
          isLoading={isLoading}
          staticIcons={staticIcons}
        />
      </div>

      {/* 2. Right Side: Top Row Metric Cards + Bottom Bento Breakdown Slot */}
      <div className="sm:col-span-8 flex flex-col justify-between gap-2 sm:gap-2.5 h-full min-h-0 relative has-[[role=tooltip]]:z-50">
        <div className="grid grid-cols-3 gap-1.5 sm:gap-2.5 flex-1 min-h-0">
          {isLoading ? (
            Array.from({ length: 3 }).map((_, idx) => (
              <div key={idx} className="flex flex-col justify-between p-2 sm:p-3 rounded-xl bg-zinc-50 dark:bg-zinc-800/40 border border-zinc-200/50 dark:border-zinc-700/50 animate-pulse">
                <div className="h-3 w-14 rounded bg-zinc-200/70 dark:bg-zinc-800/70" />
                <div className="h-6 w-16 rounded bg-zinc-200/80 dark:bg-zinc-800" />
                <div className="h-2.5 w-12 rounded bg-zinc-200/50 dark:bg-zinc-800/50" />
              </div>
            ))
          ) : (
            topCards.map(({ id, label, value, unit, sub, icon: Icon, infoTitle, infoDesc, align, position, bg, activeBg, iconBox, valColor, activeRing, badgeBg, dotColor, iconAnim }) => {
              const isHighlighted = isAnyActive && (id === activeCategory || (id === "category" && ["commits", "prs", "reviews", "issues"].includes(activeCategory!)));
              const isDimmed = isAnyActive && !isHighlighted;
              return (
                <div
                  key={id}
                  role="button"
                  tabIndex={0}
                  onClick={() => handleToggle(id === "category" ? activeBreakdownCat.id : id)}
                  onKeyDown={(e) => {
                    if (e.key === "Enter" || e.key === " ") {
                      e.preventDefault();
                      handleToggle(id === "category" ? activeBreakdownCat.id : id);
                    }
                  }}
                  onMouseEnter={() => id === "category" && setHoveredCat(activeBreakdownCat.id)}
                  onMouseLeave={() => setHoveredCat(null)}
                  aria-pressed={isHighlighted}
                  className={cn(
                    "group relative flex flex-col justify-between p-2 sm:p-3 rounded-xl border transition-all duration-300 text-left cursor-pointer select-none overflow-visible h-full hover:z-30 focus-within:z-30 has-[[role=tooltip]]:z-50",
                    isHighlighted ? activeBg : bg,
                    isDimmed && "opacity-35 blur-[1.5px] scale-[0.98] grayscale-[25%]",
                    isHighlighted && cn("opacity-100 scale-[1.02] z-10", activeRing),
                    !isAnyActive && "hover:-translate-y-0.5 hover:shadow-xs"
                  )}
                >
                  <div className="flex items-center justify-between w-full">
                    <div className="flex items-center gap-1 sm:gap-1.5 text-[11px] sm:text-xs text-zinc-500 dark:text-zinc-400 min-w-0">
                      <div className={cn("p-0.5 sm:p-1 rounded-md transition-all duration-300 shrink-0", iconBox, isHighlighted && "scale-110 shadow-xs")}>
                        <Icon
                          className={cn("w-3.5 h-3.5", iconAnim)}
                          animate={!staticIcons}
                        />
                      </div>
                      <span className="font-semibold tracking-tight truncate">{label}</span>
                      <GithubActivityInfoTooltip title={infoTitle} description={infoDesc} align={align} position={position} />
                    </div>
                    {isHighlighted && (
                      <span className={cn("hidden xs:inline-flex items-center gap-1 text-[9px] font-semibold px-1.5 py-0.5 rounded-full border shadow-2xs transition-all duration-300", badgeBg)}>
                        <span className={cn("w-1 h-1 rounded-full animate-ping", dotColor)} />
                        <span>active</span>
                      </span>
                    )}
                  </div>
                  <div className="my-0.5 flex items-baseline gap-1">
                    <span className={cn("text-lg sm:text-2xl font-black tracking-tight transition-colors duration-300", valColor)}>{value}</span>
                    {unit && <span className="text-[10px] sm:text-[11px] font-semibold text-zinc-500 dark:text-zinc-400">{unit}</span>}
                  </div>
                  <div className="text-[9px] sm:text-[10px] text-zinc-400 dark:text-zinc-400 font-medium truncate">
                    {sub}
                  </div>
                </div>
              );
            })
          )}
        </div>
        {breakdownSlot}
      </div>
    </div>
  );
}
