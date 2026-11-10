"use client";

import React from "react";
import { cn } from "@/lib/utils";
import { ShowcaseDefinition } from "./registry-types";

// Customizer Studios & Defaults for legacy showcase definitions
import {
  AccordionLivePreview,
  AccordionPlaygroundStudio,
  ACCORDION_DEFAULT_CUSTOM_PROPS,
  NavbarLivePreview,
  NavbarPlaygroundStudio,
  NAVBAR_DEFAULT_CUSTOM_PROPS,
  BreadcrumbLivePreview,
  BreadcrumbPlaygroundStudio,
  BREADCRUMB_DEFAULT_CUSTOM_PROPS,
  StepCarouselPlaygroundStudio,
} from "@/components/showcases/playground-studio";

import { AccordionVariantRenderer } from "@/components/showcases/accordion/_components/accordion-variant-renderer";
import { generateAccordionCode } from "@/components/showcases/accordion/code-generator";
import { CustomProps as AccordionCustomProps } from "@/components/showcases/accordion/types";

import { NavbarVariantRenderer } from "@/components/showcases/nav-bar/_components/navbar-variant-renderer";
import { generateNavbarCode } from "@/components/showcases/nav-bar/code-generator";
import { CustomNavbarProps } from "@/components/showcases/nav-bar/types";

import { BreadcrumbVariantRenderer } from "@/components/showcases/breadcrumb/_components/breadcrumb-variant-renderer";
import { generateBreadcrumbCode } from "@/components/showcases/breadcrumb/code-generator";
import { CustomProps as BreadcrumbCustomProps } from "@/components/showcases/breadcrumb/types";

import {
  StepCarouselPreview,
  DEFAULT_STEP_CAROUSEL_PROPS,
  StepCarouselCustomProps,
  generateStepCarouselCode,
} from "@/components/showcases/step-carousel";

// Modular Showcase Definitions
import { buttonShowcaseDefinition, DEFAULT_BUTTON_PROPS, ButtonCustomProps } from "@/components/showcases/button";
import { switchShowcaseDefinition, DEFAULT_SWITCH_PROPS, SwitchCustomProps } from "@/components/showcases/switch";
import { sliderShowcaseDefinition, DEFAULT_SLIDER_PROPS, SliderCustomProps } from "@/components/showcases/slider";
import { colorGridShowcaseDefinition, DEFAULT_COLOR_GRID_PROPS, ColorGridCustomProps } from "@/components/showcases/color-grid";
import { separatorShowcaseDefinition, DEFAULT_SEPARATOR_PROPS, SeparatorCustomProps } from "@/components/showcases/separator";
import { tooltipShowcaseDefinition, DEFAULT_TOOLTIP_PROPS, TooltipCustomProps } from "@/components/showcases/tooltip";
import { confettiShowcaseDefinition, DEFAULT_CONFETTI_PROPS, ConfettiCustomProps } from "@/components/showcases/confetti";

import {
  GenericPlaygroundStudio,
  DEFAULT_GENERIC_PROPS,
  GenericCustomProps,
  generateGenericCode,
} from "@/components/layout/bento";

export * from "./registry-types";
export {
  NAVBAR_DEFAULT_CUSTOM_PROPS,
  ACCORDION_DEFAULT_CUSTOM_PROPS,
  BREADCRUMB_DEFAULT_CUSTOM_PROPS,
  DEFAULT_STEP_CAROUSEL_PROPS,
  DEFAULT_BUTTON_PROPS,
  DEFAULT_SWITCH_PROPS,
  DEFAULT_SLIDER_PROPS,
  DEFAULT_COLOR_GRID_PROPS,
  DEFAULT_SEPARATOR_PROPS,
  DEFAULT_TOOLTIP_PROPS,
  DEFAULT_CONFETTI_PROPS,
  DEFAULT_GENERIC_PROPS,
};
export type {
  CustomNavbarProps,
  AccordionCustomProps,
  BreadcrumbCustomProps,
  StepCarouselCustomProps,
  ButtonCustomProps,
  SwitchCustomProps,
  SliderCustomProps,
  ColorGridCustomProps,
  SeparatorCustomProps,
  TooltipCustomProps,
  ConfettiCustomProps,
  GenericCustomProps,
};

// Built-in Legacy Definitions
export const accordionShowcaseDefinition: ShowcaseDefinition<AccordionCustomProps> = {
  slug: "accordion",
  defaultProps: ACCORDION_DEFAULT_CUSTOM_PROPS,
  renderPreview: ({ activeTocId, customProps, isCustomizing, dynamicPreviewContent }) =>
    isCustomizing ? (dynamicPreviewContent || <AccordionLivePreview customProps={customProps} />) : <AccordionVariantRenderer id={activeTocId} customProps={customProps} />,
  renderPlayground: ({ customProps, onChange, onViewCode, hidePreview = true }) => (
    <AccordionPlaygroundStudio customProps={customProps} onChange={onChange} hidePreview={hidePreview} className="w-full h-full flex-1 min-h-0 flex flex-col" onViewCode={onViewCode} />
  ),
  generateCode: ({ customProps }) => generateAccordionCode(customProps),
  getMeta: (props) => ({ activeScale: props.size || "MD", activeColor: props.borderColor || "" }),
};

