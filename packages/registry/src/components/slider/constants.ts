import { SliderMark } from "./types";

export const SLIDER_INTENT_MAP: Record<
  string,
  { track: string; thumb: string; glow: string }
> = {
  primary: {
    track: "bg-[var(--theme-primary)]",
    thumb: "border-[var(--theme-primary)] text-[var(--theme-primary)]",
    glow: "shadow-[0_0_12px_rgba(var(--theme-primary-rgb),0.5)]",
  },
  success: {
    track: "bg-emerald-500",
    thumb: "border-emerald-500 text-emerald-500",
    glow: "shadow-[0_0_12px_rgba(16,185,129,0.5)]",
  },
  danger: {
    track: "bg-rose-500",
    thumb: "border-rose-500 text-rose-500",
    glow: "shadow-[0_0_12px_rgba(244,63,94,0.5)]",
  },
  warning: {
    track: "bg-amber-500",
    thumb: "border-amber-500 text-amber-500",
    glow: "shadow-[0_0_12px_rgba(245,158,11,0.5)]",
  },
  info: {
    track: "bg-sky-500",
    thumb: "border-sky-500 text-sky-500",
    glow: "shadow-[0_0_12px_rgba(14,165,233,0.5)]",
  },
  zoom: {
    track: "bg-[var(--theme-primary)]",
    thumb: "border-[var(--theme-primary)] text-[var(--theme-primary)]",
    glow: "shadow-[0_0_12px_rgba(var(--theme-primary-rgb),0.5)]",
  },
};

export function parseMarks(marks: SliderMark[] | undefined, min: number, max: number) {
  if (!marks?.length) return [];
  return marks.map((m, idx) => {
    if (typeof m === "number") {
      return { val: m, lbl: `${m}%`, pct: ((m - min) / (max - min)) * 100 };
    }
    if (typeof m === "string") {
      const pct = (idx / Math.max(1, marks.length - 1)) * 100;
      return { val: min + (pct / 100) * (max - min), lbl: m, pct };
    }
    return {
      val: m.value,
      lbl: m.label ?? `${m.value}%`,
      pct: ((m.value - min) / (max - min)) * 100,
    };
  });
}
