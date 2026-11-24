"use client";

import React, { useState } from "react";
import {
  AnimatedCommitIcon,
  AnimatedPullRequestIcon,
  AnimatedEyeIcon,
  AnimatedAlertCircleIcon,
} from "@/assets/svg";
import { cn } from "@/lib/utils";
import type { GithubActivityStatsProps } from "./types";
import { DEFAULT_MOCK_STATS, generateUserStats } from "./constants";
import { GithubActivityStatsCards } from "./github-activity-stats-cards";
import { GithubActivityInfoTooltip } from "./github-activity-info-tooltip";

export function GithubActivityStats({
  stats,
  contributions,
  username,
  showBreakdown = true,
  showStreaks = true,
  isLoading = false,
  staticIcons = false,
  className,
}: GithubActivityStatsProps) {
  const [selectedCat, setSelectedCat] = useState<string | null>(null);
  const [hoveredCat, setHoveredCat] = useState<string | null>(null);

  const activeStats = stats || (username ? generateUserStats(username) : DEFAULT_MOCK_STATS);
  const { commitsCount, prsCount, issuesCount, reviewsCount } = activeStats;

  const totalTypes = commitsCount + prsCount + issuesCount + reviewsCount || 1;
  const commitPct = Math.round((commitsCount / totalTypes) * 100);
  const prPct = Math.round((prsCount / totalTypes) * 100);
  const reviewPct = Math.round((reviewsCount / totalTypes) * 100);
  const issuePct = Math.max(0, 100 - commitPct - prPct - reviewPct);

  const activeCategory = selectedCat ?? hoveredCat;

  const categories = [
    { id: "commits", label: "Commits", count: commitsCount, pct: commitPct, color: "bg-emerald-500", textColor: "text-emerald-500", desc: "pushed", icon: AnimatedCommitIcon },
    { id: "prs", label: "Pull Requests", count: prsCount, pct: prPct, color: "bg-purple-500", textColor: "text-purple-500", desc: "merged", icon: AnimatedPullRequestIcon },
    { id: "reviews", label: "Reviews", count: reviewsCount, pct: reviewPct, color: "bg-blue-500", textColor: "text-blue-500", desc: "approved", icon: AnimatedEyeIcon },
    { id: "issues", label: "Issues", count: issuesCount, pct: issuePct, color: "bg-amber-500", textColor: "text-amber-500", desc: "resolved", icon: AnimatedAlertCircleIcon },
  ];

  const activeBreakdownCat = categories.find((c) => c.id === (activeCategory && ["commits", "prs", "reviews", "issues"].includes(activeCategory) ? activeCategory : "commits")) || categories[0];
  const isAnyActive = Boolean(activeCategory);
  const handleToggle = (id: string) => setSelectedCat((prev) => (prev === id ? null : id));

  return (
    <div className={cn("flex flex-col justify-between p-3 sm:p-3.5 rounded-2xl bg-white dark:bg-zinc-900 border border-zinc-200/80 dark:border-zinc-800 shadow-sm min-h-[285px] sm:h-[285px] overflow-visible", className)}>
      <GithubActivityStatsCards
        stats={activeStats}
        contributions={contributions}
        activeCategory={activeCategory}
        activeBreakdownCat={activeBreakdownCat}
        handleToggle={handleToggle}
        setHoveredCat={setHoveredCat}
        showStreaks={showStreaks}
        isLoading={isLoading}
        staticIcons={staticIcons}
        breakdownSlot={showBreakdown ? (
          <div className="flex flex-col justify-between gap-1.5 sm:gap-2 p-2.5 sm:p-3 rounded-xl bg-zinc-50/70 dark:bg-zinc-800/40 border border-zinc-200/60 dark:border-zinc-800 shrink-0 overflow-visible relative has-[[role=tooltip]]:z-50">
            <div className="flex items-center justify-between text-xs">
              <div className="flex items-center gap-1.5">
                <span className="font-semibold text-zinc-800 dark:text-zinc-200">Activity Breakdown</span>
                <GithubActivityInfoTooltip
                  title="Activity Breakdown"
                  description="Distribution of contributions categorized across commits, PR merges, reviews, and issues."
                  position="top"
                  align="left"
                />
                {activeCategory && ["commits", "prs", "reviews", "issues"].includes(activeCategory) && (
                  <button
                    type="button"
                    onClick={() => setSelectedCat(null)}
                    className={cn("text-[10px] font-semibold px-2 py-0.5 rounded-full bg-zinc-100 dark:bg-zinc-800 transition-all cursor-pointer hover:opacity-80 ml-1", activeBreakdownCat.textColor)}
                    title="Click to reset highlight"
                  >
                    {activeBreakdownCat.label}: {activeBreakdownCat.count.toLocaleString()} {activeBreakdownCat.desc} ({activeBreakdownCat.pct}%) ✕
                  </button>
                )}
              </div>
              {!isLoading && (!activeCategory || !["commits", "prs", "reviews", "issues"].includes(activeCategory)) && (
                <span className="text-[11px] text-zinc-400 font-medium">{prsCount} PRs merged</span>
              )}
            </div>

            {isLoading ? (
              <div className="h-2.5 w-full rounded-full bg-zinc-200/70 dark:bg-zinc-800/70 animate-pulse" />
            ) : (
              <div className="h-2.5 sm:h-3 w-full rounded-full bg-zinc-100 dark:bg-zinc-800/80 overflow-hidden flex p-0.5 gap-0.5">
                {categories.map((cat) => {
                  const isSelected = activeCategory === cat.id;
                  const isOtherDimmed = isAnyActive && !isSelected;
                  return (
                    <button
                      key={cat.id}
                      type="button"
                      style={{ width: `${Math.max(2, cat.pct)}%` }}
                      onClick={() => handleToggle(cat.id)}
                      onMouseEnter={() => setHoveredCat(cat.id)}
                      onMouseLeave={() => setHoveredCat(null)}
                      className={cn(
                        "h-full rounded-full transition-all duration-300 cursor-pointer",
                        cat.color,
                        isOtherDimmed && "opacity-25 scale-y-75",
                        isSelected && "scale-y-125 ring-2 ring-white/60 dark:ring-zinc-900/60 shadow-sm z-10 opacity-100",
                        !isAnyActive && "hover:opacity-80"
                      )}
                      aria-label={`Highlight ${cat.label}`}
                      title={`${cat.label}: ${cat.count} (${cat.pct}%) - Click to highlight`}
                    />
                  );
                })}
              </div>
            )}

            {!isLoading && (
              <div className="flex items-center gap-1.5 sm:gap-2 overflow-x-auto scrollbar-none py-0.5 sm:flex-wrap touch-pan-x -mx-1 px-1">
                {categories.map((cat) => {
                  const isSelected = activeCategory === cat.id;
                  const isDimmed = isAnyActive && !isSelected;
                  return (
                    <button
                      key={cat.id}
                      type="button"
                      onClick={() => handleToggle(cat.id)}
                      onMouseEnter={() => setHoveredCat(cat.id)}
                      onMouseLeave={() => setHoveredCat(null)}
                      className={cn(
                        "inline-flex items-center gap-1.5 px-2 py-0.5 rounded-lg text-[10px] sm:text-[11px] font-medium transition-all cursor-pointer whitespace-nowrap shrink-0 active:scale-95 touch-manipulation select-none",
                        isSelected
                          ? "bg-zinc-900 text-white dark:bg-zinc-100 dark:text-zinc-900 shadow-2xs scale-105 font-semibold"
                          : isDimmed
                            ? "text-zinc-400/40 dark:text-zinc-500/40"
                            : "text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:white hover:bg-zinc-100/80 dark:hover:bg-zinc-800/60"
                      )}
                    >
                      <span className={cn("w-1.5 h-1.5 rounded-full shrink-0", cat.color)} />
                      <span>{cat.label} ({cat.pct}%)</span>
                    </button>
                  );
                })}
              </div>
            )}
          </div>
        ) : null}
      />
    </div>
  );
}
