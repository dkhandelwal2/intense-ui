"use client";

import * as React from "react";
import { AnimatedThemeToggler } from "@/components/ui/animated-theme-toggler";

export function ThemeToggle() {
  return <AnimatedThemeToggler variant="circle" duration={450} />;
}
