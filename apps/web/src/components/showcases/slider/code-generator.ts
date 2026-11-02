import { SliderCustomProps } from "./types";

export function generateSliderCode(props: SliderCustomProps): string {
  const parts: string[] = ["value={value}", "onChange={setValue}"];

  if (props.min !== 0) parts.push(`min={${props.min}}`);
  if (props.max !== 100) parts.push(`max={${props.max}}`);
  if (props.disabled) parts.push(`disabled`);

  const badgeMarkup = props.showValueBadge
    ? `      <div className="flex justify-between text-sm font-medium">
        <span>Level</span>
        <span className="text-muted-foreground">{value}</span>
      </div>\n`
    : "";

  return `"use client";

import { useState } from "react";
import { Slider } from "@/components/ui/slider";

export default function SliderDemo() {
  const [value, setValue] = useState(${props.value});

  return (
    <div className="w-full max-w-sm space-y-3 p-6">
${badgeMarkup}      <Slider ${parts.join(" ")} />
    </div>
  );
}`;
}
