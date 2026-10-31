import React from "react";
import { cn } from "@/lib/utils";
import type { PlaygroundStudioStepData } from "./types";

export interface PlaygroundStudioControlsProps {
  steps: PlaygroundStudioStepData[];
  activeIndex: number;
  isLastStep?: boolean;
  onGoToStep: (index: number) => void;
  onPrev?: () => void;
  onNext?: () => void;
  onViewCode?: (e?: React.MouseEvent) => void;
  className?: string;
}

export const PlaygroundStudioControls = React.memo(function PlaygroundStudioControls({
  steps,
  activeIndex,
  onGoToStep,
  className,
}: PlaygroundStudioControlsProps) {
  return (
    <div
      className={cn(
        "pt-1 pb-1 flex items-center justify-between px-3 sm:px-2 shrink-0 select-none",
        className
      )}
    >
      {/* Step Dots Indicator on left bottom side */}
      <div className="flex items-center gap-1.5">
        {steps.map((step, idx) => {
          const isActive = idx === activeIndex;
          return (
            <button
              key={step.id}
              type="button"
              onClick={() => onGoToStep(idx)}
              className="p-0.5 cursor-pointer focus:outline-none flex items-center justify-center"
              aria-label={`Go to step ${idx + 1}`}
              title={step.titleLine1}
            >
              <div
                className={cn(
                  "h-1.5 rounded-full transition-all duration-300",
                  isActive
                    ? "w-4 bg-[var(--theme-primary)] shadow-xs"
                    : "w-1.5 bg-zinc-400 dark:bg-zinc-600 hover:bg-zinc-500"
                )}
              />
            </button>
          );
        })}
        <span className="text-[10px] font-mono font-semibold text-zinc-400 dark:text-zinc-500 ml-1">
          0{activeIndex + 1}/0{steps.length}
        </span>
      </div>
    </div>
  );
});
