"use client";

import React from "react";
import { motion } from "framer-motion";
import { PackageManager } from "@/components/ui/package-manager";
import { ComponentActiveTab } from "./types";
import { PreviewTabContent } from "./preview-tab-content";
import { InstallTabContent } from "./install-tab-content";
import { CodeTabContent } from "./code-tab-content";

export interface ComponentTabPanelProps {
  activeTab: ComponentActiveTab;
  onTabChange?: (tab: ComponentActiveTab) => void;
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
  playgroundContent?: React.ReactNode;
  previewContent?: React.ReactNode;
  customizedCode?: string | null;
}

export function ComponentTabPanel({
  activeTab,
  onTabChange,
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
  playgroundContent,
  previewContent,
  customizedCode,
}: ComponentTabPanelProps) {
  return (
    <div className="w-full flex-1 min-h-0 flex flex-col">
      {activeTab === "playground" && (
        <motion.div
          key="tab-playground"
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.15 }}
          className="w-full flex-1 min-h-0 flex flex-col pb-1"
        >
          {playgroundContent}
        </motion.div>
      )}

      {activeTab === "info" && (
        <motion.div
          key="tab-info"
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.15 }}
          className="space-y-4"
        >
          <PreviewTabContent
            description={description}
            dependencies={dependencies}
            propsTable={propsTable}
          />
        </motion.div>
      )}

      {activeTab === "install" && (
        <motion.div
          key="tab-install"
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.15 }}
        >
          <InstallTabContent
            slug={slug}
            installContent={installContent}
            usageCode={usageCode}
            dependencies={dependencies}
            packageManager={packageManager}
            onPackageManagerChange={onPackageManagerChange}
          />
        </motion.div>
      )}

      {activeTab === "code" && (
        <motion.div
          key="tab-code"
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.15 }}
          className="flex flex-col flex-1 min-h-0 h-full"
        >
          <CodeTabContent
            isCodeLoading={isCodeLoading}
            activeTocId={activeTocId}
            codeContent={codeContent}
            codes={codes}
            customizedCode={customizedCode}
          />
        </motion.div>
      )}
    </div>
  );
}
