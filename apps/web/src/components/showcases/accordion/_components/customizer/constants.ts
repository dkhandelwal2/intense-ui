import React from "react";
import {
  Paintbrush,
  Type,
  Smile,
  Settings,
  Grid,
} from "lucide-react";
import { CustomProps } from "../../types";

export const SIZES = ["xs", "sm", "md", "lg", "xl"] as const;
export const WEIGHTS = ["Default", "Bold"] as const;
export const ICON_TYPES = ["Default", "Custom"] as const;
export const ICON_POSITIONS = ["Right", "Left"] as const;

export type CustomizerTab = "border" | "typography" | "icon" | "behavior" | "all";

export interface TabItem {
  id: CustomizerTab;
  label: string;
  icon: React.ComponentType<{ className?: string }>;
}

export const TABS: TabItem[] = [
  { id: "border", label: "Border", icon: Paintbrush },
  { id: "typography", label: "Typography", icon: Type },
  { id: "icon", label: "Icon", icon: Smile },
  { id: "behavior", label: "Behavior", icon: Settings },
  { id: "all", label: "View All", icon: Grid },
];

export const DEFAULT_CUSTOM_PROPS: CustomProps = {
  borderWidth: 1,
  borderRadius: 8,
  borderColor: "var(--theme-primary)",
  size: "md",
  weight: "Default",
  iconType: "Default",
  iconPosition: "Right",
  hideIcon: false,
  iconColor: "",
  headingUnderline: false,
  headingColor: "",
  contentColor: "",
  hideBorder: false,
  isDefaultExpanded: false,
  hasOnClick: false,
};

export function getModifiedCount(props: CustomProps): number {
  let count = 0;
  if (props.hideBorder) count++;
  if (props.borderWidth !== undefined && props.borderWidth !== 1) count++;
  if (props.borderRadius !== undefined && props.borderRadius !== 8) count++;
  if (props.borderColor && props.borderColor !== "var(--theme-primary)") count++;
  if (props.size && props.size !== "md") count++;
  if (props.weight && props.weight !== "Default") count++;
  if (props.headingUnderline) count++;
  if (props.headingColor && props.headingColor.trim() !== "") count++;
  if (props.contentColor && props.contentColor.trim() !== "") count++;
  if (props.hideIcon) count++;
  if (props.iconType && props.iconType !== "Default") count++;
  if (props.iconPosition && props.iconPosition !== "Right") count++;
  if (props.iconColor && props.iconColor.trim() !== "") count++;
  if (props.isDefaultExpanded) count++;
  if (props.hasOnClick) count++;
  return count;
}

export interface TabProps {
  customProps: CustomProps;
  onChange: React.Dispatch<React.SetStateAction<CustomProps>>;
}
