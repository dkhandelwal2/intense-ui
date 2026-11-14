import { NavbarSize } from "./types";

export const GOOEY_SIZES: Record<
  NavbarSize,
  {
    button: string;
    gap: string;
    fontSize: string;
  }
> = {
  sm: {
    button: "h-8 px-3 text-xs",
    gap: "mr-2",
    fontSize: "text-xs",
  },
  md: {
    button: "h-10 sm:h-11 px-4 sm:px-5 text-xs sm:text-sm",
    gap: "mr-2.5 sm:mr-3",
    fontSize: "text-xs sm:text-sm",
  },
  lg: {
    button: "h-12 px-5 sm:px-6 text-sm sm:text-base",
    gap: "mr-3 sm:mr-3.5",
    fontSize: "text-sm sm:text-base",
  },
};

export interface FloatingSizeConfig {
  container: string;
  button: string;
  icon: string;
  badge: string;
}

export const FLOATING_SIZES: Record<NavbarSize, FloatingSizeConfig> = {
  sm: {
    container: "h-9 px-1 gap-1",
    button: "h-7 px-3 text-xs gap-1.5",
    icon: "text-xs [&>svg]:w-3.5 [&>svg]:h-3.5",
    badge: "text-[9px] px-1.5 py-0.5",
  },
  md: {
    container: "h-11 px-1.5 gap-1.5",
    button: "h-8 sm:h-9 px-3.5 sm:px-4 text-xs sm:text-sm gap-1.5",
    icon: "text-sm sm:text-base [&>svg]:w-4 [&>svg]:h-4",
    badge: "text-[10px] px-2 py-0.5",
  },
  lg: {
    container: "h-14 px-2 gap-2",
    button: "h-10 sm:h-11 px-5 text-sm sm:text-base gap-2",
    icon: "text-base sm:text-lg [&>svg]:w-5 [&>svg]:h-5",
    badge: "text-xs px-2.5 py-0.5",
  },
};

export const FLOATING_SIZE_CLASSES: Record<NavbarSize, string> = {
  sm: "h-9 px-1 gap-1 text-xs",
  md: "h-11 px-1.5 gap-1.5 text-xs sm:text-sm",
  lg: "h-14 px-2 gap-2 text-sm sm:text-base",
};

export const FLOATING_ITEM_PADDING: Record<NavbarSize, string> = {
  sm: "h-7 px-3 text-xs",
  md: "h-8 sm:h-9 px-3.5 sm:px-4 text-xs sm:text-sm",
  lg: "h-10 sm:h-11 px-5 text-sm sm:text-base",
};
