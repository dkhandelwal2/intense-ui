import type { GithubActivityTheme, GithubContributionLevel, GithubContributionDay } from "./types";

export const THEME_3D_COLORS: Record<GithubActivityTheme, { dark: string[]; light: string[] }> = {
  github: {
    dark: ["#161b22", "#0e4429", "#006d32", "#26a641", "#39d353"],
    light: ["#ebedf0", "#9be9a8", "#40c463", "#30a14e", "#216e39"],
  },
  emerald: {
    dark: ["#18231d", "#064e3b", "#047857", "#059669", "#34d399"],
    light: ["#e6f4ea", "#a7f3d0", "#34d399", "#10b981", "#059669"],
  },
  cyan: {
    dark: ["#13222a", "#164e63", "#0e7490", "#0891b2", "#22d3ee"],
    light: ["#e0f2fe", "#a5f3fc", "#22d3ee", "#06b6d4", "#0891b2"],
  },
  amber: {
    dark: ["#262118", "#78350f", "#b45309", "#d97706", "#fbbf24"],
    light: ["#fef3c7", "#fde68a", "#fbbf24", "#f59e0b", "#d97706"],
  },
  rose: {
    dark: ["#27181c", "#881337", "#be123c", "#e11d48", "#fb7185"],
    light: ["#ffe4e6", "#fecdd3", "#fb7185", "#f43f5e", "#e11d48"],
  },
  purple: {
    dark: ["#221827", "#581c87", "#7e22ce", "#9333ea", "#c084fc"],
    light: ["#f3e8ff", "#e9d5ff", "#c084fc", "#a855f7", "#9333ea"],
  },
  monochrome: {
    dark: ["#27272a", "#3f3f46", "#71717a", "#a1a1aa", "#f4f4f5"],
    light: ["#f4f4f5", "#d4d4d8", "#a1a1aa", "#52525b", "#18181b"],
  },
};

export function adjustBrightness(hex: string, factor: number): string {
  const clean = hex.replace("#", "");
  const num = parseInt(clean.length === 3 ? clean.split("").map((c) => c + c).join("") : clean, 16);
  if (Number.isNaN(num)) return hex;
  const r = Math.min(255, Math.max(0, Math.round(((num >> 16) & 0xff) * factor)));
  const g = Math.min(255, Math.max(0, Math.round(((num >> 8) & 0xff) * factor)));
  const b = Math.min(255, Math.max(0, Math.round((num & 0xff) * factor)));
  return `rgb(${r},${g},${b})`;
}

export interface Point2D { x: number; y: number; depth: number; }

export function project3D(
  x: number, y: number, z: number,
  cx: number, cz: number,
  yaw: number, pitch: number,
  scale: number, originX: number, originY: number
): Point2D {
  const dx = x - cx; const dz = z - cz; const dy = y;
  const cosY = Math.cos(yaw); const sinY = Math.sin(yaw);
  const rx = dx * cosY - dz * sinY; const rz = dx * sinY + dz * cosY;
  const cosP = Math.cos(pitch); const sinP = Math.sin(pitch);
  const ry = dy * cosP - rz * sinP; const depth = dy * sinP + rz * cosP;
  return { x: originX + rx * scale, y: originY - ry * scale, depth };
}

export function getBarHeight(level: GithubContributionLevel, count: number): number {
  if (level === 0) return 1.5;
  if (level === 1) return 7;
  if (level === 2) return 14;
  if (level === 3) return 22;
  return Math.min(42, 30 + Math.min(12, count * 0.6));
}

export function isPointInPolygon(px: number, py: number, poly: { x: number; y: number }[]): boolean {
  let inside = false;
  for (let i = 0, j = poly.length - 1; i < poly.length; j = i++) {
    const xi = poly[i].x; const yi = poly[i].y;
    const xj = poly[j].x; const yj = poly[j].y;
    const intersect = ((yi > py) !== (yj > py)) && (px < ((xj - xi) * (py - yi)) / (yj - yi) + xi);
    if (intersect) inside = !inside;
  }
  return inside;
}

export interface RenderBar {
  day: GithubContributionDay;
  x: number; z: number; h: number; depthBase: number;
  topPoly: Point2D[]; side1Poly: Point2D[]; side2Poly: Point2D[];
}

export function buildRenderBars(
  weeks: GithubContributionDay[][],
  cx: number, cz: number,
  yaw: number, pitch: number,
  scale: number, ox: number, oy: number,
  spacing = 4.8, barSize = 3.6, heightScale = 1
): RenderBar[] {
  const bars: RenderBar[] = [];
  const cosY = Math.cos(yaw); const sinY = Math.sin(yaw);
  for (let c = 0; c < weeks.length; c++) {
    for (let r = 0; r < weeks[c].length; r++) {
      const day = weeks[c][r];
      if (day.isFuture) continue;
      const x0 = c * spacing - barSize / 2; const x1 = c * spacing + barSize / 2;
      const z0 = r * spacing - barSize / 2; const z1 = r * spacing + barSize / 2;
      const barH = getBarHeight(day.level, day.count) * heightScale;
      const pTop0 = project3D(x0, barH, z0, cx, cz, yaw, pitch, scale, ox, oy);
      const pTop1 = project3D(x1, barH, z0, cx, cz, yaw, pitch, scale, ox, oy);
      const pTop2 = project3D(x1, barH, z1, cx, cz, yaw, pitch, scale, ox, oy);
      const pTop3 = project3D(x0, barH, z1, cx, cz, yaw, pitch, scale, ox, oy);
      const pBot0 = project3D(x0, 0, z0, cx, cz, yaw, pitch, scale, ox, oy);
      const pBot1 = project3D(x1, 0, z0, cx, cz, yaw, pitch, scale, ox, oy);
      const pBot2 = project3D(x1, 0, z1, cx, cz, yaw, pitch, scale, ox, oy);
      const pBot3 = project3D(x0, 0, z1, cx, cz, yaw, pitch, scale, ox, oy);
      const depthBase = (c * spacing - cx) * sinY + (r * spacing - cz) * cosY;
      bars.push({
        day, x: c * spacing, z: r * spacing, h: barH, depthBase,
        topPoly: [pTop0, pTop1, pTop2, pTop3],
        side1Poly: cosY > 0 ? [pBot3, pBot2, pTop2, pTop3] : [pBot1, pBot0, pTop0, pTop1],
        side2Poly: sinY > 0 ? [pBot0, pBot3, pTop3, pTop0] : [pBot2, pBot1, pTop1, pTop2],
      });
    }
  }
  return bars.sort((a, b) => a.depthBase - b.depthBase);
}

