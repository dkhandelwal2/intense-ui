import {
  BreadcrumbVariant,
  BreadcrumbSize,
} from "@/components/ui/breadcrumb";
import { ShowcaseExampleItem } from "@/components/showcases/common";

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

export interface BreadcrumbExampleItem extends ShowcaseExampleItem {
  id: string;
  label: string;
  code: string;
}
