import React from "react";
import { ComponentDocData } from "./types";

export const TOOLTIP_USAGE = `import { Tooltip } from "@/components/ui/tooltip";

export default function TooltipDemo() {
  return (
    <div className="flex items-center justify-center p-8">
      <Tooltip content="Quick action tooltip" position="top">
        <button className="px-4 py-2 rounded-xl bg-zinc-900 text-white dark:bg-zinc-100 dark:text-zinc-900 font-medium text-sm transition-colors">
          Hover me
        </button>
      </Tooltip>
    </div>
  );
}`;

export const TOOLTIP_EXAMPLES = [
  {
    id: "basic",
    label: "Top Placement",
    emoji: "💬",
    code: `<Tooltip content="Quick action tooltip" position="top">
  <button>Hover me</button>
</Tooltip>`,
  },
  {
    id: "bottom",
    label: "Bottom Placement",
    emoji: "⬇️",
    code: `<Tooltip content="Tooltip docked below" position="bottom">
  <button>Hover me</button>
</Tooltip>`,
  },
  {
    id: "left",
    label: "Left Placement",
    emoji: "⬅️",
    code: `<Tooltip content="Tooltip docked left" position="left">
  <button>Hover me</button>
</Tooltip>`,
  },
  {
    id: "right",
    label: "Right Placement",
    emoji: "➡️",
    code: `<Tooltip content="Tooltip docked right" position="right">
  <button>Hover me</button>
</Tooltip>`,
  },
  {
    id: "custom-bg",
    label: "Custom Colors & Aura",
    emoji: "🎨",
    code: `<Tooltip content="Electric Sapphire" position="top" bgColor="#3b82f6">
  <button>Hover me</button>
</Tooltip>`,
  },
];

export const tooltipDoc: ComponentDocData = {
  usageCode: TOOLTIP_USAGE,
  codeContent: TOOLTIP_USAGE,
  codes: TOOLTIP_EXAMPLES.reduce((acc, ex) => {
    acc[ex.id] = ex.code;
    return acc;
  }, {} as Record<string, string>),
  tocItems: TOOLTIP_EXAMPLES.map((ex) => ({
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
      title: "Tooltip Props",
      props: [
        { prop: "content", type: "string", defaultValue: "-", description: "Text message displayed inside the floating tooltip bubble." },
        { prop: "position", type: '"top" | "bottom" | "left" | "right"', defaultValue: '"top"', description: "Placement position relative to the trigger element." },
        { prop: "bgColor", type: "string", defaultValue: "-", description: "Optional custom background color override for tooltip popup." },
        { prop: "children", type: "ReactNode", defaultValue: "-", description: "Trigger element that reveals the tooltip upon hover." },
      ],
    },
  ],
};
