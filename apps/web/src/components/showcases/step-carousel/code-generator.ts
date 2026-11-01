import { StepCarouselCustomProps } from "./types";

export function generateStepCarouselCode(props: StepCarouselCustomProps): string {
  const propsList: string[] = [
    `totalSteps={${props.totalSteps}}`,
    `duration={${props.duration}}`,
  ];

  if (props.loop) {
    propsList.push("loop={true}");
  } else {
    propsList.push("loop={false}");
  }

  if (props.defaultPlaying) {
    propsList.push("defaultPlaying={true}");
  } else {
    propsList.push("defaultPlaying={false}");
  }

  if (props.gooey) {
    propsList.push("gooey={true}");
  } else {
    propsList.push("gooey={false}");
  }

  if (props.size !== "md") {
    propsList.push(`size="${props.size}"`);
  }

  if (props.colorScheme !== "default") {
    propsList.push(`colorScheme="${props.colorScheme}"`);
  }

  if (!props.showPlayButton) {
    propsList.push("showPlayButton={false}");
  }

  if (props.pauseOnHover) {
    propsList.push("pauseOnHover={true}");
  }

  const formattedProps = propsList.map((p) => `        ${p}`).join("\n");

  return `"use client";

import { useState } from "react";
import { StepCarousel } from "@/components/ui/step-carousel";

export default function StepCarouselDemo() {
  const [activeStep, setActiveStep] = useState(0);

  return (
    <div className="flex flex-col items-center justify-center p-8 gap-6">
      <div className="text-sm font-mono text-zinc-500">
        Active Step: {activeStep + 1} of ${props.totalSteps}
      </div>

      <StepCarousel
        currentStep={activeStep}
        onStepChange={setActiveStep}
${formattedProps}
      />
    </div>
  );
}`;
}
