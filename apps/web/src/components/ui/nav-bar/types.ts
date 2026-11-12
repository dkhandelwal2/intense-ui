import * as React from "react";

export type NavbarSize = "sm" | "md" | "lg";
export type NavbarVariant = "default" | "gooey" | "floating" | "pills";

export interface NavbarItemData {
  id: string;
  label: React.ReactNode;
  href?: string;
  icon?: React.ReactNode;
  badge?: React.ReactNode;
  disabled?: boolean;
}

export interface NavbarGooeyProps
  extends Omit<React.ComponentPropsWithoutRef<"nav">, "onSelect"> {
  items: NavbarItemData[];
  activeId?: string;
  defaultActiveId?: string;
  onSelect?: (id: string) => void;
  size?: NavbarSize;
  activeColor?: string;
  className?: string;
}

export interface NavbarFloatingProps
  extends Omit<React.ComponentPropsWithoutRef<"nav">, "onSelect"> {
  items: NavbarItemData[];
  activeId?: string;
  defaultActiveId?: string;
  onSelect?: (id: string) => void;
  size?: NavbarSize;
  activeColor?: string;
  layoutId?: string;
  className?: string;
}

export interface NavbarProps extends React.ComponentPropsWithoutRef<"nav"> {
  variant?: NavbarVariant;
  size?: NavbarSize;
  className?: string;
}

export interface NavbarLinkProps
  extends React.ComponentPropsWithoutRef<"a"> {
  active?: boolean;
  icon?: React.ReactNode;
}
