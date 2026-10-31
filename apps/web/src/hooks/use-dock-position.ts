"use client";

import * as React from "react";

export function useDockPosition(
  isInline?: boolean,
  centerColumnRef?: React.RefObject<HTMLElement | null>
): number | null {
  const [centerX, setCenterX] = React.useState<number | null>(null);

  React.useEffect(() => {
    if (isInline) return;

    const updatePosition = () => {
      const target =
        (centerColumnRef && centerColumnRef.current) ||
        document.getElementById("center-content-column");

      if (target) {
        const rect = target.getBoundingClientRect();
        setCenterX(rect.left + rect.width / 2);
      }
    };

    updatePosition();
    window.addEventListener("resize", updatePosition);
    window.addEventListener("scroll", updatePosition, { passive: true });

    const target =
      (centerColumnRef && centerColumnRef.current) ||
      document.getElementById("center-content-column");

    let observer: ResizeObserver | null = null;
    if (target && typeof ResizeObserver !== "undefined") {
      observer = new ResizeObserver(updatePosition);
      observer.observe(target);
    }

    return () => {
      window.removeEventListener("resize", updatePosition);
      window.removeEventListener("scroll", updatePosition);
      observer?.disconnect();
    };
  }, [centerColumnRef, isInline]);

  return centerX;
}
