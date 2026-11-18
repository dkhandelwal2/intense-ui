"use client";

import React, { useRef, useEffect } from "react";
import { Play, Pause, RotateCcw, Flag } from "lucide-react";
import { cn } from "@/lib/utils";
import { TimerStopwatchProps } from "./types";
import { TIMER_STOPWATCH_CONFIG } from "@/config/timer";
import { useStopwatch } from "@/hooks/use-stopwatch";
import { TimerLapCarousel } from "./timer-lap-carousel";

export function TimerStopwatch({
  initialCentiseconds = TIMER_STOPWATCH_CONFIG.initialCentiseconds,
  label = TIMER_STOPWATCH_CONFIG.label,
  autoStart = TIMER_STOPWATCH_CONFIG.autoStart,
  showLaps = TIMER_STOPWATCH_CONFIG.showLaps,
  maxLaps = TIMER_STOPWATCH_CONFIG.maxLaps,
  showHours = TIMER_STOPWATCH_CONFIG.showHours,
  showCentiseconds = TIMER_STOPWATCH_CONFIG.showCentiseconds,
  format = TIMER_STOPWATCH_CONFIG.format,
  decimalSeparator = TIMER_STOPWATCH_CONFIG.decimalSeparator,
  intent,
  accentColor,
  stripeColor,
  ringColor,
  ringTrackColor,
  ringGlowColor,
  trackColor,
  glowColor,
  variant,
  onLap,
  onReset,
  onStart,
  onPause,
  className,
  ...props
}: TimerStopwatchProps) {
  const lapsScrollRef = useRef<HTMLDivElement>(null);

  const {
    centiseconds,
    formattedTime,
    isRunning,
    laps,
    start,
    pause,
    reset,
    recordLap,
  } = useStopwatch({
    initialCentiseconds,
    autoStart,
    showHours,
    showCentiseconds,
    format,
    decimalSeparator,
    onLap,
    onStart,
    onPause,
    onReset,
  });

  // Automatically scroll to the latest lap when a lap is added
  useEffect(() => {
    if (lapsScrollRef.current && typeof lapsScrollRef.current.scrollTo === "function") {
      lapsScrollRef.current.scrollTo({ left: 0, behavior: "smooth" });
    }
  }, [laps.length]);

  const handleToggle = () => {
    if (isRunning) pause();
    else start();
  };

  const shouldShowHours =
    format === "hh:mm:ss" || format === "hh:mm:ss,cs" || (format ? false : showHours);
  const shouldShowCentis =
    format === "hh:mm:ss" || format === "mm:ss" ? false : showCentiseconds;

  return (
    <div
      role="timer"
      aria-label={`${label}: ${formattedTime}`}
      aria-live="polite"
      className={cn(
        "group/stopwatch relative overflow-hidden w-full max-w-[360px] rounded-[20`px] p-4 select-none shadow-xl border transition-colors duration-200",
        "bg-white border-zinc-200 text-zinc-900",
        "dark:bg-black dark:border-white/10 dark:text-white",
        className
      )}
      {...props}
    >
      {/* Top Row: Label on Left, Icon Action Buttons Cluster on Right */}
      <div className="flex items-center justify-between gap-3 w-full mb-1">
        <span className="text-xs sm:text-sm font-sans font-medium text-zinc-400 dark:text-zinc-400 select-none">
          {label}
        </span>

        {/* Action Buttons: Reset, Lap, and Play/Pause Toggle */}
        <div className="flex items-center gap-1.5 shrink-0">
          <button
            type="button"
            onClick={reset}
            disabled={centiseconds === 0 && !isRunning}
            aria-label="Reset stopwatch"
            title="Reset stopwatch"
            className={cn(
              "w-8 h-8 sm:w-8.5 sm:h-8.5 rounded-full flex items-center justify-center transition-all active:scale-95 shadow-2xs",
              centiseconds === 0 && !isRunning
                ? "bg-zinc-100 text-zinc-300 dark:bg-zinc-900/40 dark:text-zinc-600 border border-zinc-200/50 dark:border-white/5 cursor-not-allowed opacity-40"
                : "bg-zinc-100 hover:bg-zinc-200 text-zinc-700 dark:bg-[#242426] dark:hover:bg-[#2e2e30] dark:text-zinc-300 border border-zinc-200 dark:border-white/10 cursor-pointer"
            )}
          >
            <RotateCcw className="w-3.5 h-3.5 stroke-[2.4]" />
            <span className="sr-only">Reset</span>
          </button>

          {showLaps && (
            <button
              type="button"
              onClick={recordLap}
              disabled={!isRunning}
              aria-label="Record lap"
              title="Record lap"
              className={cn(
                "w-8 h-8 sm:w-8.5 sm:h-8.5 rounded-full flex items-center justify-center transition-all active:scale-95 shadow-2xs",
                !isRunning
                  ? "bg-zinc-100 text-zinc-300 dark:bg-zinc-900/40 dark:text-zinc-600 border border-zinc-200/50 dark:border-white/5 cursor-not-allowed opacity-40"
                  : "bg-zinc-100 hover:bg-zinc-200 text-zinc-700 dark:bg-[#242426] dark:hover:bg-[#2e2e30] dark:text-zinc-300 border border-zinc-200 dark:border-white/10 cursor-pointer"
              )}
            >
              <Flag className="w-3.5 h-3.5 stroke-[2.4]" />
              <span className="sr-only">Lap</span>
            </button>
          )}

          <button
            type="button"
            onClick={handleToggle}
            aria-label={isRunning ? "Pause stopwatch" : centiseconds > 0 ? "Resume stopwatch" : "Start stopwatch"}
            title={isRunning ? "Pause stopwatch" : centiseconds > 0 ? "Resume stopwatch" : "Start stopwatch"}
            className={cn(
              "w-8 h-8 sm:w-8.5 sm:h-8.5 rounded-full flex items-center justify-center transition-all active:scale-95 cursor-pointer shadow-2xs",
              isRunning
                ? "bg-amber-100 text-amber-700 hover:bg-amber-200 dark:bg-[#341d00] dark:text-[#ff9f0a] dark:hover:bg-[#452703] border border-amber-300/50 dark:border-amber-500/30"
                : "bg-emerald-100 text-emerald-700 hover:bg-emerald-200 dark:bg-[#0e2a14] dark:text-[#30d158] dark:hover:bg-[#143b1d] border border-emerald-300/50 dark:border-emerald-500/30"
            )}
          >
            {isRunning ? (
              <Pause className="w-3.5 h-3.5 fill-current" />
            ) : (
              <Play className="w-3.5 h-3.5 fill-current ml-0.5" />
            )}
            <span className="sr-only">{isRunning ? "Pause" : centiseconds > 0 ? "Resume" : "Start"}</span>
          </button>
        </div>
      </div>

      {/* Middle Row: Full-Width Digital Time Readout */}
      <div className="text-3xl sm:text-4xl font-black tabular-nums tracking-tight font-sans text-zinc-900 dark:text-white leading-none select-none text-center my-3">
        {formattedTime}
      </div>

      {/* Bottom Row: Horizontally Scrollable Laps Carousel */}
      {showLaps && (
        <TimerLapCarousel
          laps={laps}
          maxLaps={maxLaps}
          scrollRef={lapsScrollRef}
          decimalSeparator={decimalSeparator}
          shouldShowHours={shouldShowHours}
          shouldShowCentis={shouldShowCentis}
        />
      )}
    </div>
  );
}
