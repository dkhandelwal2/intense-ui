import React from "react";

export type SliderMark = number | string | { value: number; label?: React.ReactNode };

export interface MultiSliderProps {
  values: number[];
  min?: number;
  max?: number;
  step?: number;
  onChange: (vals: number[]) => void;
  disabled?: boolean;
  orientation?: "horizontal" | "vertical";
  variant?: "primary" | "success" | "danger" | "warning" | "info" | "zoom";
  fillColor?: string;
  color?: string;
  zoomEffect?: boolean;
  thumbAnimation?: "none" | "pulse" | "glow" | "scale";
  tooltip?: boolean;
  thumbIcon?: React.ReactNode;
  marks?: SliderMark[];
  className?: string;
}

export interface SliderProps extends Omit<MultiSliderProps, "values" | "onChange"> {
  value: number;
  onChange: (val: number) => void;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
  showInput?: boolean;
}

export interface RangeSliderProps extends Omit<MultiSliderProps, "values" | "onChange"> {
  value: [number, number];
  onChange: (val: [number, number]) => void;
}
