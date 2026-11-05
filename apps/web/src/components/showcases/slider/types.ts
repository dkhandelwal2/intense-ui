export interface SliderCustomProps {
  value: number;
  min: number;
  max: number;
  step: number;
  disabled: boolean;
  orientation: "horizontal" | "vertical";
  variant: "primary" | "success" | "danger" | "warning" | "info";
  fillColor?: string;
  thumbAnimation: "none" | "pulse" | "glow" | "scale";
  tooltip: boolean;
  showInput: boolean;
  withIcons: boolean;
  isRange: boolean;
  rangeValue: [number, number];
}

export const DEFAULT_SLIDER_PROPS: SliderCustomProps = {
  value: 50,
  min: 0,
  max: 100,
  step: 1,
  disabled: false,
  orientation: "horizontal",
  variant: "primary",
  fillColor: undefined,
  thumbAnimation: "none",
  tooltip: true,
  showInput: false,
  withIcons: false,
  isRange: false,
  rangeValue: [25, 75],
};
