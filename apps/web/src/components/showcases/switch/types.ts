export interface SwitchCustomProps {
  checked: boolean;
  disabled: boolean;
  variant: "rocker" | "pill" | "cutout" | "capsule-text" | "industrial" | "square" | "binary-io";
  size: "sm" | "md" | "lg";
  sliderText: "on/off" | "true/false" | "yes/no";
  showDotIcon: boolean;
  shadowColor: string;
}

export const DEFAULT_SWITCH_PROPS: SwitchCustomProps = {
  checked: true,
  disabled: false,
  variant: "rocker",
  size: "md",
  sliderText: "on/off",
  showDotIcon: true,
  shadowColor: "var(--theme-primary)",
};
