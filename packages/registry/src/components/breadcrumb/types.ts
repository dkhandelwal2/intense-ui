import React from "react";

export type BreadcrumbVariant = "default" | "chips" | "outline" | "ghost";
export type BreadcrumbSize = "sm" | "md" | "lg";

export interface BreadcrumbProps
  extends React.ComponentPropsWithoutRef<"nav"> {
  variant?: BreadcrumbVariant;
  size?: BreadcrumbSize;
  separator?: React.ReactNode;
  separatorColor?: string;
  activeColor?: string;
}

export interface BreadcrumbListProps
  extends React.ComponentPropsWithoutRef<"ol"> {
  variant?: BreadcrumbVariant;
  size?: BreadcrumbSize;
}

export interface BreadcrumbItemProps
  extends React.ComponentPropsWithoutRef<"li"> {
  isCurrentPage?: boolean;
}

export interface BreadcrumbLinkProps
  extends React.ComponentPropsWithoutRef<"a"> {
  asChild?: boolean;
  icon?: React.ReactNode;
}

export interface BreadcrumbPageProps
  extends React.ComponentPropsWithoutRef<"span"> {
  icon?: React.ReactNode;
}

export interface BreadcrumbSeparatorProps
  extends React.ComponentProps<"li"> {
  separator?: React.ReactNode;
}

export interface BreadcrumbEllipsisProps
  extends React.ComponentProps<"span"> {
  onClick?: () => void;
}

export interface BreadcrumbDropdownItemProps {
  href?: string;
  onClick?: (e: React.MouseEvent) => void;
  children: React.ReactNode;
  icon?: React.ReactNode;
  active?: boolean;
}

export interface BreadcrumbDropdownProps {
  trigger?: React.ReactNode;
  children: React.ReactNode;
  align?: "left" | "right" | "center";
  className?: string;
}

export interface BreadcrumbCollapsedItem {
  label: React.ReactNode;
  href?: string;
  icon?: React.ReactNode;
  isCurrentPage?: boolean;
  onClick?: (e: React.MouseEvent) => void;
}

export interface BreadcrumbCollapsedProps
  extends React.ComponentPropsWithoutRef<"nav"> {
  items: BreadcrumbCollapsedItem[];
  maxItems?: number;
  itemsBeforeCollapse?: number;
  itemsAfterCollapse?: number;
  isCollapsed?: boolean;
  defaultCollapsed?: boolean;
  onCollapsedChange?: (collapsed: boolean) => void;
  allowCollapse?: boolean;
  variant?: BreadcrumbVariant;
  size?: BreadcrumbSize;
  separator?: React.ReactNode;
  separatorColor?: string;
  activeColor?: string;
}

export interface BreadcrumbSegment {
  label: React.ReactNode;
  href?: string;
  isCurrentPage?: boolean;
  icon?: React.ReactNode;
}

export interface DynamicBreadcrumbsProps
  extends React.ComponentPropsWithoutRef<"nav"> {
  items?: BreadcrumbSegment[];
  pathname?: string;
  separator?: React.ReactNode;
  homeHref?: string;
  currentLabel?: React.ReactNode;
  variant?: BreadcrumbVariant;
  size?: BreadcrumbSize;
  separatorColor?: string;
  activeColor?: string;
}

export type BreadcrumbsProps = DynamicBreadcrumbsProps;
