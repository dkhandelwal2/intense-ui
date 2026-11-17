"use client";

import React from "react";
import { cn } from "@/lib/utils";
import { TimerLap, TimerLapCarouselProps } from "./types";
import { formatCentiseconds } from "./constants";

export function TimerLapCarousel({
  laps,
  maxLaps = 50,
  scrollRef,
  decimalSeparator = ",",
  shouldShowHours = true,
  shouldShowCentis = true,
  className,
}: TimerLapCarouselProps) {
  const displayedLaps = laps.slice(0, maxLaps);

  return (
    <div
      ref={scrollRef}
      role="region"
      aria-label="Recorded lap times"
      tabIndex={0}
      className={cn(
        "flex items-center gap-2 mt-3 -mx-4 sm:-mx-5 px-4 sm:px-5 overflow-x-auto subtle-scrollbar py-1 scroll-smooth outline-none snap-x snap-mandatory",
        className
      )}
      style={
        laps.length >= 3
          ? {
              maskImage:
                "linear-gradient(to right, black calc(100% - 64px), transparent 100%)",
              WebkitMaskImage:
                "linear-gradient(to right, black calc(100% - 64px), transparent 100%)",
            }
          : undefined
      }
    >
      {displayedLaps.map((lap, idx) => (
        <div
          key={lap.id}
          className={cn(
            "px-3.5 py-1.5 rounded-2xl font-mono text-xs sm:text-sm font-semibold shrink-0 transition-all shadow-2xs snap-start",
            idx === 0
              ? "bg-zinc-100 dark:bg-[#242426] text-zinc-900 dark:text-white border border-zinc-200 dark:border-white/10"
              : "bg-zinc-50 dark:bg-[#1c1c1e] text-zinc-500 dark:text-zinc-400 border border-transparent"
          )}
        >
          <span>
            {formatCentiseconds(
              lap.lapTime,
              decimalSeparator,
              shouldShowHours,
              shouldShowCentis
            )}
          </span>
        </div>
      ))}

      {laps.length === 0 && (
        <div className="px-3.5 py-1.5 rounded-2xl font-mono text-xs sm:text-sm text-zinc-400 dark:text-zinc-600 bg-zinc-100/50 dark:bg-[#1c1c1e]/60 border border-dashed border-zinc-200 dark:border-zinc-800 shrink-0 snap-start">
          {shouldShowCentis
            ? shouldShowHours
              ? `--:--:--${decimalSeparator}--`
              : `--:--${decimalSeparator}--`
            : shouldShowHours
            ? "--:--:--"
            : "--:--"}
        </div>
      )}

      {/* Right end spacer ensures last lap item has full breathing room and scrolls past the shade mask */}
      {laps.length > 0 && (
        <div className="w-16 sm:w-20 shrink-0 snap-end" aria-hidden="true" />
      )}
    </div>
  );
}
