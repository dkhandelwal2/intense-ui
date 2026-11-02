import React from "react";
import { ComponentDocData } from "./types";

export const COLOR_GRID_USAGE = `"use client";

import { useState } from "react";
import { ColorGrid } from "@/components/ui/color-grid";

export default function ColorGridDemo() {
  const [color, setColor] = useState("var(--theme-primary)");

  return (
    <div className="flex flex-col items-center gap-6 p-8">
      <ColorGrid
        value={color}
        onChange={setColor}
        defaultValue="var(--theme-primary)"
        onClear={() => setColor("var(--theme-primary)")}
        showCustomPicker
      />
      <div
        className="w-24 h-10 rounded-xl border border-border shadow-sm transition-colors"
        style={{ backgroundColor: color }}
      />
    </div>
  );
}`;

export const COLOR_GRID_EXAMPLES = [
  {
    id: "basic",
    label: "Basic Swatches",
    emoji: "🎨",
    code: `<ColorGrid value={color} onChange={setColor} defaultValue="var(--theme-primary)" onClear={() => setColor("var(--theme-primary)")} showCustomPicker />`,
  },
  {
    id: "vertical",
    label: "Vertical Layout",
    emoji: "📐",
    code: `<ColorGrid orientation="vertical" value={color} onChange={setColor} defaultValue="var(--theme-primary)" onClear={() => setColor("var(--theme-primary)")} />`,
  },
  {
    id: "sizes",
    label: "Size Variants",
    emoji: "📏",
    code: `<div className="space-y-4">
  <ColorGrid size="sm" value={color} onChange={setColor} defaultValue="var(--theme-primary)" onClear={() => setColor("var(--theme-primary)")} />
  <ColorGrid size="md" value={color} onChange={setColor} defaultValue="var(--theme-primary)" onClear={() => setColor("var(--theme-primary)")} />
  <ColorGrid size="lg" value={color} onChange={setColor} defaultValue="var(--theme-primary)" onClear={() => setColor("var(--theme-primary)")} />
</div>`,
  },
  {
    id: "custom-picker",
    label: "Custom Picker & EyeDropper",
    emoji: "💧",
    code: `<ColorGrid value={color} onChange={setColor} defaultValue="var(--theme-primary)" onClear={() => setColor("var(--theme-primary)")} showCustomPicker={true} />`,
  },
  {
    id: "draggable",
    label: "Draggable Reorder",
    emoji: "✋",
    code: `<ColorGrid value={color} onChange={setColor} defaultValue="var(--theme-primary)" onClear={() => setColor("var(--theme-primary)")} draggable={true} />`,
  },
  {
    id: "grid-layout",
    label: "Responsive Columns",
    emoji: "▦",
    code: `<ColorGrid columns={3} value={color} onChange={setColor} defaultValue="var(--theme-primary)" onClear={() => setColor("var(--theme-primary)")} />`,
  },
];

export const colorGridDoc: ComponentDocData = {
  usageCode: COLOR_GRID_USAGE,
  codeContent: COLOR_GRID_USAGE,
  codes: COLOR_GRID_EXAMPLES.reduce((acc, ex) => {
    acc[ex.id] = ex.code;
    return acc;
  }, {} as Record<string, string>),
  tocItems: COLOR_GRID_EXAMPLES.map((ex) => ({
    id: ex.id,
    label: ex.label,
    icon: (
      <span role="img" aria-label={ex.label} className="inline-flex items-center justify-center select-none leading-none">
        {ex.emoji}
      </span>
    ),
  })),
  dependencies: [
    { name: "framer-motion", command: "npm install framer-motion" },
    { name: "lucide-react", command: "npm install lucide-react" },
    { name: "clsx", command: "npm install clsx" },
    { name: "tailwind-merge", command: "npm install tailwind-merge" },
  ],
  propGroups: [
    {
      title: "ColorGrid / ColorPalette Props",
      props: [
        { prop: "value", type: "string", defaultValue: '"var(--theme-primary)"', description: "Currently selected color (hex or CSS variable string)." },
        { prop: "defaultValue", type: "string", defaultValue: "-", description: "Baseline color against which modifications trigger the reset button." },
        { prop: "onChange", type: "(color: string) => void", defaultValue: "-", description: "Callback triggered whenever a swatch or custom hex is picked." },
        { prop: "onClear", type: "() => void", defaultValue: "-", description: "Callback invoked when clicking the reset button to restore default color." },
        { prop: "colors", type: "string[]", defaultValue: "DEFAULT_COLORS", description: "Array of color swatches available in the palette." },
        { prop: "orientation", type: '"horizontal" | "vertical"', defaultValue: '"horizontal"', description: "Direction in which swatches are aligned." },
        { prop: "size", type: '"sm" | "md" | "lg"', defaultValue: '"md"', description: "Scale of individual color swatches and spacing." },
        { prop: "showCustomPicker", type: "boolean", defaultValue: "false", description: "Enables hex color input and native eyedropper button." },
        { prop: "draggable", type: "boolean", defaultValue: "false", description: "Enables drag handle to reorder swatches." },
        { prop: "columns", type: "number", defaultValue: "-", description: "Organizes swatches into fixed column grid count." },
      ],
    },
  ],
};
