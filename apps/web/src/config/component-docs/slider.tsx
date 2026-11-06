import React from "react";
import { ComponentDocData } from "./types";
import { SLIDER_EXAMPLES } from "@/components/showcases/slider/constants";

export const SLIDER_USAGE = `"use client";

import { useState } from "react";
import { Slider, RangeSlider, MultiSlider } from "@/components/ui/slider";

export default function SliderDemo() {
  const [value, setValue] = useState(50);
  const [range, setRange] = useState<[number, number]>([25, 75]);
  const [multi, setMulti] = useState<number[]>([20, 50, 80]);

  return (
    <div className="w-full max-w-sm space-y-6 p-6">
      <Slider value={value} onChange={setValue} marks={["0%", "25%", "50%", "75%", "100%"]} tooltip />
      <RangeSlider value={range} onChange={setRange} tooltip />
      <MultiSlider values={multi} onChange={setMulti} tooltip marks={["Min", "Low", "Mid", "High", "Max"]} />
    </div>
  );
}`;

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
    { name: "lucide-react", command: "npm install lucide-react" },
    { name: "clsx", command: "npm install clsx" },
    { name: "tailwind-merge", command: "npm install tailwind-merge" },
  ],
  propGroups: [
    {
      title: "Slider Props",
      props: [
        { prop: "value", type: "number", defaultValue: "-", description: "Numerical value position of the slider thumb." },
        { prop: "min", type: "number", defaultValue: "0", description: "Minimum allowable boundary value." },
        { prop: "max", type: "number", defaultValue: "100", description: "Maximum allowable boundary value." },
        { prop: "step", type: "number", defaultValue: "1", description: "Granular stepping interval between values." },
        { prop: "onChange", type: "(val: number) => void", defaultValue: "-", description: "Callback triggered continuously on thumb drag." },
        { prop: "marks", type: "Array<number | string | { value: number; label?: ReactNode }>", defaultValue: "-", description: "Props-driven tick markers along track with bottom labels." },
        { prop: "orientation", type: '"horizontal" | "vertical"', defaultValue: '"horizontal"', description: "Track orientation layout direction." },
        { prop: "variant", type: '"primary" | "success" | "danger" | "warning" | "info" | "zoom"', defaultValue: '"primary"', description: "Color theme intent for track and thumb." },
        { prop: "fillColor", type: "string", defaultValue: "-", description: "Custom CSS/hex color override for the filled track and thumb indicator." },
        { prop: "thumbAnimation", type: '"none" | "pulse" | "glow" | "scale"', defaultValue: '"none"', description: "Visual animation effect on the thumb dot." },
        { prop: "tooltip", type: "boolean", defaultValue: "false", description: "Whether to render a floating value badge on the thumb." },
        { prop: "thumbIcon", type: "ReactNode", defaultValue: "-", description: "Custom icon element centered inside the thumb." },
        { prop: "leftIcon", type: "ReactNode", defaultValue: "-", description: "Interactive min boundary icon on the left edge." },
        { prop: "rightIcon", type: "ReactNode", defaultValue: "-", description: "Interactive max boundary icon on the right edge." },
        { prop: "showInput", type: "boolean", defaultValue: "false", description: "Synchronized numerical input box next to track." },
        { prop: "disabled", type: "boolean", defaultValue: "false", description: "Disables interaction and dims track opacity." },
      ],
    },
    {
      title: "MultiSlider Props (3+ Dots)",
      props: [
        { prop: "values", type: "number[]", defaultValue: "-", description: "Array of numerical values for 3 or more draggable thumb dots." },
        { prop: "min", type: "number", defaultValue: "0", description: "Minimum allowable boundary value." },
        { prop: "max", type: "number", defaultValue: "100", description: "Maximum allowable boundary value." },
        { prop: "step", type: "number", defaultValue: "1", description: "Granular stepping increment." },
        { prop: "onChange", type: "(vals: number[]) => void", defaultValue: "-", description: "Callback triggered with updated array when any thumb moves." },
        { prop: "marks", type: "Array<number | string | { value: number; label?: ReactNode }>", defaultValue: "-", description: "Props-driven tick marks and bottom labels." },
        { prop: "variant", type: '"primary" | "success" | "danger" | "warning" | "info"', defaultValue: '"primary"', description: "Color theme intent for span between thumbs." },
        { prop: "tooltip", type: "boolean", defaultValue: "false", description: "Show value tooltip popovers above all thumbs." },
        { prop: "disabled", type: "boolean", defaultValue: "false", description: "Disables interaction on all thumbs." },
      ],
    },
    {
      title: "RangeSlider Props",
      props: [
        { prop: "value", type: "[number, number]", defaultValue: "-", description: "Dual-thumb interval boundaries [low, high]." },
        { prop: "min", type: "number", defaultValue: "0", description: "Minimum boundary limit." },
        { prop: "max", type: "number", defaultValue: "100", description: "Maximum boundary limit." },
        { prop: "step", type: "number", defaultValue: "1", description: "Granular stepping increment." },
        { prop: "onChange", type: "(val: [number, number]) => void", defaultValue: "-", description: "Callback triggered as either thumb is dragged." },
        { prop: "marks", type: "Array<number | string | { value: number; label?: ReactNode }>", defaultValue: "-", description: "Props-driven tick markers and bottom labels." },
        { prop: "variant", type: '"primary" | "success" | "danger" | "warning" | "info"', defaultValue: '"primary"', description: "Color theme intent for range span." },
        { prop: "fillColor", type: "string", defaultValue: "-", description: "Custom CSS/hex color override for the selected span between thumbs." },
        { prop: "tooltip", type: "boolean", defaultValue: "false", description: "Show value tooltip popovers above both thumbs." },
        { prop: "disabled", type: "boolean", defaultValue: "false", description: "Disables interaction on both thumbs." },
      ],
    },
  ],
};
