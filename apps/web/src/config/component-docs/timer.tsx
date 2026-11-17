import React from "react";
import { ComponentDocData } from "./types";
import { TIMER_EXAMPLES } from "@/components/showcases/timer/constants";

export const TIMER_USAGE = `"use client";

import {
  Timer,
  TimerPerimeter,
  TimerSplit,
  TimerStopwatch,
  TimerIsland,
  TimerExpandable,
} from "@/components/ui/timer";

export default function TimerDemo() {
  return (
    <div className="w-full max-w-md space-y-6 p-6">
      {/* 1. Live Activity Perimeter Capsule with Custom Stripe Color & Time Editing */}
      <TimerPerimeter
        initialSeconds={900}
        stripeColor="#ff9f0a"
        allowCustomTime
        showPresets
        intent="amber"
      />

      {/* 2. Split Dial with Duration Chips & Custom Time */}
      <TimerSplit
        initialSeconds={1200}
        presets={[300, 600, 1200]}
        ringColor="#00d2ff"
        allowCustomTime
        intent="cyan"
      />

      {/* 3. Stopwatch with Horizontal Scrollable Lap Carousel in HH:MM:SS format */}
      <TimerStopwatch initialCentiseconds={0} showLaps />

      {/* 4. Compact Dynamic Island with Semantic Intent Themes */}
      <div className="flex flex-wrap items-center gap-3">
        <TimerIsland initialSeconds={300} intent="amber" />
        <TimerIsland initialSeconds={600} intent="cyan" />
        <TimerIsland initialSeconds={900} intent="emerald" />
      </div>

      {/* 5. Expandable Morphing Dynamic Island into Live Activity Card */}
      <TimerExpandable
        initialSeconds={792}
        stripeColor="#ff9f0a"
        allowCustomTime
      />
    </div>
  );
}`;

