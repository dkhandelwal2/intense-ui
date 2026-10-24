"use client";

import React from "react";
import { AnimatePresence } from "framer-motion";
import { PackageManager } from "@/components/ui/package-manager";
import { ComponentActiveTab } from "./types";
import { PreviewTabContent } from "./preview-tab-content";
import { InstallTabContent } from "./install-tab-content";
import { CodeTabContent } from "./code-tab-content";

export interface ComponentTabPanelProps {
  activeTab: ComponentActiveTab;
  description?: React.ReactNode;
  dependencies?: { name: string; command: string }[];
  propsTable?: React.ReactNode;
  slug?: string;
  installContent?: React.ReactNode;
  usageCode?: string;
  packageManager: PackageManager;
  onPackageManagerChange: (pm: PackageManager) => void;
  isCodeLoading: boolean;
  activeTocId?: string;
  codeContent?: string;
  codes?: Record<string, string>;
}

export function ComponentTabPanel({
  activeTab,
  description,
  dependencies,
  propsTable,
  slug,
  installContent,
  usageCode,
  packageManager,
  onPackageManagerChange,
  isCodeLoading,
  activeTocId,
  codeContent,
  codes,
}: ComponentTabPanelProps) {
  return (
    <AnimatePresence mode="wait">
      {activeTab === "info" && (
        <PreviewTabContent
          description={description}
          dependencies={dependencies}
          propsTable={propsTable}
        />
      )}

      {activeTab === "install" && (
        <InstallTabContent
          slug={slug}
          installContent={installContent}
          usageCode={usageCode}
          dependencies={dependencies}
          packageManager={packageManager}
          onPackageManagerChange={onPackageManagerChange}
        />
      )}

      {activeTab === "code" && (
        <CodeTabContent
          isCodeLoading={isCodeLoading}
          activeTocId={activeTocId}
          codeContent={codeContent}
          codes={codes}
        />
      )}
    </AnimatePresence>
  );
}
