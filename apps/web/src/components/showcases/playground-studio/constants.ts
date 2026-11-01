import { CustomProps as AccordionCustomProps } from "../accordion/types";
import { CustomProps as BreadcrumbCustomProps } from "../breadcrumb/types";
import { CustomNavbarProps } from "../nav-bar/types";
import {
  StepCarouselCustomProps,
  DEFAULT_STEP_CAROUSEL_PROPS,
} from "../step-carousel/types";

// ── Accordion Customizer Constants ──
export const ACCORDION_SIZES = ["xs", "sm", "md", "lg", "xl"] as const;
export const ACCORDION_WEIGHTS = ["Default", "Bold"] as const;
export const ACCORDION_ICON_TYPES = ["Default", "Custom"] as const;
export const ACCORDION_ICON_POSITIONS = ["Right", "Left"] as const;

export const ACCORDION_DEFAULT_CUSTOM_PROPS: AccordionCustomProps = {
  borderWidth: 1,
  borderRadius: 8,
  borderColor: "var(--theme-primary)",
  size: "md",
  weight: "Default",
  iconType: "Default",
  iconPosition: "Right",
  hideIcon: false,
  iconColor: "",
  headingUnderline: false,
  headingColor: "",
  contentColor: "",
  hideBorder: false,
  isDefaultExpanded: false,
  hasOnClick: false,
};

export function getAccordionModifiedCount(props: AccordionCustomProps): number {
  let count = 0;
  if (props.borderWidth !== 1) count++;
  if (props.borderRadius !== 8) count++;
  if (props.borderColor !== "var(--theme-primary)") count++;
  if (props.size !== "md") count++;
  if (props.weight !== "Default") count++;
  if (props.iconType !== "Default") count++;
  if (props.iconPosition !== "Right") count++;
  if (props.hideIcon) count++;
  if (props.iconColor && props.iconColor.trim() !== "") count++;
  if (props.headingUnderline) count++;
  if (props.headingColor && props.headingColor.trim() !== "") count++;
  if (props.contentColor && props.contentColor.trim() !== "") count++;
  if (props.hideBorder) count++;
  if (props.isDefaultExpanded) count++;
  if (props.hasOnClick) count++;
  return count;
}

// ── Breadcrumb Customizer Constants ──
export const BREADCRUMB_VARIANTS = [
  { id: "default", label: "Default" },
  { id: "chips", label: "Chips / Pills" },
  { id: "outline", label: "Outline" },
  { id: "ghost", label: "Ghost" },
] as const;

export const BREADCRUMB_SEPARATORS = [
  { id: "chevron", label: "Chevron (>)" },
  { id: "slash", label: "Slash (/)" },
  { id: "arrow", label: "Arrow (→)" },
  { id: "chevrons", label: "Double (»)" },
  { id: "dot", label: "Bullet (•)" },
  { id: "none", label: "None" },
] as const;

export const BREADCRUMB_SIZES = [
  { id: "sm", label: "Small" },
  { id: "md", label: "Medium" },
  { id: "lg", label: "Large" },
] as const;

export const BREADCRUMB_DEFAULT_CUSTOM_PROPS: BreadcrumbCustomProps = {
  variant: "chips",
  separator: "chevron",
  separatorColor: "",
  activeColor: "",
  size: "md",
  showIcons: true,
  hasDropdown: false,
  hasCollapsed: false,
};

export function getBreadcrumbModifiedCount(props: BreadcrumbCustomProps): number {
  let count = 0;
  if (props.variant !== "chips") count++;
  if (props.separator !== "chevron") count++;
  if (props.separatorColor && props.separatorColor.trim() !== "") count++;
  if (props.activeColor && props.activeColor.trim() !== "") count++;
  if (props.size !== "md") count++;
  if (!props.showIcons) count++;
  if (props.hasDropdown) count++;
  if (props.hasCollapsed) count++;
  return count;
}

// ── Navbar Customizer Constants ──
export const NAVBAR_VARIANTS = [
  { id: "gooey", label: "Fluid Gooey" },
  { id: "floating", label: "Floating Capsule" },
] as const;

export const NAVBAR_SIZES = [
  { id: "sm", label: "Small" },
  { id: "md", label: "Medium" },
  { id: "lg", label: "Large" },
] as const;

export const NAVBAR_DEFAULT_CUSTOM_PROPS: CustomNavbarProps = {
  variant: "gooey",
  size: "md",
  activeColor: "",
  showIcons: true,
  showBadges: false,
};

export function getNavbarModifiedCount(props: CustomNavbarProps): number {
  let count = 0;
  if (props.variant !== "gooey") count++;
  if (props.size !== "md") count++;
  if (props.activeColor && props.activeColor.trim() !== "") count++;
  if (!props.showIcons) count++;
  if (props.showBadges) count++;
  return count;
}

// ── Step Carousel Customizer Constants ──
export const STEP_CAROUSEL_SIZES = [
  { id: "sm", label: "Small" },
  { id: "md", label: "Medium" },
  { id: "lg", label: "Large" },
] as const;

export const STEP_CAROUSEL_COLOR_SCHEMES = [
  { id: "default", label: "Default Monochrome" },
  { id: "primary", label: "Primary Theme" },
] as const;

export const STEP_CAROUSEL_SPEEDS = [
  { id: 2000, label: "Fast (2.0s)", badge: "2s" },
  { id: 3500, label: "Normal (3.5s)", badge: "3.5s" },
  { id: 5000, label: "Relaxed (5.0s)", badge: "5s" },
] as const;

export function getStepCarouselModifiedCount(props: StepCarouselCustomProps): number {
  let count = 0;
  if (props.size !== DEFAULT_STEP_CAROUSEL_PROPS.size) count++;
  if (props.colorScheme !== DEFAULT_STEP_CAROUSEL_PROPS.colorScheme) count++;
  if (props.totalSteps !== DEFAULT_STEP_CAROUSEL_PROPS.totalSteps) count++;
  if (props.duration !== DEFAULT_STEP_CAROUSEL_PROPS.duration) count++;
  if (props.loop !== DEFAULT_STEP_CAROUSEL_PROPS.loop) count++;
  if (props.defaultPlaying !== DEFAULT_STEP_CAROUSEL_PROPS.defaultPlaying) count++;
  if (props.showPlayButton !== DEFAULT_STEP_CAROUSEL_PROPS.showPlayButton) count++;
  if (props.gooey !== DEFAULT_STEP_CAROUSEL_PROPS.gooey) count++;
  if (props.pauseOnHover !== DEFAULT_STEP_CAROUSEL_PROPS.pauseOnHover) count++;
  return count;
}

