"use client";

import React, { useState, useMemo, useCallback, useEffect } from "react";
import { cn } from "@/lib/utils";
import { useGithubActivity } from "@/hooks/use-github-activity";
import { GithubActivityHeader } from "./github-activity-header";
import { GithubActivityHeatmap } from "./github-activity-heatmap";
import { GithubActivityTimeline } from "./github-activity-timeline";
import { GithubActivityStats } from "./github-activity-stats";
import { GithubActivityCurtain } from "./github-activity-curtain";
import type { GithubActivityProps, GithubActivityVariant, GithubActivityMode } from "./types";

export function GithubActivity({
  username, repo, variant = "compact", activeVariant, onVariantChange,
  data, theme = "github", mode = "2d", onModeChange, showModeToggle = true,
  weeksCount = 52, year, years, onYearChange, showFullYear,
  showTabs = true, showYearSelector = true, showHeader = true, showStreaks = true,
  showFilter = true, showSearch = true, showSort = true, defaultSort = "desc",
  staticIcons = false, animatedIcons,
  dotSize, maxEvents, isLoading: propIsLoading, onDayClick, className, ...props
}: GithubActivityProps) {
  const isStatic = staticIcons || animatedIcons === false;
  const [internalVariant, setInternalVariant] = useState<GithubActivityVariant>(
    activeVariant ?? (variant === "compact" ? "heatmap" : variant)
  );
  const [currentMode, setCurrentMode] = useState<GithubActivityMode>(mode);
  const [switchedYear, setSwitchedYear] = useState<number | null>(null);

  useEffect(() => {
    if (mode) setCurrentMode(mode);
  }, [mode]);

  const handleModeChange = useCallback(
    (newMode: GithubActivityMode) => {
      setCurrentMode(newMode);
      onModeChange?.(newMode);
    },
    [onModeChange]
  );

  useEffect(() => {
    if (activeVariant !== undefined) {
      setInternalVariant(activeVariant);
    }
  }, [activeVariant]);

  useEffect(() => {
    if (variant && activeVariant === undefined) {
      setInternalVariant(variant === "compact" ? "heatmap" : variant);
    }
  }, [variant, activeVariant]);

  const handleVariantChange = useCallback(
    (newVariant: GithubActivityVariant) => {
      setInternalVariant(newVariant);
      onVariantChange?.(newVariant);
    },
    [onVariantChange]
  );

  const {
    contributions,
    events,
    stats,
    user,
    isLoading: hookLoading,
    selectedYear,
    setSelectedYear,
    availableYears,
  } = useGithubActivity({
    username,
    repo,
    year,
    showFullYear,
    initialData: data,
    weeksCount,
    autoFetch: Boolean(username && !data),
  });

  const isLoading = propIsLoading !== undefined ? propIsLoading : hookLoading;

  const handleYearChange = useCallback(
    (y: number) => {
      setSwitchedYear(y);
      setSelectedYear(y);
      onYearChange?.(y);
    },
    [setSelectedYear, onYearChange]
  );

  const currentYear = useMemo(() => new Date().getFullYear(), []);
  const effectiveYear = switchedYear ?? selectedYear ?? currentYear;
  const safeWeeksCount = Math.max(1, Math.min(52, weeksCount || 52));
  const isFullYear =
    safeWeeksCount >= 52 &&
    (effectiveYear < currentYear ? true : (showFullYear !== undefined ? showFullYear : (switchedYear !== null || (year !== undefined && year !== currentYear))));

  const currentVariant = activeVariant ?? internalVariant;
  const activeView = variant === "compact" ? currentVariant : variant;

  return (
    <div
      className={cn(
        "w-full flex flex-col rounded-2xl bg-white dark:bg-zinc-900 border border-zinc-200/80 dark:border-zinc-800 shadow-sm",
        activeView === "stats" ? "overflow-visible" : "overflow-hidden",
        className
      )}
      {...props}
    >
      {/* Profile Header & Variant Navigation included directly into container */}
      {showHeader && (
        <GithubActivityHeader
          user={user}
          stats={stats}
          totalContributions={stats?.totalContributions}
          activeVariant={activeView}
          onVariantChange={handleVariantChange}
          mode={currentMode}
          onModeChange={handleModeChange}
          showModeToggle={showModeToggle}
          showTabs={showTabs}
          isLoading={isLoading}
          staticIcons={isStatic}
          className="border-0 border-b border-zinc-100 dark:border-zinc-800/80 rounded-none bg-transparent shadow-none p-3 sm:p-3.5"
        />
      )}

      {/* Main Variant Content with Smooth Transition inside container */}
      <div
        className={cn(
          "w-full relative transition-[min-height,height] duration-500 ease-[cubic-bezier(0.22,1,0.36,1)]",
          activeView === "heatmap" && currentMode === "3d"
            ? "min-h-[285px] sm:min-h-[480px] sm:h-[480px]"
            : activeView === "timeline"
              ? "h-[320px] sm:h-[285px]"
              : "min-h-[285px] sm:h-[285px]"
        )}
      >
        <GithubActivityCurtain activeKey={activeView}>
          {activeView === "heatmap" && (
            <GithubActivityHeatmap
              contributions={contributions}
              username={username}
              theme={theme}
              mode={currentMode}
              onModeChange={handleModeChange}
              weeksCount={weeksCount}
              year={effectiveYear}
              years={years || availableYears}
              onYearChange={handleYearChange}
              showFullYear={isFullYear}
              showYearSelector={showYearSelector}
              showControls={!showHeader}
              showTotalCount={true}
              showModeToggle={!showHeader && showModeToggle}
              dotSize={dotSize}
              showStreaks={showStreaks}
              stats={stats}
              isLoading={isLoading}
              staticIcons={isStatic}
              onDayClick={onDayClick}
              className="h-full border-0 rounded-none bg-transparent dark:bg-transparent shadow-none"
            />
          )}

          {activeView === "timeline" && (
            <GithubActivityTimeline
              events={events}
              username={username}
              maxEvents={maxEvents}
              showFilter={showFilter}
              showSearch={showSearch}
              showSort={showSort}
              defaultSort={defaultSort}
              isLoading={isLoading}
              staticIcons={isStatic}
              className="h-full border-0 rounded-none bg-transparent dark:bg-transparent shadow-none"
            />
          )}

          {activeView === "stats" && (
            <GithubActivityStats
              stats={stats}
              contributions={contributions}
              theme={theme}
              showStreaks={showStreaks}
              isLoading={isLoading}
              staticIcons={isStatic}
              className="h-full border-0 rounded-none bg-transparent dark:bg-transparent shadow-none"
            />
          )}
        </GithubActivityCurtain>
      </div>
    </div>
  );
}
