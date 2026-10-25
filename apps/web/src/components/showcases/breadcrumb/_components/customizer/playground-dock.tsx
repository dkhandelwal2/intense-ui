"use client";

import { PlaygroundDockItem } from "@/components/showcases/common";

export { PlaygroundDock } from "@/components/showcases/common";
export type { PlaygroundDockItem, PlaygroundDockProps } from "@/components/showcases/common";

export const PLAYGROUND_DOCK_ITEMS: PlaygroundDockItem[] = [
  { id: "variant", label: "Variant", emoji: "🏷️", description: "Variant & Visual Style" },
  { id: "separator", label: "Separator", emoji: "✂️", description: "Delimiter Between Links" },
  { id: "size", label: "Sizing", emoji: "📏", description: "Dimensions & Scale" },
  { id: "features", label: "Features", emoji: "🎭", description: "Emojis & Dropdown Menu" },
  { id: "colors", label: "Colors", emoji: "🎨", description: "Active Page & Separator Colors" },
];
