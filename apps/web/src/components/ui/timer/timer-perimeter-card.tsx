"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Play, Pause, X, Check } from "lucide-react";
import { cn } from "@/lib/utils";
import { TimerPerimeterContour } from "@/assets/svg";
import { TimerCardCenter } from "./timer-card-center";
import { TimerDurationPicker } from "./timer-duration-picker";
import type { TimerPerimeterCardProps } from "./types";

export function TimerPerimeterCard({
  formattedTime,
  targetAlarm,
  showAlarmTime = true,
  label = "Timer",
  perimeterPath,
  pathTotal = 1000,
  strokeDash,
  trackColor,
  effectiveColor,
  effectiveGlow,
  isCompleted = false,
  isDanger = false,
  isRunning = false,
  remainingProgress,
  canReset = false,
  allowCustomTime = true,
  selectedDuration,
  showHours = true,
  onToggle,
  onReset,
  onApplyDuration,
  onMinimize,
  className,
}: TimerPerimeterCardProps) {
  const [isEditing, setIsEditing] = useState(false);

  return (
    <div
      role="timer"
      aria-label={`${label}: ${formattedTime}`}
      aria-live="polite"
      className={cn(
        "group/timer relative w-full h-[150px] rounded-[32px] p-4 sm:p-5 select-none overflow-hidden transition-colors duration-200",
        "bg-white border border-zinc-200 text-zinc-900 shadow-xl",
        "dark:bg-black dark:border-white/10 dark:text-white",
        className
      )}
      style={{ "--timer-accent": isCompleted ? "#10b981" : effectiveColor } as React.CSSProperties}
    >
      <TimerPerimeterContour
        path={perimeterPath}
        pathTotal={pathTotal}
        strokeDash={strokeDash}
        trackColor={trackColor}
        strokeColor={effectiveColor}
        glowColor={effectiveGlow}
        isCompleted={isCompleted}
        remainingProgress={remainingProgress}
      />

      <div
        className={cn(
          "relative z-10 flex items-center justify-between gap-2 h-full px-1.5 transition-[filter,opacity] duration-200",
          isEditing && "filter blur-xs opacity-20 pointer-events-none select-none"
        )}
      >
        <button
          type="button"
          onClick={onReset}
          disabled={!canReset}
          aria-label={isCompleted ? "Reset timer" : "Cancel and reset timer"}
          className={cn(
            "w-11 h-11 sm:w-12 sm:h-12 rounded-full flex items-center justify-center shrink-0 transition-all shadow-md",
            canReset
              ? "bg-rose-50 hover:bg-rose-100 text-rose-600 border border-rose-200/80 dark:bg-[#34151b] dark:hover:bg-[#421b23] dark:text-[#ff453a] dark:border-rose-950/60 cursor-pointer active:scale-95"
              : "bg-zinc-100 text-zinc-300 border border-zinc-200/50 dark:bg-zinc-900/40 dark:text-zinc-600 dark:border-white/5 cursor-not-allowed opacity-40"
          )}
        >
          <X className="w-4.5 h-4.5 sm:w-5 sm:h-5 stroke-[2.8]" />
        </button>

        <TimerCardCenter
          formattedTime={formattedTime}
          targetAlarm={targetAlarm}
          showAlarmTime={showAlarmTime}
          label={label}
          isCompleted={isCompleted}
          isDanger={isDanger}
          isRunning={isRunning}
          allowCustomTime={allowCustomTime}
          isEditing={isEditing}
          onStartEdit={() => setIsEditing(true)}
          onMinimize={onMinimize}
        />

        <button
          type="button"
          onClick={isCompleted ? onReset : onToggle}
          aria-label={isCompleted ? "Reset timer" : isRunning ? "Pause timer" : "Start timer"}
          className={cn(
            "w-11 h-11 sm:w-12 sm:h-12 rounded-full flex items-center justify-center shrink-0 transition-transform active:scale-95 cursor-pointer shadow-md",
            isCompleted
              ? "bg-emerald-50 text-emerald-600 dark:bg-emerald-950/40 dark:text-emerald-400 border border-emerald-300 dark:border-emerald-800/50"
              : "bg-zinc-100 hover:bg-zinc-200 text-zinc-900 border border-zinc-200 dark:bg-[#242426] dark:hover:bg-[#323236] dark:text-white dark:border-white/10"
          )}
        >
          {isCompleted ? (
            <Check className="w-4.5 h-4.5 sm:w-5 sm:h-5 stroke-[2.8]" />
          ) : isRunning ? (
            <Pause className="w-4.5 h-4.5 sm:w-5 sm:h-5 fill-zinc-900 text-zinc-900 dark:fill-white dark:text-white" />
          ) : (
            <Play className="w-4.5 h-4.5 sm:w-5 sm:h-5 fill-zinc-900 text-zinc-900 dark:fill-white dark:text-white ml-0.5" />
          )}
        </button>
      </div>

      <AnimatePresence>
        {isEditing && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.18 }}
            className="absolute inset-0 z-30 flex items-center justify-center rounded-[32px] bg-white/75 dark:bg-black/80 backdrop-blur-xs p-3"
            onClick={(e) => e.stopPropagation()}
          >
            <TimerDurationPicker
              totalSeconds={selectedDuration}
              showHours={showHours}
              onApply={(sec) => {
                onApplyDuration(sec);
                setIsEditing(false);
              }}
              onCancel={() => setIsEditing(false)}
            />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
