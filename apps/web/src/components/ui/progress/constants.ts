import { ProgressSize, ProgressVariant } from "./types";

export const PROGRESS_SIZES: Record<ProgressSize, string> = {
  sm: "h-1.5",
  md: "h-2.5",
  lg: "h-4",
};

export const PROGRESS_INTENT_MAP: Record<
  ProgressVariant,
  { track: string; glow: string; text: string; hex: string }
> = {
  primary: {
    track: "bg-[var(--theme-primary)]",
    glow: "shadow-[0_0_12px_rgba(var(--theme-primary-rgb),0.5)]",
    text: "text-[var(--theme-primary)]",
    hex: "var(--theme-primary)",
  },
  success: {
    track: "bg-emerald-500",
    glow: "shadow-[0_0_12px_rgba(16,185,129,0.5)]",
    text: "text-emerald-500",
    hex: "#10b981",
  },
  danger: {
    track: "bg-rose-500",
    glow: "shadow-[0_0_12px_rgba(244,63,94,0.5)]",
    text: "text-rose-500",
    hex: "#f43f5e",
  },
  warning: {
    track: "bg-amber-500",
    glow: "shadow-[0_0_12px_rgba(245,158,11,0.5)]",
    text: "text-amber-500",
    hex: "#f59e0b",
  },
  info: {
    track: "bg-sky-500",
    glow: "shadow-[0_0_12px_rgba(14,165,233,0.5)]",
    text: "text-sky-500",
    hex: "#0ea5e9",
  },
  shimmer: {
    track: "bg-gradient-to-r from-[var(--theme-primary)] via-fuchsia-500 to-indigo-500",
    glow: "shadow-[0_0_16px_rgba(217,70,239,0.7)]",
    text: "text-fuchsia-400",
    hex: "#d946ef",
  },
};
