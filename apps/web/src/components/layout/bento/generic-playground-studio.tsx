"use client";

import React, { useMemo } from "react";
import { Palette, Maximize2, Activity, Sparkles } from "lucide-react";
import {
  PlaygroundStudio,
  PlaygroundStudioStepData,
} from "@/components/showcases/common";
import { GenericCustomProps, GenericPlaygroundStudioProps } from "./types";
import {
  GENERIC_PALETTE_COLORS,
  GENERIC_SIZE_OPTIONS,
  GENERIC_SPRING_OPTIONS,
} from "./constants";

export function GenericPlaygroundStudio({
  title,
  customProps,
  onChange,
  onViewCode,
  className,
  hidePreview = true,
}: GenericPlaygroundStudioProps) {
  const steps: PlaygroundStudioStepData[] = useMemo(
    () => [
      {
        id: "palette",
        titleLine1: "Theme",
        titleLine2: "colors",
        categoryTag: "01 / 04",
        colorGradient: "bg-gradient-to-br from-[#EC4899] via-[#DB2777] to-[#BE185D]",
        icon: <Palette className="w-3.5 h-3.5" />,
        headerTitle: "Palette",
        headerSubtitle: "storehouse",
        headerEmoji: "🎨",
        rows: GENERIC_PALETTE_COLORS.map((c) => ({
          id: `color-${c.name}`,
          label: c.name,
          spec: c.hex,
          thumbnail: (
            <span
              className="w-3.5 h-3.5 rounded-full inline-block shadow-xs border border-white/20"
              style={{ backgroundColor: c.hex }}
            />
          ),
          isSelected: customProps.color === c.hex,
          onSelect: () => onChange((prev) => ({ ...prev, color: c.hex })),
        })),
      },
      {
        id: "size",
        titleLine1: "Size &",
        titleLine2: "scaling",
        categoryTag: "02 / 04",
        colorGradient: "bg-gradient-to-br from-[#3B82F6] via-[#2563EB] to-[#1D4ED8]",
        icon: <Maximize2 className="w-3.5 h-3.5" />,
        headerTitle: "Scaling",
        headerSubtitle: "viewport",
        headerEmoji: "📐",
        rows: GENERIC_SIZE_OPTIONS.map((opt) => ({
          id: `size-${opt.id}`,
          label: opt.label,
          spec: opt.spec,
          thumbnail: <span className="font-mono text-xs font-bold">{opt.badge}</span>,
          isSelected: customProps.size === opt.id,
          onSelect: () => onChange((prev) => ({ ...prev, size: opt.id })),
        })),
      },
      {
        id: "physics",
        titleLine1: "Spring",
        titleLine2: "physics",
        categoryTag: "03 / 04",
        colorGradient: "bg-gradient-to-br from-[#10B981] via-[#059669] to-[#047857]",
        icon: <Activity className="w-3.5 h-3.5" />,
        headerTitle: "Engine",
        headerSubtitle: "keyframes",
        headerEmoji: "⚡",
        rows: GENERIC_SPRING_OPTIONS.map((opt) => ({
          id: `spring-${opt.id}`,
          label: opt.label,
          spec: opt.spec,
          thumbnail: <span className="text-xs">⚡</span>,
          isSelected: customProps.spring === opt.id,
          onSelect: () => onChange((prev) => ({ ...prev, spring: opt.id })),
        })),
      },
      {
        id: "effects",
        titleLine1: "Visual",
        titleLine2: "effects",
        categoryTag: "04 / 04",
        colorGradient: "bg-gradient-to-br from-[#F59E0B] via-[#D97706] to-[#B45309]",
        icon: <Sparkles className="w-3.5 h-3.5" />,
        headerTitle: "Effects",
        headerSubtitle: "materials",
        headerEmoji: "✨",
        rows: [
          {
            id: "fx-glow",
            label: "Ambient Bloom",
            spec: "Volumetric neon atmospheric glow",
            thumbnail: <span className="text-xs">💡</span>,
            actionType: "toggle" as const,
            toggleChecked: customProps.glow,
            onToggleChange: (val: boolean) =>
              onChange((prev) => ({ ...prev, glow: val })),
            onSelect: () =>
              onChange((prev) => ({ ...prev, glow: !prev.glow })),
          },
          {
            id: "fx-shadow",
            label: "Elevated Shadow",
            spec: "Layered spatial drop shadow",
            thumbnail: <span className="text-xs">🌑</span>,
            actionType: "toggle" as const,
            toggleChecked: customProps.shadow,
            onToggleChange: (val: boolean) =>
              onChange((prev) => ({ ...prev, shadow: val })),
            onSelect: () =>
              onChange((prev) => ({ ...prev, shadow: !prev.shadow })),
          },
        ],
      },
    ],
    [customProps, onChange]
  );

  return (
    <PlaygroundStudio
      steps={steps}
      hidePreview={hidePreview}
      description={`Interact with props below to customize your ${title.toLowerCase()} in real time.`}
      onViewCode={onViewCode}
      className={className}
    />
  );
}

export function generateGenericCode(
  title: string,
  slug?: string,
  props?: GenericCustomProps,
  fallbackCode?: string
): string {
  if (fallbackCode) return fallbackCode;
  const componentName = title.replace(/\s+/g, "");
  const componentSlug = (slug || title).toLowerCase().replace(/\s+/g, "-");
  const p = props || { color: "#EC4899", size: "md", spring: "fluid", glow: false, shadow: true };
  return `import React from "react";
import { ${componentName} } from "@/components/ui/${componentSlug}";

export default function ${componentName}CustomDemo() {
  return (
    <${componentName}
      color="${p.color}"
      size="${p.size}"
      physics="${p.spring}"
      glow={${p.glow}}
      shadow={${p.shadow}}
    />
  );
}`;
}
