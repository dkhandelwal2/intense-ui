"use client";

import React from "react";
import { TimerProps } from "./types";
import { TimerPerimeter } from "./timer-perimeter";
import { TimerSplit } from "./timer-split";
import { TimerStopwatch } from "./timer-stopwatch";
import { TimerIsland } from "./timer-island";
import { TimerExpandable } from "./timer-expandable";

export function Timer({
  variant = "perimeter",
  // Common countdown duration & editor props
  initialSeconds,
  allowCustomTime,
  onDurationChange,
  // Perimeter & Expandable specific props
  alarmTime,
  showAlarmTime,
  showPresets,
  presets,
  stripeOrigin,
  customStripePath,
  customPath,
  defaultExpanded,
  isExpanded,
  onExpandedChange,
  // Split specific props
  presetLabels,
  ringColor,
  ringTrackColor,
  ringGlowColor,
  onPresetChange,
  // Stopwatch specific props
  initialCentiseconds,
  showLaps,
  maxLaps,
  showCentiseconds,
  format,
  decimalSeparator,
  onLap,
  onStart,
  // Base theme & container props forwarded to all variants
  ...baseProps
}: TimerProps) {
  switch (variant) {
    case "split":
      return (
        <TimerSplit
          {...baseProps}
          initialSeconds={initialSeconds}
          presets={presets}
          presetLabels={presetLabels}
          allowCustomTime={allowCustomTime}
          ringColor={ringColor}
          ringTrackColor={ringTrackColor}
          ringGlowColor={ringGlowColor}
          onPresetChange={onPresetChange ?? onDurationChange}
          onDurationChange={onDurationChange}
        />
      );

    case "stopwatch":
      return (
        <TimerStopwatch
          {...baseProps}
          initialCentiseconds={initialCentiseconds}
          showLaps={showLaps}
          maxLaps={maxLaps}
          showCentiseconds={showCentiseconds}
          format={format}
          decimalSeparator={decimalSeparator}
          onLap={onLap}
          onStart={onStart}
        />
      );

    case "island":
      return (
        <TimerIsland
          {...baseProps}
          initialSeconds={initialSeconds}
          allowCustomTime={allowCustomTime}
          onDurationChange={onDurationChange}
        />
      );

    case "expandable":
      return (
        <TimerExpandable
          {...baseProps}
          initialSeconds={initialSeconds}
          alarmTime={alarmTime}
          showAlarmTime={showAlarmTime}
          showPresets={showPresets}
          presets={presets}
          allowCustomTime={allowCustomTime}
          stripeOrigin={stripeOrigin}
          customStripePath={customStripePath}
          customPath={customPath}
          defaultExpanded={defaultExpanded}
          isExpanded={isExpanded}
          onExpandedChange={onExpandedChange}
          onDurationChange={onDurationChange}
        />
      );

    case "perimeter":
    default:
      return (
        <TimerPerimeter
          {...baseProps}
          initialSeconds={initialSeconds}
          alarmTime={alarmTime}
          showAlarmTime={showAlarmTime}
          showPresets={showPresets}
          presets={presets}
          allowCustomTime={allowCustomTime}
          stripeOrigin={stripeOrigin}
          customStripePath={customStripePath}
          customPath={customPath}
          onDurationChange={onDurationChange}
        />
      );
  }
}
