"use client";

import React, { useMemo, useState, useEffect, useRef, useCallback } from "react";
import { Grid2X2, Box } from "lucide-react";
import { cn } from "@/lib/utils";
import { DOT_SIZES, THEME_LEVEL_CLASSES, generateMockContributions } from "./constants";
import { GithubActivityLegend } from "./github-activity-legend";
import { GithubActivityYearSelect } from "./github-activity-year-select";
import { GithubActivity2DMatrix } from "./github-activity-2d-matrix";
import { GithubActivity3D } from "./github-activity-3d";
import { generateUserYears, buildContributionMatrix } from "./github-activity-helpers";
import type { GithubActivityHeatmapProps, GithubActivityMode } from "./types";

export function GithubActivityHeatmap({
  contributions,
  username,
  theme = "github",
  mode = "2d",
  weeksCount = 52,
  dotSize,
  year: propYear,
  years,
  onYearChange,
  showFullYear,
  showYearSelector = true,
  showMonthLabels = true,
  showDayLabels = true,
  showLegend = true,
  showTotalCount = true,
  isLoading = false,
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
    if (isFullYear && effectiveYear < currentYear) {
      matrixContainerRef.current.scrollLeft = 0;
    } else {
      matrixContainerRef.current.scrollLeft = matrixContainerRef.current.scrollWidth;
    }
  }, [weeksCount, effectiveYear, isFullYear, currentYear, viewMode]);

  const themeClasses = THEME_LEVEL_CLASSES[theme] || THEME_LEVEL_CLASSES.github;
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
    <div className={cn("flex flex-col justify-between gap-3 p-4 rounded-2xl bg-white dark:bg-zinc-900 border border-zinc-200/80 dark:border-zinc-800 shadow-sm min-h-[285px] sm:h-[285px]", className)}>
      {/* Top Header */}
      <div className="flex items-center justify-between gap-2 pb-1.5 border-b border-zinc-100 dark:border-zinc-800/60 shrink-0">
        <div className="text-xs text-zinc-600 dark:text-zinc-300 font-medium select-none min-h-[22px] flex items-center min-w-0">
          {showTotalCount && (isLoading ? (
            <div className="h-4 w-36 rounded bg-zinc-200/80 dark:bg-zinc-800 animate-pulse" />
          ) : (
            <span className="truncate">
              <strong className="text-zinc-900 dark:text-white font-bold">{totalContributions.toLocaleString()}</strong>{" "}
              <span className="hidden xs:inline sm:inline">contributions {isFullYear ? `in ${effectiveYear}` : (safeWeeksCount < 52 ? `in the last ${safeWeeksCount} week${safeWeeksCount === 1 ? "" : "s"}` : "in the past year")}</span>
              <span className="xs:hidden sm:hidden">{isFullYear ? `in ${effectiveYear}` : (safeWeeksCount < 52 ? `last ${safeWeeksCount}W` : "past year")}</span>
            </span>
          ))}
        </div>

        <div className="flex items-center gap-1.5 shrink-0">
          {/* 2D / 3D Skyline View Toggle */}
          <div role="group" aria-label="Chart view" className="flex items-center p-0.5 rounded-lg border border-zinc-200/80 dark:border-zinc-800 bg-zinc-100/70 dark:bg-zinc-800/60">
            <button
              type="button"
              aria-label="Flat heat map"
              title="Flat heat map"
              aria-pressed={viewMode === "2d"}
              onClick={() => setViewMode("2d")}
              className={cn("p-1 rounded-md transition-all cursor-pointer", viewMode === "2d" ? "bg-white dark:bg-zinc-900 text-zinc-900 dark:text-white shadow-2xs" : "text-zinc-400 hover:text-zinc-700 dark:hover:text-zinc-200")}
            >
              <Grid2X2 className="size-3.5" />
            </button>
            <button
              type="button"
              aria-label="3D skyline"
              title="3D skyline"
              aria-pressed={viewMode === "3d"}
              onClick={() => setViewMode("3d")}
              className={cn("p-1 rounded-md transition-all cursor-pointer", viewMode === "3d" ? "bg-white dark:bg-zinc-900 text-zinc-900 dark:text-white shadow-2xs" : "text-zinc-400 hover:text-zinc-700 dark:hover:text-zinc-200")}
            >
              <Box className="size-3.5" />
            </button>
          </div>

          {showYearSelector && activeYears && activeYears.length > 0 && (
            <GithubActivityYearSelect year={effectiveYear} years={activeYears} onYearChange={handleYearSelect} />
          )}
        </div>
      </div>

      {/* Main Heatmap: 2D Matrix or 3D Skyline Canvas */}
      {viewMode === "3d" ? (
        <GithubActivity3D
          weeks={weeks}
          monthPositions={monthPositions}
          theme={theme}
          dotSize={effectiveDotSize}
          isLoading={isLoading}
          onDayClick={onDayClick}
        />
      ) : (
        <GithubActivity2DMatrix
          weeks={weeks} monthMap={monthMap} sizeConfig={sizeConfig} themeClasses={themeClasses}
          isJustifyBetween={isJustifyBetween} showMonthLabels={showMonthLabels} showDayLabels={showDayLabels}
          isLoading={isLoading} safeWeeksCount={safeWeeksCount} matrixContainerRef={matrixContainerRef} onDayClick={onDayClick}
        />
      )}

      {/* Legend footer */}
      {showLegend && (isLoading ? (
        <div className="flex items-center justify-between pt-1 shrink-0">
          <div className="h-3 w-20 rounded bg-zinc-200/60 dark:bg-zinc-800/60 animate-pulse" />
          <div className="h-3 w-24 rounded bg-zinc-200/60 dark:bg-zinc-800/60 animate-pulse" />
        </div>
      ) : (
        <div className="shrink-0">
          <GithubActivityLegend theme={theme} totalCount={showTotalCount ? totalContributions : undefined} yearLabel={isFullYear ? `in ${effectiveYear}` : (safeWeeksCount < 52 ? `in the last ${safeWeeksCount} week${safeWeeksCount === 1 ? "" : "s"}` : "in the past year")} />
        </div>
      ))}
    </div>
  );
}
