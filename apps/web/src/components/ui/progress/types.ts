import React from "react";

export type ProgressVariant =
  | "primary"
  | "success"
  | "danger"
  | "warning"
  | "info"
  | "shimmer";

export type ProgressSize = "sm" | "md" | "lg";

export interface ProgressBaseProps extends React.HTMLAttributes<HTMLDivElement> {
  value?: number;
  max?: number;
  variant?: ProgressVariant;
  fillColor?: string;
  className?: string;
}

export interface ProgressProps extends ProgressBaseProps {
  size?: ProgressSize;
  striped?: boolean;
  animated?: boolean;
  indeterminate?: boolean;
  showValue?: boolean;
  formatValue?: (val: number, max: number) => string;
}

export interface ProgressCircularProps extends ProgressBaseProps {
  size?: number; // Outer diameter in px (default 140)
  strokeWidth?: number; // Track thickness (default 10)
  showValue?: boolean;
  unit?: string;
  label?: string;
  children?: React.ReactNode;
}

export interface ProgressSemicircleProps extends ProgressBaseProps {
  size?: number; // Width of gauge in px (default 200)
  strokeWidth?: number; // Track thickness (default 12)
  showValue?: boolean;
  showMinMax?: boolean;
  unit?: string;
  label?: string;
  children?: React.ReactNode;
}

export interface ProgressBufferProps extends ProgressBaseProps {
  loaded?: number; // Secondary buffer progress percentage (0 - 100)
  isLoading?: boolean;
  statusText?: string;
}

export interface ProgressShimmerProps extends ProgressBaseProps {
  shimmerColor?: string;
  size?: ProgressSize;
}

export interface ProgressCapsuleProps extends ProgressBaseProps {
  height?: number | string;
  icon?: React.ReactNode;
  label?: string;
  showPercentage?: boolean;
  formatValue?: (val: number, max: number) => string;
}
