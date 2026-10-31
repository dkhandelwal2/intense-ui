import { DeckLayoutConfigs, DependencyItem, GenericCustomProps } from "./types";

export const SPRING_TRANSITION = {
  type: "spring",
  stiffness: 300,
  damping: 28,
  mass: 0.8,
} as const;

export const DECK_LAYOUT_CONFIGS: DeckLayoutConfigs = {
  5: {
    4: { top: 0, height: "calc(100% - 100px)", scaleX: 0.93, zIndex: 20, isFront: false, d: -1 },
    5: { top: 50, height: "calc(100% - 100px)", scaleX: 1.0, zIndex: 30, isFront: true, d: 0 },
    6: { top: 100, height: "calc(100% - 100px)", scaleX: 0.93, zIndex: 20, isFront: false, d: 1 },
  },
  4: {
    4: { top: 0, height: "calc(100% - 90px)", scaleX: 1.0, zIndex: 30, isFront: true, d: 0 },
    5: { top: 50, height: "calc(100% - 90px)", scaleX: 0.93, zIndex: 20, isFront: false, d: 1 },
    6: { top: 90, height: "calc(100% - 90px)", scaleX: 0.88, zIndex: 10, isFront: false, d: 2 },
  },
  6: {
    4: { top: 0, height: "calc(100% - 90px)", scaleX: 0.88, zIndex: 10, isFront: false, d: -2 },
    5: { top: 40, height: "calc(100% - 90px)", scaleX: 0.93, zIndex: 20, isFront: false, d: -1 },
    6: { top: 90, height: "calc(100% - 90px)", scaleX: 1.0, zIndex: 30, isFront: true, d: 0 },
  },
};

export const BENTO_STAGE_GEOMETRY = {
  DEPENDENCIES_CARD_WIDTH: 380,
  BOTTOM_BAR_HEIGHT: 185,
  BENTO_GAP: 12,
  CORNER_RADIUS: 36,
  CONCAVE_RADIUS: 36,
} as const;

export const KNOWN_VERSIONS: Record<string, string> = {
  "framer-motion": "^11.18.2",
  "lucide-react": "^1.52.0",
  "clsx": "^2.1.1",
  "tailwind-merge": "^2.6.1",
  "@radix-ui/react-slot": "^1.1.0",
  "react": "19.2.8",
  "react-dom": "19.2.8",
  "next": "16.3.8",
  "typescript": "^5.0.0",
  "next-themes": "^0.4.6",
  "cmdk": "^1.0.4",
  "tailwindcss": "^4.0.0",
};

export const PEER_DEPENDENCIES: DependencyItem[] = [
  { name: "react", version: "19.2.8", type: "peer" },
  { name: "react-dom", version: "19.2.8", type: "peer" },
  { name: "next", version: "16.3.8", type: "peer" },
  { name: "typescript", version: "^5.0.0", type: "peer" },
  { name: "next-themes", version: "^0.4.6", type: "peer" },
  { name: "cmdk", version: "^1.0.4", type: "peer" },
];

export const ALL_MARQUEE_ROWS: [DependencyItem[], DependencyItem[], DependencyItem[]] = [
  [
    { name: "framer-motion", version: "^11.18.2", type: "direct" },
    { name: "react", version: "19.2.8", type: "peer" },
    { name: "clsx", version: "^2.1.1", type: "direct" },
    { name: "next-themes", version: "^0.4.6", type: "peer" },
  ],
  [
    { name: "lucide-react", version: "^1.52.0", type: "direct" },
    { name: "react-dom", version: "19.2.8", type: "peer" },
    { name: "tailwind-merge", version: "^2.6.1", type: "direct" },
  ],
  [
    { name: "next", version: "16.3.8", type: "peer" },
    { name: "typescript", version: "^5.0.0", type: "peer" },
    { name: "cmdk", version: "^1.0.4", type: "peer" },
  ],
];

export const DEFAULT_GENERIC_PROPS: GenericCustomProps = {
  color: "#EC4899",
  size: "md",
  spring: "fluid",
  glow: false,
  shadow: true,
};

export const GENERIC_PALETTE_COLORS = [
  { name: "Neon Pink", hex: "#EC4899" },
  { name: "Azure Blue", hex: "#3B82F6" },
  { name: "Emerald", hex: "#10B981" },
  { name: "Sunset Orange", hex: "#F97316" },
  { name: "Violet", hex: "#8B5CF6" },
];

export const GENERIC_SIZE_OPTIONS: { id: "sm" | "md" | "lg"; label: string; badge: string; spec: string }[] = [
  { id: "sm", label: "Small (SM)", badge: "SM", spec: "Compact baseline scale (90%)" },
  { id: "md", label: "Medium (MD)", badge: "MD", spec: "Standard native scale (100%)" },
  { id: "lg", label: "Large (LG)", badge: "LG", spec: "Elevated spacious scale (110%)" },
];

export const GENERIC_SPRING_OPTIONS: { id: "gentle" | "fluid" | "snappy" | "bouncy"; label: string; spec: string }[] = [
  { id: "gentle", label: "Gentle Physics", spec: "Smooth slow deceleration curve" },
  { id: "fluid", label: "Fluid Flow", spec: "Balanced responsive interaction" },
  { id: "snappy", label: "Snappy Pop", spec: "Crisp immediate feedback" },
  { id: "bouncy", label: "Bouncy Spring", spec: "Playful high-rebound elasticity" },
];
