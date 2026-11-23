"use client";

import React, { useEffect, useRef, useState, useCallback } from "react";
import { cn } from "@/lib/utils";
import { formatContributionDate } from "./constants";
import {
  THEME_3D_COLORS, buildRenderBars, drawBasePlatform, drawSkylineBars,
  drawMonthLabels, isPointInPolygon, RenderBar,
} from "./github-activity-3d-helpers";
import type { GithubContributionDay, GithubActivityTheme, GithubActivityDotSize } from "./types";

export interface GithubActivity3DProps {
  weeks: GithubContributionDay[][];
  monthPositions?: { weekIndex: number; label: string }[];
  theme?: GithubActivityTheme;
  dotSize?: GithubActivityDotSize;
  isLoading?: boolean;
  onDayClick?: (day: GithubContributionDay) => void;
  className?: string;
}

export function GithubActivity3D({
  weeks,
  monthPositions,
  theme = "github",
  dotSize = "md",
  isLoading = false,
  onDayClick,
  className,
}: GithubActivity3DProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const yawRef = useRef(0.58);
  const pitchRef = useRef(0.52);
  const isDraggingRef = useRef(false);
  const dragDistRef = useRef(0);
  const lastPosRef = useRef({ x: 0, y: 0 });
  const [hovered, setHovered] = useState<{ day: GithubContributionDay; x: number; y: number } | null>(null);
  const renderBarsRef = useRef<RenderBar[]>([]);

  const draw = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const rect = canvas.getBoundingClientRect();
    const dpr = Math.min(2, window.devicePixelRatio || 1);
    const w = rect.width;
    const h = rect.height;
    if (w <= 0 || h <= 0) return;

    if (canvas.width !== Math.round(w * dpr) || canvas.height !== Math.round(h * dpr)) {
      canvas.width = Math.round(w * dpr);
      canvas.height = Math.round(h * dpr);
    }
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    ctx.resetTransform?.();
    ctx.scale(dpr, dpr);
    ctx.clearRect(0, 0, w, h);

    const isDark =
      typeof document !== "undefined" &&
      (document.documentElement.classList.contains("dark") ||
        (!document.documentElement.classList.contains("light") &&
          Boolean(window.matchMedia?.("(prefers-color-scheme: dark)").matches)));
    const colors = (THEME_3D_COLORS[theme] || THEME_3D_COLORS.github)[isDark ? "dark" : "light"];
    const yaw = yawRef.current;
    const pitch = pitchRef.current;
    const numCols = Math.max(1, weeks.length);
    const numRows = 7;
    const spacing = 4.8;
    const barSize = dotSize === "sm" ? 2.4 : dotSize === "lg" ? 4.5 : 3.6;
    const cx = ((numCols - 1) * spacing) / 2;
    const cz = ((numRows - 1) * spacing) / 2;
    const cosY = Math.cos(yaw); const sinY = Math.sin(yaw);
    const cosP = Math.cos(pitch); const sinP = Math.sin(pitch);
    const groundHalfH = (cx * Math.abs(sinY) + cz * Math.abs(cosY)) * sinP;
    const spanX = 2 * (cx * Math.abs(cosY) + cz * Math.abs(sinY)) + barSize + 2;
    const spanY = 2 * groundHalfH + 42 * cosP + barSize + 8;
    const scale = Math.min((w - 18) / Math.max(80, spanX), (h - 18) / Math.max(60, spanY));
    const ox = w / 2;
    const oy = h - 14 - (groundHalfH + 2.5 * cosP) * scale;

    drawBasePlatform(ctx, cx, cz, numCols, numRows, spacing, yaw, pitch, scale, ox, oy, isDark);
    drawMonthLabels(ctx, monthPositions || [], cx, cz, numRows, spacing, yaw, pitch, scale, ox, oy, isDark);
    const bars = buildRenderBars(weeks, cx, cz, yaw, pitch, scale, ox, oy, spacing, barSize);
    renderBarsRef.current = bars;
    drawSkylineBars(ctx, bars, colors, hovered?.day?.date, isDark);
  }, [weeks, monthPositions, theme, dotSize, hovered]);

  useEffect(() => { draw(); }, [draw]);

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;
    const ro = typeof ResizeObserver !== "undefined" ? new ResizeObserver(() => draw()) : null;
    ro?.observe(el);
    const mo = typeof MutationObserver !== "undefined" ? new MutationObserver(() => draw()) : null;
    if (typeof document !== "undefined") {
      mo?.observe(document.documentElement, {
        attributes: true,
        attributeFilter: ["class", "data-theme"],
      });
    }
    const mq = typeof window !== "undefined" ? window.matchMedia?.("(prefers-color-scheme: dark)") : null;
    const onMediaChange = () => draw();
    mq?.addEventListener?.("change", onMediaChange);
    return () => {
      ro?.disconnect();
      mo?.disconnect();
      mq?.removeEventListener?.("change", onMediaChange);
    };
  }, [draw]);

  const handlePointerDown = (e: React.PointerEvent<HTMLCanvasElement>) => {
    isDraggingRef.current = true;
    dragDistRef.current = 0;
    lastPosRef.current = { x: e.clientX, y: e.clientY };
    e.currentTarget.setPointerCapture(e.pointerId);
  };

  const handlePointerMove = (e: React.PointerEvent<HTMLCanvasElement>) => {
    if (isDraggingRef.current) {
      const dx = e.clientX - lastPosRef.current.x;
      const dy = e.clientY - lastPosRef.current.y;
      dragDistRef.current += Math.abs(dx) + Math.abs(dy);
      yawRef.current = Math.max(-0.25, Math.min(1.4, yawRef.current + dx * 0.008));
      pitchRef.current = Math.max(0.22, Math.min(0.85, pitchRef.current + dy * 0.006));
      lastPosRef.current = { x: e.clientX, y: e.clientY };
      if (hovered) setHovered(null);
      draw();
      return;
    }
    const rect = canvasRef.current?.getBoundingClientRect();
    if (!rect) return;
    const mx = e.clientX - rect.left;
    const my = e.clientY - rect.top;
    const bars = renderBarsRef.current;
    for (let i = bars.length - 1; i >= 0; i--) {
      const b = bars[i];
      if (isPointInPolygon(mx, my, b.topPoly) || isPointInPolygon(mx, my, b.side1Poly) || isPointInPolygon(mx, my, b.side2Poly)) {
        setHovered({ day: b.day, x: mx, y: my });
        return;
      }
    }
    if (hovered) setHovered(null);
  };

  const handlePointerUp = (e: React.PointerEvent<HTMLCanvasElement>) => {
    if (isDraggingRef.current && dragDistRef.current < 5 && hovered) {
      onDayClick?.(hovered.day);
    }
    isDraggingRef.current = false;
    try { e.currentTarget.releasePointerCapture(e.pointerId); } catch { }
  };

  const handleDoubleClick = () => {
    yawRef.current = 0.58;
    pitchRef.current = 0.52;
    draw();
  };

  return (
    <div ref={containerRef} className={cn("relative w-full h-[200px] sm:h-[380px] flex flex-col items-center justify-between overflow-hidden select-none", className)}>
      {hovered && (
        <div
          className="absolute z-20 pointer-events-none px-2.5 py-1 rounded-md text-[11px] font-medium bg-zinc-900/90 dark:bg-zinc-100/90 text-white dark:text-zinc-900 shadow-md backdrop-blur-xs transition-all duration-75"
          style={{ left: Math.max(8, Math.min((containerRef.current?.clientWidth || 200) - 180, hovered.x - 70)), top: Math.max(4, hovered.y - 36) }}
        >
          {hovered.day.count === 0 ? "No" : hovered.day.count} contribution{hovered.day.count === 1 ? "" : "s"} on {formatContributionDate(hovered.day.date)}
        </div>
      )}
      <canvas
        ref={canvasRef}
        role="img"
        aria-label="GitHub activity shown as a 3D skyline"
        onPointerDown={handlePointerDown}
        onPointerMove={handlePointerMove}
        onPointerUp={handlePointerUp}
        onPointerLeave={() => { isDraggingRef.current = false; setHovered(null); }}
        onDoubleClick={handleDoubleClick}
        className="w-full flex-1 min-h-0 cursor-grab active:cursor-grabbing touch-none block"
      />
      <div className="shrink-0 h-4 flex items-center justify-center text-[10px] text-zinc-400 dark:text-zinc-500 font-mono tracking-tight pointer-events-none select-none text-center">
        Drag to orbit · double-click to reset
      </div>
    </div>
  );
}
