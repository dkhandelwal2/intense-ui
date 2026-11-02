"use client";

import React, { useState, useEffect } from "react";
import { useMediaQuery } from "@/hooks/use-media-query";
import { DesktopCanvasView } from "./desktop-canvas-view";
import { MobileCanvasView } from "./mobile-canvas-view";
import type { BentoCanvasProps } from "./types";

/**
 * Unified Responsive Bento Canvas:
 * Guarantees that only ONE view (DesktopCanvasView or MobileCanvasView) is mounted
 * in the DOM at any given time.
 * - Server / Mobile: Uses User-Agent device detection on SSR to immediately render
 *   MobileCanvasView on mobile devices (zero flash, zero clutter on refresh).
 * - Desktop: Renders DesktopCanvasView on desktop.
 * - Dynamic: Adapts smoothly to viewport resizing via useMediaQuery.
 */
export const BentoCanvas = React.memo(function BentoCanvas(props: BentoCanvasProps) {
  const isMobileServer = props.isMobileDevice ?? false;
  const [mounted, setMounted] = useState(false);
  const isDesktopQuery = useMediaQuery("(min-width: 1280px)", !isMobileServer);

  useEffect(() => {
    setMounted(true);
  }, []);

  const isDesktop = mounted ? isDesktopQuery : !isMobileServer;

  if (isDesktop) {
    return (
      <div className="hidden xl:flex flex-1 min-h-0 min-w-0 w-full h-full">
        <DesktopCanvasView {...props} />
      </div>
    );
  }

  return (
    <div className="flex xl:hidden flex-1 min-h-0 min-w-0 w-full h-full flex-col">
      <MobileCanvasView {...props} />
    </div>
  );
});
