export interface ButtonCustomProps {
  variant: "default" | "glow" | "outline" | "subtle" | "share" | "delete" | "confirm";
  size: "sm" | "md" | "lg";
  label: string;
  disabled: boolean;
  showIcon: boolean;
  iconPosition: "left" | "right";
  confirmAction: "delete" | "confirm" | "archive" | "discard";
}

export const DEFAULT_BUTTON_PROPS: ButtonCustomProps = {
  variant: "default",
  size: "md",
  label: "Interactive Button",
  disabled: false,
  showIcon: false,
  iconPosition: "left",
  confirmAction: "delete",
};
