"use client";

import React from "react";
import { Sliders, Settings2, Hash, Ban } from "lucide-react";
import { PlaygroundStudio, PlaygroundStudioStepData } from "./core";
import { SliderCustomProps, DEFAULT_SLIDER_PROPS } from "@/components/showcases/slider/types";

export interface SliderPlaygroundStudioProps {
  customProps: SliderCustomProps;
  onChange: React.Dispatch<React.SetStateAction<SliderCustomProps>>;
  className?: string;
  hidePreview?: boolean;
  onViewCode?: () => void;
}

const RANGE_PRESETS = [
  { min: 0, max: 100, label: "Standard Range", spec: "0 to 100 unit interval" },
  { min: 0, max: 50, label: "Compact Scale", spec: "0 to 50 fine intervals" },
  { min: 0, max: 500, label: "Macro Spectrum", spec: "0 to 500 broad interval" },
];

export function SliderPlaygroundStudio({
  customProps,
  onChange,
  className,
  hidePreview = false,
  onViewCode,
}: SliderPlaygroundStudioProps) {
  const steps: PlaygroundStudioStepData[] = [
    {
      id: "ranges",
      titleLine1: "Track &",
      titleLine2: "limits",
      categoryTag: "01 / 02",
      colorGradient: "bg-gradient-to-br from-[#3B82F6] via-[#2563EB] to-[#1D4ED8]",
      icon: <Sliders className="w-3.5 h-3.5" />,
      headerTitle: "Scale & Boundaries",
      headerSubtitle: "min/max ranges",
      headerEmoji: "📊",
      rows: RANGE_PRESETS.map((rp) => ({
        id: `range-${rp.min}-${rp.max}`,
        label: rp.label,
        spec: rp.spec,
        thumbnail: (
          <span className="text-[10px] font-mono font-bold px-1.5 py-0.5 rounded bg-zinc-200 dark:bg-zinc-800 text-zinc-700 dark:text-zinc-300">
            {rp.min}-{rp.max}
          </span>
        ),
        isSelected: customProps.min === rp.min && customProps.max === rp.max,
        onSelect: () =>
          onChange((p) => ({
            ...p,
            min: rp.min,
            max: rp.max,
            value: Math.min(Math.max(p.value, rp.min), rp.max),
          })),
      })),
    },
    {
      id: "behavior",
      titleLine1: "Badges &",
      titleLine2: "states",
      categoryTag: "02 / 02",
      colorGradient: "bg-gradient-to-br from-[#8B5CF6] via-[#7C3AED] to-[#6D28D9]",
      icon: <Settings2 className="w-3.5 h-3.5" />,
      headerTitle: "Features & States",
      headerSubtitle: "indicator and interactivity",
      headerEmoji: "🏷️",
      rows: [
        {
          id: "toggle-badge",
          label: "Show Value Badge",
          spec: "Display live numerical indicator pill above track",
          thumbnail: <Hash className="w-4 h-4 text-zinc-500" />,
          actionType: "toggle" as const,
          toggleChecked: customProps.showValueBadge,
          onToggleChange: (checked: boolean) =>
            onChange((p) => ({ ...p, showValueBadge: checked })),
          onSelect: () =>
            onChange((p) => ({ ...p, showValueBadge: !p.showValueBadge })),
        },
        {
          id: "toggle-disabled",
          label: "Disabled State",
          spec: "Dim track and lock thumb drag events",
          thumbnail: <Ban className="w-4 h-4 text-zinc-500" />,
          actionType: "toggle" as const,
          toggleChecked: customProps.disabled,
          onToggleChange: (checked: boolean) =>
            onChange((p) => ({ ...p, disabled: checked })),
          onSelect: () =>
            onChange((p) => ({ ...p, disabled: !p.disabled })),
        },
      ],
    },
  ];

  return (
    <PlaygroundStudio
      steps={steps}
      onReset={() => onChange(DEFAULT_SLIDER_PROPS)}
      onViewCode={onViewCode}
      hidePreview={hidePreview}
      className={className}
    />
  );
}
