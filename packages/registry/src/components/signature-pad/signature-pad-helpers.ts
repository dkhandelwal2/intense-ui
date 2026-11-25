import type { SignatureStroke, SignatureResult } from "./types";

/** Resolves CSS variables (such as `var(--theme-primary)`) into concrete colors for Canvas 2D rendering. */
export function resolveInkColor(color: string, element?: HTMLElement | null): string {
  if (!color) return "#18181b";
  const trimmed = color.trim();
  if (!trimmed.startsWith("var(")) return trimmed;

  const match = trimmed.match(/^var\(\s*(--[^,\s)]+)(?:\s*,\s*([^)]+))?\s*\)$/);
  if (!match) return "#FF0084";

  const [, varName, fallback] = match;
  if (typeof window !== "undefined") {
    const target = element || document.documentElement;
    const computed = getComputedStyle(target).getPropertyValue(varName).trim();
    if (computed) return computed;
  }

  if (fallback) return fallback.trim();
  return varName === "--theme-primary" ? "#FF0084" : "#18181b";
}

export function generateSignatureSvg(
  strokes: SignatureStroke[],
  width: number,
  height: number
): string {
  const paths = strokes.map((s) => {
    if (s.points.length === 0) return "";
    if (s.points.length === 1) {
      return `<circle cx="${s.points[0].x}" cy="${s.points[0].y}" r="${s.width / 2}" fill="${s.color}" />`;
    }
    let d = `M ${s.points[0].x} ${s.points[0].y}`;
    for (let i = 1; i < s.points.length - 1; i++) {
      const midX = (s.points[i].x + s.points[i + 1].x) / 2;
      const midY = (s.points[i].y + s.points[i + 1].y) / 2;
      d += ` Q ${s.points[i].x} ${s.points[i].y} ${midX} ${midY}`;
    }
    const last = s.points[s.points.length - 1];
    d += ` L ${last.x} ${last.y}`;
    return `<path d="${d}" fill="none" stroke="${s.color}" stroke-width="${s.width}" stroke-linecap="round" stroke-linejoin="round" />`;
  });

  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${width} ${height}" width="${width}" height="${height}">${paths.join("")}</svg>`;
}

export function extractSignatureResult(
  canvas: HTMLCanvasElement | null,
  strokes: SignatureStroke[],
  width: number,
  height: number
): SignatureResult {
  let dataUrl = "";
  try {
    dataUrl = canvas && typeof canvas.toDataURL === "function" ? canvas.toDataURL("image/png", 0.92) || "" : "";
  } catch {
    dataUrl = "";
  }
  const svg = generateSignatureSvg(strokes, width, height);
  return {
    dataUrl: dataUrl || "",
    svg,
    strokes,
    isEmpty: strokes.length === 0,
  };
}
