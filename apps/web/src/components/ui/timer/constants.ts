import { TimerIntent, TimerStripeOrigin } from "./types";

export const TIMER_INTENTS: Record<
  TimerIntent,
  {
    activeStroke: string;
    glow: string;
    chipActive: string;
    bgTint: string;
    text: string;
  }
> = {
  primary: {
    activeStroke: "var(--theme-primary, #3b82f6)",
    glow: "rgba(59,130,246,0.35)",
    chipActive: "bg-blue-600 text-white dark:bg-blue-500/30 dark:text-blue-300 border-blue-500",
    bgTint: "bg-blue-500/10 dark:bg-blue-950/40 border-blue-500/30",
    text: "text-blue-600 dark:text-blue-400",
  },
  amber: {
    activeStroke: "#f59e0b",
    glow: "rgba(245,158,11,0.4)",
    chipActive: "bg-amber-600 text-white dark:bg-amber-500/30 dark:text-amber-300 border-amber-500",
    bgTint: "bg-amber-500/10 dark:bg-amber-950/40 border-amber-500/30",
    text: "text-amber-600 dark:text-amber-400",
  },
  cyan: {
    activeStroke: "#06b6d4",
    glow: "rgba(6,182,212,0.4)",
    chipActive: "bg-cyan-600 text-white dark:bg-cyan-500/30 dark:text-cyan-300 border-cyan-500",
    bgTint: "bg-cyan-500/10 dark:bg-cyan-950/40 border-cyan-500/30",
    text: "text-cyan-600 dark:text-cyan-400",
  },
  emerald: {
    activeStroke: "#10b981",
    glow: "rgba(16,185,129,0.4)",
    chipActive: "bg-emerald-600 text-white dark:bg-emerald-500/30 dark:text-emerald-300 border-emerald-500",
    bgTint: "bg-emerald-500/10 dark:bg-emerald-950/40 border-emerald-500/30",
    text: "text-emerald-600 dark:text-emerald-400",
  },
  rose: {
    activeStroke: "#f43f5e",
    glow: "rgba(244,63,94,0.4)",
    chipActive: "bg-rose-600 text-white dark:bg-rose-500/30 dark:text-rose-300 border-rose-500",
    bgTint: "bg-rose-500/10 dark:bg-rose-950/40 border-rose-500/30",
    text: "text-rose-600 dark:text-rose-400",
  },
  purple: {
    activeStroke: "#a855f7",
    glow: "rgba(168,85,247,0.4)",
    chipActive: "bg-purple-600 text-white dark:bg-purple-500/30 dark:text-purple-300 border-purple-500",
    bgTint: "bg-purple-500/10 dark:bg-purple-950/40 border-purple-500/30",
    text: "text-purple-600 dark:text-purple-400",
  },
};

export const DEFAULT_TIMER_PRESETS = [300, 600, 1200]; // 5m, 10m, 20m in seconds

/**
 * Top notch path starting to the right of top-center (210, 4) and ending at (130, 4),
 * leaving the center notch clear for the target alarm readout.
 */
export const PERIMETER_NOTCH_PATH =
  "M 210 4 L 310 4 A 26 26 0 0 1 336 30 L 336 90 A 26 26 0 0 1 310 116 L 30 116 A 26 26 0 0 1 4 90 L 4 30 A 26 26 0 0 1 30 4 L 130 4";

/**
 * Bottom notch path starting to the left of bottom-center (130, 116) and ending at (210, 116),
 * leaving the bottom center notch clear with symmetrical breathing space matching the top notch.
 */
export const PERIMETER_BOTTOM_NOTCH_PATH =
  "M 130 116 L 30 116 A 26 26 0 0 1 4 90 L 4 30 A 26 26 0 0 1 30 4 L 310 4 A 26 26 0 0 1 336 30 L 336 90 A 26 26 0 0 1 310 116 L 210 116";

/**
 * Clockwise perimeter contour paths for different starting origin positions
 * ViewBox: 0 0 340 120, corner radius 26.
 */
export const PERIMETER_ORIGIN_PATHS: Record<string, string> = {
  "top-center":
    "M 170 4 L 310 4 A 26 26 0 0 1 336 30 L 336 90 A 26 26 0 0 1 310 116 L 30 116 A 26 26 0 0 1 4 90 L 4 30 A 26 26 0 0 1 30 4 L 170 4",
  "top-left":
    "M 30 4 L 310 4 A 26 26 0 0 1 336 30 L 336 90 A 26 26 0 0 1 310 116 L 30 116 A 26 26 0 0 1 4 90 L 4 30 A 26 26 0 0 1 30 4",
  "top-right":
    "M 310 4 A 26 26 0 0 1 336 30 L 336 90 A 26 26 0 0 1 310 116 L 30 116 A 26 26 0 0 1 4 90 L 4 30 A 26 26 0 0 1 30 4 L 310 4",
  "bottom-left":
    "M 30 116 A 26 26 0 0 1 4 90 L 4 30 A 26 26 0 0 1 30 4 L 310 4 A 26 26 0 0 1 336 30 L 336 90 A 26 26 0 0 1 310 116 L 30 116",
  "bottom-center": PERIMETER_BOTTOM_NOTCH_PATH,
  "bottom-right":
    "M 310 116 L 30 116 A 26 26 0 0 1 4 90 L 4 30 A 26 26 0 0 1 30 4 L 310 4 A 26 26 0 0 1 336 30 L 336 90 A 26 26 0 0 1 310 116",
};

/**
 * Computes SVG perimeter stroke path based on stripe origin and alarm display
 */
export function getPerimeterPath(
  stripeOrigin: TimerStripeOrigin = "top-center",
  customStripePath?: string,
  customPath?: string,
  showAlarmTime: boolean = true
): string {
  if (stripeOrigin === "custom") return customStripePath || customPath || PERIMETER_NOTCH_PATH;
  if (stripeOrigin === "bottom-center") return PERIMETER_BOTTOM_NOTCH_PATH;
  if (stripeOrigin === "top-center") {
    return showAlarmTime ? PERIMETER_NOTCH_PATH : PERIMETER_ORIGIN_PATHS["top-center"];
  }
  return (
    PERIMETER_ORIGIN_PATHS[stripeOrigin] ||
    (showAlarmTime ? PERIMETER_NOTCH_PATH : PERIMETER_ORIGIN_PATHS["top-center"])
  );
}

/**
 * Format total seconds into HH:MM:SS (standard symmetry) or MM:SS
 */
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

/**
 * Format centiseconds into HH:MM:SS or HH:MM:SS,CC or MM:SS,CC
 */
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

/**
 * Formats a duration in seconds into a friendly badge label (e.g. 300 -> "5 mins")
 */
export function formatPresetLabel(seconds: number): string {
  if (seconds >= 3600) {
    const h = seconds / 3600;
    return `${h} ${h === 1 ? "hr" : "hrs"}`;
  }
  const m = Math.floor(seconds / 60);
  return `${m} mins`;
}

/**
 * Computes an estimated alarm time string in HH:MM:SS given remaining seconds.
 * Pure deterministic calculation without browser/SSR divergence.
 */
export function calculateTargetTime(
  remainingSeconds: number,
  baseDate: Date = new Date(),
  showSeconds: boolean = true
): string {
  const target = new Date(baseDate.getTime() + remainingSeconds * 1000);
  const hours = String(target.getHours()).padStart(2, "0");
  const minutes = String(target.getMinutes()).padStart(2, "0");
  const seconds = String(target.getSeconds()).padStart(2, "0");
  return showSeconds ? `${hours}:${minutes}:${seconds}` : `${hours}:${minutes}`;
}
