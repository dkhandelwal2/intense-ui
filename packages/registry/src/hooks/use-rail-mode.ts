"use client";

import * as React from "react";
import type { MotionValue } from "framer-motion";

export function useRailMode(progress?: MotionValue<number>): boolean {
  const [isRailMode, setIsRailMode] = React.useState(false);

  React.useEffect(() => {
    if (!progress) return;
    const initialRailMode = progress.get() > 0.7;
    setIsRailMode(initialRailMode);
    let prevRailMode = initialRailMode;

    let timeoutId: NodeJS.Timeout | null = null;
    const unsub = progress.on("change", (latest) => {
      const nextRailMode = latest > 0.7;
      if (nextRailMode !== prevRailMode) {
        prevRailMode = nextRailMode;
        if (timeoutId) clearTimeout(timeoutId);
        timeoutId = setTimeout(() => {
          setIsRailMode(nextRailMode);
        }, 0);
      }
    });

    return () => {
      unsub();
      if (timeoutId) clearTimeout(timeoutId);
    };
  }, [progress]);

  return isRailMode;
}
