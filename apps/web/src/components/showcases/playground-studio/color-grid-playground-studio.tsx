"use client";

import React from "react";
import { Maximize2, LayoutGrid, Pipette, Move } from "lucide-react";
import { PlaygroundStudio, PlaygroundStudioStepData } from "./core";
import { ColorGridCustomProps, DEFAULT_COLOR_GRID_PROPS } from "@/components/showcases/color-grid/types";

export interface ColorGridPlaygroundStudioProps {
  customProps: ColorGridCustomProps;
  onChange: React.Dispatch<React.SetStateAction<ColorGridCustomProps>>;
  className?: string;
  hidePreview?: boolean;
  onViewCode?: () => void;
}

const COLOR_GRID_SIZES = [
  { id: "sm" as const, label: "Small", badge: "SM", spec: "w-5 h-5 compact swatches" },
  { id: "md" as const, label: "Medium", badge: "MD", spec: "w-6 h-6 standard palette" },
  { id: "lg" as const, label: "Large", badge: "LG", spec: "w-8 h-8 large swatches" },
];

export function ColorGridPlaygroundStudio({
  customProps,
  onChange,
  className,
  hidePreview = false,
  onViewCode,
}: ColorGridPlaygroundStudioProps) {
  const steps: PlaygroundStudioStepData[] = [
    {
      id: "sizing",
      titleLine1: "Scale &",
      titleLine2: "layout",
      categoryTag: "01 / 02",
      colorGradient: "bg-gradient-to-br from-[#EC4899] via-[#DB2777] to-[#BE185D]",
      icon: <Maximize2 className="w-3.5 h-3.5" />,
      headerTitle: "Scale & Orientation",
      headerSubtitle: "swatch dimensions & flow",
      headerEmoji: "📏",
      rows: [
        ...COLOR_GRID_SIZES.map((sz) => ({
          id: `size-${sz.id}`,
          label: `${sz.label} Scale`,
          spec: sz.spec,
          thumbnail: (
            <span className="text-[10px] font-mono font-bold px-1.5 py-0.5 rounded bg-zinc-200 dark:bg-zinc-800 text-zinc-700 dark:text-zinc-300 uppercase">
              {sz.badge}
            </span>
          ),
          isSelected: customProps.size === sz.id,
          onSelect: () => onChange((p) => ({ ...p, size: sz.id })),
        })),
        {
          id: "toggle-vertical",
          label: "Vertical Alignment",
          spec: "Stack swatches vertically instead of horizontal bar",
          thumbnail: <LayoutGrid className="w-4 h-4 text-zinc-500" />,
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
      ],
    },
    {
      id: "features",
      titleLine1: "Pickers &",
      titleLine2: "actions",
      categoryTag: "02 / 02",
      colorGradient: "bg-gradient-to-br from-[#3B82F6] via-[#2563EB] to-[#1D4ED8]",
      icon: <Pipette className="w-3.5 h-3.5" />,
      headerTitle: "Interactions & Tools",
      headerSubtitle: "picker and drag handles",
      headerEmoji: "🎨",
      rows: [
        {
          id: "toggle-custom-picker",
          label: "Custom Hex & Dropper",
          spec: "Provide + button for arbitrary hex color & native eye-dropper",
          thumbnail: <Pipette className="w-4 h-4 text-zinc-500" />,
          actionType: "toggle" as const,
          toggleChecked: customProps.showCustomPicker,
          onToggleChange: (checked: boolean) =>
            onChange((p) => ({ ...p, showCustomPicker: checked })),
          onSelect: () =>
            onChange((p) => ({ ...p, showCustomPicker: !p.showCustomPicker })),
        },
        {
          id: "toggle-draggable",
          label: "Draggable Reorder",
          spec: "Show grip handles to allow drag-and-drop swatch reordering",
          thumbnail: <Move className="w-4 h-4 text-zinc-500" />,
          actionType: "toggle" as const,
          toggleChecked: customProps.draggable,
          onToggleChange: (checked: boolean) =>
            onChange((p) => ({ ...p, draggable: checked })),
          onSelect: () =>
            onChange((p) => ({ ...p, draggable: !p.draggable })),
        },
      ],
    },
  ];

  return (
    <PlaygroundStudio
      steps={steps}
      onReset={() => onChange(DEFAULT_COLOR_GRID_PROPS)}
      onViewCode={onViewCode}
      hidePreview={hidePreview}
      className={className}
    />
  );
}
