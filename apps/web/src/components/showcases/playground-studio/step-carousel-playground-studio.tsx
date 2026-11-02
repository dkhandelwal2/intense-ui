"use client";

import React from "react";
import { Maximize2, Wand2, Sliders, Palette } from "lucide-react";
import { PlaygroundStudio, PlaygroundStudioStepData } from "./core";
import {
  STEP_CAROUSEL_SIZES,
  STEP_CAROUSEL_SPEEDS,
  STEP_CAROUSEL_COLOR_SCHEMES,
  getStepCarouselModifiedCount as getModifiedCount,
} from "./constants";
import {
  StepCarouselCustomProps,
  DEFAULT_STEP_CAROUSEL_PROPS,
} from "@/components/showcases/step-carousel/types";
import { StepCarouselPreview } from "@/components/showcases/step-carousel/step-carousel-preview";

export interface StepCarouselPlaygroundStudioProps {
  customProps: StepCarouselCustomProps;
  onChange: React.Dispatch<React.SetStateAction<StepCarouselCustomProps>>;
  className?: string;
  hidePreview?: boolean;
  onViewCode?: () => void;
}

const STEP_OPTIONS = [
  { count: 3, label: "3 Steps", badge: "03" },
  { count: 4, label: "4 Steps", badge: "04" },
  { count: 5, label: "5 Steps", badge: "05" },
  { count: 7, label: "7 Steps (+2)", badge: "07" },
  { count: 8, label: "8 Steps (+3)", badge: "08" },
];

