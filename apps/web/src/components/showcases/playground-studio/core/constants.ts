import type { Variants } from "framer-motion";
import { ReorderTileItem } from "./types";

export const PLAYGROUND_COLOR_PALETTES = [
  "bg-gradient-to-br from-[#7C5CFC] via-[#6a42f5] to-[#5123ea]", // Violet / Royal Purple
  "bg-gradient-to-br from-[#3B82F6] via-[#2563EB] to-[#1D4ED8]", // Electric Azure Blue
  "bg-gradient-to-br from-[#10B981] via-[#059669] to-[#047857]", // Emerald Mint
  "bg-gradient-to-br from-[#F97316] via-[#EA580C] to-[#C2410C]", // Sunset Orange
  "bg-gradient-to-br from-[#EC4899] via-[#DB2777] to-[#BE185D]", // Hot Pink / Fuchsia
  "bg-gradient-to-br from-[#6366F1] via-[#4F46E5] to-[#3730A3]", // Radiant Indigo
  "bg-gradient-to-br from-[#06B6D4] via-[#0891B2] to-[#0E7490]", // Cyber Cyan
  "bg-gradient-to-br from-[#F43F5E] via-[#E11D48] to-[#9F1239]", // Crimson Rose
  "bg-gradient-to-br from-[#8B5CF6] via-[#D946EF] to-[#EC4899]", // Cosmic Magenta
  "bg-gradient-to-br from-[#14B8A6] via-[#0D9488] to-[#0F766E]", // Deep Teal
  "bg-gradient-to-br from-[#F59E0B] via-[#D97706] to-[#B45309]", // Sunfire Amber
  "bg-gradient-to-br from-[#84CC16] via-[#65A30D] to-[#15803D]", // Aurora Lime
];

export const RING_VARIANTS: Variants = {
  enter: (dir: number) => ({
    rotateY: dir > 0 ? 50 : -50,
    x: dir > 0 ? 140 : -140,
    z: -160,
    scale: 0.88,
    opacity: 0,
  }),
  center: {
    rotateY: 0,
    x: 0,
    z: 0,
    scale: 1,
    opacity: 1,
    transition: {
      type: "spring",
      stiffness: 280,
      damping: 26,
      mass: 0.8,
    },
  },
  exit: (dir: number) => ({
    rotateY: dir > 0 ? -50 : 50,
    x: dir > 0 ? -140 : 140,
    z: -160,
    scale: 0.88,
    opacity: 0,
    transition: {
      duration: 0.22,
      ease: "easeInOut",
    },
  }),
};

export const MOTION_TILES: ReorderTileItem[] = [
  { id: "hue-1", color: "#FF0084" },
  { id: "hue-2", color: "#3b82f6" },
  { id: "hue-3", color: "#f97316" },
  { id: "hue-4", color: "#22c55e" },
];
