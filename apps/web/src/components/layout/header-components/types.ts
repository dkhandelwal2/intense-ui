import type { MotionValue } from "framer-motion";
import { TransitionVariant } from "@/lib/animated-theme-toggler-utils";

export interface HeaderNavProps {
  isMenuOpen: boolean;
  navOpacity: MotionValue<number>;
  navScale: MotionValue<number>;
  navX: MotionValue<number>;
  navPointerEvents: MotionValue<"none" | "auto">;
}

export interface HeaderSearchDialogProps {
  isOpen: boolean;
  onClose: () => void;
  onNavigate: (href: string) => void;
}

export interface HeaderMobileMenuProps {
  isOpen: boolean;
  onClose: () => void;
}

export interface HeaderActionsProps {
  isMenuOpen: boolean;
  onOpenSearch: () => void;
  onToggleMenu: () => void;
  desktopHamburgerWidth: MotionValue<number>;
  desktopHamburgerOpacity: MotionValue<number>;
  desktopHamburgerScale: MotionValue<number>;
  desktopHamburgerMarginLeft: MotionValue<number>;
  desktopHamburgerPointerEvents: MotionValue<"none" | "auto">;
}

export interface AnimatedThemeTogglerProps
  extends React.ComponentPropsWithoutRef<"button"> {
  duration?: number;
  variant?: TransitionVariant;
  /** When true, the transition expands from the viewport center instead of the button center */
  fromCenter?: boolean;
  theme?: "light" | "dark";
  onThemeChange?: (theme: "light" | "dark") => void;
}

export interface LogoProps {
  className?: string;
  onClick?: () => void;
}