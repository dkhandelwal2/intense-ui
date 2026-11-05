import React from "react";
import { ComponentDocData } from "./types";
import { SWITCH_EXAMPLES } from "@/components/showcases/switch/constants";

export { SWITCH_EXAMPLES };

export const SWITCH_USAGE = `"use client";

import { useState } from "react";
import { Switch } from "@/components/ui/switch";

export default function SwitchDemo() {
  const [checked, setChecked] = useState(true);

  return (
    <div className="flex items-center justify-center p-8">
      <Switch checked={checked} onChange={setChecked} />
    </div>
  );
}`;

export const switchDoc: ComponentDocData = {
  usageCode: SWITCH_USAGE,
  codeContent: SWITCH_USAGE,
  codes: SWITCH_EXAMPLES.reduce((acc, ex) => {
    acc[ex.id] = ex.code;
    return acc;
  }, {} as Record<string, string>),
  tocItems: SWITCH_EXAMPLES.map((ex) => ({
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
      title: "Switch Props",
      props: [
        { prop: "checked", type: "boolean", defaultValue: "-", description: "Controlled boolean value of the switch." },
        { prop: "onChange", type: "(checked: boolean) => void", defaultValue: "-", description: "Callback triggered when switch is toggled." },
        { prop: "variant", type: '"rocker" | "pill" | "cutout" | "capsule-text" | "industrial" | "square"', defaultValue: '"rocker"', description: "Visual archetype and animation style of the toggle switch." },
        { prop: "size", type: '"sm" | "md" | "lg"', defaultValue: '"md"', description: "Dimensions scale of the track and toggle thumb (supported across all variants)." },
        { prop: "sliderText", type: '"on/off" | "true/false" | "yes/no"', defaultValue: '"on/off"', description: "State labels embossed on the switch face." },
        { prop: "showDotIcon", type: "boolean", defaultValue: "true", description: "Whether to render a glowing status dot indicator on 3D rocker." },
        { prop: "shadowColor", type: "string", defaultValue: '"var(--theme-primary)"', description: "Color of the 3D depth shadow beneath the rocker." },
        { prop: "disabled", type: "boolean", defaultValue: "false", description: "Disables user interaction and dims the control." },
      ],
    },
  ],
};
