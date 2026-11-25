"use client";

import React from "react";
import {
  Settings2,
  Palette,
  Layers,
  Clock,
  Bell,
  ListFilter,
  PlayCircle,
  SlidersHorizontal,
  Pencil,
  Compass,
} from "lucide-react";
import { PlaygroundStudio, PlaygroundStudioStepData } from "./core";
import { TimerCustomProps, DEFAULT_TIMER_PROPS } from "@/components/showcases/timer/types";
import { TimerVariant, TimerIntent, TimerStripeOrigin, formatSeconds } from "@/components/ui/timer";
import { TimerPreview } from "@/components/showcases/timer/timer-preview";

export interface TimerPlaygroundStudioProps {
  customProps: TimerCustomProps;
  onChange: React.Dispatch<React.SetStateAction<TimerCustomProps>>;
  className?: string;
  hidePreview?: boolean;
  onViewCode?: () => void;
}

export const TimerLivePreview = React.memo(function TimerLivePreview({
  customProps,
}: {
  customProps: TimerCustomProps;
}) {
  return (
    <div className="w-full h-full flex items-center justify-center p-2">
      <div className="scale-80 sm:scale-90 origin-center">
        <TimerPreview customProps={customProps} isCustomizing={true} />
      </div>
    </div>
  );
});

const TIMER_VARIANTS: Array<{
  id: TimerVariant;
  label: string;
  spec: string;
  emoji: string;
}> = [
  { id: "perimeter", label: "Live Activity Capsule", spec: "Contour border tracking with alarm target", emoji: "⏱️" },
  { id: "split", label: "Split Radial Dial", spec: "Preset duration chips & circular progress arc", emoji: "🧭" },
  { id: "stopwatch", label: "Centisecond Stopwatch", spec: "Real-time stopwatch with animated lap carousel", emoji: "⚡" },
  { id: "island", label: "Dynamic Island Pill", spec: "Ultra-compact Apple Dynamic Island status bar", emoji: "🏝️" },
  { id: "expandable", label: "Expandable Island", spec: "Morphs between Island pill and Live Activity card", emoji: "✨" },
];

const COLOR_OPTIONS: Array<{
  id: TimerIntent;
  label: string;
  hex?: string;
  color: string;
}> = [
  { id: "amber", label: "Amber Orange", hex: "#ff9f0a", color: "bg-[#ff9f0a]" },
  { id: "cyan", label: "Electric Cyan", hex: "#06b6d4", color: "bg-cyan-500" },
  { id: "emerald", label: "Emerald Green", hex: "#10b981", color: "bg-emerald-500" },
  { id: "rose", label: "Rose Crimson", hex: "#f43f5e", color: "bg-rose-500" },
  { id: "purple", label: "Violet Purple", hex: "#a855f7", color: "bg-purple-500" },
  { id: "primary", label: "Theme Primary", hex: undefined, color: "bg-[var(--theme-primary,#3b82f6)]" },
];

const STRIPE_ORIGIN_OPTIONS: Array<{
  id: TimerStripeOrigin;
  label: string;
  spec: string;
  emoji: string;
}> = [
  { id: "top-center", label: "Top Center", spec: "Starts from top notch, sweeps clockwise", emoji: "⬆️" },
  { id: "top-left", label: "Top Left", spec: "Starts from upper left corner", emoji: "↖️" },
  { id: "top-right", label: "Top Right", spec: "Starts from upper right corner", emoji: "↗️" },
  { id: "bottom-center", label: "Bottom Center", spec: "Starts from bottom notch, sweeps clockwise", emoji: "⬇️" },
  { id: "bottom-left", label: "Bottom Left", spec: "Starts from lower left corner", emoji: "↙️" },
  { id: "bottom-right", label: "Bottom Right", spec: "Starts from lower right corner", emoji: "↘️" },
];

