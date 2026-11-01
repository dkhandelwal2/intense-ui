import * as React from "react";
import { cn } from "@/lib/utils";

export interface SkeletonProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: "pulse" | "shimmer";
}

export function Skeleton({
  className,
  variant = "pulse",
  ...props
}: SkeletonProps) {
  return (
    <div
      role="status"
      aria-live="polite"
      aria-label="Loading"
      className={cn(
        "rounded-md bg-black/5 dark:bg-white/5 shrink-0",
        variant === "pulse" && "animate-pulse",
        variant === "shimmer" &&
          "relative overflow-hidden before:absolute before:inset-0 before:-translate-x-full before:animate-[shimmer_2s_infinite] before:bg-gradient-to-r before:from-transparent before:via-black/5 dark:before:via-white/10 before:to-transparent",
        className
      )}
      {...props}
    />
  );
}

export interface CodeSkeletonProps extends React.HTMLAttributes<HTMLDivElement> {
  lines?: number;
  className?: string;
}

export function CodeSkeleton({
  lines = 5,
  className,
  ...props
}: CodeSkeletonProps) {
  const widths = ["w-3/4", "w-1/2", "w-5/6", "w-2/3", "w-1/3", "w-4/5", "w-3/5"];

  return (
    <div
      className={cn("flex flex-col gap-4 w-full", className)}
      role="status"
      aria-label="Loading code..."
      {...props}
    >
      {Array.from({ length: lines }).map((_, i) => (
        <Skeleton
          key={i}
          className={cn("h-4", widths[i % widths.length])}
        />
      ))}
    </div>
  );
}
