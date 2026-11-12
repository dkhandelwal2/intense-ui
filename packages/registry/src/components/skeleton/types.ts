import * as React from "react";

export type SkeletonVariant = "pulse" | "shimmer";

export interface SkeletonProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: SkeletonVariant;
}

export interface CodeSkeletonProps extends React.HTMLAttributes<HTMLDivElement> {
  lines?: number;
  className?: string;
}
