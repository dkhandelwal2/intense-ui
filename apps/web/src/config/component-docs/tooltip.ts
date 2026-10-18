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
    label: "Basic",
    code: `import { Tooltip } from "@/components/ui/tooltip";

export default function BasicTooltip() {
  return (
    <Tooltip content="Saved to bookmarks!" position="top">
      <button className="px-3 py-1.5 rounded-lg border text-sm">
        Bookmark
      </button>
    </Tooltip>
  );
}`,
  },
  {
    id: "positions",
    label: "Positions",
    code: `import { Tooltip } from "@/components/ui/tooltip";

export default function TooltipPositionsDemo() {
  return (
    <div className="flex flex-wrap gap-4 items-center justify-center p-8">
      <Tooltip content="Tooltip on top" position="top">
        <button className="px-3 py-1.5 rounded-lg border text-xs">Top</button>
      </Tooltip>
      <Tooltip content="Tooltip on bottom" position="bottom">
        <button className="px-3 py-1.5 rounded-lg border text-xs">Bottom</button>
      </Tooltip>
      <Tooltip content="Tooltip on left" position="left">
        <button className="px-3 py-1.5 rounded-lg border text-xs">Left</button>
      </Tooltip>
      <Tooltip content="Tooltip on right" position="right">
        <button className="px-3 py-1.5 rounded-lg border text-xs">Right</button>
      </Tooltip>
    </div>
  );
}`,
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
  })),
  dependencies: [
    { name: "framer-motion", command: "npm install framer-motion" },
    { name: "clsx", command: "npm install clsx" },
    { name: "tailwind-merge", command: "npm install tailwind-merge" },
  ],
  propGroups: [
    {
      title: "Tooltip",
      props: [
        {
          prop: "content",
          type: "string",
          defaultValue: "-",
          description: "Text message displayed inside the floating tooltip bubble.",
        },
        {
          prop: "position",
          type: '"top" | "bottom" | "left" | "right"',
          defaultValue: '"top"',
          description: "Placement position relative to the trigger element.",
        },
        {
          prop: "bgColor",
          type: "string",
          defaultValue: "-",
          description: "Optional custom background color override for tooltip popup.",
        },
        {
          prop: "children",
          type: "ReactNode",
          defaultValue: "-",
          description: "Trigger element that reveals the tooltip upon hover.",
        },
      ],
    },
  ],
};
