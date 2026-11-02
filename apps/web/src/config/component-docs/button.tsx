import React from "react";
import { ComponentDocData } from "./types";

export const BUTTON_USAGE = `"use client";

import { Button, ConfirmButton } from "@/components/ui/button";

export default function ButtonDemo() {
  return (
    <div className="flex flex-wrap items-center justify-center gap-4 p-8">
      <Button variant="default">Default Button</Button>
      <Button variant="delete" onConfirm={() => console.log("Deleted")} />
      <Button variant="confirm" confirmAction="archive" onConfirm={() => console.log("Archived")} />
      <Button variant="share" onShare={(p) => console.log(p)} />
      <Button variant="glow">Glowing Action</Button>
    </div>
  );
}`;

export const BUTTON_EXAMPLES = [
  {
    id: "basic",
    label: "Basic Button",
    emoji: "🔘",
    code: `<Button variant="default" size="md">Interactive Button</Button>`,
  },
  {
    id: "delete",
    label: "In-Place Delete & Confirm",
    emoji: "🗑️",
    code: `<div className="flex flex-wrap gap-4">
  <Button variant="delete" confirmAction="delete" onConfirm={() => console.log("Deleted")} />
  <Button variant="confirm" confirmAction="confirm" onConfirm={() => console.log("Confirmed")} />
  <Button variant="confirm" confirmAction="archive" onConfirm={() => console.log("Archived")} />
  <Button variant="confirm" confirmAction="discard" onConfirm={() => console.log("Discarded")} />
</div>`,
  },
  {
    id: "share",
    label: "Social Share Morph",
    emoji: "🔗",
    code: `<Button variant="share" size="md" onShare={(platform) => console.log(platform)} />`,
  },
  {
    id: "glow",
    label: "Neon Glow",
    emoji: "🌟",
    code: `<Button variant="glow" size="lg">
  <Sparkles className="w-4 h-4" />
  Glowing Action
</Button>`,
  },
  {
    id: "outline",
    label: "Minimal Outline",
    emoji: "🔲",
    code: `<div className="flex gap-3">
  <Button variant="outline" size="sm">Small Outline</Button>
  <Button variant="outline" size="md">Medium Outline</Button>
  <Button variant="outline" size="lg">Large Outline</Button>
</div>`,
  },
  {
    id: "subtle",
    label: "Subtle Muted",
    emoji: "☁️",
    code: `<Button variant="subtle" size="md">Subtle Neutral</Button>`,
  },
  {
    id: "sizes",
    label: "Size Variants",
    emoji: "📐",
    code: `<div className="flex items-center gap-3">
  <Button size="sm">Small (SM)</Button>
  <Button size="md">Medium (MD)</Button>
  <Button size="lg">Large (LG)</Button>
</div>`,
  },
  {
    id: "icon",
    label: "With Icons",
    emoji: "🏷️",
    code: `<div className="flex gap-3">
  <Button variant="glow">
    <Sparkles className="w-4 h-4" />
    Get Started
  </Button>
  <Button variant="outline">
    Continue
    <ArrowRight className="w-4 h-4" />
  </Button>
</div>`,
  },
  {
    id: "disabled",
    label: "Disabled State",
    emoji: "🚫",
    code: `<Button variant="default" disabled>Default Disabled</Button>`,
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
    icon: (
      <span role="img" aria-label={ex.label} className="inline-flex items-center justify-center select-none leading-none">
        {ex.emoji}
      </span>
    ),
  })),
  dependencies: [
    { name: "framer-motion", command: "npm install framer-motion" },
    { name: "lucide-react", command: "npm install lucide-react" },
    { name: "clsx", command: "npm install clsx" },
    { name: "tailwind-merge", command: "npm install tailwind-merge" },
  ],
  propGroups: [
    {
      title: "Button Props",
      props: [
        { prop: "variant", type: '"default" | "glow" | "outline" | "subtle" | "share" | "confirm" | "delete"', defaultValue: '"default"', description: "Button visual style preset and interaction archetype." },
        { prop: "confirmAction", type: '"delete" | "confirm" | "archive" | "discard"', defaultValue: '"delete"', description: "Action archetype preset for in-place confirmation buttons." },
        { prop: "onConfirm", type: "() => void", defaultValue: "-", description: "Callback fired when the in-place confirmation is clicked." },
        { prop: "onShare", type: "(platform: string) => void", defaultValue: "-", description: "Callback triggered when a social platform is selected on share variant." },
        { prop: "size", type: '"sm" | "md" | "lg"', defaultValue: '"md"', description: "Scale size of the button." },
        { prop: "disabled", type: "boolean", defaultValue: "false", description: "Disables user interaction." },
      ],
    },
  ],
};
