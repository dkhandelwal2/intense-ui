import React from "react";
import { ComponentDocData } from "./types";
import { COLOR_GRID_EXAMPLES } from "@/components/showcases/color-grid/constants";

export { COLOR_GRID_EXAMPLES };

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
        { prop: "onClear", type: "() => void", defaultValue: "-", description: "Callback triggered by the reset button to restore default baseline." },
        { prop: "colors", type: "string[]", defaultValue: "DEFAULT_PALETTE", description: "Array of color swatches available for selection." },
        { prop: "size", type: '"sm" | "md" | "lg"', defaultValue: '"md"', description: "Dimensions scale for swatch circles." },
        { prop: "orientation", type: '"horizontal" | "vertical"', defaultValue: '"horizontal"', description: "Arrangement axis for the swatch container." },
        { prop: "showCustomPicker", type: "boolean", defaultValue: "false", description: "Display eye dropper and native color picker button." },
        { prop: "draggable", type: "boolean", defaultValue: "false", description: "Enable drag and drop reordering of palette swatches." },
        { prop: "columns", type: "number", defaultValue: "-", description: "Multi-row grid layout with explicit column count." },
      ],
    },
  ],
};
