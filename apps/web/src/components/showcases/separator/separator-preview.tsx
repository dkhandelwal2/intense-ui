"use client";

import React from "react";
import { Separator } from "@/components/ui/separator";
import { SeparatorCustomProps } from "./types";

interface SeparatorPreviewProps {
  customProps: SeparatorCustomProps;
  activeTocId?: string;
  isCustomizing?: boolean;
}

export function SeparatorPreview({
  customProps,
  activeTocId = "basic",
  isCustomizing = false,
}: SeparatorPreviewProps) {
  if (isCustomizing) {
    if (customProps.orientation === "vertical") {
      return (
        <div className="flex items-center justify-center gap-6 h-32 p-8">
          <span className="text-sm font-medium">Docs</span>
          <Separator
            orientation="vertical"
            variant={customProps.variant}
            glow={customProps.glow}
            className="h-12"
          />
          <span className="text-sm font-medium">Components</span>
          <Separator
            orientation="vertical"
            variant={customProps.variant}
            glow={customProps.glow}
            className="h-12"
          />
          <span className="text-sm font-medium">Studio</span>
        </div>
      );
    }

    return (
      <div className="w-full max-w-sm space-y-4 p-8">
        <div>
          <h4 className="text-sm font-semibold">Preview Block</h4>
          <p className="text-xs text-muted-foreground">Modular UI component system</p>
        </div>
        <Separator
          orientation="horizontal"
          variant={customProps.variant}
          glow={customProps.glow}
        />
        <div className="flex justify-between text-xs font-mono text-muted-foreground">
          <span>{customProps.variant.toUpperCase()}</span>
          <span>{customProps.glow ? "GLOW ON" : "STANDARD"}</span>
        </div>
      </div>
    );
  }

  // 1. Subtle Line
  if (activeTocId === "subtle") {
    return (
      <div className="w-full max-w-sm space-y-4 p-8">
        <span className="text-xs font-mono text-muted-foreground uppercase">Subtle Border</span>
        <Separator variant="subtle" />
        <span className="text-xs text-muted-foreground">Clean 10% opacity line for ultra-clean layouts</span>
      </div>
    );
  }

  // 2. Dashed Divider
  if (activeTocId === "dashed") {
    return (
      <div className="w-full max-w-sm space-y-4 p-8">
        <span className="text-xs font-mono text-muted-foreground uppercase">Dashed Pattern</span>
        <Separator variant="dashed" />
        <span className="text-xs text-muted-foreground">Lightweight dashed border for ticket stubs and cutoffs</span>
      </div>
    );
  }

  // 3. Vertical Separator
  if (activeTocId === "vertical") {
    return (
      <div className="flex items-center justify-center space-x-6 h-28 p-8 text-sm">
        <span className="font-medium">Home</span>
        <Separator orientation="vertical" className="h-6" />
        <span className="font-medium">Features</span>
        <Separator orientation="vertical" variant="dashed" className="h-6" />
        <span className="font-medium">Pricing</span>
        <Separator orientation="vertical" variant="gradient" className="h-6" />
        <span className="font-medium">Changelog</span>
      </div>
    );
  }

  // 4. Accent Aura Glow
  if (activeTocId === "glow") {
    return (
      <div className="w-full max-w-sm space-y-6 p-8">
        <div className="space-y-3">
          <span className="text-xs font-mono text-muted-foreground">Gradient with Neon Aura</span>
          <Separator variant="gradient" glow />
        </div>
        <div className="space-y-3">
          <span className="text-xs font-mono text-muted-foreground">Subtle with Ambient Glow</span>
          <Separator variant="subtle" glow />
        </div>
      </div>
    );
  }

  // Default: Basic (Gradient)
  return (
    <div className="w-full max-w-sm space-y-4 p-8">
      <div>
        <h4 className="text-sm font-semibold">Intense UI Framework</h4>
        <p className="text-xs text-muted-foreground">High performance component ecosystem.</p>
      </div>
      <Separator variant="gradient" />
      <div className="flex items-center space-x-4 text-xs text-muted-foreground">
        <span>Components</span>
        <Separator orientation="vertical" className="h-4" />
        <span>Documentation</span>
        <Separator orientation="vertical" className="h-4" />
        <span>Showcase</span>
      </div>
    </div>
  );
}
