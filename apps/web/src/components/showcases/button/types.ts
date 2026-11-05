export interface ButtonCustomProps {
  variant: "default" | "glow" | "outline" | "subtle" | "text" | "ghost" | "3d" | "shimmer" | "ripple" | "filled-border" | "confirmation" | "share";
  size: "sm" | "md" | "lg" | "icon";
  rounded: boolean;
  loading: boolean;
  label: string;
  disabled: boolean;
  showIcon: boolean;
  iconPosition: "left" | "right";
  confirmAction: "delete" | "confirm" | "archive" | "discard";
  confirmType: "pill" | "icon";
}

export const DEFAULT_BUTTON_PROPS: ButtonCustomProps = {
  variant: "default",
  size: "md",
  rounded: false,
  loading: false,
  label: "Interactive Button",
  disabled: false,
  showIcon: false,
  iconPosition: "left",
  confirmAction: "delete",
  confirmType: "pill",
};
