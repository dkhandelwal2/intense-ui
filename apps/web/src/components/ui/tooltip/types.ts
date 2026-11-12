import React from "react";

export type TooltipPosition = "top" | "bottom" | "left" | "right";

export interface TooltipProps {
  content: string;
  children: React.ReactNode;
  position?: TooltipPosition;
  bgColor?: string;
  className?: string;
}