const DURATION_PRESETS = [
  { seconds: 60, label: "1 min", spec: "Quick focus burst" },
  { seconds: 300, label: "5 mins", spec: "Short interval break" },
  { seconds: 600, label: "10 mins", spec: "Pomodoro rest" },
  { seconds: 792, label: "13m 12s", spec: "Reference preset" },
  { seconds: 900, label: "15 mins", spec: "Short sprint session" },
  { seconds: 975, label: "16m 15s", spec: "Split dial preset" },
  { seconds: 1200, label: "20 mins", spec: "Deep work session" },
  { seconds: 1500, label: "25 mins", spec: "Standard Pomodoro focus" },
];

export function TimerPlaygroundStudio({
  customProps,
  onChange,
  className,
  hidePreview = false,
  onViewCode,
}: TimerPlaygroundStudioProps) {
  const isCustomDuration = !DURATION_PRESETS.some(
    (d) => d.seconds === customProps.initialSeconds
  );

  const steps: PlaygroundStudioStepData[] = [
    {
      id: "variant",
      titleLine1: "Variant &",
      titleLine2: "mode",
      categoryTag: "01 / 05",
      colorGradient: "bg-gradient-to-br from-[#10B981] to-[#047857]",
      icon: <Layers className="w-3.5 h-3.5" />,
      headerTitle: "Timer Widget Variant",
      headerSubtitle: "perimeter capsule, split dial, stopwatch & island",
      headerEmoji: "⏱️",
      rows: TIMER_VARIANTS.map((v) => ({
        id: `variant-${v.id}`,
        label: v.label,
        spec: v.spec,
        thumbnail: <span className="text-sm">{v.emoji}</span>,
        isSelected: customProps.variant === v.id,
        onSelect: () => onChange((p) => ({ ...p, variant: v.id })),
      })),
    },
    {
      id: "color",
      titleLine1: "Theme &",
      titleLine2: "stripe",
      categoryTag: "02 / 05",
      colorGradient: "bg-gradient-to-br from-[#3B82F6] to-[#1D4ED8]",
      icon: <Palette className="w-3.5 h-3.5" />,
      headerTitle: "Stripe & Intent Color",
      headerSubtitle: "animated progress stripe, dial arc & glow color",
      headerEmoji: "🎨",
      rows: COLOR_OPTIONS.map((c, idx) => ({
        id: `color-${idx}-${c.label}`,
        label: c.label,
        spec: c.hex ? c.hex : "CSS token",
        thumbnail: <span className={`w-3.5 h-3.5 rounded-full ${c.color}`} />,
        isSelected:
          customProps.intent === c.id &&
          (c.hex ? customProps.stripeColor === c.hex : !customProps.stripeColor),
        onSelect: () =>
          onChange((p) => ({
            ...p,
            intent: c.id,
            accentColor: c.hex,
            stripeColor: c.hex,
            ringColor: c.hex,
          })),
      })),
    },
    {
      id: "origin",
      titleLine1: "Stripe &",
      titleLine2: "origin",
      categoryTag: "03 / 05",
      colorGradient: "bg-gradient-to-br from-[#F59E0B] to-[#D97706]",
      icon: <Compass className="w-3.5 h-3.5" />,
      headerTitle: "Perimeter Stripe Origin",
      headerSubtitle: "start position for clockwise border sweep",
      headerEmoji: "🧭",
      rows: STRIPE_ORIGIN_OPTIONS.map((o) => ({
        id: `origin-${o.id}`,
        label: o.label,
        spec: o.spec,
        thumbnail: <span className="text-sm">{o.emoji}</span>,
        isSelected: (customProps.stripeOrigin || "top-center") === o.id,
        onSelect: () => onChange((p) => ({ ...p, stripeOrigin: o.id })),
      })),
    },
    {
      id: "duration",
      titleLine1: "Preset &",
      titleLine2: "time",
      categoryTag: "04 / 05",
      colorGradient: "bg-gradient-to-br from-[#8B5CF6] to-[#6D28D9]",
      icon: <Clock className="w-3.5 h-3.5" />,
      headerTitle: "Target Countdown Duration",
      headerSubtitle: "duration presets & custom time selection",
      headerEmoji: "⏳",
      rows: [
        ...DURATION_PRESETS.map((d) => ({
          id: `duration-${d.seconds}`,
          label: d.label,
          spec: d.spec,
          thumbnail: <Clock className="w-3.5 h-3.5 text-zinc-400" />,
          isSelected: customProps.initialSeconds === d.seconds,
          onSelect: () =>
            onChange((p) => ({
              ...p,
              initialSeconds: d.seconds,
              initialCentiseconds: d.seconds * 100,
            })),
        })),
        ...(isCustomDuration
          ? [
              {
                id: "duration-custom",
                label: `Custom (${formatSeconds(customProps.initialSeconds)})`,
                spec: "Selected via custom time input",
                thumbnail: <Pencil className="w-3.5 h-3.5 text-[var(--theme-primary)]" />,
                isSelected: true,
                onSelect: () => {},
              },
            ]
          : []),
      ],
    },
    {
      id: "features",
      titleLine1: "Layout &",
      titleLine2: "features",
      categoryTag: "05 / 05",
      colorGradient: "bg-gradient-to-br from-[#EC4899] to-[#BE185D]",
      icon: <Settings2 className="w-3.5 h-3.5" />,
      headerTitle: "Widget Options",
      headerSubtitle: "preset chips, custom time & alarm readout",
      headerEmoji: "⚙️",
      rows: [
        {
          id: "toggle-custom-time",
          label: "Allow Custom Time",
          spec: "Inline editable time inputs on the widget",
          thumbnail: <Pencil className="w-3.5 h-3.5 text-zinc-500" />,
          actionType: "toggle" as const,
          toggleChecked: customProps.allowCustomTime ?? true,
          onToggleChange: (v) => onChange((p) => ({ ...p, allowCustomTime: v })),
          onSelect: () =>
            onChange((p) => ({
              ...p,
              allowCustomTime: p.allowCustomTime === undefined ? false : !p.allowCustomTime,
            })),
        },
        {
          id: "toggle-presets",
          label: "Show Preset Chips",
          spec: "Quick duration pill selectors (5m, 10m, 15m...)",
          thumbnail: <SlidersHorizontal className="w-3.5 h-3.5 text-zinc-500" />,
          actionType: "toggle" as const,
          toggleChecked: customProps.showPresets ?? false,
          onToggleChange: (v) => onChange((p) => ({ ...p, showPresets: v })),
          onSelect: () =>
            onChange((p) => ({
              ...p,
              showPresets: !p.showPresets,
            })),
        },
        {
          id: "toggle-alarm",
          label: "Show Alarm Time",
          spec: "Target completion bell badge in Live Activity",
          thumbnail: <Bell className="w-3.5 h-3.5 text-zinc-500" />,
          actionType: "toggle" as const,
          toggleChecked: customProps.showAlarmTime,
          onToggleChange: (v) => onChange((p) => ({ ...p, showAlarmTime: v })),
          onSelect: () => onChange((p) => ({ ...p, showAlarmTime: !p.showAlarmTime })),
        },
        {
          id: "toggle-laps",
          label: "Show Lap Carousel",
          spec: "Horizontal lap pill badges in stopwatch",
          thumbnail: <ListFilter className="w-3.5 h-3.5 text-zinc-500" />,
          actionType: "toggle" as const,
          toggleChecked: customProps.showLaps,
          onToggleChange: (v) => onChange((p) => ({ ...p, showLaps: v })),
          onSelect: () => onChange((p) => ({ ...p, showLaps: !p.showLaps })),
        },
        {
          id: "toggle-autostart",
          label: "Auto-Start Timer",
          spec: "Begin countdown immediately on load",
          thumbnail: <PlayCircle className="w-3.5 h-3.5 text-zinc-500" />,
          actionType: "toggle" as const,
          toggleChecked: customProps.autoStart || false,
          onToggleChange: (v) => onChange((p) => ({ ...p, autoStart: v })),
          onSelect: () => onChange((p) => ({ ...p, autoStart: !p.autoStart })),
        },
      ],
    },
  ];

  return (
    <PlaygroundStudio
      steps={steps}
      preview={hidePreview ? undefined : <TimerLivePreview customProps={customProps} />}
      description="Interact with props below to customize your countdown timer in real time."
      onReset={() => onChange(DEFAULT_TIMER_PROPS)}
      onViewCode={onViewCode}
      className={className}
      hidePreview={hidePreview}
    />
  );
}
