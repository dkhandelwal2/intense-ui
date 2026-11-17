"use client";

import { useState, useEffect, useRef, useCallback } from "react";

export interface TimerLap {
  id: string;
  lapNumber: number;
  lapTime: number; // Duration of this specific lap in centiseconds
  overallTime: number; // Timestamp when lap was recorded
}

export function formatCentiseconds(
  totalCentiseconds: number,
  separator: "," | "." = ",",
  showHours: boolean = true,
  showCentiseconds: boolean = false
): string {
  const cs = Math.max(0, Math.floor(totalCentiseconds));
  const hours = Math.floor(cs / 360000);
  const minutes = Math.floor((cs % 360000) / 6000);
  const seconds = Math.floor((cs % 6000) / 100);
  const centi = cs % 100;

  const hh = String(hours).padStart(2, "0");
  const mm = String(minutes).padStart(2, "0");
  const ss = String(seconds).padStart(2, "0");
  const cc = String(centi).padStart(2, "0");

  const base = showHours ? `${hh}:${mm}:${ss}` : `${mm}:${ss}`;
  return showCentiseconds ? `${base}${separator}${cc}` : base;
}

export interface UseStopwatchOptions {
  initialCentiseconds?: number;
  autoStart?: boolean;
  showHours?: boolean;
  showCentiseconds?: boolean;
  format?: "hh:mm:ss" | "hh:mm:ss,cs" | "mm:ss,cs" | "mm:ss";
  onLap?: (lap: TimerLap) => void;
  onStart?: () => void;
  onPause?: () => void;
  onReset?: () => void;
  decimalSeparator?: "," | ".";
}

export function useStopwatch({
  initialCentiseconds = 0,
  autoStart = false,
  showHours = true,
  showCentiseconds = true,
  format = "hh:mm:ss,cs",
  onLap,
  onStart,
  onPause,
  onReset,
  decimalSeparator = ",",
}: UseStopwatchOptions = {}) {
  const [centiseconds, setCentiseconds] = useState(initialCentiseconds);
  const [isRunning, setIsRunning] = useState(autoStart);
  const [laps, setLaps] = useState<TimerLap[]>([]);

  const startTimeRef = useRef<number>(0);
  const accumulatedMsRef = useRef<number>(initialCentiseconds * 10);
  const lastLapMsRef = useRef<number>(0);

  const onLapRef = useRef(onLap);
  const onStartRef = useRef(onStart);
  const onPauseRef = useRef(onPause);
  const onResetRef = useRef(onReset);

  useEffect(() => {
    onLapRef.current = onLap;
    onStartRef.current = onStart;
    onPauseRef.current = onPause;
    onResetRef.current = onReset;
  }, [onLap, onStart, onPause, onReset]);

  const prevInitialCentisecondsRef = useRef(initialCentiseconds);

  // Sync if initialCentiseconds changes externally
  useEffect(() => {
    if (prevInitialCentisecondsRef.current !== initialCentiseconds) {
      prevInitialCentisecondsRef.current = initialCentiseconds;
      if (!isRunning) {
        setCentiseconds(initialCentiseconds);
        accumulatedMsRef.current = initialCentiseconds * 10;
      }
    }
  }, [initialCentiseconds, isRunning]);

  // Running Animation Frame Loop
  useEffect(() => {
    if (!isRunning) return;

    let rafId: number;
    const tick = () => {
      const now = performance.now();
      const elapsed = now - startTimeRef.current + accumulatedMsRef.current;
      const currentCs = Math.floor(elapsed / 10);
      setCentiseconds(currentCs);
      rafId = requestAnimationFrame(tick);
    };

    rafId = requestAnimationFrame(tick);

    return () => {
      cancelAnimationFrame(rafId);
    };
  }, [isRunning]);

  const start = useCallback(() => {
    if (isRunning) return;
    startTimeRef.current = performance.now();
    setIsRunning(true);
    onStartRef.current?.();
  }, [isRunning]);

  const pause = useCallback(() => {
    if (!isRunning) return;
    accumulatedMsRef.current += performance.now() - startTimeRef.current;
    setIsRunning(false);
    onPauseRef.current?.();
  }, [isRunning]);

  const toggle = useCallback(() => {
    if (isRunning) {
      pause();
    } else {
      start();
    }
  }, [isRunning, pause, start]);

  const reset = useCallback(() => {
    accumulatedMsRef.current = 0;
    startTimeRef.current = 0;
    lastLapMsRef.current = 0;
    setCentiseconds(0);
    setLaps([]);
    setIsRunning(false);
    onResetRef.current?.();
  }, []);

  const recordLap = useCallback(() => {
    const totalMs = isRunning
      ? performance.now() - startTimeRef.current + accumulatedMsRef.current
      : accumulatedMsRef.current;

    const lapDeltaMs = totalMs - lastLapMsRef.current;
    lastLapMsRef.current = totalMs;

    const newLap: TimerLap = {
      id: `lap-${Date.now()}-${laps.length + 1}`,
      lapNumber: laps.length + 1,
      lapTime: Math.floor(lapDeltaMs / 10),
      overallTime: Math.floor(totalMs / 10),
    };

    setLaps((prev) => [newLap, ...prev]);
    onLapRef.current?.(newLap);
    return newLap;
  }, [isRunning, laps.length]);

  // Determine formatting options
  const shouldShowHours =
    format === "hh:mm:ss" || format === "hh:mm:ss,cs" || (format ? false : showHours);
  const shouldShowCentis =
    format === "hh:mm:ss" || format === "mm:ss" ? false : showCentiseconds;

  return {
    centiseconds,
    formattedTime: formatCentiseconds(
      centiseconds,
      decimalSeparator,
      shouldShowHours,
      shouldShowCentis
    ),
    isRunning,
    laps,
    start,
    pause,
    toggle,
    reset,
    recordLap,
  };
}
