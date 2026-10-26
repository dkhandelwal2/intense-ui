import React from "react";
import {
  BreadcrumbVariant,
  BreadcrumbSize,
} from "@/components/ui/breadcrumb";

export type BreadcrumbSeparatorType =
  | "chevron"
  | "slash"
  | "arrow"
  | "chevrons"
  | "dot"
  | "none";

export interface CustomProps {
  variant: BreadcrumbVariant;
  separator: BreadcrumbSeparatorType;
  separatorColor?: string;
  activeColor?: string;
  size: BreadcrumbSize;
  showIcons: boolean;
  hasDropdown: boolean;
  hasCollapsed?: boolean;
}

export interface BreadcrumbExampleItem {
  id: string;
  label: string;
  code: string;
  description?: string;
}
