export interface ColorGridCustomProps {
  value: string;
  size: "sm" | "md" | "lg";
  orientation: "horizontal" | "vertical";
  showCustomPicker: boolean;
  draggable: boolean;
  columns?: number;
}

export const DEFAULT_COLOR_GRID_PROPS: ColorGridCustomProps = {
  value: "var(--theme-primary)",
  size: "md",
  orientation: "horizontal",
  showCustomPicker: true,
  draggable: false,
};
