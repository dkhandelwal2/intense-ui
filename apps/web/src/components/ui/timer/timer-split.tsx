"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";
import { TimerSplitProps } from "./types";
import { TIMER_INTENTS } from "./constants";
import { TIMER_SPLIT_CONFIG } from "@/config/timer";
import { useTimer } from "@/hooks/use-timer";
import { TimerDurationPicker } from "./timer-duration-picker";
import { TimerSplitDial } from "./timer-split-dial";
import { TimerSplitInfo } from "./timer-split-info";

export function TimerSplit({
  initialSeconds = TIMER_SPLIT_CONFIG.initialSeconds,
  presets = TIMER_SPLIT_CONFIG.presets,
  presetLabels,
  label = TIMER_SPLIT_CONFIG.label,
  intent = TIMER_SPLIT_CONFIG.intent,
  accentColor,
  stripeColor,
  ringColor,
  ringTrackColor,
  ringGlowColor,
  trackColor,
  glowColor,
  dangerColor = TIMER_SPLIT_CONFIG.dangerColor,
  showDangerColor = TIMER_SPLIT_CONFIG.showDangerColor,
  dangerThreshold = TIMER_SPLIT_CONFIG.dangerThreshold,
  showHours = TIMER_SPLIT_CONFIG.showHours,
  autoStart = TIMER_SPLIT_CONFIG.autoStart,
  allowCustomTime = TIMER_SPLIT_CONFIG.allowCustomTime,
  onComplete,
  onTick,
  onPresetChange,
  onDurationChange,
  onReset,
  className,
  ...props
}: TimerSplitProps) {
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

  const intentStyle = TIMER_INTENTS[intent] || TIMER_INTENTS.cyan;
  const activeRingColor = ringColor || stripeColor || accentColor || intentStyle.activeStroke;
  const activeTrackColor = ringTrackColor || trackColor;
  const activeGlowColor = ringGlowColor || glowColor || intentStyle.glow;

  const isDanger = showDangerColor && isRunning && remaining > 0 && remaining <= dangerThreshold;
  const effectiveRingColor = isDanger ? dangerColor : activeRingColor;
  const effectiveGlowColor = isDanger ? dangerColor : activeGlowColor;

  const hasStarted = status === "running" || status === "paused" || remaining < selectedDuration;
  const isCompleted = status === "completed" || (remaining === 0 && hasStarted);

  useEffect(() => {
    setSelectedDuration(initialSeconds);
  }, [initialSeconds]);

  const handleStopOrReset = () => {
    setIsEditing(false);
    reset(selectedDuration);
    onReset?.();
  };

  const handleApplyDuration = (total: number) => {
    setSelectedDuration(total);
    setDuration(total);
    onPresetChange?.(total);
    onDurationChange?.(total);
    setIsEditing(false);
  };

  return (
    <div className={cn("flex flex-col items-center gap-3 w-full max-w-[340px]", className)}>
      <div
        role="timer"
        aria-label={`${label}: ${formattedTime}`}
        aria-live="polite"
        className={cn(
          "relative overflow-hidden w-full h-[140px] rounded-[28px] p-3 sm:p-3.5 flex items-center justify-between gap-3 select-none shadow-xl border transition-colors duration-200",
          "bg-white border-zinc-200 text-zinc-900",
          "dark:bg-black dark:border-white/10 dark:text-white"
        )}
        style={{ "--timer-accent": effectiveRingColor } as React.CSSProperties}
        {...props}
      >
        <TimerSplitInfo
          label={label}
          formattedTime={formattedTime}
          showHours={showHours}
          isCompleted={isCompleted}
          isDanger={isDanger}
          isRunning={isRunning}
          allowCustomTime={allowCustomTime}
          hasStarted={hasStarted}
          isEditing={isEditing}
          onStartEditing={() => setIsEditing(true)}
          onReset={handleStopOrReset}
          onStop={handleStopOrReset}
        />

        <TimerSplitDial
          remainingProgress={remainingProgress}
          effectiveRingColor={effectiveRingColor}
          effectiveGlowColor={effectiveGlowColor}
          activeTrackColor={activeTrackColor}
          isCompleted={isCompleted}
          isDanger={isDanger}
          isRunning={isRunning}
          onToggle={toggle}
          onReset={handleStopOrReset}
          className={cn(isEditing && "filter blur-xs opacity-20 pointer-events-none select-none")}
        />

        <AnimatePresence>
          {isEditing && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.18 }}
              className="absolute inset-0 z-30 flex items-center justify-center rounded-[28px] bg-white/75 dark:bg-black/80 backdrop-blur-md p-3"
              onClick={(e) => e.stopPropagation()}
            >
              <TimerDurationPicker
                totalSeconds={selectedDuration}
                showHours={showHours}
                onApply={handleApplyDuration}
                onCancel={() => setIsEditing(false)}
              />
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
