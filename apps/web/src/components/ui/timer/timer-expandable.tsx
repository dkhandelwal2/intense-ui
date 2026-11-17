"use client";

import React, { useState, useMemo, useEffect } from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import { TimerExpandableProps } from "./types";
import { TIMER_INTENTS, getPerimeterPath, calculateTargetTime } from "./constants";
import { TIMER_EXPANDABLE_CONFIG } from "@/config/timer";
import { useTimer } from "@/hooks/use-timer";
import { TimerPresetChips } from "./timer-preset-chips";
import { TimerPerimeterCard } from "./timer-perimeter-card";
import { TimerExpandablePill } from "./timer-expandable-pill";

export function TimerExpandable({
  initialSeconds = TIMER_EXPANDABLE_CONFIG.initialSeconds,
  alarmTime,
  showAlarmTime = TIMER_EXPANDABLE_CONFIG.showAlarmTime,
  showHours = TIMER_EXPANDABLE_CONFIG.showHours,
  label = TIMER_EXPANDABLE_CONFIG.label,
  intent = TIMER_EXPANDABLE_CONFIG.intent,
  accentColor,
  stripeColor,
  stripeOrigin = TIMER_EXPANDABLE_CONFIG.stripeOrigin,
  customStripePath,
  customPath,
  trackColor,
  glowColor,
  dangerColor = TIMER_EXPANDABLE_CONFIG.dangerColor,
  showDangerColor = TIMER_EXPANDABLE_CONFIG.showDangerColor,
  dangerThreshold = TIMER_EXPANDABLE_CONFIG.dangerThreshold,
  autoStart = TIMER_EXPANDABLE_CONFIG.autoStart,
  defaultExpanded = TIMER_EXPANDABLE_CONFIG.defaultExpanded,
  isExpanded: controlledExpanded,
  onExpandedChange,
  showPresets = TIMER_EXPANDABLE_CONFIG.showPresets,
  presets = TIMER_EXPANDABLE_CONFIG.presets,
  allowCustomTime = TIMER_EXPANDABLE_CONFIG.allowCustomTime,
  onComplete,
  onTick,
  onDurationChange,
  onPause,
  onResume,
  onReset,
  className,
  ...props
}: TimerExpandableProps) {
  const [selectedDuration, setSelectedDuration] = useState<number>(initialSeconds);
  const [uncontrolledExpanded, setUncontrolledExpanded] = useState<boolean>(defaultExpanded);
  const [targetAlarm, setTargetAlarm] = useState<string>(alarmTime || "");

  const isExpanded = controlledExpanded !== undefined ? controlledExpanded : uncontrolledExpanded;

  const { status, remaining, remainingProgress, formattedTime, isRunning, toggle, reset, setDuration } =
    useTimer({ initialSeconds: selectedDuration, autoStart, showHours, onComplete, onTick });

  const intentStyle = TIMER_INTENTS[intent] || TIMER_INTENTS.amber;
  const activeColor = stripeColor || accentColor || intentStyle.activeStroke;
  const activeGlow = glowColor || intentStyle.glow;
  const isDanger = showDangerColor && isRunning && remaining > 0 && remaining <= dangerThreshold;
  const effectiveColor = isDanger ? dangerColor : activeColor;
  const effectiveGlow = isDanger ? dangerColor : activeGlow;

  const hasStarted = status === "running" || status === "paused" || remaining < selectedDuration;
  const isCompleted = status === "completed" || (remaining === 0 && hasStarted);
  const canReset = hasStarted || isRunning || isCompleted;

  useEffect(() => {
    if (alarmTime) {
      setTargetAlarm(alarmTime.split(":").length === 2 ? `${alarmTime}:00` : alarmTime);
    } else if (!isRunning) {
      setTargetAlarm(calculateTargetTime(remaining, undefined, true));
    }
  }, [alarmTime, remaining, isRunning]);

  const setExpanded = (nextExpanded: boolean) => {
    if (controlledExpanded === undefined) setUncontrolledExpanded(nextExpanded);
    onExpandedChange?.(nextExpanded);
  };

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

  useEffect(() => {
    setSelectedDuration(initialSeconds);
  }, [initialSeconds]);

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
        showPresets && isExpanded ? "min-h-[156px]" : "h-[120px]",
        className
      )}
    >
      {showPresets && isExpanded && (
        <TimerPresetChips
          presets={presets}
          selectedDuration={selectedDuration}
          chipActiveClass={intentStyle.chipActive}
          onSelect={handleApplyDuration}
        />
      )}

      <motion.div
        layout
        transition={{ type: "spring", stiffness: 450, damping: 32 }}
        role={!isExpanded ? "button" : undefined}
        tabIndex={!isExpanded ? 0 : undefined}
        onClick={!isExpanded ? () => setExpanded(true) : undefined}
        onKeyDown={!isExpanded ? (e) => {
          if (e.key === "Enter" || e.key === " ") {
            e.preventDefault();
            setExpanded(true);
          }
        } : undefined}
        aria-label={!isExpanded ? `Expand timer widget (${formattedTime}). Click to expand.` : undefined}
        className={cn(
          "relative select-none transition-colors duration-200 border shadow-xl",
          !isExpanded
            ? "group/island inline-flex items-center gap-2.5 px-3 py-1.5 rounded-full cursor-pointer bg-zinc-900 text-white border-zinc-800 hover:border-zinc-700 dark:bg-black dark:border-white/15 dark:hover:border-white/30"
            : "w-full max-w-[340px] sm:max-w-[360px] h-[120px] rounded-[32px] overflow-hidden"
        )}
        style={{ "--timer-accent": isCompleted ? "#10b981" : effectiveColor } as React.CSSProperties}
        {...props}
      >
        {!isExpanded ? (
          <TimerExpandablePill
            progress={remainingProgress}
            trackColor={trackColor}
            progressColor={effectiveColor}
            glowColor={effectiveGlow}
            isCompleted={isCompleted}
            isRunning={isRunning}
            showHours={showHours}
            formattedTime={formattedTime}
            onToggle={handleToggle}
          />
        ) : (
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
            onMinimize={() => setExpanded(false)}
          />
        )}
      </motion.div>
    </div>
  );
}
