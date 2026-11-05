import React from "react";
import { ComponentDocData } from "./types";
import { BUTTON_EXAMPLES } from "@/components/showcases/button/constants";

export const BUTTON_USAGE = `"use client";

import { Button, ConfirmationButton } from "@/components/ui/button";

export default function ButtonDemo() {
  return (
    <div className="flex flex-wrap items-center justify-center gap-4 p-8">
      <Button variant="default">Default Button</Button>
      <Button variant="confirmation" confirmAction="delete" confirmType="pill" onConfirm={() => console.log("Deleted")} />
      <Button variant="confirmation" confirmAction="confirm" confirmType="icon" onConfirm={() => console.log("Confirmed")} />
      <Button variant="3d">3D Depth</Button>
      <Button variant="shimmer">Shimmer</Button>
      <Button loading>Loading...</Button>
      <Button variant="share" onShare={(p) => console.log(p)} />
    </div>
  );
}`;

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
      title: "Core Button Props",
      props: [
        { prop: "variant", type: '"default" | "glow" | "outline" | "subtle" | "text" | "ghost" | "3d" | "shimmer" | "ripple" | "filled-border" | "confirmation" | "share"', defaultValue: '"default"', description: "Visual style preset and interaction archetype." },
        { prop: "size", type: '"sm" | "md" | "lg" | "icon"', defaultValue: '"md"', description: "Button dimensions or square icon container." },
        { prop: "rounded", type: "boolean", defaultValue: "false", description: "Applies full border radius capsule (rounded-full)." },
        { prop: "loading", type: "boolean", defaultValue: "false", description: "Displays animated spinner and locks interaction." },
        { prop: "disabled", type: "boolean", defaultValue: "false", description: "Disables hover physics and pointer events." },
        { prop: "children", type: "React.ReactNode", defaultValue: "-", description: "Content or label elements inside the button." },
        { prop: "className", type: "string", defaultValue: "-", description: "Custom Tailwind CSS utility classes." },
        { prop: "onClick", type: "(e: React.MouseEvent) => void", defaultValue: "-", description: "Click event handler." },
      ],
    },
    {
      title: "Confirmation Props",
      props: [
        { prop: "confirmType", type: '"pill" | "icon"', defaultValue: '"pill"', description: "Morphing layout: 'pill' with label or 'icon' squircle micro-interaction." },
        { prop: "confirmAction", type: '"delete" | "confirm" | "archive" | "discard"', defaultValue: '"delete"', description: "Action color and preset prompt theme." },
        { prop: "onConfirm", type: "() => void", defaultValue: "-", description: "Callback triggered upon user confirmation." },
        { prop: "label", type: "string", defaultValue: "-", description: "Custom label text for initial idle state." },
        { prop: "confirmLabel", type: "string", defaultValue: "-", description: "Accessible label for confirm button." },
        { prop: "cancelLabel", type: "string", defaultValue: '"Cancel"', description: "Accessible label for cancel button." },
        { prop: "successLabel", type: "string", defaultValue: "-", description: "Feedback text displayed upon success." },
      ],
    },
    {
      title: "Share Props",
      props: [
        { prop: "onShare", type: "(platform: string) => void", defaultValue: "-", description: "Callback triggered when a social platform is selected." },
        { prop: "color", type: "string", defaultValue: '"#2563eb"', description: "Custom background color for the share capsule." },
      ],
    },
  ],
};
