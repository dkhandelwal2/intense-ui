"use client";

import React from "react";
import { cn } from "@/lib/utils";
import { DAY_LABELS, formatContributionDate } from "./constants";
import type { GithubActivity2DMatrixProps } from "./types";

export function GithubActivity2DMatrix({
  weeks,
  monthMap,
  sizeConfig,
  themeClasses,
  themeStyle,
  isJustifyBetween,
  showMonthLabels,
  showDayLabels,
  isLoading,
  safeWeeksCount,
  matrixContainerRef,
  onDayClick,
}: GithubActivity2DMatrixProps) {
  return (
    <div ref={matrixContainerRef} style={themeStyle} className="w-full overflow-x-auto scrollbar-none touch-pan-x py-0.5 my-auto">
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
                      {label && <span className="absolute left-0 top-0 whitespace-nowrap leading-none">{label}</span>}
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
              ? Array.from({ length: safeWeeksCount }).map((_, wIdx) => (
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
                        key={`${day.date}-${dIdx}`} type="button" onClick={() => onDayClick?.(day)}
                        title={tooltip} aria-label={tooltip}
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
  );
}