export const navbarShowcaseDefinition: ShowcaseDefinition<CustomNavbarProps> = {
  slug: "nav-bar",
  defaultProps: NAVBAR_DEFAULT_CUSTOM_PROPS,
  renderPreview: ({ activeTocId, customProps, isCustomizing, dynamicPreviewContent }) =>
    isCustomizing ? (dynamicPreviewContent || <NavbarLivePreview customProps={customProps} />) : <NavbarVariantRenderer id={activeTocId} customProps={customProps} />,
  renderPlayground: ({ customProps, onChange, onViewCode, hidePreview = true }) => (
    <NavbarPlaygroundStudio customProps={customProps} onChange={onChange} hidePreview={hidePreview} className="w-full h-full flex-1 min-h-0 flex flex-col" onViewCode={onViewCode} />
  ),
  generateCode: ({ customProps }) => generateNavbarCode(customProps),
  getMeta: (props) => ({ activeScale: props.size || "MD", activeColor: props.activeColor || "" }),
};

export const breadcrumbShowcaseDefinition: ShowcaseDefinition<BreadcrumbCustomProps> = {
  slug: "breadcrumb",
  defaultProps: BREADCRUMB_DEFAULT_CUSTOM_PROPS,
  renderPreview: ({ activeTocId, customProps, isCustomizing, dynamicPreviewContent }) =>
    isCustomizing ? (dynamicPreviewContent || <BreadcrumbLivePreview customProps={customProps} />) : <BreadcrumbVariantRenderer id={activeTocId} customProps={customProps} />,
  renderPlayground: ({ customProps, onChange, onViewCode, hidePreview = true }) => (
    <BreadcrumbPlaygroundStudio customProps={customProps} onChange={onChange} hidePreview={hidePreview} className="w-full h-full flex-1 min-h-0 flex flex-col" onViewCode={onViewCode} />
  ),
  generateCode: ({ customProps }) => generateBreadcrumbCode(customProps),
  getMeta: (props) => ({ activeScale: props.size || "MD", activeColor: props.activeColor || "" }),
};

export const stepCarouselShowcaseDefinition: ShowcaseDefinition<StepCarouselCustomProps> = {
  slug: "step-carousel",
  defaultProps: DEFAULT_STEP_CAROUSEL_PROPS,
  renderPreview: ({ customProps, activeTocId, isCustomizing }) => (
    <StepCarouselPreview customProps={customProps} activeTocId={activeTocId} isCustomizing={isCustomizing} />
  ),
  renderPlayground: ({ customProps, onChange, hidePreview = true, onViewCode }) => (
    <StepCarouselPlaygroundStudio customProps={customProps} onChange={onChange} hidePreview={hidePreview} className="w-full h-full flex-1 min-h-0 flex flex-col" onViewCode={onViewCode} />
  ),
  generateCode: ({ customProps }) => generateStepCarouselCode(customProps),
  getMeta: (props) => ({ activeScale: (props.size || "md").toUpperCase(), activeColor: props.colorScheme || "default" }),
};

export {
  buttonShowcaseDefinition,
  switchShowcaseDefinition,
  sliderShowcaseDefinition,
  colorGridShowcaseDefinition,
  separatorShowcaseDefinition,
  tooltipShowcaseDefinition,
  confettiShowcaseDefinition,
};

export function createGenericShowcaseDefinition(slug: string): ShowcaseDefinition<GenericCustomProps> {
  return {
    slug,
    defaultProps: DEFAULT_GENERIC_PROPS,
    renderPreview: ({ customProps, dynamicPreviewContent, children }) => {
      if (dynamicPreviewContent) return dynamicPreviewContent;
      return (
        <div className={cn("transition-all duration-300 flex items-center justify-center", customProps.size === "sm" && "scale-90", customProps.size === "lg" && "scale-110", customProps.glow && "drop-shadow-[0_0_24px_rgba(236,72,153,0.4)]")}>
          {children}
        </div>
      );
    },
    renderPlayground: ({ customProps, onChange, onViewCode, dynamicPlaygroundContent, propsPlaygroundContent, title, hidePreview = true }) => {
      if (dynamicPlaygroundContent) return dynamicPlaygroundContent;
      if (propsPlaygroundContent) return propsPlaygroundContent;
      return <GenericPlaygroundStudio title={title} customProps={customProps} onChange={onChange} onViewCode={onViewCode} hidePreview={hidePreview} className="w-full h-full flex-1 min-h-0 flex flex-col" />;
    },
    generateCode: ({ customProps, title, slug: s, contextCode }) => contextCode || generateGenericCode(title, s, customProps),
    getMeta: (props) => ({ activeScale: (props.size || "md").toUpperCase(), activeColor: props.color || "" }),
  };
}

export const SHOWCASE_REGISTRY: Record<string, ShowcaseDefinition> = {
  "nav-bar": navbarShowcaseDefinition,
  "navbar": navbarShowcaseDefinition,
  "accordion": accordionShowcaseDefinition,
  "breadcrumb": breadcrumbShowcaseDefinition,
  "step-carousel": stepCarouselShowcaseDefinition,
  "step-player": stepCarouselShowcaseDefinition,
  "button": buttonShowcaseDefinition,
  "switch": switchShowcaseDefinition,
  "slider": sliderShowcaseDefinition,
  "color-grid": colorGridShowcaseDefinition,
  "color-palette": colorGridShowcaseDefinition,
  "separator": separatorShowcaseDefinition,
  "tooltip": tooltipShowcaseDefinition,
  "confetti": confettiShowcaseDefinition,
};

export function getShowcaseDefinition(slug: string): ShowcaseDefinition {
  const cleanSlug = (slug || "").toLowerCase().trim();
  return SHOWCASE_REGISTRY[cleanSlug] || createGenericShowcaseDefinition(cleanSlug);
}
