import { BreadcrumbSize } from "./types";

export const BREADCRUMB_SIZE_CLASSES: Record<BreadcrumbSize, string> = {
  sm: "text-xs gap-1 sm:gap-1.5",
  md: "text-xs sm:text-sm gap-1.5 sm:gap-2",
  lg: "text-sm sm:text-base gap-2 sm:gap-2.5",
};

export const BREADCRUMB_LINK_SIZE_STYLES: Record<BreadcrumbSize, string> = {
  sm: "px-2 py-0.5 text-xs rounded-md",
  md: "px-2.5 py-1 text-xs sm:text-sm rounded-lg",
  lg: "px-3 py-1.5 text-sm sm:text-base rounded-xl",
};

export const KNOWN_BREADCRUMB_LABELS: Record<string, string> = {
  docs: "Docs",
  components: "Components",
  installation: "Installation",
  introduction: "Documentation",
};
