import React from "react";
import { CustomProps } from "../../types";

export const BREADCRUMB_VARIANTS = [
  { id: "default", label: "Default" },
  { id: "chips", label: "Chips / Pills" },
  { id: "gooey", label: "Gooey" },
  { id: "outline", label: "Outline" },
  { id: "ghost", label: "Ghost" },
] as const;

export const BREADCRUMB_SEPARATORS = [
  { id: "chevron", label: "Chevron (>)" },
  { id: "slash", label: "Slash (/)" },
  { id: "arrow", label: "Arrow (→)" },
  { id: "chevrons", label: "Double (»)" },
  { id: "dot", label: "Bullet (•)" },
  { id: "none", label: "None" },
] as const;

export const BREADCRUMB_SIZES = [
  { id: "sm", label: "Small" },
  { id: "md", label: "Medium" },
  { id: "lg", label: "Large" },
] as const;

export const DEFAULT_CUSTOM_PROPS: CustomProps = {
  variant: "chips",
  separator: "chevron",
  separatorColor: "",
  activeColor: "",
  size: "md",
  showIcons: true,
  hasDropdown: false,
  hasCollapsed: false,
};

export function getModifiedCount(props: CustomProps): number {
  let count = 0;
  if (props.variant !== "chips") count++;
  if (props.separator !== "chevron") count++;
  if (props.separatorColor && props.separatorColor.trim() !== "") count++;
  if (props.activeColor && props.activeColor.trim() !== "") count++;
  if (props.size !== "md") count++;
  if (!props.showIcons) count++;
  if (props.hasDropdown) count++;
  if (props.hasCollapsed) count++;
  return count;
}

export interface TabProps {
  customProps: CustomProps;
  onChange: React.Dispatch<React.SetStateAction<CustomProps>>;
}
