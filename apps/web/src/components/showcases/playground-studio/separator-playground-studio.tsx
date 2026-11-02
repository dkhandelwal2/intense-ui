"use client";

import React from "react";
import { Sparkles, Compass, SplitSquareVertical } from "lucide-react";
import { PlaygroundStudio, PlaygroundStudioStepData } from "./core";
import { SeparatorCustomProps, DEFAULT_SEPARATOR_PROPS } from "@/components/showcases/separator/types";

export interface SeparatorPlaygroundStudioProps {
  customProps: SeparatorCustomProps;
  onChange: React.Dispatch<React.SetStateAction<SeparatorCustomProps>>;
  className?: string;
  hidePreview?: boolean;
  onViewCode?: () => void;
}

const SEPARATOR_VARIANTS = [
  { id: "gradient" as const, label: "Gradient Hairline", spec: "Fades at both edges via theme primary" },
  { id: "subtle" as const, label: "Subtle Solid", spec: "10% opacity minimalist line" },
  { id: "dashed" as const, label: "Dashed Border", spec: "Dashed pattern for cutoffs and cards" },
];

export function SeparatorPlaygroundStudio({
  customProps,
  onChange,
  className,
  hidePreview = false,
  onViewCode,
}: SeparatorPlaygroundStudioProps) {
  const steps: PlaygroundStudioStepData[] = [
    {
      id: "styling",
      titleLine1: "Variant &",
      titleLine2: "textures",
      categoryTag: "01 / 02",
      colorGradient: "bg-gradient-to-br from-[#6366F1] via-[#4F46E5] to-[#4338CA]",
      icon: <Sparkles className="w-3.5 h-3.5" />,
      headerTitle: "Visual Styles",
      headerSubtitle: "hairlines & patterns",
      headerEmoji: "✨",
      rows: SEPARATOR_VARIANTS.map((v) => ({
        id: `var-${v.id}`,
        label: v.label,
        spec: v.spec,
        thumbnail: (
          <span className="text-[10px] font-mono font-bold px-1.5 py-0.5 rounded bg-zinc-200 dark:bg-zinc-800 text-zinc-700 dark:text-zinc-300 uppercase">
            {v.id}
          </span>
        ),
        isSelected: customProps.variant === v.id,
        onSelect: () => onChange((p) => ({ ...p, variant: v.id })),
      })),
    },
    {
      id: "axis-and-glow",
      titleLine1: "Axis &",
      titleLine2: "illumination",
      categoryTag: "02 / 02",
      colorGradient: "bg-gradient-to-br from-[#EC4899] via-[#DB2777] to-[#BE185D]",
      icon: <Compass className="w-3.5 h-3.5" />,
      headerTitle: "Axis & Aura",
      headerSubtitle: "orientation and ambient glow",
      headerEmoji: "🌟",
      rows: [
        {
          id: "toggle-vertical",
          label: "Vertical Orientation",
          spec: "Orient line vertically between inline items",
          thumbnail: <SplitSquareVertical className="w-4 h-4 text-zinc-500" />,
          actionType: "toggle" as const,
          toggleChecked: customProps.orientation === "vertical",
          onToggleChange: (checked: boolean) =>
            onChange((p) => ({ ...p, orientation: checked ? "vertical" : "horizontal" })),
          onSelect: () =>
            onChange((p) => ({
              ...p,
              orientation: p.orientation === "vertical" ? "horizontal" : "vertical",
            })),
        },
        {
          id: "toggle-glow",
          label: "Neon Aura Glow",
          spec: "Add ambient glowing box-shadow to separator",
          thumbnail: <Sparkles className="w-4 h-4 text-zinc-500" />,
          actionType: "toggle" as const,
          toggleChecked: customProps.glow,
          onToggleChange: (checked: boolean) =>
            onChange((p) => ({ ...p, glow: checked })),
          onSelect: () =>
            onChange((p) => ({ ...p, glow: !p.glow })),
        },
      ],
    },
  ];

  return (
    <PlaygroundStudio
      steps={steps}
      onReset={() => onChange(DEFAULT_SEPARATOR_PROPS)}
      onViewCode={onViewCode}
      hidePreview={hidePreview}
      className={className}
    />
  );
}
