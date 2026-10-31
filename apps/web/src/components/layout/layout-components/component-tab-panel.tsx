"use client";

import React from "react";
import { motion } from "framer-motion";
import { PackageManager } from "@/components/ui/package-manager";
import { ComponentActiveTab } from "./types";
import { InstallTabContent } from "./install-tab-content";
import { DeckCodeViewer } from "@/components/layout/bento/bento-card-deck";

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
  isCodeLoading?: boolean;
  activeTocId?: string;
  codeContent?: string;
  codes?: Record<string, string>;
  playgroundContent?: React.ReactNode;
  previewContent?: React.ReactNode;
  customizedCode?: string | null;
  activeCodeTab?: "example" | "custom" | "props";
  setActiveCodeTab?: (tab: "example" | "custom" | "props") => void;
  currentDisplayedCode?: string;
}

export function ComponentTabPanel({
  activeTab,
  onTabChange: _onTabChange,
  dependencies,
  propsTable,
  slug = "component",
  installContent,
  usageCode,
  packageManager,
  onPackageManagerChange,
  activeTocId = "default",
  playgroundContent,
  activeCodeTab = "example",
  setActiveCodeTab = () => {},
  currentDisplayedCode = "",
}: ComponentTabPanelProps) {
  return (
    <div className="w-full flex-1 min-h-0 flex flex-col">
      {/* 1. CLI Installation */}
      {activeTab === "install" && (
        <motion.div
          key="tab-install"
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.15 }}
          className="w-full flex-1 min-h-0 flex flex-col"
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

      {/* 2. Playground Studio */}
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

      {/* 3. Preview & Source Code (Exact same as Desktop Card Deck 6) */}
      {activeTab === "code" && (
        <motion.div
          key="tab-code"
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.15 }}
          className="flex flex-col flex-1 min-h-0 h-full"
        >
          <DeckCodeViewer
            activeCodeTab={activeCodeTab}
            setActiveCodeTab={setActiveCodeTab}
            activeTocId={activeTocId}
            currentDisplayedCode={currentDisplayedCode}
            propsTable={propsTable}
          />
        </motion.div>
      )}
    </div>
  );
}
