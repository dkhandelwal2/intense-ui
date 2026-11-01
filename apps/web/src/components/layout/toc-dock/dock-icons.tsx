import React from "react";
import {
  SlidersHorizontal,
  Maximize2,
  Palette,
  PlayCircle,
  Layers,
  Sparkles,
  ToggleRight,
  Route,
  Minus,
  MessageSquare,
  SquareDashed,
  LayoutList,
  Navigation,
  CheckCircle2,
} from "lucide-react";

/**
 * Returns a contextual icon for dock items based on their identifier or label.
 */
export function getDockItemFallbackIcon(id?: string, label?: string): React.ReactNode {
  const text = `${id || ""} ${label || ""}`.toLowerCase();

  if (text.includes("size") || text.includes("scale") || text.includes("dimension")) {
    return <Maximize2 />;
  }
  if (text.includes("color") || text.includes("theme") || text.includes("accent") || text.includes("palette")) {
    return <Palette />;
  }
  if (text.includes("play") || text.includes("replay") || text.includes("button") || text.includes("auto")) {
    return <PlayCircle />;
  }
  if (text.includes("carousel") || text.includes("slider") || text.includes("basic") || text.includes("default")) {
    return <SlidersHorizontal />;
  }
  if (text.includes("switch") || text.includes("toggle")) {
    return <ToggleRight />;
  }
  if (text.includes("route") || text.includes("crumb")) {
    return <Route />;
  }
  if (text.includes("separator") || text.includes("divider") || text.includes("line")) {
    return <Minus />;
  }
  if (text.includes("tooltip") || text.includes("popover") || text.includes("chat")) {
    return <MessageSquare />;
  }
  if (text.includes("skeleton") || text.includes("loading") || text.includes("placeholder")) {
    return <SquareDashed />;
  }
  if (text.includes("accordion") || text.includes("collapse")) {
    return <LayoutList />;
  }
  if (text.includes("nav") || text.includes("menu")) {
    return <Navigation />;
  }
  if (text.includes("icon") || text.includes("badge") || text.includes("star")) {
    return <Sparkles />;
  }
  if (text.includes("status") || text.includes("check")) {
    return <CheckCircle2 />;
  }

  return <Layers />;
}
