"use client";

import React from "react";
import { Bell, Check, Pencil, Minimize2 } from "lucide-react";
import { cn } from "@/lib/utils";
import type { TimerCardCenterProps } from "./types";

export function TimerCardCenter({
  formattedTime,
  targetAlarm,
  showAlarmTime = true,
  label = "Timer",
  isCompleted = false,
  isDanger = false,
  isRunning = false,
  allowCustomTime = true,
  isEditing = false,
  onStartEdit,
  onMinimize,
  className,
}: TimerCardCenterProps) {
  const canEdit = allowCustomTime && !isRunning && !isCompleted;

  return (
    <div
      className={cn(
        "flex flex-col items-center justify-between py-1.5 sm:py-2 text-center min-w-0 flex-1 h-full px-1",
        className
      )}
    >
      {/* Top Row: Target Alarm Completion Readout or Completed State */}
      <div className="h-5 flex items-center justify-center">
        {showAlarmTime && !isCompleted && !isEditing && targetAlarm && (
          <div
            title="Target alarm completion"
            className="flex items-center gap-1.5 text-[11px] sm:text-xs font-sans font-medium text-zinc-500 dark:text-zinc-400 select-none"
          >
            <Bell className="w-3.5 h-3.5 text-zinc-400 dark:text-zinc-400" />
            <span suppressHydrationWarning>{targetAlarm}</span>
          </div>
        )}

        {isCompleted && (
          <span className="text-[11px] sm:text-xs font-sans font-bold text-emerald-600 dark:text-emerald-400 flex items-center gap-1 animate-pulse select-none">
            <Check className="w-3.5 h-3.5 stroke-[3]" />
            <span>Timer Completed</span>
          </span>
        )}
      </div>

      {/* Middle Row: Digital Display with ample vertical breathing space */}
      <div className="flex items-center justify-center py-0.5">
        <div
          onClick={() => {
            if (canEdit) onStartEdit?.();
          }}
          role={canEdit ? "button" : undefined}
          tabIndex={canEdit ? 0 : undefined}
          onKeyDown={(e) => {
            if (canEdit && (e.key === "Enter" || e.key === " ")) {
              e.preventDefault();
              onStartEdit?.();
            }
          }}
          aria-label={canEdit ? `Current time ${formattedTime}. Click to edit timer` : undefined}
          className={cn(
            "group/edit relative inline-flex items-center justify-center font-black font-sans leading-none tracking-tight tabular-nums transition-opacity select-none",
            formattedTime.length > 5 ? "text-2xl sm:text-[30px]" : "text-3xl sm:text-[38px]",
            isCompleted
              ? "text-emerald-600 dark:text-emerald-400"
              : isDanger
              ? "text-rose-500 dark:text-[#ff453a]"
              : "text-zinc-900 dark:text-white",
            canEdit && "cursor-pointer hover:opacity-85 active:scale-98"
          )}
          title={canEdit ? "Click to edit timer" : undefined}
        >
          <span>{formattedTime}</span>
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

      {/* Bottom Row: Subtitle / Status with optional minimize button */}
      <div className="h-4 flex items-center justify-center gap-2">
        <span className="text-[11px] sm:text-xs font-sans text-zinc-400 dark:text-zinc-400 font-medium select-none">
          {label}
        </span>
        {onMinimize && (
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              onMinimize();
            }}
            className="p-0.5 text-zinc-400 hover:text-zinc-600 dark:hover:text-zinc-200 transition-colors cursor-pointer rounded"
            title="Minimize to Dynamic Island"
            aria-label="Minimize timer"
          >
            <Minimize2 className="w-3 h-3" />
          </button>
        )}
      </div>
    </div>
  );
}
