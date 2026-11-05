export interface TooltipExample {
  id: string;
  label: string;
  emoji: string;
  code: string;
}

export const TOOLTIP_EXAMPLES: TooltipExample[] = [
  {
    id: "basic", label: "Top Placement", emoji: "💬",
    code: `import { Tooltip } from "@/components/ui/tooltip";\n\nexport default function TopTooltipDemo() {\n  return (\n    <div className="flex items-center justify-center p-8">\n      <Tooltip content="Quick action tooltip" position="top">\n        <button className="px-4 py-2 rounded-xl bg-zinc-900 text-white dark:bg-zinc-100 dark:text-zinc-900 font-medium text-sm transition-colors">\n          Hover me\n        </button>\n      </Tooltip>\n    </div>\n  );\n}`,
  },
  {
    id: "bottom", label: "Bottom Placement", emoji: "⬇️",
    code: `import { Tooltip } from "@/components/ui/tooltip";\n\nexport default function BottomTooltipDemo() {\n  return (\n    <div className="flex items-center justify-center p-8">\n      <Tooltip content="Tooltip docked below" position="bottom">\n        <button className="px-4 py-2 rounded-xl bg-zinc-900 text-white dark:bg-zinc-100 dark:text-zinc-900 font-medium text-sm transition-colors">\n          Hover me\n        </button>\n      </Tooltip>\n    </div>\n  );\n}`,
  },
  {
    id: "left", label: "Left Placement", emoji: "⬅️",
    code: `import { Tooltip } from "@/components/ui/tooltip";\n\nexport default function LeftTooltipDemo() {\n  return (\n    <div className="flex items-center justify-center p-8">\n      <Tooltip content="Tooltip docked left" position="left">\n        <button className="px-4 py-2 rounded-xl bg-zinc-900 text-white dark:bg-zinc-100 dark:text-zinc-900 font-medium text-sm transition-colors">\n          Hover me\n        </button>\n      </Tooltip>\n    </div>\n  );\n}`,
  },
  {
    id: "right", label: "Right Placement", emoji: "➡️",
    code: `import { Tooltip } from "@/components/ui/tooltip";\n\nexport default function RightTooltipDemo() {\n  return (\n    <div className="flex items-center justify-center p-8">\n      <Tooltip content="Tooltip docked right" position="right">\n        <button className="px-4 py-2 rounded-xl bg-zinc-900 text-white dark:bg-zinc-100 dark:text-zinc-900 font-medium text-sm transition-colors">\n          Hover me\n        </button>\n      </Tooltip>\n    </div>\n  );\n}`,
  },
  {
    id: "custom-bg", label: "Custom Colors & Aura", emoji: "🎨",
    code: `import { Tooltip } from "@/components/ui/tooltip";\n\nexport default function CustomBgTooltipDemo() {\n  return (\n    <div className="flex items-center justify-center p-8">\n      <Tooltip content="Electric Sapphire" position="top" bgColor="#3b82f6">\n        <button className="px-4 py-2 rounded-xl bg-zinc-900 text-white dark:bg-zinc-100 dark:text-zinc-900 font-medium text-sm transition-colors">\n          Hover me\n        </button>\n      </Tooltip>\n    </div>\n  );\n}`,
  },
];
