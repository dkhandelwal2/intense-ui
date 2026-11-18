"use client";

import React from "react";
import { cn } from "@/lib/utils";
import { TimerLapCarouselProps } from "./types";
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
        "flex items-center gap-2 overflow-x-auto scroll-smooth outline-none [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]",
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
        <>
          <span className="w-4 h-4 rounded-full text-[10px] inline-flex items-center justify-center mx-1">#{lap.lapNumber}</span>
          <div
            key={lap.id}
            className={cn(
              "px-3.5 py-1.5 rounded-lg font-mono text-xs sm:text-sm font-semibold shrink-0 transition-all shadow-2xs snap-start",
              idx === 0
                ? "bg-zinc-100 dark:bg-[#242426] text-zinc-900 dark:text-white "
                : "bg-zinc-50 dark:bg-[#1c1c1e] text-zinc-500 dark:text-zinc-400 "
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
        </>
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
