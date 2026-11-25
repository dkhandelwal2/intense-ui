import type { Transition } from "framer-motion";

export const DEFAULT_SIGNATURE_WIDTH = 300;
export const DEFAULT_SIGNATURE_HEIGHT = 360;
export const DEFAULT_STROKE_WIDTH = 2.5;
export const DEFAULT_STROKE_COLOR = "var(--theme-primary)";

export const SIGNATURE_MORPH_SPRING: Transition = {
  type: "spring",
  stiffness: 380,
  damping: 30,
  mass: 0.8,
};

export const SIGNATURE_FADE_TRANSITION: Transition = {
  duration: 0.18,
  ease: [0.22, 1, 0.36, 1],
};

export const SIGNATURE_INK_COLORS = [
  "var(--theme-primary)",
  "#18181b",
  "#2563eb",
  "#6366f1",
  "#10b981",
  "#ef4444",
  "#a855f7",
];

export const SIGNATURE_INK_LABELS: Record<string, string> = {
  "var(--theme-primary)": "Theme Primary",
  "#18181b": "Charcoal Black",
  "#2563eb": "Royal Blue",
  "#6366f1": "Electric Indigo",
  "#10b981": "Emerald Seal",
  "#ef4444": "Crimson Red",
  "#a855f7": "Imperial Violet",
};
