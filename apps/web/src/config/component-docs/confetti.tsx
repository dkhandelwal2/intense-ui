import React from "react";
import { ComponentDocData } from "./types";
import { CONFETTI_EXAMPLES } from "@/components/showcases/confetti/constants";

export { CONFETTI_EXAMPLES };

export const CONFETTI_USAGE = `"use client";

import { ConfettiButton } from "@/components/ui/confetti";

export default function ConfettiDemo() {
  return (
    <div className="flex items-center justify-center p-8">
      <ConfettiButton>Trigger Confetti 🎉</ConfettiButton>
    </div>
  );
}`;

export const confettiDoc: ComponentDocData = {
  usageCode: CONFETTI_USAGE,
  codeContent: CONFETTI_USAGE,
  codes: CONFETTI_EXAMPLES.reduce((acc, ex) => {
    acc[ex.id] = ex.code;
    return acc;
  }, {} as Record<string, string>),
  tocItems: CONFETTI_EXAMPLES.map((ex) => ({
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
      title: "ConfettiButton Props",
      props: [
        { prop: "variant", type: '"basic" | "random-direction" | "fireworks" | "side-cannons" | "stars" | "custom-shapes" | "emoji"', defaultValue: '"basic"', description: "Preset celebratory confetti animation style." },
        { prop: "options", type: "ConfettiOptions", defaultValue: "-", description: "Custom physics and appearance options for the confetti burst." },
        { prop: "className", type: "string", defaultValue: '""', description: "Custom Tailwind CSS classes for button styling." },
        { prop: "disabled", type: "boolean", defaultValue: "false", description: "Disables interaction and clicking." },
        { prop: "onClick", type: "(event: MouseEvent) => void", defaultValue: "-", description: "Optional click callback." },
      ],
    },
    {
      title: "Confetti Canvas Props",
      props: [
        { prop: "options", type: "ConfettiOptions", defaultValue: "-", description: "Default configuration passed to the canvas engine." },
        { prop: "manualstart", type: "boolean", defaultValue: "false", description: "Whether to suppress automatic firing on mount." },
        { prop: "className", type: "string", defaultValue: '""', description: "Custom styling applied to the canvas container." },
      ],
    },
    {
      title: "ConfettiOptions Configuration",
      props: [
        { prop: "particleCount", type: "number", defaultValue: "50", description: "Number of confetti particles launched." },
        { prop: "angle", type: "number", defaultValue: "90", description: "Launch angle in degrees (90° is directly upward)." },
        { prop: "spread", type: "number", defaultValue: "45", description: "Spread cone width in degrees." },
        { prop: "startVelocity", type: "number", defaultValue: "45", description: "Initial velocity speed of particles." },
        { prop: "decay", type: "number", defaultValue: "0.9", description: "Velocity drag reduction factor per frame." },
        { prop: "gravity", type: "number", defaultValue: "1", description: "Downward gravity force." },
        { prop: "ticks", type: "number", defaultValue: "200", description: "Lifetime duration before particles vanish." },
        { prop: "origin", type: "{ x?: number; y?: number }", defaultValue: "{ x: 0.5, y: 0.5 }", description: "Normalized launch coordinates (0 to 1 across screen)." },
        { prop: "colors", type: "string[]", defaultValue: "DEFAULT_CONFETTI_COLORS", description: "Array of hex or CSS color strings." },
        { prop: "shapes", type: '("square" | "circle" | "star" | "heart" | string)[]', defaultValue: '["square", "circle"]', description: "Particle shapes or unicode emojis." },
        { prop: "scalar", type: "number", defaultValue: "1", description: "Scale multiplier for particle sizes." },
      ],
    },
  ],
};
