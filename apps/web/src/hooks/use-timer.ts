"use client";

import { useState, useEffect, useRef, useCallback } from "react";

export type TimerStatus = "idle" | "running" | "paused" | "completed";

export interface UseTimerOptions {
  initialSeconds: number;
  autoStart?: boolean;
  onComplete?: () => void;
  onTick?: (remaining: number) => void;
  showHours?: boolean;
}

export function formatSeconds(totalSeconds: number, showHours: boolean = true): string {
  const s = Math.max(0, Math.floor(totalSeconds));
  const hours = Math.floor(s / 3600);
  const minutes = Math.floor((s % 3600) / 60);
  const seconds = s % 60;

  const hh = String(hours).padStart(2, "0");
  const mm = String(minutes).padStart(2, "0");
  const ss = String(seconds).padStart(2, "0");

  if (hours > 0 || showHours) {
    return `${hh}:${mm}:${ss}`;
  }

  return `${mm}:${ss}`;
}

export function useTimer({
  initialSeconds,
  autoStart = false,
  onComplete,
  onTick,
  showHours = true,
}: UseTimerOptions) {
  const [remaining, setRemaining] = useState<number>(initialSeconds);
  const [status, setStatus] = useState<TimerStatus>(autoStart ? "running" : "idle");
  const [totalDuration, setTotalDuration] = useState<number>(initialSeconds);

  // Performance drift tracking references
  const startTimeRef = useRef<number>(0);
  const startRemainingRef = useRef<number>(initialSeconds);
  const onCompleteRef = useRef(onComplete);
  const onTickRef = useRef(onTick);

  useEffect(() => {
    onCompleteRef.current = onComplete;
    onTickRef.current = onTick;
  }, [onComplete, onTick]);

  // Sync state if initialSeconds prop changes from the outside
  useEffect(() => {
    setTotalDuration(initialSeconds);
    setRemaining(initialSeconds);
    startRemainingRef.current = initialSeconds;
    setStatus(autoStart ? "running" : "idle");
  }, [initialSeconds, autoStart]);

  // High-precision countdown ticker avoiding background-tab setInterval drift
  useEffect(() => {
    if (status !== "running") return;

    startTimeRef.current = performance.now();
    startRemainingRef.current = remaining;

    const intervalId = window.setInterval(() => {
      const now = performance.now();
      const elapsedSeconds = Math.floor((now - startTimeRef.current) / 1000);
      const nextRemaining = Math.max(0, startRemainingRef.current - elapsedSeconds);

      setRemaining((prev) => {
        if (prev !== nextRemaining) {
          onTickRef.current?.(nextRemaining);
          if (nextRemaining === 0) {
            window.clearInterval(intervalId);
            setStatus("completed");
            onCompleteRef.current?.();
          }
          return nextRemaining;
        }
        return prev;
      });
    }, 100); // 100ms polling for responsive drift correction

    return () => {
      window.clearInterval(intervalId);
    };
  }, [status, remaining]);

  const start = useCallback(() => {
    if (remaining > 0) {
      startTimeRef.current = performance.now();
      startRemainingRef.current = remaining;
      setStatus("running");
    }
  }, [remaining]);

  const pause = useCallback(() => {
    setStatus("paused");
  }, []);

  const toggle = useCallback(() => {
    if (status === "running") {
      pause();
    } else {
      start();
    }
  }, [status, pause, start]);

  const reset = useCallback(
    (newSeconds?: number) => {
      const nextSec = newSeconds !== undefined ? newSeconds : totalDuration;
      setRemaining(nextSec);
      startRemainingRef.current = nextSec;
      setStatus("idle");
    },
    [totalDuration]
  );

  const setDuration = useCallback((seconds: number) => {
    setTotalDuration(seconds);
    setRemaining(seconds);
    startRemainingRef.current = seconds;
    setStatus("idle");
  }, []);

  // Compute progress ratio safely [0..1]
  const remainingProgress =
    totalDuration > 0 ? Math.max(0, Math.min(1, remaining / totalDuration)) : 0;

  const isRunning = status === "running";
  const formattedTime = formatSeconds(remaining, showHours);

  return {
    remaining,
    totalDuration,
    status,
    remainingProgress,
    formattedTime,
    isRunning,
    start,
    pause,
    toggle,
    reset,
    setDuration,
  };
}
