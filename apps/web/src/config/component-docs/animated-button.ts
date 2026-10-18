import { ComponentDocData } from "./types";

export const ANIMATED_BUTTON_USAGE = `import { AnimatedButton } from "@/components/ui/animated-button";

export default function AnimatedButtonDemo() {
  return (
    <div className="flex items-center justify-center p-8">
      <AnimatedButton onClick={() => alert("Button clicked!")}>
        Click Me
      </AnimatedButton>
    </div>
  );
}`;

export const ANIMATED_BUTTON_EXAMPLES = [
  {
    id: "basic",
    label: "Basic",
    code: `import { AnimatedButton } from "@/components/ui/animated-button";

export default function BasicAnimatedButton() {
  return (
    <AnimatedButton>
      Interactive Button
    </AnimatedButton>
  );
}`,
  },
  {
    id: "with-icon",
    label: "With Icon",
    code: `import { AnimatedButton } from "@/components/ui/animated-button";
import { Sparkles } from "lucide-react";

export default function IconButtonDemo() {
  return (
    <AnimatedButton className="gap-2 inline-flex items-center">
      <Sparkles className="w-4 h-4" />
      Get Started
    </AnimatedButton>
  );
}`,
  },
];

export const animatedButtonDoc: ComponentDocData = {
  usageCode: ANIMATED_BUTTON_USAGE,
  codeContent: ANIMATED_BUTTON_USAGE,
  codes: ANIMATED_BUTTON_EXAMPLES.reduce((acc, ex) => {
    acc[ex.id] = ex.code;
    return acc;
  }, {} as Record<string, string>),
  tocItems: ANIMATED_BUTTON_EXAMPLES.map((ex) => ({
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
      title: "AnimatedButton",
      props: [
        {
          prop: "children",
          type: "ReactNode",
          defaultValue: "-",
          description: "The content elements or text to render inside the button.",
        },
        {
          prop: "className",
          type: "string",
          defaultValue: "-",
          description: "Additional CSS classes to apply to the button element.",
        },
        {
          prop: "whileHover",
          type: "TargetAndTransition",
          defaultValue: "{ scale: 1.05 }",
          description: "Framer Motion hover animation scale and effect configuration.",
        },
        {
          prop: "whileTap",
          type: "TargetAndTransition",
          defaultValue: "{ scale: 0.95 }",
          description: "Framer Motion click tap spring feedback configuration.",
        },
      ],
    },
  ],
};
