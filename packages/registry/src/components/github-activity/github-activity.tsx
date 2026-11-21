"use client";

import React, { useState, useCallback, useEffect, useMemo } from "react";
import { cn } from "@/lib/utils";
import { useGithubActivity } from "@/hooks/use-github-activity";
import { GITHUB_ACTIVITY_CONFIG } from "@/config/github-activity";
import { GithubActivityHeader } from "./github-activity-header";
import { GithubActivityHeatmap } from "./github-activity-heatmap";
import { GithubActivityTimeline } from "./github-activity-timeline";
import { GithubActivityStats } from "./github-activity-stats";
import { GithubActivityCurtain } from "./github-activity-curtain";
import type { GithubActivityProps, GithubActivityVariant } from "./types";

export function GithubActivity({
  variant = GITHUB_ACTIVITY_CONFIG.variant,
  username = GITHUB_ACTIVITY_CONFIG.username,
  theme = GITHUB_ACTIVITY_CONFIG.theme,
  mode = "2d",
  year,
  years,
  onYearChange,
  showFullYear,
  showYearSelector = true,
  data,
  dotSize = GITHUB_ACTIVITY_CONFIG.dotSize,
  weeksCount = GITHUB_ACTIVITY_CONFIG.weeksCount,
  maxEvents = GITHUB_ACTIVITY_CONFIG.maxEvents,
  showHeader = GITHUB_ACTIVITY_CONFIG.showHeader,
  showTabs = GITHUB_ACTIVITY_CONFIG.showTabs,
  showStreaks = true,
  isLoading: propIsLoading,
  onDayClick,
  className,
  ...props
}: GithubActivityProps) {
  const [selectedVariant, setSelectedVariant] = useState<GithubActivityVariant>(
    variant === "compact" ? "heatmap" : variant
  );

  useEffect(() => {
    if (variant !== "compact") {
      setSelectedVariant(variant);
    }
  }, [variant]);

  const [switchedYear, setSwitchedYear] = useState<number | null>(null);

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
    year,
    showFullYear,
    initialData: data,
    weeksCount,
    autoFetch: Boolean(username && !data),
  });

  const isLoading = propIsLoading !== undefined ? propIsLoading : hookLoading;

  const handleYearChange = useCallback((y: number) => {
    setSwitchedYear(y);
    setSelectedYear(y);
    onYearChange?.(y);
  }, [setSelectedYear, onYearChange]);

  const currentYear = useMemo(() => new Date().getFullYear(), []);
  const effectiveYear = switchedYear ?? selectedYear ?? currentYear;
  const isFullYear = effectiveYear < currentYear ? true : (showFullYear !== undefined ? showFullYear : (switchedYear !== null || (year !== undefined && year !== currentYear)));

  const activeView = variant === "compact" ? selectedVariant : variant;

  return (
    <div className={cn("w-full flex flex-col gap-3", className)} {...props}>
      {/* Profile Header & Variant Tabs */}
      {showHeader && (
        <GithubActivityHeader
          user={user}
          stats={stats}
          activeVariant={selectedVariant}
          onVariantChange={showTabs ? setSelectedVariant : undefined}
          showTabs={showTabs}
          showStreaks={showStreaks}
          isLoading={isLoading}
        />
      )}

      {/* Main Variant Content with Smooth Transition */}
      <div className="w-full relative min-h-[285px] sm:h-[285px]">
        <GithubActivityCurtain activeKey={activeView}>
          {activeView === "heatmap" && (
            <GithubActivityHeatmap
              contributions={contributions}
              username={username}
              theme={theme}
              mode={mode}
              weeksCount={weeksCount}
              year={selectedYear}
              years={years || availableYears}
              onYearChange={handleYearChange}
              showFullYear={isFullYear}
              showYearSelector={showYearSelector}
              dotSize={dotSize}
              isLoading={isLoading}
              onDayClick={onDayClick}
              className="h-full"
            />
          )}

          {activeView === "timeline" && (
            <GithubActivityTimeline
              events={events}
              username={username}
              maxEvents={maxEvents}
              isLoading={isLoading}
              className="h-full"
            />
          )}

          {activeView === "stats" && (
            <GithubActivityStats
              stats={stats}
              username={username}
              theme={theme}
              showStreaks={showStreaks}
              isLoading={isLoading}
              className="h-full"
            />
          )}
        </GithubActivityCurtain>
      </div>
    </div>
  );
}
