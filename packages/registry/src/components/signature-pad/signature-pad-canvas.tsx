"use client";

import React, { useEffect, useRef, useCallback } from "react";
import { cn } from "@/lib/utils";
import { resolveInkColor } from "./signature-pad-helpers";
import type { SignaturePadCanvasProps, SignaturePoint, SignatureStroke } from "./types";

export function SignaturePadCanvas({
  canvasRef,
  strokes,
  setStrokes,
  strokeColor,
  strokeWidth,
  width,
  height,
  disabled = false,
  onStrokeEnd,
  className,
}: SignaturePadCanvasProps) {
  const isDrawingRef = useRef(false);
  const currentPointsRef = useRef<SignaturePoint[]>([]);

  const redraw = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const dpr = typeof window !== "undefined" ? window.devicePixelRatio || 1 : 1;
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.save();
    ctx.scale(dpr, dpr);

    for (const stroke of strokes) {
      if (stroke.points.length === 0) continue;
      const resolvedColor = resolveInkColor(stroke.color, canvas);
      ctx.strokeStyle = resolvedColor;
      ctx.fillStyle = resolvedColor;
      ctx.lineWidth = stroke.width;
      ctx.lineCap = "round";
      ctx.lineJoin = "round";

      if (stroke.points.length === 1) {
        ctx.beginPath();
        ctx.arc(stroke.points[0].x, stroke.points[0].y, stroke.width / 2, 0, Math.PI * 2);
        ctx.fill();
        continue;
      }

      ctx.beginPath();
      ctx.moveTo(stroke.points[0].x, stroke.points[0].y);
      for (let i = 1; i < stroke.points.length - 1; i++) {
        const p1 = stroke.points[i];
        const p2 = stroke.points[i + 1];
        const midX = (p1.x + p2.x) / 2;
        const midY = (p1.y + p2.y) / 2;
        ctx.quadraticCurveTo(p1.x, p1.y, midX, midY);
      }
      const last = stroke.points[stroke.points.length - 1];
      ctx.lineTo(last.x, last.y);
      ctx.stroke();
    }

    ctx.restore();
  }, [canvasRef, strokes]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const dpr = typeof window !== "undefined" ? window.devicePixelRatio || 1 : 1;
    canvas.width = width * dpr;
    canvas.height = height * dpr;
    canvas.style.width = `${width}px`;
    canvas.style.height = `${height}px`;
    redraw();
  }, [canvasRef, width, height, redraw]);

  useEffect(() => {
    const hasCssVar = strokes.some((s) => s.color.includes("var("));
    if (!hasCssVar || typeof MutationObserver === "undefined") return;
    const observer = new MutationObserver(() => redraw());
    observer.observe(document.documentElement, { attributes: true, attributeFilter: ["style", "class"] });
    return () => observer.disconnect();
  }, [strokes, redraw]);

  const getCanvasPoint = (e: React.PointerEvent<HTMLCanvasElement>): SignaturePoint | null => {
    const canvas = canvasRef.current;
    if (!canvas) return null;
    const rect = canvas.getBoundingClientRect();
    return {
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
      time: Date.now(),
      pressure: e.pressure || 0.5,
    };
  };

  const handlePointerDown = (e: React.PointerEvent<HTMLCanvasElement>) => {
    if (disabled || e.button !== 0) return;
    e.currentTarget.setPointerCapture(e.pointerId);
    isDrawingRef.current = true;
    const pt = getCanvasPoint(e);
    if (!pt) return;
    currentPointsRef.current = [pt];

    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    const dpr = typeof window !== "undefined" ? window.devicePixelRatio || 1 : 1;
    ctx.save();
    ctx.scale(dpr, dpr);
    ctx.fillStyle = resolveInkColor(strokeColor, canvas);
    ctx.beginPath();
    ctx.arc(pt.x, pt.y, strokeWidth / 2, 0, Math.PI * 2);
    ctx.fill();
    ctx.restore();
  };

  const handlePointerMove = (e: React.PointerEvent<HTMLCanvasElement>) => {
    if (!isDrawingRef.current || disabled) return;
    const pt = getCanvasPoint(e);
    if (!pt) return;

    const pts = currentPointsRef.current;
    pts.push(pt);

    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const dpr = typeof window !== "undefined" ? window.devicePixelRatio || 1 : 1;
    ctx.save();
    ctx.scale(dpr, dpr);
    ctx.strokeStyle = resolveInkColor(strokeColor, canvas);
    ctx.lineWidth = strokeWidth;
    ctx.lineCap = "round";
    ctx.lineJoin = "round";

    if (pts.length > 2) {
      const p1 = pts[pts.length - 2];
      const p0 = pts[pts.length - 3];
      const midPrev = { x: (p0.x + p1.x) / 2, y: (p0.y + p1.y) / 2 };
      const midCur = { x: (p1.x + pt.x) / 2, y: (p1.y + pt.y) / 2 };

      ctx.beginPath();
      ctx.moveTo(midPrev.x, midPrev.y);
      ctx.quadraticCurveTo(p1.x, p1.y, midCur.x, midCur.y);
      ctx.stroke();
    }
    ctx.restore();
  };

  const finishStroke = () => {
    if (!isDrawingRef.current) return;
    isDrawingRef.current = false;
    const pts = [...currentPointsRef.current];
    currentPointsRef.current = [];
    if (pts.length > 0) {
      const newStroke: SignatureStroke = {
        points: pts,
        color: strokeColor,
        width: strokeWidth,
      };
      setStrokes((prev) => [...prev, newStroke]);
      onStrokeEnd?.();
    }
  };

  return (
    <canvas
      ref={canvasRef}
      onPointerDown={handlePointerDown}
      onPointerMove={handlePointerMove}
      onPointerUp={finishStroke}
      onPointerCancel={finishStroke}
      className={cn(
        "touch-none select-none cursor-crosshair rounded-2xl block",
        disabled && "opacity-50 pointer-events-none",
        className
      )}
      style={{ width, height }}
    />
  );
}
