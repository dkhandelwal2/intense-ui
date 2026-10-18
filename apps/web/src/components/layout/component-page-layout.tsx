"use client";

import React, { useState, useEffect } from "react";
import { Breadcrumbs } from "@/components/ui/breadcrumb";
import { PackageManager } from "@/components/ui/package-manager";
import {
  ComponentPageLayoutProps,
  ComponentActiveTab,
  ComponentCodeLang,
  ComponentSidebarHeader,
  ComponentTocDock,
  ComponentBottomSheet,
  ComponentInspectorSidebar,
  ComponentTabPanel,
  useComponentToc,
} from "./layout-components";

export type { ComponentPageLayoutProps, ComponentActiveTab, ComponentCodeLang };
export {
  SidebarMotionSection,
  ComponentMoreMenu,
  ComponentSidebarHeader,
  PreviewTabContent,
  InstallTabContent,
  CodeTabContent,
  ComponentTocDock,
  ComponentBottomSheet,
  ComponentInspectorSidebar,
  ComponentTabPanel,
} from "./layout-components";

export function ComponentPageLayout({
  title,
  description,
  dependencies,
  propsTable,
  tocItems = [],
  codeContent,
  codes,
  installContent,
  slug,
  usageCode,
  children,
}: ComponentPageLayoutProps) {
  const [activeTab, setActiveTab] = useState<ComponentActiveTab>("code");
  const [packageManager, setPackageManager] = useState<PackageManager>("npm");
  const [isBottomSheetOpen, setIsBottomSheetOpen] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const { activeTocId, isCodeLoading, scrollToSection } = useComponentToc({
    tocItems,
    mounted,
  });

  const handleBottomBarTabClick = (tab: ComponentActiveTab) => {
    if (isBottomSheetOpen && activeTab === tab) {
      setIsBottomSheetOpen(false);
    } else {
      setActiveTab(tab);
      setIsBottomSheetOpen(true);
    }
  };

  const tabPanel = (
    <ComponentTabPanel
      activeTab={activeTab}
      description={description}
      dependencies={dependencies}
      propsTable={propsTable}
      slug={slug}
      installContent={installContent}
      usageCode={usageCode}
      packageManager={packageManager}
      onPackageManagerChange={setPackageManager}
      isCodeLoading={isCodeLoading}
      activeTocId={activeTocId}
      codeContent={codeContent}
      codes={codes}
    />
  );

  return (
    <div className="relative flex w-full min-w-0 items-start gap-4 xl:gap-8 pb-32">
      {/* CENTER COLUMN: Component Previews & Interactive Canvas in natural page flow */}
      <div className="relative flex-1 min-w-0 flex flex-col px-0 sm:px-2 md:px-4 lg:px-6">
        {/* Component Header / Breadcrumbs */}
        <div className="relative z-10 pt-2 pb-6 max-w-4xl">
          <Breadcrumbs currentLabel={title} className="mb-3" />
          <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-foreground uppercase tracking-wide">
            {title}
          </h1>
        </div>

        {/* Component Previews & Interactive Canvas */}
        <div className="relative z-10 w-full min-w-0">
          {mounted && children}
        </div>
      </div>

      {/* Mobile & Tablet (< xl): Gesture-Friendly Bottom Sheet Drawer Modal */}
      <ComponentBottomSheet
        isOpen={isBottomSheetOpen}
        onClose={() => setIsBottomSheetOpen(false)}
        title={title}
        activeTab={activeTab}
        onTabChange={setActiveTab}
      >
        {tabPanel}
      </ComponentBottomSheet>

      {/* Mobile & Tablet (< xl): Fixed Bottom Controller Bar */}
      <ComponentSidebarHeader
        title={title}
        activeTab={activeTab}
        onTabChange={handleBottomBarTabClick}
        isBottomBar
        isOpen={isBottomSheetOpen}
      />

      {/* Desktop (>= xl): Sticky Inspector Sidebar */}
      <ComponentInspectorSidebar
        title={title}
        activeTab={activeTab}
        onTabChange={setActiveTab}
      >
        {tabPanel}
      </ComponentInspectorSidebar>

      {/* Bottom Floating Navigation (Table of Contents Dock) */}
      <ComponentTocDock
        tocItems={tocItems}
        activeTocId={activeTocId}
        onSelectSection={scrollToSection}
      />
    </div>
  );
}
