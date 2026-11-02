import { ColorGridCustomProps } from "./types";

export function generateColorGridCode(props: ColorGridCustomProps): string {
  const parts: string[] = [
    "value={color}",
    "onChange={setColor}",
    'defaultValue="var(--theme-primary)"',
    'onClear={() => setColor("var(--theme-primary)")}',
  ];

  if (props.size !== "md") parts.push(`size="${props.size}"`);
  if (props.orientation !== "horizontal") parts.push(`orientation="${props.orientation}"`);
  if (props.showCustomPicker) parts.push(`showCustomPicker`);
  if (props.draggable) parts.push(`draggable`);
  if (props.columns) parts.push(`columns={${props.columns}}`);

  return `"use client";

import { useState } from "react";
import { ColorGrid } from "@/components/ui/color-grid";

export default function ColorGridDemo() {
  const [color, setColor] = useState("${props.value}");

  return (
    <div className="flex flex-col items-center gap-6 p-8">
      <ColorGrid ${parts.join(" ")} />
      <div
        className="w-24 h-10 rounded-xl border border-border shadow-sm transition-colors"
        style={{ backgroundColor: color }}
      />
    </div>
  );
}`;
}
