"use client";

import React from "react";
import { motion } from "framer-motion";
import { Flame, Calendar, Activity, TrendingUp } from "lucide-react";
import { GithubIcon } from "@/assets/svg";
import { cn } from "@/lib/utils";
import type { GithubActivityHeaderProps, GithubActivityVariant } from "./types";

const VARIANT_TABS: { label: string; value: GithubActivityVariant; icon: React.ComponentType<{ className?: string }> }[] = [
  { label: "Heatmap", value: "heatmap", icon: Calendar },
  { label: "Timeline", value: "timeline", icon: Activity },
  { label: "Stats", value: "stats", icon: TrendingUp },
];

export function GithubActivityHeader({
  user,
  stats,
  activeVariant = "heatmap",
  onVariantChange,
  showTabs = true,
  showStreaks = true,
  isLoading = false,
  className,
}: GithubActivityHeaderProps) {
  return (
    <div className={cn("flex flex-wrap sm:flex-nowrap items-center justify-between gap-3 p-3.5 sm:p-4 rounded-2xl bg-white dark:bg-zinc-900 border border-zinc-200/80 dark:border-zinc-800 shadow-sm", className)}>
      {/* User Info */}
      <div className="flex items-center gap-3 min-w-0">
        {isLoading ? (
          <>
            <div className="w-10 h-10 rounded-full bg-zinc-200/80 dark:bg-zinc-800 animate-pulse shrink-0" />
            <div className="flex flex-col gap-1.5 min-w-0">
              <div className="h-4 w-28 rounded bg-zinc-200/80 dark:bg-zinc-800 animate-pulse" />
              <div className="h-3 w-16 rounded bg-zinc-200/60 dark:bg-zinc-800/60 animate-pulse" />
            </div>
          </>
        ) : (
          <>
            {user.avatarUrl ? (
              <img
                src={user.avatarUrl}
                alt={user.name || user.username}
                className="w-10 h-10 rounded-full border border-zinc-200 dark:border-zinc-700 object-cover shrink-0"
              />
            ) : (
              <div className="w-10 h-10 rounded-full bg-zinc-100 dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 flex items-center justify-center font-bold text-xs text-zinc-700 dark:text-zinc-300 shrink-0">
                {user.username.slice(0, 2).toUpperCase()}
              </div>
            )}

            <div className="flex flex-col min-w-0">
              <div className="flex items-center gap-2">
                <h3 className="text-sm font-bold text-zinc-900 dark:text-white truncate">
                  {user.name || user.username}
                </h3>
                {user.profileUrl && (
                  <a
                    href={user.profileUrl}
                    target="_blank"
                    rel="noreferrer noopener"
                    className="text-zinc-400 hover:text-zinc-700 dark:hover:text-zinc-200 transition-colors"
                    title="View GitHub profile"
                  >
                    <GithubIcon size={14} />
                  </a>
                )}
              </div>
              <span className="text-xs text-zinc-500 dark:text-zinc-400 truncate">
                @{user.username}
              </span>
            </div>
          </>
        )}
      </div>

      {/* Streak Badge - Single responsive element: right of row 1 on mobile, left of tabs on desktop */}
      {showStreaks && (
        isLoading ? (
          <div className="h-6 w-20 rounded-full bg-zinc-200/70 dark:bg-zinc-800/70 animate-pulse ml-auto shrink-0" />
        ) : (
          stats && stats.currentStreak > 0 && (
            <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-amber-500/10 text-amber-600 dark:text-amber-400 border border-amber-500/20 text-xs font-semibold ml-auto shrink-0">
              <Flame className="w-3.5 h-3.5 fill-amber-500 text-amber-500 animate-pulse" />
              <span>{stats.currentStreak}d streak</span>
            </div>
          )
        )
      )}

      {/* Interactive Segmented Control Tabs */}
      {showTabs && onVariantChange && (
        <div
          role="tablist"
          aria-label="Activity views"
          className="relative flex items-center p-1 rounded-xl bg-zinc-100 dark:bg-zinc-800/80 border border-zinc-200/50 dark:border-zinc-700/50 w-full sm:w-auto"
        >
          {VARIANT_TABS.map(({ label, value, icon: TabIcon }) => {
            const isActive = activeVariant === value;
            return (
              <button
                key={value}
                type="button"
                role="tab"
                aria-selected={isActive}
                onClick={() => onVariantChange(value)}
                className={cn(
                  "relative flex-1 sm:flex-initial flex items-center justify-center gap-1.5 px-3 py-1.5 sm:py-1 text-xs font-semibold rounded-lg transition-all cursor-pointer active:scale-95 touch-manipulation select-none",
                  isActive
                    ? "text-zinc-900 dark:text-white"
                    : "text-zinc-500 hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-white"
                )}
              >
                {isActive && (
                  <motion.div
                    layoutId="github-activity-tab-pill"
                    className="absolute inset-0 rounded-lg bg-white dark:bg-zinc-900 shadow-xs"
                    transition={{ type: "spring", stiffness: 450, damping: 32 }}
                  />
                )}
                <TabIcon className="w-3.5 h-3.5 relative z-10 shrink-0" />
                <span className="relative z-10">{label}</span>
              </button>
            );
          })}
        </div>
      )}
    </div>
  );
}
