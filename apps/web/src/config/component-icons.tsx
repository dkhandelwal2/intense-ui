import React from "react";
import {
  LayoutList,
  MousePointerClick,
  ToggleRight,
  SlidersHorizontal,
  MessageSquare,
  Minus,
  Route,
  SquareDashed,
  Palette,
  LayoutGrid,
  CreditCard,
  Layers,
  Navigation,
} from "lucide-react";

export type ComponentIconType = React.ComponentType<{ className?: string }>;

/**
 * Single source of truth for component icons across Intense UI:
 * - Left sidebar navigation items
 * - Center page title header
 * - Right sidebar inspector header title & mobile sheet
 */
export const COMPONENT_ICONS: Record<string, ComponentIconType> = {
  accordion: LayoutList,
  button: MousePointerClick,
  "animated-button": MousePointerClick,
  switch: ToggleRight,
  slider: SlidersHorizontal,
  tooltip: MessageSquare,
  separator: Minus,
  breadcrumb: Route,
  skeleton: SquareDashed,
  "color-grid": Palette,
  "nav-bar": Navigation,
  navbar: Navigation,
  "bento-grid": LayoutGrid,
  "magnetic-card": CreditCard,
};

/**
 * Returns the matching Lucide icon component for a given slug or title.
 * Falls back to `Layers` if no specific icon is registered.
 */
export function getComponentIcon(slugOrTitle?: string): ComponentIconType {
  if (!slugOrTitle) return Layers;
  const key = slugOrTitle.toLowerCase().trim().replace(/\s+/g, "-");
  return COMPONENT_ICONS[key] || Layers;
}
