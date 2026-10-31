import React from "react";
import { PackageManager } from "@/components/ui/package-manager";
import { TocItem } from "@/components/layout/layout-components";

export type DeckCardId = 4 | 5 | 6;

export interface DeckLayoutItem {
  top: number;
  height: string;
  scaleX: number;
  zIndex: number;
  isFront: boolean;
  d: number;
}

export type DeckLayoutMap = Record<DeckCardId, DeckLayoutItem>;
export type DeckLayoutConfigs = Record<DeckCardId, DeckLayoutMap>;

export interface BentoCardDeckProps {
  slug: string;
  activeTocId: string;
  usageCode?: string;
  dependencies?: { name: string; command: string }[];
  packageManager: PackageManager;
  onPackageManagerChange: (pm: PackageManager) => void;
  renderPlaygroundStudio: () => React.ReactNode;
  onStartCustomizing?: () => void;
  currentDisplayedCode: string;
  propsTable?: React.ReactNode;
  activeDeckCard: DeckCardId;
  setActiveDeckCard: (id: DeckCardId) => void;
  activeCodeTab: "example" | "custom" | "props";
  setActiveCodeTab: (tab: "example" | "custom" | "props") => void;
}

export interface DependencyItem {
  name: string;
  version: string;
  type?: "direct" | "peer";
}

export interface DependenciesCardProps {
  directDeps: DependencyItem[];
  packageManager: PackageManager;
  width?: number | string;
  className?: string;
}

export interface SupportCardProps {
  componentName: string;
  className?: string;
  style?: React.CSSProperties;
}

export type WeatherStatus = "idle" | "requesting" | "success" | "denied" | "error";

export interface WeatherState {
  temp: number | null;
  condition: string | null;
  city: string | null;
  code: number | null;
  status: WeatherStatus;
}

export interface GenericCustomProps {
  color: string;
  size: "sm" | "md" | "lg";
  spring: "gentle" | "fluid" | "snappy" | "bouncy";
  glow: boolean;
  shadow: boolean;
}

export interface GenericPlaygroundStudioProps {
  title: string;
  customProps: GenericCustomProps;
  onChange: React.Dispatch<React.SetStateAction<GenericCustomProps>>;
  onViewCode?: () => void;
  className?: string;
  hidePreview?: boolean;
}

export interface DesktopBentoCanvasProps {
  cleanSlug: string;
  slug: string;
  title: string;
  formattedSlugName: string;
  activeTocId: string;
  currentTocItem?: TocItem;
  effectiveTocItems: TocItem[];
  handleTocItemClick: (id: string) => void;
  isCustomizing: boolean;
  setIsCustomizing: (val: boolean) => void;
  activeVariantName: string;
  activeScale: string;
  activeColor: string;
  renderStagePreview: () => React.ReactNode;
  renderPlaygroundStudio: () => React.ReactNode;
  handleViewCode: () => void;
  directDeps: DependencyItem[];
  packageManager: PackageManager;
  setPackageManager: (pm: PackageManager) => void;
  usageCode?: string;
  dependencies?: { name: string; command: string }[];
  currentDisplayedCode: string;
  propsTable?: React.ReactNode;
  activeDeckCard: DeckCardId;
  setActiveDeckCard: (id: DeckCardId) => void;
  activeCodeTab: "example" | "custom" | "props";
  setActiveCodeTab: (tab: "example" | "custom" | "props") => void;
}

export interface MobileBentoCanvasProps {
  slug: string;
  title: string;
  formattedSlugName: string;
  activeTocId: string;
  currentTocItem?: TocItem;
  effectiveTocItems: TocItem[];
  handleTocItemClick: (id: string) => void;
  isCustomizing: boolean;
  setIsCustomizing: (val: boolean) => void;
  activeVariantName: string;
  activeScale: string;
  renderStagePreview: () => React.ReactNode;
  handleViewCode: () => void;
  directDeps: DependencyItem[];
  packageManager: PackageManager;
  onOpenPlayground: () => void;
}

export interface StageBackgroundSvgProps {
  width: number;
  height: number;
  dockWidth: number;
  cutoutY: number;
  hasMeasured: boolean;
  className?: string;
}
