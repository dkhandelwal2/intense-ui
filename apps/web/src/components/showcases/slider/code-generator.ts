import { SliderCustomProps } from "./types";

export function generateSliderCode(props: SliderCustomProps): string {
  if (props.isRange) {
    const rangeProps: string[] = ["value={range}", "onChange={setRange}"];
    if (props.min !== 0) rangeProps.push(`min={${props.min}}`);
    if (props.max !== 100) rangeProps.push(`max={${props.max}}`);
    if (props.step !== 1) rangeProps.push(`step={${props.step}}`);
    if (props.fillColor) {
      rangeProps.push(`fillColor="${props.fillColor}"`);
    } else if (props.variant !== "primary") {
      rangeProps.push(`variant="${props.variant}"`);
    }
    if (props.tooltip) rangeProps.push("tooltip");
    if (props.disabled) rangeProps.push("disabled");

    return `"use client";

import { useState } from "react";
import { RangeSlider } from "@/components/ui/slider";

export default function RangeSliderDemo() {
  const [range, setRange] = useState<[number, number]>([${props.rangeValue[0]}, ${props.rangeValue[1]}]);

  return (
    <div className="w-full max-w-sm space-y-3 p-6">
      <RangeSlider ${rangeProps.join(" ")} />
    </div>
  );
}`;
  }

  const parts: string[] = ["value={value}", "onChange={setValue}"];
  if (props.min !== 0) parts.push(`min={${props.min}}`);
  if (props.max !== 100) parts.push(`max={${props.max}}`);
  if (props.step !== 1) parts.push(`step={${props.step}}`);
  if (props.fillColor) {
    parts.push(`fillColor="${props.fillColor}"`);
  } else if (props.variant !== "primary") {
    parts.push(`variant="${props.variant}"`);
  }
  if (props.orientation === "vertical") parts.push('orientation="vertical"');
  if (props.thumbAnimation !== "none") parts.push(`thumbAnimation="${props.thumbAnimation}"`);
  if (props.tooltip) parts.push("tooltip");
  if (props.showInput) parts.push("showInput");
  if (props.disabled) parts.push("disabled");
  if (props.withIcons) {
    parts.push('leftIcon={<Volume1 className="w-4 h-4" />}');
    parts.push('rightIcon={<Volume2 className="w-4 h-4" />}');
  }

  const iconImport = props.withIcons ? '\nimport { Volume1, Volume2 } from "lucide-react";' : "";

  return `"use client";

import { useState } from "react";
import { Slider } from "@/components/ui/slider";${iconImport}

export default function SliderDemo() {
  const [value, setValue] = useState(${props.value});

  return (
    <div className="w-full max-w-sm flex items-center justify-center p-6">
      <Slider ${parts.join(" ")} />
    </div>
  );
}`;
}
