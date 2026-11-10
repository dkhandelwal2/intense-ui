"use client";

import React from "react";
import { ConfettiButton } from "@/components/ui/confetti";
import { ConfettiCustomProps } from "./types";

interface ConfettiPreviewProps {
  customProps: ConfettiCustomProps;
  activeTocId?: string;
  isCustomizing?: boolean;
}

export function ConfettiPreview({
  customProps,
  activeTocId = "basic",
  isCustomizing = false,
}: ConfettiPreviewProps) {
  if (isCustomizing) {
    return (
      <div className="flex flex-col items-center justify-center gap-6 p-12 w-full max-w-lg mx-auto">
        <ConfettiButton
          variant={customProps.variant}
          options={{
            particleCount: customProps.particleCount,
            spread: customProps.spread,
            scalar: customProps.scalar,
          }}
        >
          Fire {customProps.variant} Confetti 🎉
        </ConfettiButton>
        <span className="text-xs font-mono text-muted-foreground uppercase">
          Variant: {customProps.variant} • Count: {customProps.particleCount} • Spread: {customProps.spread}°
        </span>
      </div>
    );
  }

  if (activeTocId === "random-direction") {
    return (
      <div className="flex flex-col items-center justify-center gap-6 p-12">
        <ConfettiButton variant="random-direction">
          Random Direction 🎲
        </ConfettiButton>
        <span className="text-xs font-mono text-muted-foreground">
          Fires 360° randomized multi-angle confetti explosion
        </span>
      </div>
    );
  }

  if (activeTocId === "fireworks") {
    return (
      <div className="flex flex-col items-center justify-center gap-6 p-12">
        <ConfettiButton variant="fireworks">
          Trigger Fireworks 🎆
        </ConfettiButton>
        <span className="text-xs font-mono text-muted-foreground">
          Continuous staggered dual sky bursts across 5 seconds
        </span>
      </div>
    );
  }

  if (activeTocId === "side-cannons") {
    return (
      <div className="flex flex-col items-center justify-center gap-6 p-12">
        <ConfettiButton variant="side-cannons">
          Trigger Side Cannons 💥
        </ConfettiButton>
        <span className="text-xs font-mono text-muted-foreground">
          Inward streams from left and right viewport edges
        </span>
      </div>
    );
  }

  if (activeTocId === "stars") {
    return (
      <div className="flex flex-col items-center justify-center gap-6 p-12">
        <ConfettiButton variant="stars">
          Star Confetti ⭐
        </ConfettiButton>
        <span className="text-xs font-mono text-muted-foreground">
          Golden 5-point star particles with flutter decay
        </span>
      </div>
    );
  }

  if (activeTocId === "custom-shapes") {
    return (
      <div className="flex flex-col items-center justify-center gap-6 p-12">
        <ConfettiButton variant="custom-shapes">
          Shapes & Hearts 💖
        </ConfettiButton>
        <span className="text-xs font-mono text-muted-foreground">
          Multi-geometry confetti with stars, hearts, circles, and ribbons
        </span>
      </div>
    );
  }

  if (activeTocId === "emoji") {
    return (
      <div className="flex flex-col items-center justify-center gap-6 p-12">
        <ConfettiButton variant="emoji">
          Emoji Burst 🦄
        </ConfettiButton>
        <span className="text-xs font-mono text-muted-foreground">
          Floating celebratory emoji particles scaled via text rendering
        </span>
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center justify-center gap-6 p-12">
      <ConfettiButton variant="basic">
        Trigger Confetti 🎉
      </ConfettiButton>
      <span className="text-xs font-mono text-muted-foreground">
        Classic celebratory burst originating directly from click position
      </span>
    </div>
  );
}
