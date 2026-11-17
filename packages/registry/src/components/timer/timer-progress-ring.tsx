"use client";

import React from "react";
import { cn } from "@/lib/utils";
import type { TimerProgressRingProps } from "./types";

export function TimerProgressRing({
  progress,
  size = 20,
  trackColor,
  progressColor = "#f59e0b",
  glowColor,
  strokeWidth = 2.5,
  isCompleted = false,
  isRunning = false,
  showPulse = false,
  pulseColor,
  className,
}: TimerProgressRingProps) {
  const radius = 9;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = isCompleted ? 0 : circumference * (1 - Math.max(0, Math.min(1, progress)));
  const effectiveProgressColor = isCompleted ? "#10b981" : progressColor;
  const effectiveGlow = isCompleted ? "#10b981" : glowColor;

  return (
    <div
      className={cn("relative flex items-center justify-center shrink-0", className)}
      style={{ width: size, height: size }}
    >
      <svg
        className="w-full h-full -rotate-90 transform"
        viewBox="0 0 22 22"
        aria-hidden="true"
      >
        <circle
          cx="11"
          cy="11"
          r={radius}
          fill="none"
          stroke={trackColor || "rgba(255,255,255,0.15)"}
          strokeWidth={strokeWidth}
        />
        <circle
          cx="11"
          cy="11"
          r={radius}
          fill="none"
          stroke={effectiveProgressColor}
          strokeWidth={strokeWidth}
          strokeLinecap="round"
          strokeDasharray={circumference}
          strokeDashoffset={strokeDashoffset}
          className="transition-[stroke-dashoffset] duration-500 ease-linear"
          style={{
            filter: effectiveGlow ? `drop-shadow(0 0 3px ${effectiveGlow})` : undefined,
          }}
        />
      </svg>
      {showPulse && (
        <span className="absolute inset-0 flex items-center justify-center pointer-events-none">
          <span
            className={cn(
              "w-1.5 h-1.5 rounded-full",
              isRunning ? "animate-ping" : "opacity-0"
            )}
            style={{ backgroundColor: pulseColor || effectiveProgressColor }}
          />
        </span>
      )}
    </div>
  );
}
