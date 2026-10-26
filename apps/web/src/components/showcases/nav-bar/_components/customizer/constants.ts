import React from "react";
import { CustomNavbarProps } from "../../types";

export const NAVBAR_VARIANTS = [
  { id: "gooey", label: "Fluid Gooey" },
  { id: "floating", label: "Floating Capsule" },
] as const;

export const NAVBAR_SIZES = [
  { id: "sm", label: "Small" },
  { id: "md", label: "Medium" },
  { id: "lg", label: "Large" },
] as const;

export const DEFAULT_CUSTOM_PROPS: CustomNavbarProps = {
  variant: "gooey",
  size: "md",
  activeColor: "",
  showIcons: true,
  showBadges: false,
};

export function getModifiedCount(props: CustomNavbarProps): number {
  let count = 0;
  if (props.variant !== "gooey") count++;
  if (props.size !== "md") count++;
  if (props.activeColor && props.activeColor.trim() !== "") count++;
  if (!props.showIcons) count++;
  if (props.showBadges) count++;
  return count;
}
