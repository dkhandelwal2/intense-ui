export const DEFAULT_COLORS = [
  "var(--theme-primary)",
  "var(--palette-1)",
  "var(--palette-2)",
  "var(--palette-3)",
  "var(--palette-4)",
  "var(--palette-5)",
];

export const PALETTE_NAMES: Record<string, string> = {
  "var(--palette-1)": "Blue",
  "var(--palette-2)": "Purple",
  "var(--palette-3)": "Red",
  "var(--palette-4)": "Orange",
  "var(--palette-5)": "Green",
};

export const HEX_MAP: Record<string, string> = {
  "var(--palette-1)": "#3b82f6",
  "var(--palette-2)": "#a855f7",
  "var(--palette-3)": "#ef4444",
  "var(--palette-4)": "#f97316",
  "var(--palette-5)": "#22c55e",
};

export const getDisplayColor = (val: string) => {
  if (val === "var(--theme-primary)") return "Primary";
  if (!val) return "Default";
  return PALETTE_NAMES[val] || val;
};

export const resolveToHex = (val: string) => {
  if (!val) return "#000000";
  if (val === "var(--theme-primary)") return "#FF0084";
  return HEX_MAP[val] || (/^#[0-9A-Fa-f]{6}$/.test(val) ? val : "#000000");
};

export const COLOR_GRID_SIZE_MAP = {
  sm: "w-5 h-5",
  md: "w-6 h-6",
  lg: "w-8 h-8",
};

export const COLOR_GRID_PADDING_MAP = {
  sm: "p-1",
  md: "p-1.5",
  lg: "p-2",
};

export const COLOR_GRID_GAP_MAP = {
  sm: "gap-1.5",
  md: "gap-2",
  lg: "gap-2.5",
};

export const COLOR_GRID_SPRING = {
  type: "spring",
  stiffness: 420,
  damping: 26,
} as const;
