"use client";

import React, { useState, useEffect } from "react";
import { useMediaQuery } from "@/hooks/use-media-query";
import { DesktopCanvasView } from "./desktop-canvas-view";
import { MobileCanvasView } from "./mobile-canvas-view";
import type { BentoCanvasProps } from "./types";

/**
 * Unified Bento Canvas:
 * 1. During SSR and first paint: Uses responsive CSS (xl:hidden / hidden xl:flex) to
 *    guarantee instantaneous rendering with ZERO layout shift or mobile flash on hard refresh.
 * 2. After client hydration: Conditionally unmounts the inactive view to ensure
 *    mobile devices have zero desktop DOM nodes.
 */
export const BentoCanvas = React.memo(function BentoCanvas(props: BentoCanvasProps) {
  const [mounted, setMounted] = useState(false);
  const isDesktop = useMediaQuery("(min-width: 1280px)", false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (mounted) {
    if (isDesktop) {
      return (
        <div className="flex flex-1 min-h-0 min-w-0 w-full h-full">
          <DesktopCanvasView {...props} />
        </div>
      );
    }
    return (
      <div className="flex flex-1 min-h-0 min-w-0 w-full h-full flex-col">
        <MobileCanvasView {...props} />
      </div>
    );
  }

  return (
    <>
      <div className="flex flex-1 min-h-0 min-w-0 w-full h-full flex-col xl:hidden">
        <MobileCanvasView {...props} />
      </div>
      <div className="hidden xl:flex flex-1 min-h-0 min-w-0 w-full h-full">
        <DesktopCanvasView {...props} />
      </div>
    </>
  );
});
