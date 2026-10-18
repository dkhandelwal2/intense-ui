import { ComponentDocData } from "./types";

export const SLIDER_USAGE = `"use client";

import { useState } from "react";
import { Slider } from "@/components/ui/slider";

export default function SliderDemo() {
  const [volume, setVolume] = useState(50);

  return (
    <div className="w-full max-w-sm space-y-3 p-6">
      <div className="flex justify-between text-sm font-medium">
        <span>Volume</span>
        <span className="text-muted-foreground">{volume}%</span>
      </div>
      <Slider value={volume} min={0} max={100} onChange={setVolume} />
    </div>
  );
}`;

export const SLIDER_EXAMPLES = [
  {
    id: "basic",
    label: "Basic",
    code: `"use client";

import { useState } from "react";
import { Slider } from "@/components/ui/slider";

export default function BasicSlider() {
  const [val, setVal] = useState(60);

  return (
    <div className="w-full max-w-xs">
      <Slider value={val} min={0} max={100} onChange={setVal} />
    </div>
  );
}`,
  },
  {
    id: "custom-range",
    label: "Custom Range",
    code: `"use client";

import { useState } from "react";
import { Slider } from "@/components/ui/slider";

export default function CustomRangeSlider() {
  const [range, setRange] = useState(25);

  return (
    <div className="w-full max-w-sm space-y-2">
      <div className="text-xs text-muted-foreground">Range: 0 - 50 (Selected: {range})</div>
      <Slider value={range} min={0} max={50} onChange={setRange} />
    </div>
  );
}`,
  },
];

export const sliderDoc: ComponentDocData = {
  usageCode: SLIDER_USAGE,
  codeContent: SLIDER_USAGE,
  codes: SLIDER_EXAMPLES.reduce((acc, ex) => {
    acc[ex.id] = ex.code;
    return acc;
  }, {} as Record<string, string>),
  tocItems: SLIDER_EXAMPLES.map((ex) => ({
    id: ex.id,
    label: ex.label,
  })),
  dependencies: [
    { name: "framer-motion", command: "npm install framer-motion" },
    { name: "clsx", command: "npm install clsx" },
    { name: "tailwind-merge", command: "npm install tailwind-merge" },
  ],
  propGroups: [
    {
      title: "Slider",
      props: [
        {
          prop: "value",
          type: "number",
          defaultValue: "-",
          description: "Current numerical value of the slider thumb position.",
        },
        {
          prop: "min",
          type: "number",
          defaultValue: "0",
          description: "Minimum allowable boundary value for the track.",
        },
        {
          prop: "max",
          type: "number",
          defaultValue: "100",
          description: "Maximum allowable boundary value for the track.",
        },
        {
          prop: "onChange",
          type: "(val: number) => void",
          defaultValue: "-",
          description: "Callback invoked continuously as the slider is dragged.",
        },
        {
          prop: "disabled",
          type: "boolean",
          defaultValue: "false",
          description: "Disables thumb interaction and dims track opacity.",
        },
      ],
    },
  ],
};
