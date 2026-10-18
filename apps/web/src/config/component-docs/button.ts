import { ComponentDocData } from "./types";

export const BUTTON_USAGE = `import { Button } from "@/components/ui/button";

export default function ButtonDemo() {
  return (
    <div className="flex flex-wrap items-center justify-center gap-4 p-8">
      <Button variant="default">Default Button</Button>
      <Button variant="glow">Glowing Button</Button>
    </div>
  );
}`;

export const BUTTON_EXAMPLES = [
  {
    id: "basic",
    label: "Basic",
    code: `import { Button } from "@/components/ui/button";

export default function BasicButton() {
  return (
    <Button variant="default">
      Interactive Button
    </Button>
  );
}`,
  },
  {
    id: "glow",
    label: "Glowing Effect",
    code: `import { Button } from "@/components/ui/button";

export default function GlowingButtonDemo() {
  return (
    <Button variant="glow">
      Glowing Action
    </Button>
  );
}`,
  },
  {
    id: "variants",
    label: "Variants",
    code: `import { Button } from "@/components/ui/button";

export default function ButtonVariantsDemo() {
  return (
    <div className="flex flex-wrap gap-4">
      <Button variant="default">Default</Button>
      <Button variant="glow">Glow</Button>
      <Button variant="outline">Outline</Button>
      <Button variant="subtle">Subtle</Button>
    </div>
  );
}`,
  },
  {
    id: "with-icon",
    label: "With Icon",
    code: `import { Button } from "@/components/ui/button";
import { Sparkles, ArrowRight } from "lucide-react";

export default function IconButtonDemo() {
  return (
    <div className="flex items-center gap-4">
      <Button variant="glow" className="gap-2">
        <Sparkles className="w-4 h-4" />
        Get Started
      </Button>
      <Button variant="outline" className="gap-2">
        Documentation
        <ArrowRight className="w-4 h-4" />
      </Button>
    </div>
  );
}`,
  },
];

export const buttonDoc: ComponentDocData = {
  usageCode: BUTTON_USAGE,
  codeContent: BUTTON_USAGE,
  codes: BUTTON_EXAMPLES.reduce((acc, ex) => {
    acc[ex.id] = ex.code;
    return acc;
  }, {} as Record<string, string>),
  tocItems: BUTTON_EXAMPLES.map((ex) => ({
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
      title: "Button",
      props: [
        {
          prop: "variant",
          type: '"default" | "glow" | "outline" | "subtle"',
          defaultValue: '"default"',
          description: "Visual appearance style and aura animation variant.",
        },
        {
          prop: "size",
          type: '"sm" | "md" | "lg"',
          defaultValue: '"md"',
          description: "Physical dimensions and typography scale of button.",
        },
        {
          prop: "children",
          type: "ReactNode",
          defaultValue: "-",
          description: "Button label, icons, or nested elements.",
        },
        {
          prop: "className",
          type: "string",
          defaultValue: "-",
          description: "Optional custom Tailwind classes.",
        },
      ],
    },
  ],
};
