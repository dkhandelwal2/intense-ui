import { ComponentDocData } from "./types";
import { buttonDoc } from "./button";
import { switchDoc } from "./switch";
import { sliderDoc } from "./slider";
import { tooltipDoc } from "./tooltip";
import { separatorDoc } from "./separator";
import { breadcrumbDoc } from "./breadcrumb";
import { skeletonDoc } from "./skeleton";
import { colorGridDoc } from "./color-grid";
import { accordionDoc } from "./accordion";
import { getFallbackDoc } from "./fallback";

export * from "./types";
export * from "./accordion";
export * from "./button";
export * from "./switch";
export * from "./slider";
export * from "./tooltip";
export * from "./separator";
export * from "./breadcrumb";
export * from "./skeleton";
export * from "./color-grid";

const DOCS_MAP: Record<string, ComponentDocData> = {
  "accordion": accordionDoc,
  "button": buttonDoc,
  "animated-button": buttonDoc,
  "glowing-button": buttonDoc,
  "switch": switchDoc,
  "slider": sliderDoc,
  "tooltip": tooltipDoc,
  "separator": separatorDoc,
  "breadcrumb": breadcrumbDoc,
  "skeleton": skeletonDoc,
  "color-grid": colorGridDoc,
  "color-palette": colorGridDoc,
};

export function getComponentDocData(slug: string): ComponentDocData {
  if (DOCS_MAP[slug]) {
    return DOCS_MAP[slug];
  }
  return getFallbackDoc(slug);
}
