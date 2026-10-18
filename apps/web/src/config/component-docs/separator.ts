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
    id: "basic",
    label: "Basic",
    code: `import { Separator } from "@/components/ui/separator";

export default function BasicSeparator() {
  return (
    <div className="w-full max-w-sm py-4">
      <Separator />
    </div>
  );
}`,
  },
  {
    id: "glow-and-dashed",
    label: "Variants & Glow",
    code: `import { Separator } from "@/components/ui/separator";

export default function SeparatorVariants() {
  return (
    <div className="w-full max-w-md py-6 space-y-5">
      <Separator glow />
      <Separator variant="dashed" />
      <Separator variant="subtle" />
    </div>
  );
}`,
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
  })),
  dependencies: [
    { name: "clsx", command: "npm install clsx" },
    { name: "tailwind-merge", command: "npm install tailwind-merge" },
  ],
  propGroups: [
    {
      title: "Separator",
      props: [
        {
          prop: "orientation",
          type: '"horizontal" | "vertical"',
          defaultValue: '"horizontal"',
          description: "Physical axis direction along which the separator renders.",
        },
        {
          prop: "variant",
          type: '"gradient" | "subtle" | "dashed"',
          defaultValue: '"gradient"',
          description: "Visual appearance style (gradient hairline, subtle, or dashed border).",
        },
        {
          prop: "glow",
          type: "boolean",
          defaultValue: "false",
          description: "Enables an ambient accent glow halo around the separator.",
        },
      ],
    },
  ],
};
