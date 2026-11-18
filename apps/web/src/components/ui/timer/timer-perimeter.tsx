"use client";

import React, { useState, useMemo, useEffect } from "react";
import { cn } from "@/lib/utils";
import { TimerPerimeterProps } from "./types";
import { TIMER_INTENTS, getPerimeterPath, calculateTargetTime } from "./constants";
import { TIMER_PERIMETER_CONFIG } from "@/config/timer";
import { useTimer } from "@/hooks/use-timer";
import { TimerPresetChips } from "./timer-preset-chips";
import { TimerPerimeterCard } from "./timer-perimeter-card";

export function TimerPerimeter({
  initialSeconds = TIMER_PERIMETER_CONFIG.initialSeconds,
  alarmTime,
  showAlarmTime = TIMER_PERIMETER_CONFIG.showAlarmTime,
  showHours = TIMER_PERIMETER_CONFIG.showHours,
  label = TIMER_PERIMETER_CONFIG.label,
  intent = TIMER_PERIMETER_CONFIG.intent,
  accentColor,
  stripeColor,
  stripeOrigin = TIMER_PERIMETER_CONFIG.stripeOrigin,
  customStripePath,
  customPath,
  trackColor,
  glowColor,
  dangerColor = TIMER_PERIMETER_CONFIG.dangerColor,
  showDangerColor = TIMER_PERIMETER_CONFIG.showDangerColor,
  dangerThreshold = TIMER_PERIMETER_CONFIG.dangerThreshold,
  variant,
  autoStart = TIMER_PERIMETER_CONFIG.autoStart,
  showPresets = TIMER_PERIMETER_CONFIG.showPresets,
  presets = TIMER_PERIMETER_CONFIG.presets,
  allowCustomTime = TIMER_PERIMETER_CONFIG.allowCustomTime,
  onComplete,
  onTick,
  onDurationChange,
  onPause,
  onResume,
  onReset,
  className,
  ...props
}: TimerPerimeterProps) {
  const [selectedDuration, setSelectedDuration] = useState<number>(initialSeconds);
  const [targetAlarm, setTargetAlarm] = useState<string>(alarmTime || "");

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

  useEffect(() => {
    if (alarmTime) {
      setTargetAlarm(alarmTime.split(":").length === 2 ? `${alarmTime}:00` : alarmTime);
    } else if (!isRunning) {
      setTargetAlarm(calculateTargetTime(remaining, undefined, true));
    }
  }, [alarmTime, remaining, isRunning]);

  useEffect(() => {
    setSelectedDuration(initialSeconds);
  }, [initialSeconds]);

  const intentStyle = TIMER_INTENTS[intent] || TIMER_INTENTS.amber;
  const activeColor = stripeColor || accentColor || intentStyle.activeStroke;
  const activeGlow = glowColor || intentStyle.glow;

  const isDanger = showDangerColor && isRunning && remaining > 0 && remaining <= dangerThreshold;
  const effectiveColor = isDanger ? dangerColor : activeColor;
  const effectiveGlow = isDanger ? dangerColor : activeGlow;

  const hasStarted = status === "running" || status === "paused" || remaining < selectedDuration;
  const isCompleted = status === "completed" || (remaining === 0 && hasStarted);
  const canReset = hasStarted || isRunning || isCompleted;

  const handleToggle = (e?: React.MouseEvent) => {
    e?.stopPropagation();
    toggle();
    if (isRunning) onPause?.();
    else onResume?.();
  };

  const handleReset = (e?: React.MouseEvent) => {
    e?.stopPropagation();
    reset(selectedDuration);
    onReset?.();
  };

  const handleApplyDuration = (seconds: number) => {
    setSelectedDuration(seconds);
    setDuration(seconds);
    onDurationChange?.(seconds);
  };

  const perimeterPath = useMemo(
    () => getPerimeterPath(stripeOrigin, customStripePath, customPath, showAlarmTime),
    [stripeOrigin, customStripePath, customPath, showAlarmTime]
  );

  const pathTotal = 1000;
  const strokeDash =
    remainingProgress <= 0 ? `0 ${pathTotal}` : `${pathTotal * remainingProgress} ${pathTotal}`;

  return (
    <div
      className={cn(
        "flex flex-col items-center justify-center gap-2.5 w-full max-w-[340px] sm:max-w-[360px]",
        showPresets ? "min-h-[156px]" : "h-[150px]",
        className
      )}
      {...props}
    >
      {showPresets && (
        <TimerPresetChips
          presets={presets}
          selectedDuration={selectedDuration}
          chipActiveClass={intentStyle.chipActive}
          onSelect={handleApplyDuration}
        />
      )}

      <TimerPerimeterCard
        formattedTime={isCompleted ? (showHours ? "00:00:00" : "00:00") : formattedTime}
        targetAlarm={targetAlarm}
        showAlarmTime={showAlarmTime}
        label={label}
        perimeterPath={perimeterPath}
        pathTotal={pathTotal}
        strokeDash={strokeDash}
        trackColor={trackColor}
        effectiveColor={effectiveColor}
        effectiveGlow={effectiveGlow}
        isCompleted={isCompleted}
        isDanger={isDanger}
        isRunning={isRunning}
        remainingProgress={remainingProgress}
        canReset={canReset}
        allowCustomTime={allowCustomTime}
        selectedDuration={selectedDuration}
        showHours={showHours}
        onToggle={handleToggle}
        onReset={handleReset}
        onApplyDuration={handleApplyDuration}
      />
    </div>
  );
}
