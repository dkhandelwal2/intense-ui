import React from "react";
import { NavbarVariant, NavbarSize } from "@/components/ui/nav-bar";

export interface CustomNavbarProps {
  variant: NavbarVariant;
  size: NavbarSize;
  activeColor?: string;
  showIcons: boolean;
  showBadges: boolean;
}

export interface NavbarExampleItem {
  id: string;
  label: string;
  code: string;
  description?: string;
}
