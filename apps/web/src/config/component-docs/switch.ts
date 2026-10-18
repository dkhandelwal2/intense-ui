import { ComponentDocData } from "./types";

export const SWITCH_USAGE = `"use client";

import { useState } from "react";
import { Switch } from "@/components/ui/switch";

export default function SwitchDemo() {
  const [checked, setChecked] = useState(false);

  return (
    <div className="flex items-center justify-center p-8">
      <Switch checked={checked} onChange={setChecked} />
    </div>
  );
}`;

export const SWITCH_EXAMPLES = [
  {
    id: "basic",
    label: "Basic",
    code: `"use client";

import { useState } from "react";
import { Switch } from "@/components/ui/switch";

export default function BasicSwitch() {
  const [checked, setChecked] = useState(true);

  return (
    <Switch checked={checked} onChange={setChecked} />
  );
}`,
  },
  {
    id: "sizes",
    label: "Sizes",
    code: `"use client";

import { useState } from "react";
import { Switch } from "@/components/ui/switch";

export default function SwitchSizesDemo() {
  const [sm, setSm] = useState(false);
  const [md, setMd] = useState(true);
  const [lg, setLg] = useState(true);

  return (
    <div className="flex items-center gap-6">
      <Switch size="sm" checked={sm} onChange={setSm} />
      <Switch size="md" checked={md} onChange={setMd} />
      <Switch size="lg" checked={lg} onChange={setLg} />
    </div>
  );
}`,
  },
  {
    id: "vertical",
    label: "Vertical",
    code: `"use client";

import { useState } from "react";
import { Switch } from "@/components/ui/switch";

export default function VerticalSwitchDemo() {
  const [checked, setChecked] = useState(false);

  return (
    <Switch
      orientation="vertical"
      size="md"
      checked={checked}
      onChange={setChecked}
    />
  );
}`,
  },
];

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
  })),
  dependencies: [
    { name: "framer-motion", command: "npm install framer-motion" },
    { name: "clsx", command: "npm install clsx" },
    { name: "tailwind-merge", command: "npm install tailwind-merge" },
  ],
  propGroups: [
    {
      title: "Switch",
      props: [
        {
          prop: "checked",
          type: "boolean",
          defaultValue: "false",
          description: "Controlled checked boolean state of the rocker switch.",
        },
        {
          prop: "onChange",
          type: "(checked: boolean) => void",
          defaultValue: "-",
          description: "Callback invoked when switch state is toggled.",
        },
        {
          prop: "size",
          type: '"sm" | "md" | "lg"',
          defaultValue: '"md"',
          description: "Dimension scale variant of the switch.",
        },
        {
          prop: "orientation",
          type: '"horizontal" | "vertical"',
          defaultValue: '"horizontal"',
          description: "Physical orientation of rocker action.",
        },
        {
          prop: "sliderText",
          type: '"on/off" | "true/false"',
          defaultValue: '"on/off"',
          description: "Text labels rendered on the rocker states.",
        },
        {
          prop: "disabled",
          type: "boolean",
          defaultValue: "false",
          description: "Prevents interactions and dims the component.",
        },
      ],
    },
  ],
};
