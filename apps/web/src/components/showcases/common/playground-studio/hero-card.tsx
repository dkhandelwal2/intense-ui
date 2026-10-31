"use client";

import React, { useId } from "react";
import { Sparkles } from "lucide-react";
import { cn } from "@/lib/utils";
import type { PlaygroundStudioStepData } from "./types";

export interface PlaygroundStudioHeroCardProps {
  step: PlaygroundStudioStepData;
  activeGradient: string;
  tagText: string;
}

export const PlaygroundStudioHeroCard = React.memo(function PlaygroundStudioHeroCard({
  step,
  activeGradient,
  tagText,
}: PlaygroundStudioHeroCardProps) {
  const reactId = useId();
  const cleanId = reactId.replace(/[^a-zA-Z0-9_-]/g, "");
  const clipId = `hero-pod-clip-${cleanId}`;

  return (
    <>
      {/* Self-contained SVG clip definition ensures 100% reliable rendering on desktop and responsive */}
      <svg
        aria-hidden="true"
        className="absolute w-px h-px overflow-hidden pointer-events-none opacity-0"
        style={{ position: "absolute", width: 1, height: 1 }}
      >
        <defs>
          <clipPath id={clipId} clipPathUnits="objectBoundingBox">
            <path d="M 0 0.08 C 0 0.03, 0.03 0, 0.12 0 L 0.65 0 C 0.78 0, 0.92 0.08, 0.98 0.22 C 1.02 0.32, 1.02 0.42, 0.98 0.50 C 0.93 0.62, 0.85 0.76, 0.76 0.87 C 0.68 0.96, 0.60 1.0, 0.52 1.0 L 0.12 1.0 C 0.03 1.0, 0 0.97, 0 0.92 Z" />
          </clipPath>
        </defs>
      </svg>

      <div
        style={{
          WebkitClipPath: `url(#${clipId})`,
          clipPath: `url(#${clipId})`,
        }}
        className={cn(
          "relative text-white p-3 sm:p-3.5 flex flex-col justify-between overflow-hidden select-none h-full transition-colors duration-500",
          activeGradient
        )}
      >
        {/* Playful Ambient Blobs in Background */}
        <div
          aria-hidden="true"
          className="absolute -top-10 -right-10 w-28 h-28 rounded-full bg-white/20 blur-md pointer-events-none"
        />
        <div
          aria-hidden="true"
          className="absolute -bottom-8 -left-8 w-24 h-24 rounded-full bg-black/15 blur-md pointer-events-none"
        />

        {/* Top Row: Section Specific Icon Badge */}
        <div className="relative z-10 flex items-center justify-between">
          <div className="w-5.5 h-5.5 2xl:w-6 2xl:h-6 rounded-lg bg-white/20 backdrop-blur-md flex items-center justify-center border border-white/30 text-white/95 shadow-xs">
            {step.icon ? (
              step.icon
            ) : (
              <Sparkles className="w-3 h-3 2xl:w-3.5 2xl:h-3.5 text-white/95" />
            )}
          </div>
        </div>

        {/* Bottom-Aligned Content Stack matching reference design */}
        <div className="relative z-10 mt-auto pt-4 flex flex-col justify-end">
          <div className="text-[13px] sm:text-sm 2xl:text-base font-black tracking-tight leading-tight text-white drop-shadow-xs">
            {step.titleLine1}
          </div>
          {step.titleLine2 && (
            <div className="text-[13px] sm:text-sm 2xl:text-base font-black tracking-tight leading-tight text-white/90 drop-shadow-xs">
              {step.titleLine2}
            </div>
          )}

          <span className="text-[8.5px] 2xl:text-[9.5px] font-mono font-bold tracking-widest text-white/80 uppercase mt-2 drop-shadow-2xs">
            {tagText}
          </span>
        </div>
      </div>
    </>
  );
});
