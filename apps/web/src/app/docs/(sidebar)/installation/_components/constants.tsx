import React from "react";
import {
  ToggleRight,
  SlidersHorizontal,
  LayoutList,
  Sparkles,
  Box,
} from "lucide-react";

import { ComponentListItem } from "./types";
export * from "./types";

export const COMPONENTS_LIST: ComponentListItem[] = [
  { slug: "switch", label: "Switch", icon: <ToggleRight className="w-3.5 h-3.5" />, desc: "Tactile 3D rocker switch" },
  { slug: "slider", label: "Slider", icon: <SlidersHorizontal className="w-3.5 h-3.5" />, desc: "Smooth spring-tracked slider" },
  { slug: "accordion", label: "Accordion", icon: <LayoutList className="w-3.5 h-3.5" />, desc: "Physics animated accordion" },
  { slug: "tooltip", label: "Tooltip", icon: <Sparkles className="w-3.5 h-3.5" />, desc: "Hover floating preview" },
  { slug: "animated-button", label: "Button", icon: <Box className="w-3.5 h-3.5" />, desc: "Magnetic glow button" },
];

export {
  getComponentAddCommand as getAddCommand,
  getShadcnInitCommand as getInitCommand,
} from "@/config/site";
