"use client";

import React from "react";
import {
  TimerPerimeter,
  TimerSplit,
  TimerStopwatch,
  TimerIsland,
  TimerExpandable,
} from "@/components/ui/timer";
import { TimerCustomProps } from "./types";

interface TimerPreviewProps {
  customProps: TimerCustomProps;
  activeTocId?: string;
  isCustomizing?: boolean;
}

export function TimerPreview({
  customProps,
  activeTocId = "perimeter-timer",
  isCustomizing = false,
}: TimerPreviewProps) {
  if (isCustomizing) {
    if (customProps.variant === "split") {
      return (
        <div className="w-full flex flex-col items-center justify-center gap-4 p-8">
          <TimerSplit
            key={`split-${customProps.intent}-${customProps.accentColor}-${customProps.ringColor}-${customProps.stripeColor}-${customProps.initialSeconds}`}
            initialSeconds={customProps.initialSeconds}
            intent={customProps.intent}
            accentColor={customProps.accentColor}
            stripeColor={customProps.stripeColor}
            ringColor={customProps.ringColor}
            trackColor={customProps.trackColor}
            autoStart={customProps.autoStart}
          />
          <span className="text-xs font-mono text-muted-foreground text-center">
            Customizing Split Radial Dial Timer in real time
          </span>
        </div>
      );
    }

    if (customProps.variant === "stopwatch") {
      return (
        <div className="w-full flex flex-col items-center justify-center gap-4 p-8">
          <TimerStopwatch
            key={`stopwatch-${customProps.showLaps}-${customProps.initialCentiseconds}`}
            initialCentiseconds={customProps.initialCentiseconds}
            showLaps={customProps.showLaps}
            autoStart={customProps.autoStart}
          />
          <span className="text-xs font-mono text-muted-foreground text-center">
            Customizing Centisecond Stopwatch with Laps in real time
          </span>
        </div>
      );
    }

    if (customProps.variant === "island") {
      return (
        <div className="w-full flex flex-col items-center justify-center gap-4 p-8">
          <TimerIsland
            key={`island-${customProps.intent}-${customProps.accentColor}-${customProps.stripeColor}-${customProps.initialSeconds}`}
            initialSeconds={customProps.initialSeconds}
            intent={customProps.intent}
            accentColor={customProps.accentColor}
            stripeColor={customProps.stripeColor}
            trackColor={customProps.trackColor}
            autoStart={customProps.autoStart}
            allowCustomTime={customProps.allowCustomTime}
          />
          <span className="text-xs font-mono text-muted-foreground text-center">
            Customizing Compact Dynamic Island Pill Timer in real time
          </span>
        </div>
      );
    }

    if (customProps.variant === "expandable") {
      return (
        <div className="w-full flex flex-col items-center justify-center gap-4 p-8">
          <TimerExpandable
            key={`expandable-${customProps.intent}-${customProps.accentColor}-${customProps.stripeColor}-${customProps.stripeOrigin}-${customProps.initialSeconds}-${customProps.showPresets}`}
            initialSeconds={customProps.initialSeconds}
            showAlarmTime={customProps.showAlarmTime}
            showPresets={customProps.showPresets}
            allowCustomTime={customProps.allowCustomTime}
            intent={customProps.intent}
            accentColor={customProps.accentColor}
            stripeColor={customProps.stripeColor}
            stripeOrigin={customProps.stripeOrigin}
            trackColor={customProps.trackColor}
            autoStart={customProps.autoStart}
          />
          <span className="text-xs font-mono text-muted-foreground text-center">
            Customizing Expandable Dynamic Island Timer in real time
          </span>
        </div>
      );
    }

    return (
      <div className="w-full flex flex-col items-center justify-center gap-4 p-8">
        <TimerPerimeter
          key={`perimeter-${customProps.intent}-${customProps.accentColor}-${customProps.stripeColor}-${customProps.stripeOrigin}-${customProps.initialSeconds}-${customProps.showPresets}`}
          initialSeconds={customProps.initialSeconds}
          showAlarmTime={customProps.showAlarmTime}
          showPresets={customProps.showPresets}
          allowCustomTime={customProps.allowCustomTime}
          intent={customProps.intent}
          accentColor={customProps.accentColor}
          stripeColor={customProps.stripeColor}
          stripeOrigin={customProps.stripeOrigin}
          trackColor={customProps.trackColor}
          autoStart={customProps.autoStart}
        />
        <span className="text-xs font-mono text-muted-foreground text-center">
          Customizing Live Activity Perimeter Capsule Timer in real time
        </span>
      </div>
    );
  }

  if (activeTocId === "split-dial") {
    return (
      <div className="w-full flex flex-col items-center justify-center gap-4 p-8">
        <TimerSplit
          initialSeconds={1200}
          intent="cyan"
          ringColor="#00d2ff"
          allowCustomTime
        />
        <span className="text-xs font-mono text-muted-foreground text-center">
          Split time display with in-place click-to-edit duration picker and icon confirmation stop button
        </span>
      </div>
    );
  }

  if (activeTocId === "stopwatch-laps") {
    return (
      <div className="w-full flex flex-col items-center justify-center gap-4 p-8">
        <TimerStopwatch initialCentiseconds={0} label="Stopwatch" showLaps />
        <span className="text-xs font-mono text-muted-foreground text-center">
          Centisecond stopwatch with animated horizontal lap carousel and pause/lap controls
        </span>
      </div>
    );
  }

  if (activeTocId === "dynamic-island") {
    return (
      <div className="w-full flex flex-col items-center justify-center gap-6 p-8">
        <div className="flex flex-wrap items-center justify-center gap-4">
          <TimerIsland initialSeconds={300} intent="amber" allowCustomTime />
          <TimerIsland initialSeconds={600} intent="cyan" allowCustomTime />
          <TimerIsland initialSeconds={900} intent="emerald" allowCustomTime />
          <TimerIsland initialSeconds={1200} intent="rose" allowCustomTime />
          <TimerIsland initialSeconds={1500} intent="purple" allowCustomTime />
        </div>
        <span className="text-xs font-mono text-muted-foreground text-center">
          Compact Dynamic Island inline status pills with animated progress rings and smooth inline time editor across semantic theme intents
        </span>
      </div>
    );
  }

  if (activeTocId === "expandable-island") {
    return (
      <div className="w-full flex flex-col items-center justify-center gap-4 p-8">
        <TimerExpandable
          initialSeconds={792}
          intent="amber"
          stripeColor="#ff9f0a"
          label="Timer"
          allowCustomTime
        />
        <span className="text-xs font-mono text-muted-foreground text-center">
          Interactive Dynamic Island pill that smoothly expands into Live Activity card with spring physics
        </span>
      </div>
    );
  }

  // Default Perimeter Timer (Dynamic Alarm Completion, Top-Center Clockwise Stripe)
  return (
    <div className="w-full flex flex-col items-center justify-center gap-4 p-8">
      <TimerPerimeter
        initialSeconds={900}
        intent="amber"
        stripeColor="#ff9f0a"
        allowCustomTime
      />
      <span className="text-xs font-mono text-muted-foreground text-center">
        Live Activity perimeter border contour tracking timer with dynamic alarm target & custom time support
      </span>
    </div>
  );
}
