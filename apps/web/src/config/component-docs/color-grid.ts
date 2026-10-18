import { ComponentDocData } from "./types";

export const COLOR_GRID_USAGE = `"use client";

import { useState } from "react";
import { ColorGrid } from "@/components/ui/color-grid";

export default function ColorGridDemo() {
  const [color, setColor] = useState("var(--theme-primary)");

  return (
    <div className="flex flex-col items-center gap-4 p-6">
      <ColorGrid
        value={color}
        onChange={setColor}
        showCustomPicker
      />
      <div
        className="w-32 h-10 rounded-xl border border-zinc-200 dark:border-zinc-800 transition-colors"
        style={{ backgroundColor: color }}
      />
    </div>
  );
}`;

export const COLOR_GRID_EXAMPLES = [
  {
    id: "basic",
    label: "Basic",
    code: `"use client";

import { useState } from "react";
import { ColorGrid } from "@/components/ui/color-grid";

export default function BasicColorGrid() {
  const [selectedColor, setSelectedColor] = useState("var(--theme-primary)");

  return (
    <ColorGrid
      value={selectedColor}
      onChange={setSelectedColor}
      showCustomPicker
    />
  );
}`,
  },
  {
    id: "vertical",
    label: "Vertical Layout",
    code: `"use client";

import { useState } from "react";
import { ColorGrid } from "@/components/ui/color-grid";

export default function VerticalColorGrid() {
  const [selectedColor, setSelectedColor] = useState("#3b82f6");

  return (
    <ColorGrid
      orientation="vertical"
      value={selectedColor}
      onChange={setSelectedColor}
      columns={2}
    />
  );
}`,
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
  })),
  dependencies: [
    { name: "framer-motion", command: "npm install framer-motion" },
    { name: "lucide-react", command: "npm install lucide-react" },
    { name: "clsx", command: "npm install clsx" },
    { name: "tailwind-merge", command: "npm install tailwind-merge" },
  ],
  propGroups: [
    {
      title: "ColorGrid / ColorPalette",
      props: [
        {
          prop: "value",
          type: "string",
          defaultValue: "-",
          description: "Currently selected color (hex or CSS var).",
        },
        {
          prop: "onChange",
          type: "(color: string) => void",
          defaultValue: "-",
          description: "Callback fired when a swatch or custom color is picked.",
        },
        {
          prop: "colors",
          type: "string[]",
          defaultValue: "DEFAULT_COLORS",
          description: "Custom list of color swatches to display.",
        },
        {
          prop: "orientation",
          type: '"horizontal" | "vertical"',
          defaultValue: '"horizontal"',
          description: "Layout alignment of swatches.",
        },
        {
          prop: "showCustomPicker",
          type: "boolean",
          defaultValue: "false",
          description: "Enables hex color input and native dropper button.",
        },
      ],
    },
  ],
};
