import { TimerCustomProps } from "./types";

export function generateTimerCode(props: TimerCustomProps): string {
  const {
    variant,
    intent,
    initialSeconds,
    initialCentiseconds,
    showAlarmTime,
    showLaps,
    showPresets,
    allowCustomTime,
    stripeColor,
    stripeOrigin,
    ringColor,
    accentColor,
    autoStart,
  } = props;

  let componentName = "TimerPerimeter";
  let fnName = "PerimeterTimerDemo";
  const lines: string[] = [];

  if (variant === "split") {
    componentName = "TimerSplit";
    fnName = "SplitDialTimerDemo";
    lines.push("<TimerSplit");
    if (initialSeconds !== 1200) lines.push(`        initialSeconds={${initialSeconds}}`);
    if (ringColor) lines.push(`        ringColor="${ringColor}"`);
    else if (stripeColor) lines.push(`        stripeColor="${stripeColor}"`);
    else if (intent !== "cyan") lines.push(`        intent="${intent}"`);
    else if (accentColor) lines.push(`        accentColor="${accentColor}"`);
    if (allowCustomTime) lines.push("        allowCustomTime");
    if (autoStart) lines.push("        autoStart");
    lines.push("      />");
  } else if (variant === "stopwatch") {
    componentName = "TimerStopwatch";
    fnName = "StopwatchDemo";
    lines.push("<TimerStopwatch");
    if (initialCentiseconds !== 0) lines.push(`        initialCentiseconds={${initialCentiseconds}}`);
    if (!showLaps) lines.push("        showLaps={false}");
    if (autoStart) lines.push("        autoStart");
    lines.push("      />");
  } else if (variant === "island") {
    componentName = "TimerIsland";
    fnName = "IslandTimerDemo";
    lines.push("<TimerIsland");
    if (initialSeconds !== 792) lines.push(`        initialSeconds={${initialSeconds}}`);
    if (intent !== "amber") lines.push(`        intent="${intent}"`);
    if (stripeColor) lines.push(`        stripeColor="${stripeColor}"`);
    else if (accentColor) lines.push(`        accentColor="${accentColor}"`);
    if (autoStart) lines.push("        autoStart");
    lines.push("      />");
  } else if (variant === "expandable") {
    componentName = "TimerExpandable";
    fnName = "ExpandableIslandTimerDemo";
    lines.push("<TimerExpandable");
    if (initialSeconds !== 792) lines.push(`        initialSeconds={${initialSeconds}}`);
    if (!showAlarmTime) lines.push("        showAlarmTime={false}");
    if (intent !== "amber") lines.push(`        intent="${intent}"`);
    if (stripeColor) lines.push(`        stripeColor="${stripeColor}"`);
    else if (accentColor) lines.push(`        accentColor="${accentColor}"`);
    if (stripeOrigin && stripeOrigin !== "top-center") lines.push(`        stripeOrigin="${stripeOrigin}"`);
    if (showPresets) lines.push("        showPresets");
    if (allowCustomTime) lines.push("        allowCustomTime");
    if (autoStart) lines.push("        autoStart");
    lines.push("      />");
  } else {
    // Default Perimeter variant
    lines.push("<TimerPerimeter");
    if (initialSeconds !== 900) lines.push(`        initialSeconds={${initialSeconds}}`);
    if (!showAlarmTime) lines.push("        showAlarmTime={false}");
    if (intent !== "amber") lines.push(`        intent="${intent}"`);
    if (stripeColor) lines.push(`        stripeColor="${stripeColor}"`);
    else if (accentColor) lines.push(`        accentColor="${accentColor}"`);
    if (stripeOrigin && stripeOrigin !== "top-center") lines.push(`        stripeOrigin="${stripeOrigin}"`);
    if (showPresets) lines.push("        showPresets");
    if (allowCustomTime) lines.push("        allowCustomTime");
    if (autoStart) lines.push("        autoStart");
    lines.push("      />");
  }

  return `"use client";

import { ${componentName} } from "@/components/ui/timer";

export default function ${fnName}() {
  return (
    <div className="flex items-center justify-center p-8">
      ${lines.join("\n")}
    </div>
  );
}`;
}
