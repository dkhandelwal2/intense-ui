export interface ColorGridProps {
  colors?: string[];
  value?: string;
  defaultValue?: string;
  onChange?: (color: string) => void;
  onClear?: () => void;
  draggable?: boolean;
  orientation?: "horizontal" | "vertical";
  columns?: number;
  size?: "sm" | "md" | "lg";
  showCustomPicker?: boolean;
  className?: string;
}

export type ColorPaletteProps = ColorGridProps;
