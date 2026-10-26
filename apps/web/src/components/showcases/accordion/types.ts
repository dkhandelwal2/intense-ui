import { ShowcaseExampleItem } from "@/components/showcases/common";

export interface AccordionExampleItem extends ShowcaseExampleItem {
  id: string;
  label: string;
  code: string;
}

export type CustomProps = {
  borderWidth?: number;
  borderRadius?: number;
  borderColor?: string;
  hideBorder?: boolean;
  size?: "xs" | "sm" | "md" | "lg" | "xl";
  weight?: "Default" | "Bold";
  iconType?: "Default" | "Custom";
  iconPosition?: "Left" | "Right";
  hideIcon?: boolean;
  iconColor?: string;
  headingUnderline?: boolean;
  headingColor?: string;
  contentColor?: string;
  isDefaultExpanded?: boolean;
  hasOnClick?: boolean;
};
