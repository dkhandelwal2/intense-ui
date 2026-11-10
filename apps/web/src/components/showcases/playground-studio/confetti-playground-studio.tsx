"use client";

import React from "react";
import { Sparkles, Sliders, Zap } from "lucide-react";
import { PlaygroundStudio, PlaygroundStudioStepData } from "./core";
import { ConfettiCustomProps, DEFAULT_CONFETTI_PROPS } from "@/components/showcases/confetti/types";
import { ConfettiVariant } from "@/components/ui/confetti";

export interface ConfettiPlaygroundStudioProps {
  customProps: ConfettiCustomProps;
  onChange: React.Dispatch<React.SetStateAction<ConfettiCustomProps>>;
  className?: string;
  hidePreview?: boolean;
  onViewCode?: () => void;
}

const CONFETTI_VARIANTS: { id: ConfettiVariant; label: string; spec: string; emoji: string }[] = [
  { id: "basic", label: "Basic Burst", spec: "Classic celebratory pop", emoji: "🎉" },
  { id: "random-direction", label: "Random Direction", spec: "360° omnidirectional blast", emoji: "🎲" },
  { id: "fireworks", label: "Fireworks", spec: "Staggered sky explosions over 5s", emoji: "🎆" },
  { id: "side-cannons", label: "Side Cannons", spec: "Dual inward stage cannons over 3s", emoji: "💥" },
  { id: "stars", label: "Golden Stars", spec: "5-point shimmering stars", emoji: "⭐" },
  { id: "custom-shapes", label: "Mixed Shapes", spec: "Hearts, stars, circles & ribbons", emoji: "💖" },
  { id: "emoji", label: "Emoji Blast", spec: "Celebratory floating emojis", emoji: "🦄" },
];

const PARTICLE_COUNTS = [
  { count: 50, label: "Subtle (50)", spec: "Lightweight sprinkle" },
  { count: 80, label: "Standard (80)", spec: "Balanced energetic blast" },
  { count: 150, label: "Intense (150)", spec: "High-density celebration" },
];

const SPREAD_OPTIONS = [
  { spread: 30, label: "Focused (30°)", spec: "Tight directed beam" },
  { spread: 50, label: "Classic (50°)", spec: "Natural gentle fan" },
  { spread: 90, label: "Medium (90°)", spec: "Quarter-circle spread" },
  { spread: 180, label: "Wide (180°)", spec: "Broad semi-circle dispersion" },
];

export function ConfettiPlaygroundStudio({
  customProps,
  onChange,
  className,
  hidePreview = false,
  onViewCode,
}: ConfettiPlaygroundStudioProps) {
  const steps: PlaygroundStudioStepData[] = [
    {
      id: "variant",
      titleLine1: "Confetti Style &",
      titleLine2: "variant",
      categoryTag: "01 / 03",
      colorGradient: "bg-gradient-to-br from-[#EC4899] via-[#D946EF] to-[#A855F7]",
      icon: <Sparkles className="w-3.5 h-3.5" />,
      headerTitle: "Confetti Variant",
      headerSubtitle: "explosions, cannons, or shapes",
      headerEmoji: "🎉",
      rows: CONFETTI_VARIANTS.map((v) => ({
        id: `var-${v.id}`,
        label: v.label,
        spec: v.spec,
        thumbnail: (
          <span className="text-sm select-none">
            {v.emoji}
          </span>
        ),
        isSelected: customProps.variant === v.id,
        onSelect: () => onChange((p) => ({ ...p, variant: v.id })),
      })),
    },
    {
      id: "count",
      titleLine1: "Particle Count &",
      titleLine2: "density",
      categoryTag: "02 / 03",
      colorGradient: "bg-gradient-to-br from-[#3B82F6] via-[#2563EB] to-[#1D4ED8]",
      icon: <Zap className="w-3.5 h-3.5" />,
      headerTitle: "Particle Quantity",
      headerSubtitle: "particle volume per trigger",
      headerEmoji: "⚡",
      rows: PARTICLE_COUNTS.map((c) => ({
        id: `cnt-${c.count}`,
        label: c.label,
        spec: c.spec,
        thumbnail: (
          <span className="text-[10px] font-mono font-bold px-1.5 py-0.5 rounded bg-zinc-200 dark:bg-zinc-800 text-zinc-700 dark:text-zinc-300">
            {c.count}
          </span>
        ),
        isSelected: customProps.particleCount === c.count,
        onSelect: () => onChange((p) => ({ ...p, particleCount: c.count })),
      })),
    },
    {
      id: "spread",
      titleLine1: "Dispersion Angle &",
      titleLine2: "spread",
      categoryTag: "03 / 03",
      colorGradient: "bg-gradient-to-br from-[#10B981] via-[#059669] to-[#047857]",
      icon: <Sliders className="w-3.5 h-3.5" />,
      headerTitle: "Spread Angle",
      headerSubtitle: "launch cone angle in degrees",
      headerEmoji: "📐",
      rows: SPREAD_OPTIONS.map((s) => ({
        id: `spr-${s.spread}`,
        label: s.label,
        spec: s.spec,
        thumbnail: (
          <span className="text-[10px] font-mono font-bold px-1.5 py-0.5 rounded bg-zinc-200 dark:bg-zinc-800 text-zinc-700 dark:text-zinc-300">
            {s.spread}°
          </span>
        ),
        isSelected: customProps.spread === s.spread,
        onSelect: () => onChange((p) => ({ ...p, spread: s.spread })),
      })),
    },
  ];

  return (
    <PlaygroundStudio
      steps={steps}
      className={className}
      hidePreview={hidePreview}
      onReset={() => onChange(DEFAULT_CONFETTI_PROPS)}
      onViewCode={onViewCode}
    />
  );
}
