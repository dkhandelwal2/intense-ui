import React from "react";
import { PackageManager } from "@/components/ui/package-manager";

export interface TocItem {
  id: string;
  label: string;
  icon?: React.ReactNode;
}

export type ComponentActiveTab = "info" | "code" | "install";
export type ComponentCodeLang = "tsx" | "js";

export interface ComponentPageLayoutProps {
  title: string;
  description: React.ReactNode;
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
  children: React.ReactNode;
}
