"use client";

import React, {
  forwardRef,
  useRef,
  useImperativeHandle,
  useEffect,
  useCallback,
} from "react";
import { cn } from "@/lib/utils";
import { ConfettiOptions, ConfettiProps, ConfettiRef } from "./types";
import { ConfettiEngine } from "./engine";

let globalEngine: ConfettiEngine | null = null;
let globalCanvas: HTMLCanvasElement | null = null;

export const confetti = (options?: ConfettiOptions) => {
  if (typeof window === "undefined") return;
  const dpr = window.devicePixelRatio || 1;
  const w = window.innerWidth;
  const h = window.innerHeight;

  if (!globalCanvas) {
    globalCanvas = document.createElement("canvas");
    globalCanvas.style.position = "fixed";
    globalCanvas.style.inset = "0";
    globalCanvas.style.width = "100vw";
    globalCanvas.style.height = "100vh";
    globalCanvas.style.pointerEvents = "none";
    globalCanvas.style.zIndex = String(options?.zIndex ?? 9999);
    document.body.appendChild(globalCanvas);

    globalCanvas.width = Math.round(w * dpr);
    globalCanvas.height = Math.round(h * dpr);
    globalEngine = new ConfettiEngine(globalCanvas);

    window.addEventListener("resize", () => {
      if (globalCanvas) {
        const ratio = window.devicePixelRatio || 1;
        globalCanvas.width = Math.round(window.innerWidth * ratio);
        globalCanvas.height = Math.round(window.innerHeight * ratio);
      }
    });
  } else {
    if (globalCanvas.width !== Math.round(w * dpr) || globalCanvas.height !== Math.round(h * dpr)) {
      globalCanvas.width = Math.round(w * dpr);
      globalCanvas.height = Math.round(h * dpr);
    }
    if (options?.zIndex) {
      globalCanvas.style.zIndex = String(options.zIndex);
    }
  }

  globalEngine?.fire(options);
};

export const Confetti = forwardRef<ConfettiRef, ConfettiProps>(
  ({ options, manualstart = false, className, children, ...props }, ref) => {
    const canvasRef = useRef<HTMLCanvasElement | null>(null);
    const engineRef = useRef<ConfettiEngine | null>(null);

    const updateSize = useCallback(() => {
      const canvas = canvasRef.current;
      if (!canvas) return;
      const rect = canvas.getBoundingClientRect();
      const dpr = window.devicePixelRatio || 1;
      const w = rect.width || window.innerWidth;
      const h = rect.height || window.innerHeight;
      canvas.width = Math.round(w * dpr);
      canvas.height = Math.round(h * dpr);
    }, []);

    useEffect(() => {
      if (!canvasRef.current) return;
      updateSize();
      engineRef.current = new ConfettiEngine(canvasRef.current);

      if (!manualstart) {
        engineRef.current.fire(options);
      }

      window.addEventListener("resize", updateSize);
      return () => {
        window.removeEventListener("resize", updateSize);
        engineRef.current?.reset();
      };
    }, [manualstart, options, updateSize]);

    useImperativeHandle(
      ref,
      () => ({
        fire: (opts?: ConfettiOptions) => {
          engineRef.current?.fire({ ...options, ...opts });
        },
        reset: () => {
          engineRef.current?.reset();
        },
      }),
      [options]
    );

    return (
      <div className={cn("relative w-full h-full min-h-[200px]", className)} {...props}>
        <canvas
          ref={canvasRef}
          className="absolute inset-0 w-full h-full pointer-events-none"
        />
        {children}
      </div>
    );
  }
);

Confetti.displayName = "Confetti";
