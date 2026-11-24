"use client";

import React from "react";
import { AnimatedGithubIcon, AnimatedGridIcon, AnimatedBoxIcon } from "@/assets/svg";
import { cn } from "@/lib/utils";
import { GithubActivityHeaderNav } from "./github-activity-header-nav";
import type { GithubActivityHeaderProps } from "./types";

export function GithubActivityHeader({
  user,
  stats,
  totalContributions,
  activeVariant = "heatmap",
  onVariantChange,
  showTabs = true,
  mode = "2d",
  onModeChange,
  showModeToggle = true,
  isLoading = false,
  staticIcons = false,
  className,
}: GithubActivityHeaderProps) {
  const isHeatmap = activeVariant === "heatmap";
  const hasControls = (showModeToggle && isHeatmap) || showTabs;

  return (
    <div
      className={cn(
        "flex flex-col sm:flex-row sm:items-center justify-between gap-2.5 sm:gap-3 p-3 sm:p-3.5 rounded-2xl bg-white dark:bg-zinc-900 border border-zinc-200/80 dark:border-zinc-800 shadow-sm relative",
        className
      )}
    >
      {/* User Info */}
      <div className="flex items-center gap-2.5 sm:gap-3 min-w-0 w-full sm:w-auto">
        {isLoading ? (
          <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-zinc-200/70 dark:bg-zinc-800/70 animate-pulse shrink-0" />
        ) : user?.avatarUrl ? (
          <img
            src={user.avatarUrl}
            alt={user.name || user.username}
            className="w-9 h-9 sm:w-10 sm:h-10 rounded-full ring-2 ring-zinc-200/60 dark:ring-zinc-700/60 shrink-0 object-cover"
          />
        ) : (
          <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-zinc-100 dark:bg-zinc-800 ring-2 ring-zinc-200/60 dark:ring-zinc-700/60 flex items-center justify-center shrink-0">
            <AnimatedGithubIcon className="w-4.5 h-4.5 sm:w-5 sm:h-5 text-zinc-600 dark:text-zinc-400" animate={!staticIcons} />
          </div>
        )}

        {isLoading ? (
          <div className="flex flex-col gap-1.5 min-w-0 flex-1">
            <div className="h-4 w-28 rounded bg-zinc-200/70 dark:bg-zinc-800/70 animate-pulse" />
            <div className="h-3 w-16 rounded bg-zinc-200/50 dark:bg-zinc-800/50 animate-pulse" />
          </div>
        ) : (
          <div className="min-w-0 flex-1">
            <div className="flex items-center gap-1.5 min-w-0">
              <h3 className="text-sm font-bold text-zinc-900 dark:text-white truncate">
                {user?.name || user?.username || "User"}
              </h3>
              {user?.username && (
                <span className="text-xs text-zinc-400 dark:text-zinc-500 font-mono truncate">
                  @{user.username}
                </span>
              )}
              {user?.username && (
                <a
                  href={user.profileUrl || `https://github.com/${user.username}`}
                  target="_blank"
                  rel="noreferrer noopener"
                  className="text-zinc-400 hover:text-zinc-900 dark:hover:text-white transition-colors ml-0.5 inline-flex items-center shrink-0"
                  title="View GitHub profile"
                  aria-label="View GitHub profile"
                >
                  <AnimatedGithubIcon size={16} className="size-4" animate={!staticIcons} />
                </a>
              )}
            </div>
            {user?.bio && (
              <p className="text-xs text-zinc-500 dark:text-zinc-400 truncate max-w-full sm:max-w-xs md:max-w-sm lg:max-w-md">
                {user.bio}
              </p>
            )}
          </div>
        )}
      </div>

      {/* Right Controls: Mode Toggle (2D/3D) + Animated Nav Switcher */}
      {hasControls && (
        <div
          className={cn(
            "flex items-center gap-2 shrink-0 w-full sm:w-auto pt-2 sm:pt-0 border-t sm:border-t-0 border-zinc-100/80 dark:border-zinc-800/60",
            showModeToggle && isHeatmap ? "justify-between sm:justify-end" : "justify-end"
          )}
        >
          {/* 2D / 3D Skyline View Toggle - only when in Heatmap variant */}
          {showModeToggle && isHeatmap && (
            <div
              role="group"
              aria-label="Chart view"
              className="flex items-center p-0.5 rounded-lg border border-zinc-200/80 dark:border-zinc-800 bg-zinc-100/70 dark:bg-zinc-800/60"
            >
              <button
                type="button"
                aria-label="Flat heat map"
                title="Flat heat map"
                aria-pressed={mode === "2d"}
                onClick={() => onModeChange?.("2d")}
                className={cn(
                  "p-1 rounded-md transition-all cursor-pointer",
                  mode === "2d"
                    ? "bg-white dark:bg-zinc-900 text-zinc-900 dark:text-white shadow-2xs"
                    : "text-zinc-400 hover:text-zinc-700 dark:hover:text-zinc-200"
                )}
              >
                <AnimatedGridIcon className="size-3.5" animate={!staticIcons && mode === "3d"} />
              </button>
              <button
                type="button"
                aria-label="3D skyline"
                title="3D skyline"
                aria-pressed={mode === "3d"}
                onClick={() => onModeChange?.("3d")}
                className={cn(
                  "p-1 rounded-md transition-all cursor-pointer",
                  mode === "3d"
                    ? "bg-white dark:bg-zinc-900 text-zinc-900 dark:text-white shadow-2xs"
                    : "text-zinc-400 hover:text-zinc-700 dark:hover:text-zinc-200"
                )}
              >
                <AnimatedBoxIcon className="size-3.5" animate={!staticIcons && mode === "2d"} />
              </button>
            </div>
          )}

          {/* Animated View Switcher for Heatmap, Timeline, Stats */}
          {showTabs && (
            <GithubActivityHeaderNav
              activeVariant={activeVariant}
              onVariantChange={onVariantChange}
              stats={stats}
              totalContributions={totalContributions}
              staticIcons={staticIcons}
            />
          )}
        </div>
      )}
    </div>
  );
}
