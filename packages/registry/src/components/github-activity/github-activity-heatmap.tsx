"use client";

import React, { useMemo, useState, useEffect, useRef, useCallback } from "react";
import { cn } from "@/lib/utils";
import { DAY_LABELS, THEME_LEVEL_CLASSES, DOT_SIZES, generateMockContributions, formatContributionDate } from "./constants";
import { GithubActivityLegend } from "./github-activity-legend";
import { GithubActivityYearSelect } from "./github-activity-year-select";
import { generateUserYears, buildContributionMatrix } from "./github-activity-helpers";
import type { GithubActivityHeatmapProps, GithubContributionDay } from "./types";

export function GithubActivityHeatmap({
  contributions,
  username,
  theme = "github",
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
  }, [weeksCount, effectiveYear, isFullYear, currentYear]);

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
        {showYearSelector && activeYears && activeYears.length > 0 && (
          <div className="shrink-0">
            <GithubActivityYearSelect year={effectiveYear} years={activeYears} onYearChange={handleYearSelect} />
          </div>
        )}
      </div>

      {/* Heatmap Matrix with Sticky Week Days */}
      <div ref={matrixContainerRef} className="w-full overflow-x-auto scrollbar-none touch-pan-x py-0.5 my-auto">
        <div className="flex flex-col w-full min-w-max">
          {showMonthLabels && (
            <div className="flex text-[10px] font-medium text-zinc-400 dark:text-zinc-500 mb-1 select-none w-full min-w-max">
              {showDayLabels && <div className="sticky left-0 z-20 bg-white dark:bg-zinc-900 w-8 shrink-0 pr-2" />}
              <div className={cn("flex pl-2 h-4 gap-[2px] sm:gap-[2.5px]", isJustifyBetween ? "flex-1 justify-between" : "")}>
                {isLoading ? (
                  <div className="h-2.5 w-32 rounded bg-zinc-200/60 dark:bg-zinc-800/60 animate-pulse" />
                ) : (
                  weeks.map((_, wIdx) => {
                    const label = monthMap.get(wIdx);
                    return (
                      <div key={wIdx} className={cn("relative shrink-0", sizeConfig.box)}>
                        {label && (
                          <span className="absolute left-0 top-0 whitespace-nowrap leading-none">
                            {label}
                          </span>
                        )}
                      </div>
                    );
                  })
                )}
              </div>
            </div>
          )}

          <div className="flex items-start w-full min-w-max">
            {showDayLabels && (
              <div className="sticky left-0 z-20 bg-white dark:bg-zinc-900 flex flex-col gap-[2px] sm:gap-[2.5px] w-8 text-[9px] font-medium text-zinc-400 dark:text-zinc-500 select-none pr-2 shrink-0 border-r border-zinc-100 dark:border-zinc-800/80 shadow-[1px_0_3px_-1px_rgba(0,0,0,0.05)] dark:shadow-[1px_0_3px_-1px_rgba(0,0,0,0.3)]">
                {DAY_LABELS.map((day, idx) => (
                  <span key={idx} className={cn("w-full flex items-center justify-end leading-none", sizeConfig.label)}>
                    {day}
                  </span>
                ))}
              </div>
            )}

            <div className={cn("flex pl-2 gap-[2px] sm:gap-[2.5px]", isJustifyBetween ? "flex-1 justify-between" : "")}>
              {isLoading
                ? Array.from({ length: weeksCount }).map((_, wIdx) => (
                    <div key={wIdx} className="flex flex-col gap-[2px] sm:gap-[2.5px] shrink-0">
                      {Array.from({ length: 7 }).map((_, dIdx) => (
                        <div key={dIdx} className={cn("aspect-square bg-zinc-200/70 dark:bg-zinc-800/70 animate-pulse", sizeConfig.box, sizeConfig.rounded)} style={{ animationDelay: `${(wIdx * 25) % 600}ms` }} />
                      ))}
                    </div>
                  ))
                : weeks.map((week, wIdx) => (
                    <div key={wIdx} className="flex flex-col gap-[1.5px] sm:gap-[2px] shrink-0">
                      {week.map((day, dIdx) => {
                        if (day.isFuture) {
                          return <div key={`${day.date}-${dIdx}`} className={cn("aspect-square opacity-0 pointer-events-none select-none", sizeConfig.box)} aria-hidden="true" />;
                        }
                        const tooltip = `${day.count === 0 ? "No" : day.count} contribution${day.count === 1 ? "" : "s"} on ${formatContributionDate(day.date)}`;
                        return (
                          <button
                            key={`${day.date}-${dIdx}`}
                            type="button"
                            onClick={() => onDayClick?.(day)}
                            title={tooltip}
                            aria-label={tooltip}
                            className={cn("aspect-square border transition-transform duration-150 hover:scale-135 hover:z-10 cursor-pointer focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-foreground", sizeConfig.box, sizeConfig.rounded, themeClasses[day.level])}
                          />
                        );
                      })}
                    </div>
                  ))}
            </div>
          </div>
        </div>
      </div>

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
