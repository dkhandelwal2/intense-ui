import React from "react";
import { ComponentDocData } from "./types";

export const SEPARATOR_USAGE = `import { Separator } from "@/components/ui/separator";

export default function SeparatorDemo() {
  return (
    <div className="w-full max-w-sm space-y-4 p-6">
      <div>
        <h4 className="text-sm font-semibold">Intense UI</h4>
        <p className="text-xs text-muted-foreground">High performance component ecosystem.</p>
      </div>
      <Separator />
      <div className="flex items-center space-x-4 text-xs text-muted-foreground">
        <span>Docs</span>
        <Separator orientation="vertical" className="h-4" />
        <span>Components</span>
        <Separator orientation="vertical" className="h-4" />
        <span>Showcase</span>
      </div>
    </div>
  );
}`;

export const SEPARATOR_EXAMPLES = [
  {
    id: "basic", label: "Gradient Hairline", emoji: "✨",
    code: `import { Separator } from "@/components/ui/separator";\n\nexport default function GradientSeparatorDemo() {\n  return (\n    <div className="w-full max-w-sm p-6">\n      <Separator variant="gradient" />\n    </div>\n  );\n}`,
  },
  {
    id: "subtle", label: "Subtle Solid", emoji: "➖",
    code: `import { Separator } from "@/components/ui/separator";\n\nexport default function SubtleSeparatorDemo() {\n  return (\n    <div className="w-full max-w-sm p-6">\n      <Separator variant="subtle" />\n    </div>\n  );\n}`,
  },
  {
    id: "dashed", label: "Dashed Divider", emoji: "✂️",
    code: `import { Separator } from "@/components/ui/separator";\n\nexport default function DashedSeparatorDemo() {\n  return (\n    <div className="w-full max-w-sm p-6">\n      <Separator variant="dashed" />\n    </div>\n  );\n}`,
  },
  {
    id: "vertical", label: "Vertical Divider", emoji: "↕️",
    code: `import { Separator } from "@/components/ui/separator";\n\nexport default function VerticalSeparatorDemo() {\n  return (\n    <div className="flex h-6 items-center space-x-4 p-6">\n      <span>Left</span>\n      <Separator orientation="vertical" />\n      <span>Right</span>\n    </div>\n  );\n}`,
  },
  {
    id: "glow", label: "Neon Aura Glow", emoji: "🌟",
    code: `import { Separator } from "@/components/ui/separator";\n\nexport default function GlowSeparatorDemo() {\n  return (\n    <div className="w-full max-w-sm p-6">\n      <Separator variant="gradient" glow />\n    </div>\n  );\n}`,
  },
];

export const separatorDoc: ComponentDocData = {
  usageCode: SEPARATOR_USAGE,
  codeContent: SEPARATOR_USAGE,
  codes: SEPARATOR_EXAMPLES.reduce((acc, ex) => {
    acc[ex.id] = ex.code;
    return acc;
  }, {} as Record<string, string>),
  tocItems: SEPARATOR_EXAMPLES.map((ex) => ({
    id: ex.id,
    label: ex.label,
    icon: (
      <span role="img" aria-label={ex.label} className="inline-flex items-center justify-center select-none leading-none">
        {ex.emoji}
      </span>
    ),
  })),
  dependencies: [
    { name: "clsx", command: "npm install clsx" },
    { name: "tailwind-merge", command: "npm install tailwind-merge" },
  ],
  propGroups: [
    {
      title: "Separator Props",
      props: [
        { prop: "orientation", type: '"horizontal" | "vertical"', defaultValue: '"horizontal"', description: "Physical axis direction along which the separator renders." },
        { prop: "variant", type: '"gradient" | "subtle" | "dashed"', defaultValue: '"gradient"', description: "Visual appearance style (gradient hairline, subtle 10%, or dashed border)." },
        { prop: "glow", type: "boolean", defaultValue: "false", description: "Enables an ambient glowing aura box-shadow around the separator line." },
      ],
    },
  ],
};
