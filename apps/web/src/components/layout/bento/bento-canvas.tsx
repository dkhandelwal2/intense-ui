"use client";

import React from "react";
import { useMediaQuery } from "@/hooks/use-media-query";
import { DesktopCanvasView } from "./desktop-canvas-view";
import { MobileCanvasView } from "./mobile-canvas-view";
import type { BentoCanvasProps } from "./types";

/**
 * Unified Bento Canvas:
 * Conditionally mounts only the active viewport hierarchy (Desktop vs Mobile)
 * based on media query, ensuring desktop DOM nodes are completely excluded on mobile.
 */
export const BentoCanvas = React.memo(function BentoCanvas(props: BentoCanvasProps) {
  const isDesktop = useMediaQuery("(min-width: 1280px)", false);

  if (!isDesktop) {
    return (
      <div className="flex flex-1 min-h-0 min-w-0 w-full h-full flex-col">
        <MobileCanvasView {...props} />
      </div>
    );
  }

  return (
    <div className="flex flex-1 min-h-0 min-w-0 w-full h-full">
      <DesktopCanvasView {...props} />
    </div>
  );
});
