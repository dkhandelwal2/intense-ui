import * as React from "react";

export type SeparatorOrientation = "horizontal" | "vertical";
export type SeparatorVariant = "gradient" | "subtle" | "dashed";

export interface SeparatorProps extends React.HTMLAttributes<HTMLDivElement> {
  orientation?: SeparatorOrientation;
  variant?: SeparatorVariant;
  glow?: boolean;
}
