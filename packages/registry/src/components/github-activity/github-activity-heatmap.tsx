"use client";

import React, { useMemo, useState, useEffect, useRef, useCallback } from "react";
import { motion } from "framer-motion";
import { AnimatedGridIcon, AnimatedBoxIcon } from "@/assets/svg";
import { cn } from "@/lib/utils";
import { DOT_SIZES, generateMockContributions } from "./constants";
import { resolveGithubTheme } from "./github-activity-theme-helpers";
import { GithubActivityLegend } from "./github-activity-legend";
import { GithubActivity2DMatrix } from "./github-activity-2d-matrix";
import { GithubActivity3D } from "./github-activity-3d";
import { generateUserYears, buildContributionMatrix } from "./github-activity-helpers";
import type { GithubActivityHeatmapProps, GithubActivityMode } from "./types";

export function GithubActivityHeatmap({
  contributions,
  username,
  theme = "github",
  mode = "2d",
  onModeChange,
  weeksCount = 52,
  dotSize,
  year: propYear,
  years,
  onYearChange,
  showFullYear,
  showYearSelector = true,
  showControls = true,
  showModeToggle = true,
  showMonthLabels = true,
  showDayLabels = true,
  showLegend = true,
  showTotalCount = true,
  showStreaks = true,
  stats,
  isLoading = false,
  staticIcons = false,
  onDayClick,
  className,
}: GithubActivityHeatmapProps) {
  const [viewMode, setViewMode] = useState<GithubActivityMode>(mode);
  useEffect(() => { if (mode) setViewMode(mode); }, [mode]);

  const [isMobile, setIsMobile] = useState(false);
  useEffect(() => {
    const mq = window.matchMedia("(max-width: 639px)");
    setIsMobile(mq.matches);
    const handler = (e: MediaQueryListEvent) => setIsMobile(e.matches);
    mq.addEventListener?.("change", handler);
    return () => mq.removeEventListener?.("change", handler);
  }, []);

  const currentYear = useMemo(() => new Date().getFullYear(), []);
  const [switchedYear, setSwitchedYear] = useState<number | null>(null);
  const effectiveYear = switchedYear ?? propYear ?? currentYear;
  const safeWeeksCount = typeof weeksCount === "number" && !Number.isNaN(weeksCount) ? Math.max(1, Math.min(52, weeksCount)) : 52;
  const isFullYear = safeWeeksCount >= 52 && (effectiveYear < currentYear ? true : Boolean(showFullYear));

  const handleYearSelect = useCallback((y: number) => { setSwitchedYear(y); onYearChange?.(y); }, [onYearChange]);
  const effectiveDotSize = dotSize ? (dotSize === "md" && isMobile ? "sm" : dotSize) : (isMobile ? "sm" : "md");
  const sizeConfig = DOT_SIZES[effectiveDotSize] || DOT_SIZES.md;
  const activeYears = useMemo(() => (years && years.length > 0 ? years : generateUserYears()), [years]);
  const matrixContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!matrixContainerRef.current) return;
    matrixContainerRef.current.scrollLeft = isFullYear && effectiveYear < currentYear ? 0 : matrixContainerRef.current.scrollWidth;
  }, [weeksCount, effectiveYear, isFullYear, currentYear, viewMode]);

  const { themeClasses, themeStyle } = useMemo(() => resolveGithubTheme(theme), [theme]);
  const activeContributions = useMemo(() => {
    if (contributions && contributions.length > 0) return contributions;
    return generateMockContributions(safeWeeksCount, username || "octocat", effectiveYear, isFullYear);
  }, [contributions, safeWeeksCount, username, effectiveYear, isFullYear]);

  const { weeks, monthPositions, totalContributions } = useMemo(
    () => buildContributionMatrix(activeContributions, isFullYear, effectiveYear, safeWeeksCount, showMonthLabels),
    [activeContributions, isFullYear, effectiveYear, safeWeeksCount, showMonthLabels]
  );

  const isJustifyBetween = (isLoading ? safeWeeksCount : weeks.length) >= 40;
  const monthMap = useMemo(() => {
    const map = new Map<number, string>();
    for (const m of monthPositions) map.set(m.weekIndex, m.label);
    return map;
  }, [monthPositions]);

  return (
    <div className={cn("flex flex-col justify-between rounded-2xl bg-white dark:bg-zinc-900 border border-zinc-200/80 dark:border-zinc-800 shadow-sm overflow-hidden transition-[min-height,height] duration-500 ease-[cubic-bezier(0.22,1,0.36,1)]", viewMode === "3d" ? "min-h-[285px] sm:min-h-[480px] sm:h-[480px]" : "min-h-[285px] sm:h-[285px]", className)}>
      {/* Standalone controls header when used outside full container */}
      {showControls && (
        <div className="flex items-center justify-between gap-2 p-3 py-1 border-b border-zinc-100 dark:border-zinc-800/60 shrink-0">
          <div className="text-xs text-zinc-600 dark:text-zinc-300 font-medium">
            {showTotalCount && (
              <span>
                <strong className="text-zinc-900 dark:text-white font-bold">{totalContributions.toLocaleString()}</strong>{" "}
                contributions {isFullYear ? `in ${effectiveYear}` : (safeWeeksCount < 52 ? `in the last ${safeWeeksCount} week${safeWeeksCount === 1 ? "" : "s"}` : "in the past year")}
              </span>
            )}
          </div>
          {showModeToggle && (
            <div role="group" aria-label="Chart view" className="flex items-center p-0.5 rounded-lg border border-zinc-200/80 dark:border-zinc-800 bg-zinc-100/70 dark:bg-zinc-800/60">
              <button
                type="button" aria-label="Flat heat map" title="Flat heat map" aria-pressed={viewMode === "2d"}
                onClick={() => { setViewMode("2d"); onModeChange?.("2d"); }}
                className={cn("p-1 rounded-md transition-all cursor-pointer", viewMode === "2d" ? "bg-white dark:bg-zinc-900 text-zinc-900 dark:text-white shadow-2xs" : "text-zinc-400 hover:text-zinc-700 dark:hover:text-zinc-200")}
              >
                <AnimatedGridIcon className="size-3.5" animate={!staticIcons && viewMode === "3d"} />
              </button>
              <button
                type="button" aria-label="3D skyline" title="3D skyline" aria-pressed={viewMode === "3d"}
                onClick={() => { setViewMode("3d"); onModeChange?.("3d"); }}
                className={cn("p-1 rounded-md transition-all cursor-pointer", viewMode === "3d" ? "bg-white dark:bg-zinc-900 text-zinc-900 dark:text-white shadow-2xs" : "text-zinc-400 hover:text-zinc-700 dark:hover:text-zinc-200")}
              >
                <AnimatedBoxIcon className="size-3.5" animate={!staticIcons && viewMode === "2d"} />
              </button>
            </div>
          )}
        </div>
      )}

      {/* Main Heatmap Area & GitHub-style Right Side Years List */}
      <div className="flex flex-col sm:flex-row items-stretch gap-2 sm:gap-3 flex-1 min-w-0">
        <div className="flex-1 min-w-0 flex flex-col justify-center p-2 sm:p-4">
          <motion.div
            key={viewMode}
            initial={{ opacity: 0, scale: 0.97 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
            className="w-full flex-1 flex flex-col justify-center"
          >
            {viewMode === "3d" ? (
              <GithubActivity3D weeks={weeks} monthPositions={monthPositions} theme={theme} dotSize={effectiveDotSize} isLoading={isLoading} onDayClick={onDayClick} />
            ) : (
              <GithubActivity2DMatrix
                weeks={weeks} monthMap={monthMap} sizeConfig={sizeConfig} themeClasses={themeClasses}
                themeStyle={themeStyle}
                isJustifyBetween={isJustifyBetween} showMonthLabels={showMonthLabels} showDayLabels={showDayLabels}
                isLoading={isLoading} safeWeeksCount={safeWeeksCount} matrixContainerRef={matrixContainerRef} onDayClick={onDayClick}
              />
            )}
          </motion.div>
        </div>

        {/* GitHub-Style Vertical Year Selector on the Right */}
        {showYearSelector && activeYears && activeYears.length > 0 && (
          <div
            role="group"
            aria-label="Filter by year"
            className={cn(
              "flex flex-row sm:flex-col gap-1 shrink-0 overflow-x-auto sm:overflow-y-auto border-t sm:border-t-0 sm:border-l border-zinc-100 dark:border-zinc-800/80 sm:p-2 sm:pt-0 [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none] rounded-lg transition-[height,max-height] duration-500 ease-[cubic-bezier(0.22,1,0.36,1)]",
              viewMode === "3d" ? "sm:h-[446px] sm:max-h-[446px]" : "sm:h-[250px] sm:max-h-[250px]"
            )}
          >
            <h4 className="sticky top-0 left-0 w-full font-mono text-xs font-semibold text-center sm:text-left transition-all select-none bg-white dark:bg-zinc-900 p-2 z-10">Year(s)</h4>
            {activeYears.map((yr) => (
              <button
                key={yr} type="button" aria-pressed={effectiveYear === yr} onClick={() => handleYearSelect(yr)}
                className={cn("px-2.5 py-1 rounded-md text-xs font-semibold text-center sm:text-left transition-all cursor-pointer select-none", effectiveYear === yr ? "bg-[var(--theme-primary)] text-white shadow-xs" : "text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-white hover:bg-zinc-100 dark:hover:bg-zinc-800/60")}
              >
                {yr}
              </button>
            ))}
          </div>
        )}
      </div>

      {/* Legend footer */}
      {showLegend && (isLoading ? (
        <div className="flex items-center justify-between pt-1 shrink-0 px-4 pb-4">
          <div className="h-3 w-20 rounded bg-zinc-200/60 dark:bg-zinc-800/60 animate-pulse" />
          <div className="h-3 w-24 rounded bg-zinc-200/60 dark:bg-zinc-800/60 animate-pulse" />
        </div>
      ) : (
        <div className="h-[34px] shrink-0 px-4 border-t border-zinc-100 dark:border-zinc-800/80 rounded-b-2xl">
          <GithubActivityLegend
            theme={theme} totalCount={showTotalCount ? totalContributions : undefined}
            yearLabel={isFullYear ? `in ${effectiveYear}` : (safeWeeksCount < 52 ? `in the last ${safeWeeksCount} week${safeWeeksCount === 1 ? "" : "s"}` : "in the past year")}
            showStreaks={showStreaks} streakCount={stats?.currentStreak}
            staticIcons={staticIcons}
          />
        </div>
      ))}
    </div>
  );
}
