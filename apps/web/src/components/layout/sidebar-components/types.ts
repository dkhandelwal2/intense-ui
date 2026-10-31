import type { MotionValue } from "framer-motion";

export interface SidebarWrapperProps {
  className?: string;
  isInline?: boolean;
  isEmbedded?: boolean;
}

export interface MobileSidebarTriggerProps {
  isOpen: boolean;
  onToggle: () => void;
  className?: string;
}

export interface MobileSidebarDrawerProps {
  isOpen: boolean;
  onClose: () => void;
}

export interface DesktopSidebarProps {
  className?: string;
  isInline?: boolean;
  isEmbedded?: boolean;
  width: MotionValue<number>;
  effectiveProgress: MotionValue<number>;
  onMouseEnter: () => void;
  onMouseLeave: () => void;
  onToggleCollapse?: () => void;
}
