"use client";

import React, { useState, useEffect, useRef, useCallback, useId, useMemo } from "react";
import { cn } from "@/lib/utils";
import { useComponentPlayground } from "@/context/playground-context";
import { PLAYGROUND_COLOR_PALETTES, RING_VARIANTS } from "./constants";
import { PlaygroundStudioHeader } from "./header";
import { PlaygroundStudioCard } from "./studio-card";
import { PlaygroundStudioControls } from "./controls";
import { PlaygroundReorderIcon } from "./reorder-icon";
import type {
  PlaygroundStudioProps,
  PlaygroundStudioRowItem,
  PlaygroundStudioStepData,
} from "./types";

export type {
  PlaygroundStudioProps,
  PlaygroundStudioRowItem,
  PlaygroundStudioStepData,
};
export { PLAYGROUND_COLOR_PALETTES, RING_VARIANTS, PlaygroundReorderIcon };

export const PlaygroundStudio = React.memo(function PlaygroundStudio({
  steps,
  preview,
  hidePreview = false,
  currentStepIndex: controlledIndex,
  onStepChange,
  modifiedCount = 0,
  onReset,
  onViewCode,
  className,
  description,
}: PlaygroundStudioProps) {
  const { openCode, previewContent: contextPreview } = useComponentPlayground();
  const effectivePreview = hidePreview ? undefined : (preview || contextPreview);
  const [internalIndex, setInternalIndex] = useState(0);
  const [direction, setDirection] = useState<number>(0);

  const reactId = useId();
  const cleanId = useMemo(() => reactId.replace(/[^a-zA-Z0-9_-]/g, ""), [reactId]);
  const cardClipId = useMemo(() => `card-clip-${cleanId}`, [cleanId]);

  const handleOpenCode = useCallback(
    (e?: React.MouseEvent) => {
      e?.preventDefault();
      e?.stopPropagation();
      if (onViewCode) {
        onViewCode();
      } else {
        openCode();
      }
    },
    [onViewCode, openCode]
  );

  const activeIndex = controlledIndex !== undefined ? controlledIndex : internalIndex;
  const currentStep = steps[activeIndex] || steps[0];
  const isLastStep = activeIndex >= steps.length - 1;

  const [stepGradients, setStepGradients] = useState<Record<string, string>>({});
  const hasInit = useRef(false);

  useEffect(() => {
    if (hasInit.current) return;
    hasInit.current = true;
    const shuffled = [...PLAYGROUND_COLOR_PALETTES].sort(() => Math.random() - 0.5);
    const mapping: Record<string, string> = {};
    steps.forEach((step, idx) => {
      mapping[step.id] = shuffled[idx % shuffled.length];
    });
    setStepGradients(mapping);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const activeGradient =
    (currentStep && stepGradients[currentStep.id]) ||
    currentStep?.colorGradient ||
    PLAYGROUND_COLOR_PALETTES[activeIndex % PLAYGROUND_COLOR_PALETTES.length];

  const goToStep = useCallback(
    (newIndex: number, dir?: number) => {
      if (newIndex < 0 || newIndex >= steps.length) return;
      setDirection(dir ?? (newIndex > activeIndex ? 1 : -1));
      if (onStepChange) {
        onStepChange(newIndex);
      } else {
        setInternalIndex(newIndex);
      }
    },
    [steps.length, onStepChange, activeIndex]
  );

  const handlePrev = useCallback(() => goToStep(activeIndex - 1, -1), [goToStep, activeIndex]);
  const handleNext = useCallback(() => goToStep(activeIndex + 1, 1), [goToStep, activeIndex]);

  return (
    <div className={cn("h-full w-full flex-1 min-h-0 flex flex-col justify-between select-none gap-2", className)}>
      {/* Top Header Bar */}
      <PlaygroundStudioHeader
        modifiedCount={modifiedCount}
        onReset={onReset}
        onViewCode={handleOpenCode}
        description={description}
      />

      {/* Dynamic 2-Block Layout: Equal 50/50 CSS Grid Split (Preview on top + Studio Card below) */}
      <div className={cn("w-full flex-1 min-h-0 gap-2.5", effectivePreview ? "grid grid-rows-2" : "flex flex-col")}>
        {effectivePreview && (
          <div className="relative w-full h-full min-h-0 overflow-hidden rounded-[24px] bg-[#fafafc] dark:bg-[#0a0a0e] border border-zinc-200/80 dark:border-zinc-800/80 shadow-md flex items-center justify-center p-3">
            <div
              aria-hidden="true"
              className="absolute inset-0 pointer-events-none opacity-[0.4] dark:opacity-[0.2]"
              style={{
                backgroundImage: `
                  linear-gradient(to right, rgba(120, 120, 150, 0.1) 1px, transparent 1px),
                  linear-gradient(to bottom, rgba(120, 120, 150, 0.1) 1px, transparent 1px)
                `,
                backgroundSize: "20px 20px",
                maskImage: "radial-gradient(ellipse at center, black 50%, transparent 95%)",
                WebkitMaskImage: "radial-gradient(ellipse at center, black 50%, transparent 95%)",
              }}
            />
            <div className="relative z-10 w-full h-full flex items-start justify-center overflow-auto scrollbar-none ">
              {effectivePreview}
            </div>
          </div>
        )}

        {/* Studio Card with Scooped Notch and Top-Right Circular Buttons */}
        <PlaygroundStudioCard
          currentStep={currentStep}
          activeIndex={activeIndex}
          stepsCount={steps.length}
          isLastStep={isLastStep}
          direction={direction}
          activeGradient={activeGradient}
          cardClipId={cardClipId}
          onPrev={handlePrev}
          onNext={handleNext}
          onViewCode={handleOpenCode}
          onGoToStep={goToStep}
        />
      </div>

      {/* Bottom Controls: Slider Dots on the left bottom side */}
      <PlaygroundStudioControls
        steps={steps}
        activeIndex={activeIndex}
        onGoToStep={goToStep}
      />
    </div>
  );
});
