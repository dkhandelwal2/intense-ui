"use client";

import { useEffect, useRef } from "react";
import { DEFAULT_IDLE_TIMEOUT_MS } from "@/config/screensaver";

export { DEFAULT_IDLE_TIMEOUT_MS };

export interface UseIdleScreensaverOptions {
  enabled?: boolean;
  timeoutMs?: number | null;
  onIdle: () => void;
  isScreensaverOpen: boolean;
}

export function useIdleScreensaver({
  enabled = true,
  timeoutMs = DEFAULT_IDLE_TIMEOUT_MS,
  onIdle,
  isScreensaverOpen,
}: UseIdleScreensaverOptions) {
  const onIdleRef = useRef(onIdle);
  onIdleRef.current = onIdle;

  useEffect(() => {
    if (typeof window === "undefined") return;
    if (
      !enabled ||
      timeoutMs === null ||
      timeoutMs === undefined ||
      timeoutMs <= 0 ||
      isScreensaverOpen
    ) {
      return;
    }

    let timerId: ReturnType<typeof setTimeout> | null = null;
    let lastActivity = Date.now();

    const startTimer = () => {
      if (timerId) clearTimeout(timerId);
      timerId = setTimeout(() => {
        onIdleRef.current();
      }, timeoutMs);
    };

    const handleActivity = () => {
      const now = Date.now();
      // Throttle activity checks so high-frequency events don't thrash timers
      if (now - lastActivity > 500) {
        lastActivity = now;
        startTimer();
      }
    };

    startTimer();

    const activityEvents = [
      "mousemove",
      "mousedown",
      "keydown",
      "touchstart",
      "scroll",
      "wheel",
    ] as const;

    activityEvents.forEach((event) => {
      window.addEventListener(event, handleActivity, { passive: true });
    });

    return () => {
      if (timerId) clearTimeout(timerId);
      activityEvents.forEach((event) => {
        window.removeEventListener(event, handleActivity);
      });
    };
  }, [enabled, timeoutMs, isScreensaverOpen]);
}
