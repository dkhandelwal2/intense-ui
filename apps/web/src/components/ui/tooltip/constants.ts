import { TooltipPosition } from "./types";

export const TOOLTIP_POSITION_CLASSES: Record<TooltipPosition, string> = {
  top: "bottom-full mb-2 left-1/2 -translate-x-1/2",
  bottom: "top-full mt-2 left-1/2 -translate-x-1/2",
  left: "right-full mr-2 top-1/2 -translate-y-1/2",
  right: "left-full ml-2 top-1/2 -translate-y-1/2",
};

export const TOOLTIP_ARROW_CLASSES: Record<TooltipPosition, string> = {
  top: "top-full left-1/2 -translate-x-1/2 border-x-transparent border-b-transparent",
  bottom: "bottom-full left-1/2 -translate-x-1/2 border-x-transparent border-t-transparent",
  left: "left-full top-1/2 -translate-y-1/2 border-y-transparent border-r-transparent",
  right: "right-full top-1/2 -translate-y-1/2 border-y-transparent border-l-transparent",
};

export const TOOLTIP_INITIAL_ANIMATION = {
  top: { opacity: 0, y: 5, scale: 0.95 },
  bottom: { opacity: 0, y: -5, scale: 0.95 },
  left: { opacity: 0, x: 5, scale: 0.95 },
  right: { opacity: 0, x: -5, scale: 0.95 },
};

export const TOOLTIP_ANIMATE = {
  top: { opacity: 1, y: 0, scale: 1 },
  bottom: { opacity: 1, y: 0, scale: 1 },
  left: { opacity: 1, x: 0, scale: 1 },
  right: { opacity: 1, x: 0, scale: 1 },
};

export function getTooltipArrowStyle(
  position: TooltipPosition,
  bgColor?: string
): React.CSSProperties {
  if (!bgColor) return {};
  switch (position) {
    case "top":
      return { borderTopColor: bgColor };
    case "bottom":
      return { borderBottomColor: bgColor };
    case "left":
      return { borderLeftColor: bgColor };
    case "right":
      return { borderRightColor: bgColor };
  }
}
