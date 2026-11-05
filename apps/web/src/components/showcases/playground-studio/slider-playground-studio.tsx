"use client";

import React from "react";
import { Sparkles, Settings2, Palette, Sliders, Eye, Hash, Volume2, Ban } from "lucide-react";
import { PlaygroundStudio, PlaygroundStudioStepData } from "./core";
import { SliderCustomProps, DEFAULT_SLIDER_PROPS } from "@/components/showcases/slider/types";

export interface SliderPlaygroundStudioProps {
  customProps: SliderCustomProps;
  onChange: React.Dispatch<React.SetStateAction<SliderCustomProps>>;
  className?: string;
  hidePreview?: boolean;
  onViewCode?: () => void;
}

const COLOR_OPTIONS = [
  { id: "primary" as const, label: "Theme Primary", hex: undefined, color: "bg-[var(--theme-primary)]" },
  { id: "success" as const, label: "Emerald Success", hex: "#10b981", color: "bg-emerald-500" },
  { id: "danger" as const, label: "Rose Danger", hex: "#f43f5e", color: "bg-rose-500" },
  { id: "warning" as const, label: "Amber Warning", hex: "#f59e0b", color: "bg-amber-500" },
  { id: "info" as const, label: "Sky Info", hex: "#0ea5e9", color: "bg-sky-500" },
  { id: "primary" as const, label: "Violet Purple", hex: "#8b5cf6", color: "bg-violet-500" },
  { id: "primary" as const, label: "Neon Fuchsia", hex: "#d946ef", color: "bg-fuchsia-500" },
];

