export type SwitchVariant =
  | "rocker"
  | "pill"
  | "cutout"
  | "capsule-text"
  | "industrial"
  | "square"
  | "binary-io"
  | "binary";

export type SwitchSize = "sm" | "md" | "lg";

export type SwitchSliderText = "on/off" | "true/false" | "yes/no";

export interface SwitchProps {
  checked: boolean;
  onChange: (checked: boolean) => void;
  className?: string;
  disabled?: boolean;
  variant?: SwitchVariant;
  size?: SwitchSize;
  sliderText?: SwitchSliderText;
  showDotIcon?: boolean;
  shadowColor?: string;
}
