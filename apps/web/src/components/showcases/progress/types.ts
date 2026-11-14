import { ProgressVariant, ProgressSize } from "@/components/ui/progress";

export interface ProgressCustomProps {
  value: number;
  max: number;
  variant: ProgressVariant;
  fillColor?: string;
  size: ProgressSize;
  type: "linear" | "circular" | "semicircle" | "buffer" | "shimmer" | "capsule";
  striped: boolean;
  animated: boolean;
  indeterminate: boolean;
  showValue: boolean;
  loaded: number;
  isLoading: boolean;
}

export const DEFAULT_PROGRESS_PROPS: ProgressCustomProps = {
  value: 65,
  max: 100,
  variant: "primary",
  fillColor: undefined,
  size: "md",
  type: "linear",
  striped: false,
  animated: true,
  indeterminate: false,
  showValue: true,
  loaded: 85,
  isLoading: true,
};