export function StepCarouselPlaygroundStudio({
  customProps,
  onChange,
  className,
  hidePreview = false,
  onViewCode,
}: StepCarouselPlaygroundStudioProps) {
  const modifiedCount = getModifiedCount(customProps);

  const steps: PlaygroundStudioStepData[] = [
    {
      id: "sizing",
      titleLine1: "Scale &",
      titleLine2: "steps",
      categoryTag: "01 / 04",
      colorGradient: "bg-gradient-to-br from-[#10B981] via-[#059669] to-[#047857]",
      icon: <Maximize2 className="w-3.5 h-3.5" />,
      headerTitle: "Scale & Steps",
      headerSubtitle: "storehouse",
      headerEmoji: "📐",
      rows: [
        ...STEP_CAROUSEL_SIZES.map((sz) => ({
          id: `size-${sz.id}`,
          label: `${sz.label} Size`,
          spec: `Set pill & button scale to ${sz.id.toUpperCase()}`,
          thumbnail: <span className="text-[10px] font-mono font-bold px-1.5 py-0.5 rounded bg-zinc-200 dark:bg-zinc-800 text-zinc-700 dark:text-zinc-300 uppercase">{sz.id}</span>,
          isSelected: customProps.size === sz.id,
          onSelect: () => onChange((p) => ({ ...p, size: sz.id })),
        })),
        ...STEP_OPTIONS.map((opt) => ({
          id: `step-${opt.count}`,
          label: opt.label,
          spec: `Configure carousel track for ${opt.count} stages`,
          thumbnail: <span className="text-[10px] font-mono font-bold px-1.5 py-0.5 rounded bg-zinc-200 dark:bg-zinc-800 text-zinc-700 dark:text-zinc-300">{opt.badge}</span>,
          isSelected: customProps.totalSteps === opt.count,
          onSelect: () => onChange((p) => ({ ...p, totalSteps: opt.count })),
        })),
      ],
    },
    {
      id: "motion",
      titleLine1: "Motion &",
      titleLine2: "liquid",
      categoryTag: "02 / 04",
      colorGradient: "bg-gradient-to-br from-[#7C5CFC] via-[#6a42f5] to-[#5123ea]",
      icon: <Wand2 className="w-3.5 h-3.5" />,
      headerTitle: "Motion Engine",
      headerSubtitle: "storehouse",
      headerEmoji: "🫧",
      rows: [
        {
          id: "gooey", label: "Fluid Gooey Matrix", spec: "SVG feColorMatrix liquid morphing filter",
          thumbnail: <span className="text-sm">🫧</span>, actionType: "toggle" as const, toggleChecked: !!customProps.gooey,
          onToggleChange: (c: boolean) => onChange((p) => ({ ...p, gooey: c })),
          onSelect: () => onChange((p) => ({ ...p, gooey: !p.gooey })),
        },
        {
          id: "loop", label: "Continuous Loop", spec: "Wrap around smoothly from last to first step",
          thumbnail: <span className="text-sm">🔄</span>, actionType: "toggle" as const, toggleChecked: !!customProps.loop,
          onToggleChange: (c: boolean) => onChange((p) => ({ ...p, loop: c })),
          onSelect: () => onChange((p) => ({ ...p, loop: !p.loop })),
        },
        ...STEP_CAROUSEL_SPEEDS.map((sp) => ({
          id: `speed-${sp.id}`, label: sp.label, spec: `Timer interval per card animation step`,
          thumbnail: <span className="text-[10px] font-mono font-bold px-1.5 py-0.5 rounded bg-zinc-200 dark:bg-zinc-800 text-zinc-700 dark:text-zinc-300">{sp.badge}</span>,
          isSelected: customProps.duration === sp.id,
          onSelect: () => onChange((p) => ({ ...p, duration: sp.id })),
        })),
      ],
    },
    {
      id: "controls",
      titleLine1: "Player",
      titleLine2: "controls",
      categoryTag: "03 / 04",
      colorGradient: "bg-gradient-to-br from-[#F97316] via-[#EA580C] to-[#C2410C]",
      icon: <Sliders className="w-3.5 h-3.5" />,
      headerTitle: "Interactivity",
      headerSubtitle: "storehouse",
      headerEmoji: "🕹️",
      rows: [
        {
          id: "play-button", label: "Play / Pause Button", spec: "Display interactive player toggle button",
          thumbnail: <span className="text-sm">▶️</span>, actionType: "toggle" as const, toggleChecked: !!customProps.showPlayButton,
          onToggleChange: (c: boolean) => onChange((p) => ({ ...p, showPlayButton: c })),
          onSelect: () => onChange((p) => ({ ...p, showPlayButton: !p.showPlayButton })),
        },
        {
          id: "autoplay", label: "Autoplay on Mount", spec: "Start timer progression automatically on load",
          thumbnail: <span className="text-sm">⚡</span>, actionType: "toggle" as const, toggleChecked: !!customProps.defaultPlaying,
          onToggleChange: (c: boolean) => onChange((p) => ({ ...p, defaultPlaying: c })),
          onSelect: () => onChange((p) => ({ ...p, defaultPlaying: !p.defaultPlaying })),
        },
        {
          id: "pause-hover", label: "Pause on Hover", spec: "Freeze progress while hovering carousel track",
          thumbnail: <span className="text-sm">⏸️</span>, actionType: "toggle" as const, toggleChecked: !!customProps.pauseOnHover,
          onToggleChange: (c: boolean) => onChange((p) => ({ ...p, pauseOnHover: c })),
          onSelect: () => onChange((p) => ({ ...p, pauseOnHover: !p.pauseOnHover })),
        },
      ],
    },
    {
      id: "theme",
      titleLine1: "Color",
      titleLine2: "palettes",
      categoryTag: "04 / 04",
      colorGradient: "bg-gradient-to-br from-[#EC4899] via-[#DB2777] to-[#BE185D]",
      icon: <Palette className="w-3.5 h-3.5" />,
      headerTitle: "Color Scheme",
      headerSubtitle: "storehouse",
      headerEmoji: "🎨",
      rows: STEP_CAROUSEL_COLOR_SCHEMES.map((scheme) => ({
        id: `scheme-${scheme.id}`,
        label: scheme.label,
        spec: scheme.id === "default" ? "Clean zinc monochrome style" : "Vibrant brand primary theme",
        thumbnail: (
          <span
            className={`w-3.5 h-3.5 rounded-full ${
              scheme.id === "primary" ? "bg-[var(--theme-primary,hsl(var(--primary)))]" : "bg-zinc-800 dark:bg-zinc-200"
            }`}
          />
        ),
        isSelected: customProps.colorScheme === scheme.id,
        onSelect: () => onChange((p) => ({ ...p, colorScheme: scheme.id })),
      })),
    },
  ];

  return (
    <PlaygroundStudio
      steps={steps}
      modifiedCount={modifiedCount}
      preview={hidePreview ? undefined : <StepCarouselPreview customProps={customProps} />}
      className={className}
      description="Customize step carousel fluid gooey physics, duration, controls, and dimensions."
      onReset={() => onChange(DEFAULT_STEP_CAROUSEL_PROPS)}
      onViewCode={onViewCode}
    />
  );
}
