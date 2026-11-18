"use client";

import React from "react";
import { cn } from "@/lib/utils";

export interface TimerSplitRingProps {
  remainingProgress: number;
  effectiveRingColor: string;
  effectiveGlowColor?: string;
  activeTrackColor?: string;
  isCompleted?: boolean;
  className?: string;
}

export function TimerSplitRing({
  remainingProgress,
  effectiveRingColor,
  effectiveGlowColor,
  activeTrackColor,
  isCompleted = false,
  className,
}: TimerSplitRingProps) {
  const radius = 36;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = isCompleted ? 0 : circumference * (1 - remainingProgress);

  return (
    <svg
      className={cn("w-22 h-22 sm:w-[96px] sm:h-[96px] -rotate-90 transform", className)}
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
  );
}