export const timerDoc: ComponentDocData = {
  usageCode: TIMER_USAGE,
  codeContent: TIMER_USAGE,
  codes: TIMER_EXAMPLES.reduce((acc, ex) => {
    acc[ex.id] = ex.code;
    return acc;
  }, {} as Record<string, string>),
  tocItems: TIMER_EXAMPLES.map((ex) => ({
    id: ex.id,
    label: ex.label,
    icon: (
      <span role="img" aria-label={ex.label} className="inline-flex items-center justify-center select-none leading-none">
        {ex.emoji}
      </span>
    ),
  })),
  dependencies: [
    { name: "lucide-react", command: "npm install lucide-react" },
    { name: "clsx", command: "npm install clsx" },
    { name: "tailwind-merge", command: "npm install tailwind-merge" },
  ],
  propGroups: [
    {
      title: "TimerPerimeter Props (Live Activity Capsule)",
      props: [
        { prop: "initialSeconds", type: "number", defaultValue: "900", description: "Initial countdown duration in seconds (e.g. 900 for 15:00)." },
        { prop: "stripeColor", type: "string", defaultValue: "-", description: "Explicit CSS or HEX color for the perimeter running contour stripe." },
        { prop: "trackColor", type: "string", defaultValue: "-", description: "Custom color for the inactive perimeter track bed." },
        { prop: "glowColor", type: "string", defaultValue: "-", description: "Custom drop-shadow glow color for the active stripe." },
        { prop: "allowCustomTime", type: "boolean", defaultValue: "true", description: "Enables inline editing of minutes and seconds on the widget." },
        { prop: "showPresets", type: "boolean", defaultValue: "false", description: "Displays quick duration preset selection chips." },
        { prop: "presets", type: "number[]", defaultValue: "[300, 600, 900, 1200]", description: "Preset countdown durations in seconds." },
        { prop: "alarmTime", type: "string", defaultValue: "-", description: "Target completion alarm time string; dynamically calculated from wall clock if omitted." },
        { prop: "showAlarmTime", type: "boolean", defaultValue: "true", description: "Whether to render target completion alarm bell badge." },
        { prop: "label", type: "string", defaultValue: '"Timer"', description: "Subtitle label displayed below the digital readout." },
        { prop: "intent", type: '"primary" | "amber" | "cyan" | "emerald" | "rose" | "purple"', defaultValue: '"amber"', description: "Semantic color theme intent." },
        { prop: "accentColor", type: "string", defaultValue: "-", description: "Alternative color override for perimeter progress stroke." },
        { prop: "autoStart", type: "boolean", defaultValue: "false", description: "Whether timer begins running immediately on mount." },
        { prop: "onComplete", type: "() => void", defaultValue: "-", description: "Callback triggered when countdown reaches 00:00." },
        { prop: "onTick", type: "(remaining: number) => void", defaultValue: "-", description: "Continuous callback on each second tick." },
        { prop: "onDurationChange", type: "(seconds: number) => void", defaultValue: "-", description: "Callback triggered when duration is changed via presets or custom input." },
        { prop: "onPause", type: "() => void", defaultValue: "-", description: "Callback triggered when paused." },
        { prop: "onResume", type: "() => void", defaultValue: "-", description: "Callback triggered when resumed." },
        { prop: "onReset", type: "() => void", defaultValue: "-", description: "Callback triggered when reset." },
      ],
    },
    {
      title: "TimerSplit Props (Radial Dial with Chips)",
      props: [
        { prop: "initialSeconds", type: "number", defaultValue: "1200", description: "Initial countdown duration in seconds (e.g. 1200 for 20:00)." },
        { prop: "ringColor", type: "string", defaultValue: "-", description: "Explicit CSS or HEX color override for the circular dial ring." },
        { prop: "ringTrackColor", type: "string", defaultValue: "-", description: "Custom color for the inactive circular ring bed." },
        { prop: "ringGlowColor", type: "string", defaultValue: "-", description: "Custom drop-shadow glow color for the circular dial ring." },
        { prop: "stripeColor", type: "string", defaultValue: "-", description: "Alternative prop name for ring color." },
        { prop: "trackColor", type: "string", defaultValue: "-", description: "Custom color for the inactive circular track." },
        { prop: "glowColor", type: "string", defaultValue: "-", description: "Custom drop-shadow glow color for the circular arc." },
        { prop: "dangerColor", type: "string", defaultValue: '"#ff453a"', description: "Alert color activated during the final countdown (e.g. last 10 seconds)." },
        { prop: "showDangerColor", type: "boolean", defaultValue: "true", description: "Whether to activate danger color during final seconds (can be disabled)." },
        { prop: "dangerThreshold", type: "number", defaultValue: "10", description: "Threshold in seconds to trigger danger alert color." },
        { prop: "allowCustomTime", type: "boolean", defaultValue: "true", description: "Enables in-place click-to-edit duration picker on the digital time readout." },
        { prop: "label", type: "string", defaultValue: '"Timer"', description: "Subtitle label displayed above time readout." },
        { prop: "intent", type: '"primary" | "amber" | "cyan" | "emerald" | "rose" | "purple"', defaultValue: '"cyan"', description: "Semantic color theme intent." },
        { prop: "accentColor", type: "string", defaultValue: "-", description: "Alternative color override for dial progress stroke." },
        { prop: "autoStart", type: "boolean", defaultValue: "false", description: "Whether timer begins running immediately on mount." },
        { prop: "onPresetChange", type: "(seconds: number) => void", defaultValue: "-", description: "Callback triggered when user selects a preset chip or sets custom time." },
        { prop: "onComplete", type: "() => void", defaultValue: "-", description: "Callback triggered when countdown reaches 00:00." },
        { prop: "onReset", type: "() => void", defaultValue: "-", description: "Callback triggered when Stop button is clicked." },
      ],
    },
    {
      title: "TimerStopwatch Props (Centisecond Precision & Horizontal Laps)",
      props: [
        { prop: "initialCentiseconds", type: "number", defaultValue: "0", description: "Initial centiseconds (1/100s) value (e.g. 0 starts from 00:00:00)." },
        { prop: "format", type: '"hh:mm:ss" | "hh:mm:ss,cs" | "mm:ss,cs" | "mm:ss"', defaultValue: '"hh:mm:ss"', description: "Display format for the stopwatch digits (HH:MM:SS or with centiseconds)." },
        { prop: "showHours", type: "boolean", defaultValue: "true", description: "Whether to format time with hours component (HH:MM:SS)." },
        { prop: "showCentiseconds", type: "boolean", defaultValue: "false", description: "Whether to display centiseconds fractional digits (defaults to false for clean non-overlapping layout)." },
        { prop: "label", type: "string", defaultValue: '"Stopwatch"', description: "Subtitle label displayed above digital time." },
        { prop: "showLaps", type: "boolean", defaultValue: "true", description: "Renders horizontally scrollable row of recorded lap times." },
        { prop: "maxLaps", type: "number", defaultValue: "50", description: "Maximum number of recorded laps retained." },
        { prop: "decimalSeparator", type: '"," | "."', defaultValue: '","', description: "Separator before centiseconds (e.g. 00:00:00,00 vs 00:00:00.00)." },
        { prop: "autoStart", type: "boolean", defaultValue: "false", description: "Whether stopwatch starts running immediately on mount." },
        { prop: "onLap", type: "(lap: TimerLap) => void", defaultValue: "-", description: "Callback triggered when a lap is recorded." },
        { prop: "onReset", type: "() => void", defaultValue: "-", description: "Callback triggered when reset." },
      ],
    },
    {
      title: "TimerIsland Props (Compact Dynamic Island)",
      props: [
        { prop: "initialSeconds", type: "number", defaultValue: "792", description: "Initial countdown duration in seconds." },
        { prop: "intent", type: '"primary" | "amber" | "cyan" | "emerald" | "rose" | "purple"', defaultValue: '"amber"', description: "Semantic color theme intent." },
        { prop: "stripeColor", type: "string", defaultValue: "-", description: "Explicit CSS or HEX color override for mini progress ring." },
        { prop: "accentColor", type: "string", defaultValue: "-", description: "Alternative color override for mini progress ring." },
        { prop: "autoStart", type: "boolean", defaultValue: "false", description: "Whether timer runs on mount." },
        { prop: "onComplete", type: "() => void", defaultValue: "-", description: "Callback triggered when countdown reaches 00:00." },
      ],
    },
    {
      title: "TimerExpandable Props (Morphing Dynamic Island)",
      props: [
        { prop: "initialSeconds", type: "number", defaultValue: "792", description: "Initial countdown duration in seconds." },
        { prop: "defaultExpanded", type: "boolean", defaultValue: "false", description: "Initial expansion state." },
        { prop: "isExpanded", type: "boolean", defaultValue: "-", description: "Controlled expansion state." },
        { prop: "onExpandedChange", type: "(expanded: boolean) => void", defaultValue: "-", description: "Callback triggered when expanded or collapsed." },
        { prop: "stripeColor", type: "string", defaultValue: '"#ff9f0a"', description: "Color of the perimeter tracking stripe and mini ring." },
        { prop: "allowCustomTime", type: "boolean", defaultValue: "true", description: "Whether user can edit time inline." },
        { prop: "showAlarmTime", type: "boolean", defaultValue: "true", description: "Whether to render target completion alarm bell badge." },
        { prop: "intent", type: '"primary" | "amber" | "cyan" | "emerald" | "rose" | "purple"', defaultValue: '"amber"', description: "Semantic color theme intent." },
      ],
    },
  ],
};
