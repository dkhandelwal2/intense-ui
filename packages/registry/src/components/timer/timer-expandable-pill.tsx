"use client";

import React from "react";
import { Play, Pause, Maximize2 } from "lucide-react";
import { TimerProgressRing } from "./timer-progress-ring";
import type { TimerExpandablePillProps } from "./types";

export function TimerExpandablePill({
  progress,
  trackColor,
  progressColor,
  glowColor,
  isCompleted = false,
  isRunning = false,
  showHours = true,
  formattedTime,
  onToggle,
}: TimerExpandablePillProps) {
  return (
    <div className="inline-flex items-center gap-2.5">
      <TimerProgressRing
        progress={progress}
        trackColor={trackColor}
        progressColor={progressColor}
        glowColor={glowColor}
        isCompleted={isCompleted}
        isRunning={isRunning}
        showPulse
      />

      <span className="text-xs font-bold font-mono tracking-tight tabular-nums text-white">
        {isCompleted ? (showHours ? "00:00:00" : "00:00") : formattedTime}
      </span>

      <button
        type="button"
        onClick={onToggle}
        aria-label={isRunning ? "Pause timer" : "Start timer"}
        className="p-1 rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors cursor-pointer"
      >
        {isRunning ? (
          <Pause className="w-3 h-3 fill-white text-white" />
        ) : (
          <Play className="w-3 h-3 fill-white text-white ml-0.5" />
        )}
      </button>

      <Maximize2 className="w-3 h-3 text-zinc-400 opacity-60 group-hover/island:opacity-100 transition-opacity" />
    </div>
  );
}
