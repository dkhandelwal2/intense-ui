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

export const FLOATING_SIZE_CLASSES: Record<NavbarSize, string> = {
  sm: "h-9 px-1 gap-1 text-xs",
  md: "h-11 px-1.5 gap-1.5 text-xs sm:text-sm",
  lg: "h-13 px-2 gap-2 text-sm sm:text-base",
};

export const FLOATING_ITEM_PADDING: Record<NavbarSize, string> = {
  sm: "px-3 py-1",
  md: "px-4 py-1.5",
  lg: "px-5 py-2",
};
