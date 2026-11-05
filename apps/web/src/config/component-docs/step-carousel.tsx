import React from "react";
import { ComponentDocData } from "./types";
import { STEP_CAROUSEL_EXAMPLES } from "@/components/showcases/step-carousel/constants";

export { STEP_CAROUSEL_EXAMPLES };

export const STEP_CAROUSEL_USAGE = `"use client";

import { useState } from "react";
import { StepCarousel } from "@/components/ui/step-carousel";

export default function StepCarouselDemo() {
  const [currentStep, setCurrentStep] = useState(0);

  return (
    <div className="flex flex-col items-center justify-center gap-6 p-6">
      <StepCarousel
        totalSteps={5}
        currentStep={currentStep}
        onStepChange={setCurrentStep}
        duration={3500}
        loop={false}
      />
    </div>
  );
}`;

export const stepCarouselDoc: ComponentDocData = {
  usageCode: STEP_CAROUSEL_USAGE,
  codeContent: STEP_CAROUSEL_USAGE,
  codes: STEP_CAROUSEL_EXAMPLES.reduce((acc, ex) => {
    acc[ex.id] = ex.code;
    return acc;
  }, {} as Record<string, string>),
  tocItems: STEP_CAROUSEL_EXAMPLES.map((ex) => ({
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
      title: "StepCarousel Props",
      props: [
        { prop: "totalSteps", type: "number", defaultValue: "-", description: "Total number of steps or slides to cycle through." },
        { prop: "currentStep", type: "number", defaultValue: "0", description: "Controlled index of the currently active step (0-indexed)." },
        { prop: "onStepChange", type: "(step: number) => void", defaultValue: "-", description: "Callback invoked when user clicks a dot or step advances." },
        { prop: "duration", type: "number", defaultValue: "3500", description: "Duration in milliseconds for each step progress fill." },
        { prop: "loop", type: "boolean", defaultValue: "false", description: "Whether to loop back to start upon completing last step." },
        { prop: "defaultPlaying", type: "boolean", defaultValue: "false", description: "Initial playback state. Defaults to paused." },
        { prop: "gooey", type: "boolean", defaultValue: "true", description: "Enables liquid SVG gooey metaball filter." },
        { prop: "size", type: '"sm" | "md" | "lg"', defaultValue: '"md"', description: "Size scale of step pill container and button." },
        { prop: "colorScheme", type: '"default" | "primary"', defaultValue: '"default"', description: "Color scheme for active progress fill." },
        { prop: "maxVisibleSteps", type: "number", defaultValue: "5", description: "Maximum visible dot indicators before showing +overflow count badge." },
        { prop: "showPlayButton", type: "boolean", defaultValue: "true", description: "Whether to display circular play/pause button." },
        { prop: "pauseOnHover", type: "boolean", defaultValue: "false", description: "Whether to pause timer on cursor hover." },
      ],
    },
  ],
};
