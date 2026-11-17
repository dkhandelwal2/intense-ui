"use client";

import React from "react";
import { Play, Pause, RotateCcw } from "lucide-react";
import { cn } from "@/lib/utils";
import type { TimerSplitDialProps } from "./types";

export function TimerSplitDial({
  remainingProgress,
  effectiveRingColor,
  effectiveGlowColor,
  activeTrackColor,
  isCompleted = false,
  isDanger = false,
  isRunning = false,
  onToggle,
  onReset,
  className,
}: TimerSplitDialProps) {
  const radius = 36;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = isCompleted ? 0 : circumference * (1 - remainingProgress);

  return (
    <div
      className={cn(
        "relative w-[108px] h-[108px] sm:w-[114px] sm:h-[114px] rounded-[22px] flex items-center justify-center shrink-0 border transition-[filter,opacity,background-color,border-color] duration-200",
        isCompleted
          ? "bg-emerald-500/10 border-emerald-500/30 dark:bg-emerald-950/30 dark:border-emerald-500/30"
          : isDanger
          ? "bg-rose-500/10 border-rose-500/30 dark:bg-rose-950/30 dark:border-rose-500/30"
          : "bg-cyan-500/10 border-cyan-500/20 dark:bg-[#0c2438] dark:border-[#00c7be]/20",
        className
      )}
      style={
        !isCompleted && !isDanger && effectiveRingColor
          ? {
              backgroundColor: `${effectiveRingColor}18`,
              borderColor: `${effectiveRingColor}35`,
            }
          : undefined
      }
    >
      <svg
        className="w-22 h-22 sm:w-[96px] sm:h-[96px] -rotate-90 transform"
        viewBox="0 0 100 100"
        aria-hidden="true"
      >
        <circle
          cx="50"
          cy="50"
          r={radius}
          fill="none"
          stroke={
            isCompleted
              ? "transparent"
              : activeTrackColor || (effectiveRingColor ? `${effectiveRingColor}25` : "currentColor")
          }
          strokeWidth="7"
          className={cn(
            !activeTrackColor && !effectiveRingColor && "text-zinc-200 dark:text-[#081a27]"
          )}
        />
        <circle
          cx="50"
          cy="50"
          r={radius}
          fill="none"
          stroke={isCompleted ? "#10b981" : effectiveRingColor}
          strokeWidth="7"
          strokeLinecap="round"
          strokeDasharray={circumference}
          strokeDashoffset={strokeDashoffset}
          className="transition-[stroke-dashoffset] duration-500 ease-linear"
          style={{
            filter: isCompleted
              ? "drop-shadow(0 0 4px #10b981)"
              : effectiveGlowColor
              ? `drop-shadow(0 0 6px ${effectiveGlowColor})`
              : undefined,
          }}
        />
      </svg>

      <button
        type="button"
        onClick={isCompleted ? onReset : onToggle}
        aria-label={
          isCompleted
            ? "Reset timer"
            : isRunning
            ? "Pause timer"
            : "Start timer"
        }
        className="absolute w-11 h-11 sm:w-12 sm:h-12 rounded-full flex items-center justify-center transition-transform active:scale-90 cursor-pointer text-zinc-900 dark:text-white"
      >
        {isCompleted ? (
          <RotateCcw className="w-5 h-5 stroke-[2.5] text-emerald-500 dark:text-emerald-400" />
        ) : isRunning ? (
          <Pause className="w-5 h-5 fill-zinc-900 text-zinc-900 dark:fill-white dark:text-white" />
        ) : (
          <Play className="w-5 h-5 fill-zinc-900 text-zinc-900 dark:fill-white dark:text-white ml-0.5" />
        )}
      </button>
    </div>
  );
}