function drawPoly(ctx: CanvasRenderingContext2D, poly: Point2D[], fill: string, stroke?: string, lineWidth = 0.8) {
  ctx.beginPath();
  ctx.moveTo(poly[0].x, poly[0].y);
  for (let i = 1; i < poly.length; i++) ctx.lineTo(poly[i].x, poly[i].y);
  ctx.closePath();
  ctx.fillStyle = fill;
  ctx.fill();
  if (stroke) { ctx.strokeStyle = stroke; ctx.lineWidth = lineWidth; ctx.stroke(); }
}

export function drawBasePlatform(
  ctx: CanvasRenderingContext2D, cx: number, cz: number,
  numCols: number, numRows: number, spacing: number,
  yaw: number, pitch: number, scale: number, ox: number, oy: number, isDark = true
) {
  const x0 = -spacing * 0.9; const x1 = (numCols - 1) * spacing + spacing * 0.9;
  const z0 = -spacing * 0.9; const z1 = (numRows - 1) * spacing + spacing * 0.9;
  const t = 2.5; const cosY = Math.cos(yaw); const sinY = Math.sin(yaw);
  const t0 = project3D(x0, 0, z0, cx, cz, yaw, pitch, scale, ox, oy);
  const t1 = project3D(x1, 0, z0, cx, cz, yaw, pitch, scale, ox, oy);
  const t2 = project3D(x1, 0, z1, cx, cz, yaw, pitch, scale, ox, oy);
  const t3 = project3D(x0, 0, z1, cx, cz, yaw, pitch, scale, ox, oy);
  const b0 = project3D(x0, -t, z0, cx, cz, yaw, pitch, scale, ox, oy);
  const b1 = project3D(x1, -t, z0, cx, cz, yaw, pitch, scale, ox, oy);
  const b2 = project3D(x1, -t, z1, cx, cz, yaw, pitch, scale, ox, oy);
  const b3 = project3D(x0, -t, z1, cx, cz, yaw, pitch, scale, ox, oy);

  if (cosY > 0) drawPoly(ctx, [b3, b2, t2, t3], isDark ? "#090a0c" : "#d4d4d8");
  else drawPoly(ctx, [b1, b0, t0, t1], isDark ? "#090a0c" : "#d4d4d8");
  if (sinY > 0) drawPoly(ctx, [b0, b3, t3, t0], isDark ? "#0d0e11" : "#e4e4e7");
  else drawPoly(ctx, [b2, b1, t1, t2], isDark ? "#0d0e11" : "#e4e4e7");
  drawPoly(ctx, [t0, t1, t2, t3], isDark ? "#14161a" : "#f4f4f5", isDark ? "rgba(255,255,255,0.06)" : "rgba(0,0,0,0.08)");
}

export function drawSkylineBars(ctx: CanvasRenderingContext2D, bars: RenderBar[], colors: string[], hoveredDate?: string, isDark = true) {
  const strokeColor = isDark ? "rgba(255,255,255,0.08)" : "rgba(0,0,0,0.06)";
  for (const b of bars) {
    const isHov = hoveredDate === b.day.date;
    const baseHex = colors[b.day.level] || colors[0];
    const topColor = isHov ? "#ffffff" : baseHex;
    drawPoly(ctx, b.side1Poly, adjustBrightness(baseHex, isDark ? 0.82 : 0.88), strokeColor);
    drawPoly(ctx, b.side2Poly, adjustBrightness(baseHex, isDark ? 0.68 : 0.74), strokeColor);
    drawPoly(ctx, b.topPoly, topColor, isHov ? "#10b981" : strokeColor, isHov ? 1.5 : 0.6);
  }
}

export function drawMonthLabels(
  ctx: CanvasRenderingContext2D,
  monthPositions: { weekIndex: number; label: string }[],
  cx: number, cz: number, numRows: number, spacing: number,
  yaw: number, pitch: number, scale: number, ox: number, oy: number, isDark = true
) {
  const cosY = Math.cos(yaw);
  if (!monthPositions || monthPositions.length === 0 || cosY <= 0.25) return;

  const zFront = (numRows - 1) * spacing + 4.5;
  ctx.save();
  ctx.font = "500 9px -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif";
  ctx.fillStyle = isDark ? "rgba(255, 255, 255, 0.45)" : "rgba(0, 0, 0, 0.55)";
  ctx.textAlign = "center";
  ctx.textBaseline = "top";

  let lastX = -Infinity;
  let lastY = -Infinity;
  const minDistance = 14;

  for (const m of monthPositions) {
    const p = project3D(m.weekIndex * spacing, 0, zFront, cx, cz, yaw, pitch, scale, ox, oy);
    const dist = Math.hypot(p.x - lastX, p.y - lastY);
    if (dist >= minDistance) {
      ctx.fillText(m.label, p.x, p.y + 4);
      lastX = p.x;
      lastY = p.y;
    }
  }
  ctx.restore();
}
