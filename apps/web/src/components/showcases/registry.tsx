"use client";

import React from "react";
import { cn } from "@/lib/utils";

// Accordion Showcase Assets
import {
  AccordionLivePreview,
  AccordionPlaygroundStudio,
  DEFAULT_CUSTOM_PROPS as ACCORDION_DEFAULT_CUSTOM_PROPS,
} from "@/components/showcases/accordion/_components";
import { AccordionVariantRenderer } from "@/components/showcases/accordion/_components/accordion-variant-renderer";
import { generateAccordionCode } from "@/components/showcases/accordion/code-generator";
import { CustomProps as AccordionCustomProps } from "@/components/showcases/accordion/types";

// Navbar Showcase Assets
import {
  NavbarLivePreview,
  NavbarPlaygroundStudio,
  DEFAULT_CUSTOM_PROPS as NAVBAR_DEFAULT_CUSTOM_PROPS,
} from "@/components/showcases/nav-bar/_components";
import { NavbarVariantRenderer } from "@/components/showcases/nav-bar/_components/navbar-variant-renderer";
import { generateNavbarCode } from "@/components/showcases/nav-bar/code-generator";
import { CustomNavbarProps } from "@/components/showcases/nav-bar/types";

// Breadcrumb Showcase Assets
import {
  BreadcrumbLivePreview,
  BreadcrumbPlaygroundStudio,
  DEFAULT_CUSTOM_PROPS as BREADCRUMB_DEFAULT_CUSTOM_PROPS,
} from "@/components/showcases/breadcrumb/_components";
import { BreadcrumbVariantRenderer } from "@/components/showcases/breadcrumb/_components/breadcrumb-variant-renderer";
import { generateBreadcrumbCode } from "@/components/showcases/breadcrumb/code-generator";
import { CustomProps as BreadcrumbCustomProps } from "@/components/showcases/breadcrumb/types";

// Generic Showcase Fallback Assets
import {
  GenericPlaygroundStudio,
  DEFAULT_GENERIC_PROPS,
  GenericCustomProps,
  generateGenericCode,
} from "@/components/layout/bento";

export {
  NAVBAR_DEFAULT_CUSTOM_PROPS,
  ACCORDION_DEFAULT_CUSTOM_PROPS,
  BREADCRUMB_DEFAULT_CUSTOM_PROPS,
  DEFAULT_GENERIC_PROPS,
};

export type {
  CustomNavbarProps,
  AccordionCustomProps,
  BreadcrumbCustomProps,
  GenericCustomProps,
};

export interface ShowcasePreviewParams<TProps = any> {
  activeTocId: string;
  customProps: TProps;
  isCustomizing: boolean;
  dynamicPreviewContent?: React.ReactNode;
  children?: React.ReactNode;
}

export interface ShowcasePlaygroundParams<TProps = any> {
  customProps: TProps;
  onChange: React.Dispatch<React.SetStateAction<TProps>>;
  onViewCode: () => void;
  dynamicPlaygroundContent?: React.ReactNode;
  propsPlaygroundContent?: React.ReactNode;
  title: string;
}

export interface ShowcaseDefinition<TProps = any> {
  slug: string;
  defaultProps: TProps;
  renderPreview: (params: ShowcasePreviewParams<TProps>) => React.ReactNode;
  renderPlayground?: (params: ShowcasePlaygroundParams<TProps>) => React.ReactNode;
  generateCode?: (params: {
    customProps: TProps;
    title: string;
    slug: string;
    contextCode?: string | null;
  }) => string;
  getMeta?: (props: TProps) => { activeScale: string; activeColor: string };
}

// 1. Accordion Showcase Definition
export const accordionShowcaseDefinition: ShowcaseDefinition<AccordionCustomProps> = {
  slug: "accordion",
  defaultProps: ACCORDION_DEFAULT_CUSTOM_PROPS,
  renderPreview: ({ activeTocId, customProps, isCustomizing, dynamicPreviewContent }) => {
    if (isCustomizing) {
      return dynamicPreviewContent || <AccordionLivePreview customProps={customProps} />;
    }
    return <AccordionVariantRenderer id={activeTocId} customProps={customProps} />;
  },
  renderPlayground: ({ customProps, onChange, onViewCode }) => (
    <AccordionPlaygroundStudio
      customProps={customProps}
      onChange={onChange}
      hidePreview={true}
      className="w-full h-full flex-1 min-h-0 flex flex-col"
      onViewCode={onViewCode}
    />
  ),
  generateCode: ({ customProps }) => generateAccordionCode(customProps),
  getMeta: (props) => ({
    activeScale: props.size || "MD",
    activeColor: props.borderColor || "",
  }),
};

