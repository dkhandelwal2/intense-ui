"use client";

import React from "react";
import {
  Sparkles,
  Settings2,
  Palette,
  Maximize2,
  Layers,
} from "lucide-react";
import { PlaygroundStudio, PlaygroundStudioStepData } from "./core";
import { ProgressCustomProps, DEFAULT_PROGRESS_PROPS } from "@/components/showcases/progress/types";

export interface ProgressPlaygroundStudioProps {
  customProps: ProgressCustomProps;
  onChange: React.Dispatch<React.SetStateAction<ProgressCustomProps>>;
  className?: string;
  hidePreview?: boolean;
  onViewCode?: () => void;
}

const PROGRESS_TYPES: Array<{
  id: ProgressCustomProps["type"];
  label: string;
  spec: string;
  emoji: string;
}> = [
  { id: "linear", label: "Linear Bar", spec: "Standard linear progress bar", emoji: "📏" },
  { id: "circular", label: "Circular Ring", spec: "360° circular progress ring", emoji: "⭕" },
  { id: "semicircle", label: "Semicircle Gauge", spec: "180° arched speedometer gauge", emoji: "🧭" },
  { id: "buffer", label: "Streaming Buffer", spec: "Dual-track media player loader", emoji: "⏳" },
  { id: "shimmer", label: "Shimmer Wave", spec: "Continuous glowing light beam", emoji: "✨" },
  { id: "capsule", label: "Loaded % Inside", spec: "Pill capsule with inverted text", emoji: "💊" },
];

const COLOR_OPTIONS = [
  { id: "primary" as const, label: "Theme Primary", hex: undefined, color: "bg-[var(--theme-primary)]" },
  { id: "success" as const, label: "Emerald Success", hex: "#10b981", color: "bg-emerald-500" },
  { id: "danger" as const, label: "Rose Danger", hex: "#f43f5e", color: "bg-rose-500" },
  { id: "warning" as const, label: "Amber Warning", hex: "#f59e0b", color: "bg-amber-500" },
  { id: "info" as const, label: "Sky Info", hex: "#0ea5e9", color: "bg-sky-500" },
  { id: "primary" as const, label: "Neon Fuchsia", hex: "#d946ef", color: "bg-fuchsia-500" },
];

const SIZES = [
  { id: "sm" as const, label: "Small (sm)", spec: "Compact 6px height" },
  { id: "md" as const, label: "Medium (md)", spec: "Standard 10px height" },
  { id: "lg" as const, label: "Large (lg)", spec: "Spacious 16px height" },
];

export function ProgressPlaygroundStudio({
  customProps,
  onChange,
  className,
  hidePreview = false,
  onViewCode,
}: ProgressPlaygroundStudioProps) {
  const steps: PlaygroundStudioStepData[] = [
    {
      id: "type",
      titleLine1: "Variant &",
      titleLine2: "style",
      categoryTag: "01 / 04",
      colorGradient: "bg-gradient-to-br from-[#10B981] to-[#047857]",
      icon: <Layers className="w-3.5 h-3.5" />,
      headerTitle: "Progress Variant",
      headerSubtitle: "linear, circular ring, gauge & shimmer styles",
      headerEmoji: "📊",
      rows: PROGRESS_TYPES.map((t) => ({
        id: `type-${t.id}`,
        label: t.label,
        spec: t.spec,
        thumbnail: <span className="text-sm">{t.emoji}</span>,
        isSelected: customProps.type === t.id,
        onSelect: () => onChange((p) => ({ ...p, type: t.id })),
      })),
    },
    {
      id: "color",
      titleLine1: "Filled &",
      titleLine2: "color",
      categoryTag: "02 / 04",
      colorGradient: "bg-gradient-to-br from-[#3B82F6] to-[#1D4ED8]",
      icon: <Palette className="w-3.5 h-3.5" />,
      headerTitle: "Progress Color",
      headerSubtitle: "theme tokens & custom hex fills",
      headerEmoji: "🎨",
      rows: COLOR_OPTIONS.map((c, idx) => ({
        id: `color-${idx}-${c.label}`,
        label: c.label,
        spec: c.hex ? c.hex : "CSS token",
        thumbnail: <span className={`w-3.5 h-3.5 rounded-full ${c.color}`} />,
        isSelected: c.hex ? customProps.fillColor === c.hex : (!customProps.fillColor && customProps.variant === c.id),
        onSelect: () => onChange((p) => ({ ...p, fillColor: c.hex, variant: c.id })),
      })),
    },
    {
      id: "size",
      titleLine1: "Scale &",
      titleLine2: "dimensions",
      categoryTag: "03 / 04",
      colorGradient: "bg-gradient-to-br from-[#8B5CF6] to-[#6D28D9]",
      icon: <Maximize2 className="w-3.5 h-3.5" />,
      headerTitle: "Track Dimensions",
      headerSubtitle: "calibrated height scale tiers",
      headerEmoji: "📐",
      rows: SIZES.map((sz) => ({
        id: `size-${sz.id}`,
        label: sz.label,
        spec: sz.spec,
        thumbnail: <span className="text-xs font-mono font-bold uppercase">{sz.id}</span>,
        isSelected: customProps.size === sz.id,
        onSelect: () => onChange((p) => ({ ...p, size: sz.id })),
      })),
    },
    {
      id: "features",
      titleLine1: "Layout &",
      titleLine2: "features",
      categoryTag: "04 / 04",
      colorGradient: "bg-gradient-to-br from-[#EC4899] to-[#BE185D]",
      icon: <Settings2 className="w-3.5 h-3.5" />,
      headerTitle: "Features & Toggles",
      headerSubtitle: "stripes, indeterminate & label controls",
      headerEmoji: "⚙️",
      rows: [
        {
          id: "toggle-show-value",
          label: "Show Percentage Value",
          spec: "Render live value readout text",
          thumbnail: <Sparkles className="w-3.5 h-3.5 text-zinc-500" />,
          actionType: "toggle" as const,
          toggleChecked: customProps.showValue,
          onToggleChange: (v) => onChange((p) => ({ ...p, showValue: v })),
          onSelect: () => onChange((p) => ({ ...p, showValue: !p.showValue })),
        },
        {
          id: "toggle-striped",
          label: "Barbershop Stripes",
          spec: "Diagonal textured pattern",
          thumbnail: <span className="text-xs font-mono">💈</span>,
          actionType: "toggle" as const,
          toggleChecked: customProps.striped,
          onToggleChange: (v) => onChange((p) => ({ ...p, striped: v })),
          onSelect: () => onChange((p) => ({ ...p, striped: !p.striped })),
        },
        {
          id: "toggle-indeterminate",
          label: "Indeterminate Beacon",
          spec: "Infinite wave for unknown duration",
          thumbnail: <span className="text-xs font-mono">🌊</span>,
          actionType: "toggle" as const,
          toggleChecked: customProps.indeterminate,
          onToggleChange: (v) => onChange((p) => ({ ...p, indeterminate: v })),
          onSelect: () => onChange((p) => ({ ...p, indeterminate: !p.indeterminate })),
        },
      ],
    },
  ];

  return (
    <PlaygroundStudio
      steps={steps}
      onReset={() => onChange(DEFAULT_PROGRESS_PROPS)}
      onViewCode={onViewCode}
      className={className}
      hidePreview={hidePreview}
    />
  );
}
