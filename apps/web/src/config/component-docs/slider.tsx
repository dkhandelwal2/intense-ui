import React from "react";
import { ComponentDocData } from "./types";

export const SLIDER_USAGE = `"use client";

import { useState } from "react";
import { Slider } from "@/components/ui/slider";

export default function SliderDemo() {
  const [value, setValue] = useState(50);

  return (
    <div className="w-full max-w-sm space-y-3 p-6">
      <div className="flex justify-between text-sm font-medium">
        <span>Volume</span>
        <span className="text-muted-foreground">{value}%</span>
      </div>
      <Slider value={value} min={0} max={100} onChange={setValue} />
    </div>
  );
}`;

export const SLIDER_EXAMPLES = [
  {
    id: "basic",
    label: "Basic Slider",
    emoji: "🎚️",
    code: `<Slider value={value} min={0} max={100} onChange={setValue} />`,
  },
  {
    id: "custom-range",
    label: "Custom Boundaries",
    emoji: "📊",
    code: `<Slider value={range} min={0} max={50} onChange={setRange} />`,
  },
  {
    id: "stepped",
    label: "Discrete Intervals",
    emoji: "🪜",
    code: `<Slider value={stepped} min={0} max={100} onChange={(v) => setStepped(Math.round(v / 10) * 10)} />`,
  },
  {
    id: "with-badge",
    label: "Value Tag Badge",
    emoji: "🏷️",
    code: `<div className="space-y-4">
  <div className="flex justify-between">
    <span>Gain</span>
    <span className="px-2 py-0.5 rounded bg-primary text-xs">{value} dB</span>
  </div>
  <Slider value={value} min={0} max={100} onChange={setValue} />
</div>`,
  },
  {
    id: "disabled",
    label: "Disabled State",
    emoji: "🚫",
    code: `<Slider value={35} min={0} max={100} onChange={() => {}} disabled />`,
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
    icon: (
      <span role="img" aria-label={ex.label} className="inline-flex items-center justify-center select-none leading-none">
        {ex.emoji}
      </span>
    ),
  })),
  dependencies: [
    { name: "framer-motion", command: "npm install framer-motion" },
    { name: "clsx", command: "npm install clsx" },
    { name: "tailwind-merge", command: "npm install tailwind-merge" },
  ],
  propGroups: [
    {
      title: "Slider Props",
      props: [
        { prop: "value", type: "number", defaultValue: "-", description: "Current numerical value of the slider thumb position." },
        { prop: "min", type: "number", defaultValue: "0", description: "Minimum allowable boundary value for the track." },
        { prop: "max", type: "number", defaultValue: "100", description: "Maximum allowable boundary value for the track." },
        { prop: "onChange", type: "(val: number) => void", defaultValue: "-", description: "Callback invoked continuously as the slider thumb drags." },
        { prop: "disabled", type: "boolean", defaultValue: "false", description: "Disables thumb interaction and dims track opacity." },
      ],
    },
  ],
};
