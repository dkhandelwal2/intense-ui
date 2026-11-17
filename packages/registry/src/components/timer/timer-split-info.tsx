"use client";

import React from "react";
import { Check, RotateCcw, Pencil } from "lucide-react";
import { cn } from "@/lib/utils";
import { TimerConfirmationButton } from "./timer-confirmation-button";
import { TimerSplitInfoProps } from "./types";

export function TimerSplitInfo({
  label = "Timer",
  formattedTime,
  showHours = true,
  isCompleted = false,
  isDanger = false,
  isRunning = false,
  allowCustomTime = true,
  hasStarted = false,
  isEditing = false,
  onStartEditing,
  onReset,
  onStop,
}: TimerSplitInfoProps) {
  return (
    <div
      className={cn(
        "flex flex-col justify-between h-full pl-1.5 py-0.5 min-w-0 flex-1 transition-[filter,opacity] duration-200",
        isEditing && "filter blur-xs opacity-20 pointer-events-none select-none"
      )}
    >
      <div className="space-y-0.5">
        {isCompleted ? (
          <span className="text-[11px] sm:text-xs font-sans font-bold text-emerald-600 dark:text-emerald-400 flex items-center gap-1.5 animate-pulse">
            <Check className="w-3.5 h-3.5 stroke-[3]" />
            <span>Timer Completed</span>
          </span>
        ) : (
          <span className="text-[11px] sm:text-xs font-sans font-medium text-zinc-400 dark:text-zinc-400 select-none">
            {label}
          </span>
        )}

        <div className="h-10 sm:h-11 flex items-center">
          <div
            onClick={() => {
              if (allowCustomTime && !isRunning) onStartEditing();
            }}
            role={allowCustomTime && !isRunning ? "button" : undefined}
            tabIndex={allowCustomTime && !isRunning ? 0 : undefined}
            onKeyDown={(e) => {
              if (allowCustomTime && !isRunning && (e.key === "Enter" || e.key === " ")) {
                e.preventDefault();
                onStartEditing();
              }
            }}
            aria-label={
              allowCustomTime && !isRunning
                ? `Set custom time. Currently ${formattedTime}`
                : undefined
            }
            className={cn(
              "group/edit relative inline-flex items-center text-3xl sm:text-[38px] font-black font-sans leading-none tracking-tight tabular-nums transition-opacity",
              isCompleted
                ? "text-emerald-600 dark:text-emerald-400"
                : isDanger
                ? "text-rose-500 dark:text-[#ff453a]"
                : "text-zinc-900 dark:text-white",
              allowCustomTime && !isRunning && "cursor-pointer hover:opacity-85 active:scale-98"
            )}
            title={allowCustomTime && !isRunning ? "Click to edit timer" : undefined}
          >
            <span>{isCompleted ? (showHours ? "00:00:00" : "00:00") : formattedTime}</span>
            {allowCustomTime && !isCompleted && (
              <Pencil
                className={cn(
                  "w-3.5 h-3.5 text-zinc-400 dark:text-zinc-500 transition-opacity absolute left-full ml-1.5 top-1/2 -translate-y-1/2 shrink-0 pointer-events-none",
                  isRunning ? "opacity-0" : "opacity-0 group-hover/edit:opacity-100"
                )}
              />
            )}
          </div>
        </div>
      </div>

      <div className="h-8 sm:h-8.5 flex items-center pt-2 sm:pt-2.5">
        {isCompleted ? (
          <button
            type="button"
            onClick={onReset}
            aria-label="Reset timer"
            className="px-3 py-1.5 rounded-full text-xs font-semibold bg-emerald-500/15 text-emerald-600 dark:bg-emerald-500/20 dark:text-emerald-400 hover:bg-emerald-500/25 transition-all active:scale-95 cursor-pointer flex items-center gap-1.5 shadow-xs border border-emerald-500/30"
          >
            <RotateCcw className="w-3.5 h-3.5 stroke-[2.5]" />
            <span>Reset</span>
          </button>
        ) : hasStarted ? (
          <TimerConfirmationButton onConfirm={onStop} label="Stop timer" />
        ) : null}
      </div>
    </div>
  );
}
