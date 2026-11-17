"use client";

import React from "react";
import { cn } from "@/lib/utils";
import { TimerPerimeterContourProps } from "./types";

export function TimerPerimeterContour({
  path,
  pathTotal = 1000,
  strokeDash,
  trackColor,
  strokeColor,
  glowColor,
  isCompleted = false,
  remainingProgress,
}: TimerPerimeterContourProps) {
  return (
    <svg
      viewBox="0 0 340 120"
      preserveAspectRatio="none"
      className="absolute inset-0 w-full h-full pointer-events-none p-1.5"
      aria-hidden="true"
    >
      {/* Inactive Track Bed */}
      <path
        d={path}
        fill="none"
        stroke={trackColor || "currentColor"}
        strokeWidth="4.5"
        strokeLinecap="round"
        className={cn(
          !trackColor &&
            "text-zinc-200 dark:text-zinc-800/80 opacity-40 dark:opacity-60"
        )}
      />

      {/* Active Glowing Progress Contour Stroke */}
      <path
        d={path}
        fill="none"
        stroke={isCompleted ? "#10b981" : strokeColor}
        strokeWidth="4.5"
        strokeLinecap="round"
        pathLength={pathTotal}
        strokeDasharray={strokeDash}
        strokeDashoffset={0}
        className="transition-[stroke-dasharray] duration-500 ease-linear"
        style={{
          filter: `drop-shadow(0 0 4px ${isCompleted ? "#10b981" : glowColor || strokeColor})`,
          opacity: remainingProgress <= 0 && !isCompleted ? 0 : 1,
        }}
      />
    </svg>
  );
}
