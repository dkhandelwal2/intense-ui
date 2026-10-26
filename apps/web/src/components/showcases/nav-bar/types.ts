import React from "react";
import { NavbarVariant, NavbarSize } from "@/components/ui/nav-bar";
import { ShowcaseExampleItem } from "@/components/showcases/common";

export interface CustomNavbarProps {
  variant: NavbarVariant;
  size: NavbarSize;
  activeColor?: string;
  showIcons: boolean;
  showBadges: boolean;
}

export interface NavbarExampleItem extends ShowcaseExampleItem {
  id: string;
  label: string;
  code: string;
}
