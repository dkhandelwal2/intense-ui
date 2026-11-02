export interface SeparatorCustomProps {
  orientation: "horizontal" | "vertical";
  variant: "gradient" | "subtle" | "dashed";
  glow: boolean;
}

export const DEFAULT_SEPARATOR_PROPS: SeparatorCustomProps = {
  orientation: "horizontal",
  variant: "gradient",
  glow: false,
};
