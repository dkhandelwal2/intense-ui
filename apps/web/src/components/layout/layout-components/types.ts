import React from "react";

export interface TocItem {
  id: string;
  label: string;
  icon?: React.ReactNode;
}

export type ComponentActiveTab = "install" | "playground" | "code" | "info";
export type ComponentCodeLang = "tsx" | "js";

export interface ComponentPageLayoutProps {
  title: string;
  description?: React.ReactNode;
  dependencies?: { name: string; command: string }[];
  propsTable?: React.ReactNode;
  tocItems?: TocItem[];
  codeContent?: string;
  codeContentJs?: string;
  codes?: Record<string, string>;
  codesJs?: Record<string, string>;
  installContent?: React.ReactNode;
  slug?: string;
  usageCode?: string;
  playgroundContent?: React.ReactNode;
  children: React.ReactNode;
}