const ANIMATIONS: Array<{ id: SliderCustomProps["thumbAnimation"]; label: string; spec: string; thumb: React.ReactNode }> = [
  { id: "none", label: "Static Thumb", spec: "Standard thumb without fx", thumb: <span className="w-2.5 h-2.5 rounded-full border border-zinc-400" /> },
  { id: "pulse", label: "Pulse Dot", spec: "Continuous radiating wave", thumb: <span className="w-2.5 h-2.5 rounded-full bg-sky-400 animate-pulse" /> },
  { id: "glow", label: "Glow Aura", spec: "Neon glowing aura shadow", thumb: <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 shadow-[0_0_8px_rgba(52,211,153,0.8)]" /> },
  { id: "scale", label: "Scale on Hover", spec: "Expands dynamically on interaction", thumb: <span className="w-3 h-3 rounded-full bg-violet-400" /> },
];

export function SliderPlaygroundStudio({
  customProps, onChange, className, hidePreview = false, onViewCode,
}: SliderPlaygroundStudioProps) {
  const steps: PlaygroundStudioStepData[] = [
    {
      id: "variant", titleLine1: "Filled &", titleLine2: "color",
      categoryTag: "01 / 03", colorGradient: "bg-gradient-to-br from-[#3B82F6] to-[#1D4ED8]",
      icon: <Palette className="w-3.5 h-3.5" />, headerTitle: "Filled Slider Color", headerSubtitle: "props-driven track fill & thumb", headerEmoji: "🎨",
      rows: COLOR_OPTIONS.map((c, idx) => ({
        id: `color-${idx}-${c.label}`, label: c.label, spec: c.hex ? c.hex : "CSS token",
        thumbnail: <span className={`w-3.5 h-3.5 rounded-full ${c.color}`} />,
        isSelected: c.hex ? customProps.fillColor === c.hex : (!customProps.fillColor && customProps.variant === c.id),
        onSelect: () => onChange((p) => ({ ...p, fillColor: c.hex, variant: c.id })),
      })),
    },
    {
      id: "animation", titleLine1: "Dot &", titleLine2: "fx",
      categoryTag: "02 / 03", colorGradient: "bg-gradient-to-br from-[#8B5CF6] to-[#6D28D9]",
      icon: <Sparkles className="w-3.5 h-3.5" />, headerTitle: "Thumb Animation", headerSubtitle: "dynamic thumb reactions", headerEmoji: "✨",
      rows: ANIMATIONS.map((a) => ({
        id: a.id, label: a.label, spec: a.spec, thumbnail: a.thumb,
        isSelected: customProps.thumbAnimation === a.id,
        onSelect: () => onChange((p) => ({ ...p, thumbAnimation: a.id })),
      })),
    },
    {
      id: "features", titleLine1: "Layout &", titleLine2: "features",
      categoryTag: "03 / 03", colorGradient: "bg-gradient-to-br from-[#EC4899] to-[#BE185D]",
      icon: <Settings2 className="w-3.5 h-3.5" />, headerTitle: "Layout & Controls", headerSubtitle: "range, tooltip, input & orientation", headerEmoji: "⚙️",
      rows: [
        {
          id: "toggle-range", label: "Dual Range Slider", spec: "Double thumb dual-value selector",
          thumbnail: <Sliders className="w-3.5 h-3.5 text-zinc-500" />,
          actionType: "toggle" as const, toggleChecked: customProps.isRange,
          onToggleChange: (v) => onChange((p) => ({ ...p, isRange: v })),
          onSelect: () => onChange((p) => ({ ...p, isRange: !p.isRange })),
        },
        {
          id: "toggle-vertical", label: "Vertical Orientation", spec: "Rotate track to vertical layout",
          thumbnail: <Sliders className="w-3.5 h-3.5 text-zinc-500 rotate-90" />,
          actionType: "toggle" as const, toggleChecked: customProps.orientation === "vertical",
          onToggleChange: (v) => onChange((p) => ({ ...p, orientation: v ? "vertical" : "horizontal" })),
          onSelect: () => onChange((p) => ({ ...p, orientation: p.orientation === "vertical" ? "horizontal" : "vertical" })),
        },
        {
          id: "toggle-tooltip", label: "Floating Tooltip", spec: "Display value tooltip on thumb",
          thumbnail: <Eye className="w-3.5 h-3.5 text-zinc-500" />,
          actionType: "toggle" as const, toggleChecked: customProps.tooltip,
          onToggleChange: (v) => onChange((p) => ({ ...p, tooltip: v })),
          onSelect: () => onChange((p) => ({ ...p, tooltip: !p.tooltip })),
        },
        {
          id: "toggle-input", label: "Inline Number Input", spec: "Bidirectional numerical text field",
          thumbnail: <Hash className="w-3.5 h-3.5 text-zinc-500" />,
          actionType: "toggle" as const, toggleChecked: customProps.showInput,
          onToggleChange: (v) => onChange((p) => ({ ...p, showInput: v })),
          onSelect: () => onChange((p) => ({ ...p, showInput: !p.showInput })),
        },
        {
          id: "toggle-icons", label: "Left & Right Icons", spec: "Volume min/max shortcut icons",
          thumbnail: <Volume2 className="w-3.5 h-3.5 text-zinc-500" />,
          actionType: "toggle" as const, toggleChecked: customProps.withIcons,
          onToggleChange: (v) => onChange((p) => ({ ...p, withIcons: v })),
          onSelect: () => onChange((p) => ({ ...p, withIcons: !p.withIcons })),
        },
        {
          id: "toggle-disabled", label: "Disabled State", spec: "Lock thumb dragging and dim track",
          thumbnail: <Ban className="w-3.5 h-3.5 text-zinc-500" />,
          actionType: "toggle" as const, toggleChecked: customProps.disabled,
          onToggleChange: (v) => onChange((p) => ({ ...p, disabled: v })),
          onSelect: () => onChange((p) => ({ ...p, disabled: !p.disabled })),
        },
      ],
    },
  ];

  return (
    <PlaygroundStudio
      steps={steps}
      onReset={() => onChange(DEFAULT_SLIDER_PROPS)}
      onViewCode={onViewCode}
      className={className}
      hidePreview={hidePreview}
    />
  );
}
