import * as React from "react";
import { cn } from "@/lib/utils";

export interface SeparatorProps extends React.HTMLAttributes<HTMLDivElement> {
  orientation?: "horizontal" | "vertical";
  variant?: "gradient" | "subtle" | "dashed";
  glow?: boolean;
}

export function Separator({
  orientation = "horizontal",
  variant = "gradient",
  glow = false,
  className,
  ...props
}: SeparatorProps) {
  const isHorizontal = orientation === "horizontal";

  return (
    <div
      role="separator"
      aria-orientation={orientation}
      className={cn(
        "shrink-0",
        isHorizontal ? "h-[1px] w-full" : "w-[1px] h-full",
        variant === "gradient" && (
          isHorizontal
            ? "bg-gradient-to-r from-transparent via-[var(--theme-primary)]/25 to-transparent"
            : "bg-gradient-to-b from-transparent via-[var(--theme-primary)]/50 to-transparent"
        ),
        variant === "subtle" && "bg-black/10 dark:bg-white/10",
        variant === "dashed" && (
          isHorizontal
            ? "border-b border-dashed border-black/15 dark:border-white/15 bg-transparent"
            : "border-r border-dashed border-black/15 dark:border-white/15 bg-transparent"
        ),
        glow && "shadow-[0_0_8px_var(--theme-primary)]",
        className
      )}
      {...props}
    />
  );
}
