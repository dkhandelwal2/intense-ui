export interface TimerExample {
  id: string;
  label: string;
  emoji: string;
  description: string;
  code: string;
}

export const TIMER_EXAMPLES: TimerExample[] = [
  {
    id: "perimeter-timer",
    label: "Live Activity Capsule",
    emoji: "⏱️",
    description: "iOS StandBy & Dynamic Island style perimeter border contour tracking timer with dynamic alarm target & custom time support",
    code: `"use client";

import { TimerPerimeter } from "@/components/ui/timer";

export default function PerimeterTimerDemo() {
  return (
    <div className="flex items-center justify-center p-8">
      <TimerPerimeter
        initialSeconds={900}
        stripeColor="#ff9f0a"
        allowCustomTime
        label="Timer"
      />
    </div>
  );
}`,
  },
  {
    id: "split-dial",
    label: "Split Radial Dial",
    emoji: "🧭",
    description: "Split time display with smooth morphing hours/minutes editor, icon confirmation stop button, and final 10s alert",
    code: `"use client";

import { TimerSplit } from "@/components/ui/timer";

export default function SplitDialTimerDemo() {
  return (
    <div className="flex items-center justify-center p-8">
      <TimerSplit
        initialSeconds={1200}
        ringColor="#00d2ff"
        allowCustomTime
        label="Timer"
      />
    </div>
  );
}`,
  },
  {
    id: "stopwatch-laps",
    label: "Stopwatch with Laps",
    emoji: "⚡",
    description: "High-precision stopwatch with horizontal scrolling lap carousel and pause/lap controls in HH:MM:SS format",
    code: `"use client";

import { TimerStopwatch } from "@/components/ui/timer";

export default function StopwatchDemo() {
  return (
    <div className="flex items-center justify-center p-8">
      <TimerStopwatch
        initialCentiseconds={0}
        label="Stopwatch"
        showLaps
      />
    </div>
  );
}`,
  },
  {
    id: "dynamic-island",
    label: "Compact Dynamic Island",
    emoji: "🏝️",
    description: "Ultra-compact Apple Dynamic Island inline status pill with progress ring across semantic intent themes",
    code: `"use client";

import { TimerIsland } from "@/components/ui/timer";

export default function DynamicIslandTimerDemo() {
  return (
    <div className="flex flex-wrap items-center justify-center gap-4 p-8">
      <TimerIsland initialSeconds={300} intent="amber" />
      <TimerIsland initialSeconds={600} intent="cyan" />
      <TimerIsland initialSeconds={900} intent="emerald" />
      <TimerIsland initialSeconds={1200} intent="rose" />
      <TimerIsland initialSeconds={1500} intent="purple" />
    </div>
  );
}`,
  },
  {
    id: "expandable-island",
    label: "Expandable Island",
    emoji: "✨",
    description: "Morphing Apple Dynamic Island pill that smoothly expands into the full Live Activity perimeter timer with spring physics and collapses back",
    code: `"use client";

import { TimerExpandable } from "@/components/ui/timer";

export default function ExpandableIslandTimerDemo() {
  return (
    <div className="flex items-center justify-center p-8">
      <TimerExpandable
        initialSeconds={792}
        stripeColor="#ff9f0a"
        label="Timer"
        allowCustomTime
      />
    </div>
  );
}`,
  },
];
