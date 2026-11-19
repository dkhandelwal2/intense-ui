"use client";

import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Play, Pause, Pencil, RotateCcw } from "lucide-react";
import { cn } from "@/lib/utils";
import { TimerIslandProps } from "./types";
import { TIMER_INTENTS } from "./constants";
import { TIMER_ISLAND_CONFIG } from "@/config/timer";
import { useTimer } from "@/hooks/use-timer";
import { TimerProgressRing } from "@/assets/svg";
import { TimerIslandEditor } from "./timer-island-editor";

export function TimerIsland({
  initialSeconds = TIMER_ISLAND_CONFIG.initialSeconds,
  intent = TIMER_ISLAND_CONFIG.intent,
  accentColor,
  stripeColor,
  trackColor,
  glowColor,
  dangerColor = TIMER_ISLAND_CONFIG.dangerColor,
  showDangerColor = TIMER_ISLAND_CONFIG.showDangerColor,
  dangerThreshold = TIMER_ISLAND_CONFIG.dangerThreshold,
  variant,
  autoStart = TIMER_ISLAND_CONFIG.autoStart,
  showHours = TIMER_ISLAND_CONFIG.showHours,
  allowCustomTime = TIMER_ISLAND_CONFIG.allowCustomTime,
  onComplete,
  onTick,
  onDurationChange,
  onPause,
  onResume,
  onReset,
  className,
  ...props
}: TimerIslandProps) {
  const [selectedDuration, setSelectedDuration] = useState<number>(initialSeconds);
  const [isEditing, setIsEditing] = useState<boolean>(false);

  const {
    status,
    remaining,
    remainingProgress,
    formattedTime,
    isRunning,
    toggle,
    reset,
    setDuration,
  } = useTimer({
    initialSeconds: selectedDuration,
    autoStart,
    showHours,
    onComplete,
    onTick,
  });

  const intentStyle = TIMER_INTENTS[intent] || TIMER_INTENTS.amber;
  const activeColor = stripeColor || accentColor || intentStyle.activeStroke;
  const activeGlow = glowColor || intentStyle.glow;

  const isDanger = showDangerColor && isRunning && remaining > 0 && remaining <= dangerThreshold;
  const effectiveColor = isDanger ? dangerColor : activeColor;
  const effectiveGlow = isDanger ? dangerColor : activeGlow;

  const hasStarted = status === "running" || status === "paused" || remaining < selectedDuration;
  const isCompleted = status === "completed" || (remaining === 0 && hasStarted);

  useEffect(() => {
    setSelectedDuration(initialSeconds);
  }, [initialSeconds]);

  const handleToggle = (e?: React.MouseEvent) => {
    e?.stopPropagation();
    if (isEditing) setIsEditing(false);
    toggle();
    if (isRunning) onPause?.();
    else onResume?.();
  };

  const handleReset = (e?: React.MouseEvent) => {
    e?.stopPropagation();
    setIsEditing(false);
    reset(selectedDuration);
    onReset?.();
  };

  const handleApplyDuration = (total: number) => {
    setSelectedDuration(total);
    setDuration(total);
    onDurationChange?.(total);
    setIsEditing(false);
  };

  return (
    <motion.div
      role="timer"
      aria-label={`Timer Island: ${formattedTime}`}
      aria-live="polite"
      layout
      transition={{ type: "spring", stiffness: 500, damping: 32 }}
      className={cn(
        "group/island inline-flex items-center rounded-full shadow-lg border select-none transition-colors",
        "bg-zinc-900 text-white border-zinc-800",
        "dark:bg-black dark:border-white/15",
        isCompleted && "border-emerald-500/50",
        isEditing ? "p-1" : "px-3 py-1.5",
        className
      )}
      style={{ "--timer-accent": isCompleted ? "#10b981" : effectiveColor } as React.CSSProperties}
      {...props}
    >
      {!isEditing ? (
        <div key="island-pill-display" className="inline-flex items-center gap-2">
          <TimerProgressRing
            progress={remainingProgress}
            trackColor={trackColor}
            progressColor={effectiveColor}
            glowColor={effectiveGlow}
            isCompleted={isCompleted}
          />

          <div
            onClick={(e) => {
              e.stopPropagation();
              if (allowCustomTime && !isRunning) setIsEditing(true);
            }}
            title={allowCustomTime && !isRunning ? "Click to edit duration" : undefined}
            className={cn(
              "inline-flex items-center gap-2 font-mono font-bold text-xs sm:text-sm tracking-tight tabular-nums transition-colors",
              isCompleted ? "text-emerald-400" : isDanger ? "text-rose-400" : "text-white",
              allowCustomTime && !isRunning && "cursor-pointer hover:text-zinc-200"
            )}
          >
            <span>{isCompleted ? "00:00" : formattedTime}</span>
            {allowCustomTime && !isRunning && !isCompleted && (
              <span className={cn(
                "w-[24px] h-[24px] flex items-center justify-center rounded-full transition-transform active:scale-90 cursor-pointer shadow-xs bg-white/10 hover:bg-white/20 text-white")}>
                <Pencil className="w-3 h-3 text-zinc-400 group-hover/island:text-white transition-colors shrink-0" />
              </span>
            )}
          </div>

          <button
            type="button"
            onClick={isCompleted ? handleReset : handleToggle}
            aria-label={
              isCompleted ? "Reset timer" : isRunning ? "Pause timer" : "Start timer"
            }
            className={cn(
              "w-[24px] h-[24px] flex items-center justify-center rounded-full transition-transform active:scale-90 cursor-pointer shadow-xs",
              isCompleted
                ? "bg-emerald-500/20 text-emerald-400 hover:bg-emerald-500/30"
                : "bg-white/10 hover:bg-white/20 text-white"
            )}
          >
            {isCompleted ? (
              <RotateCcw className="w-3 h-3 stroke-[2.5]" />
            ) : isRunning ? (
              <Pause className="w-3 h-3 fill-white text-white" />
            ) : (
              <Play className="w-3 h-3 fill-white text-white ml-0.5" />
            )}
          </button>
        </div>
      ) : (
        <TimerIslandEditor
          initialSeconds={selectedDuration}
          onApply={handleApplyDuration}
          onCancel={() => setIsEditing(false)}
        />
      )
      }
    </motion.div >
  );
}
