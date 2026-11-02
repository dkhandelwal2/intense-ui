export interface TooltipCustomProps {
  content: string;
  position: "top" | "bottom" | "left" | "right";
  bgColor?: string;
}

export const DEFAULT_TOOLTIP_PROPS: TooltipCustomProps = {
  content: "Instant tooltip insight",
  position: "top",
  bgColor: "",
};