// 2. Navbar Showcase Definition
export const navbarShowcaseDefinition: ShowcaseDefinition<CustomNavbarProps> = {
  slug: "nav-bar",
  defaultProps: NAVBAR_DEFAULT_CUSTOM_PROPS,
  renderPreview: ({ activeTocId, customProps, isCustomizing, dynamicPreviewContent }) => {
    if (isCustomizing) {
      return dynamicPreviewContent || <NavbarLivePreview customProps={customProps} />;
    }
    return <NavbarVariantRenderer id={activeTocId} customProps={customProps} />;
  },
  renderPlayground: ({ customProps, onChange, onViewCode }) => (
    <NavbarPlaygroundStudio
      customProps={customProps}
      onChange={onChange}
      hidePreview={true}
      className="w-full h-full flex-1 min-h-0 flex flex-col"
      onViewCode={onViewCode}
    />
  ),
  generateCode: ({ customProps }) => generateNavbarCode(customProps),
  getMeta: (props) => ({
    activeScale: props.size || "MD",
    activeColor: props.activeColor || "",
  }),
};

// 3. Breadcrumb Showcase Definition
export const breadcrumbShowcaseDefinition: ShowcaseDefinition<BreadcrumbCustomProps> = {
  slug: "breadcrumb",
  defaultProps: BREADCRUMB_DEFAULT_CUSTOM_PROPS,
  renderPreview: ({ activeTocId, customProps, isCustomizing, dynamicPreviewContent }) => {
    if (isCustomizing) {
      return dynamicPreviewContent || <BreadcrumbLivePreview customProps={customProps} />;
    }
    return <BreadcrumbVariantRenderer id={activeTocId} customProps={customProps} />;
  },
  renderPlayground: ({ customProps, onChange, onViewCode }) => (
    <BreadcrumbPlaygroundStudio
      customProps={customProps}
      onChange={onChange}
      hidePreview={true}
      className="w-full h-full flex-1 min-h-0 flex flex-col"
      onViewCode={onViewCode}
    />
  ),
  generateCode: ({ customProps }) => generateBreadcrumbCode(customProps),
  getMeta: (props) => ({
    activeScale: props.size || "MD",
    activeColor: props.activeColor || "",
  }),
};

// 4. Generic Component Showcase Definition (Fallback for all standard components)
export function createGenericShowcaseDefinition(slug: string): ShowcaseDefinition<GenericCustomProps> {
  return {
    slug,
    defaultProps: DEFAULT_GENERIC_PROPS,
    renderPreview: ({ customProps, dynamicPreviewContent, children }) => {
      if (dynamicPreviewContent) {
        return dynamicPreviewContent;
      }
      return (
        <div
          className={cn(
            "transition-all duration-300 flex items-center justify-center",
            customProps.size === "sm" && "scale-90",
            customProps.size === "lg" && "scale-110",
            customProps.glow && "drop-shadow-[0_0_24px_rgba(236,72,153,0.4)]"
          )}
        >
          {children}
        </div>
      );
    },
    renderPlayground: ({
      customProps,
      onChange,
      onViewCode,
      dynamicPlaygroundContent,
      propsPlaygroundContent,
      title,
    }) => {
      if (dynamicPlaygroundContent) {
        return dynamicPlaygroundContent;
      }
      if (propsPlaygroundContent) {
        return propsPlaygroundContent;
      }
      return (
        <GenericPlaygroundStudio
          title={title}
          customProps={customProps}
          onChange={onChange}
          onViewCode={onViewCode}
          className="w-full h-full flex-1 min-h-0 flex flex-col"
        />
      );
    },
    generateCode: ({ customProps, title, slug, contextCode }) => {
      if (contextCode) {
        return contextCode;
      }
      return generateGenericCode(title, slug, customProps);
    },
    getMeta: (props) => ({
      activeScale: (props.size || "md").toUpperCase(),
      activeColor: props.color || "",
    }),
  };
}

// Registry map of all specialized showcase definitions
export const SHOWCASE_REGISTRY: Record<string, ShowcaseDefinition> = {
  "nav-bar": navbarShowcaseDefinition,
  "navbar": navbarShowcaseDefinition,
  "accordion": accordionShowcaseDefinition,
  "breadcrumb": breadcrumbShowcaseDefinition,
};

/**
 * Resolves the showcase definition for a given component slug.
 * If not explicitly registered, returns a clean generic showcase definition.
 */
export function getShowcaseDefinition(slug: string): ShowcaseDefinition {
  const cleanSlug = (slug || "").toLowerCase().trim();
  const definition = SHOWCASE_REGISTRY[cleanSlug];
  if (definition) {
    return definition;
  }
  return createGenericShowcaseDefinition(cleanSlug);
}
