export interface SwitchCustomProps {
  checked: boolean;
  disabled: boolean;
  variant: "rocker" | "pill" | "cutout" | "capsule-text" | "industrial" | "square";
  orientation: "horizontal" | "vertical";
  size: "sm" | "md" | "lg";
  sliderText: "on/off" | "true/false" | "yes/no";
  showDotIcon: boolean;
  shadowColor: string;
}

export const DEFAULT_SWITCH_PROPS: SwitchCustomProps = {
  checked: true,
  disabled: false,
  variant: "rocker",
  orientation: "horizontal",
  size: "md",
  sliderText: "on/off",
  showDotIcon: true,
  shadowColor: "var(--theme-primary)",
};
