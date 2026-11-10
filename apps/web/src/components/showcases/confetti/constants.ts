export interface ConfettiExample {
  id: string;
  label: string;
  emoji: string;
  code: string;
}

export const CONFETTI_EXAMPLES: ConfettiExample[] = [
  {
    id: "basic",
    label: "Basic",
    emoji: "🎉",
    code: `"use client";\n\nimport { ConfettiButton } from "@/components/ui/confetti";\n\nexport default function BasicConfettiDemo() {\n  return (\n    <div className="flex items-center justify-center p-8">\n      <ConfettiButton>Trigger Confetti 🎉</ConfettiButton>\n    </div>\n  );\n}`,
  },
  {
    id: "random-direction",
    label: "Random Direction",
    emoji: "🧭",
    code: `"use client";\n\nimport { ConfettiButton } from "@/components/ui/confetti";\n\nexport default function RandomDirectionDemo() {\n  return (\n    <div className="flex items-center justify-center p-8">\n      <ConfettiButton variant="random-direction">\n        Random Direction 🎲\n      </ConfettiButton>\n    </div>\n  );\n}`,
  },
  {
    id: "fireworks",
    label: "Fireworks",
    emoji: "🎆",
    code: `"use client";\n\nimport { ConfettiButton } from "@/components/ui/confetti";\n\nexport default function FireworksDemo() {\n  return (\n    <div className="flex items-center justify-center p-8">\n      <ConfettiButton variant="fireworks">\n        Trigger Fireworks 🎆\n      </ConfettiButton>\n    </div>\n  );\n}`,
  },
  {
    id: "side-cannons",
    label: "Side Cannons",
    emoji: "💥",
    code: `"use client";\n\nimport { ConfettiButton } from "@/components/ui/confetti";\n\nexport default function SideCannonsDemo() {\n  return (\n    <div className="flex items-center justify-center p-8">\n      <ConfettiButton variant="side-cannons">\n        Trigger Side Cannons 💥\n      </ConfettiButton>\n    </div>\n  );\n}`,
  },
  {
    id: "stars",
    label: "Stars",
    emoji: "⭐",
    code: `"use client";\n\nimport { ConfettiButton } from "@/components/ui/confetti";\n\nexport default function StarsDemo() {\n  return (\n    <div className="flex items-center justify-center p-8">\n      <ConfettiButton variant="stars">\n        Star Confetti ⭐\n      </ConfettiButton>\n    </div>\n  );\n}`,
  },
  {
    id: "custom-shapes",
    label: "Custom Shapes",
    emoji: "💖",
    code: `"use client";\n\nimport { ConfettiButton } from "@/components/ui/confetti";\n\nexport default function CustomShapesDemo() {\n  return (\n    <div className="flex items-center justify-center p-8">\n      <ConfettiButton variant="custom-shapes">\n        Shapes & Hearts 💖\n      </ConfettiButton>\n    </div>\n  );\n}`,
  },
  {
    id: "emoji",
    label: "Emoji",
    emoji: "🦄",
    code: `"use client";\n\nimport { ConfettiButton } from "@/components/ui/confetti";\n\nexport default function EmojiDemo() {\n  return (\n    <div className="flex items-center justify-center p-8">\n      <ConfettiButton variant="emoji">\n        Emoji Burst 🦄\n      </ConfettiButton>\n    </div>\n  );\n}`,
  },
];
