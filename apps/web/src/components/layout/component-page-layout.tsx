"use client";

import React, { useState, useEffect, useRef } from "react";
import { Breadcrumbs } from "@/components/ui/breadcrumb";
import { PackageManager } from "@/components/ui/package-manager";
import { ComponentPagination } from "@/components/ui/component-pagination";
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
  useComponentActiveToc,
  ComponentActiveTocContext,
} from "./layout-components";
import {
  ComponentPlaygroundProvider,
  useComponentPlayground,
} from "./playground-context";
import { getComponentIcon } from "@/config/component-icons";

export type { ComponentPageLayoutProps, ComponentActiveTab, ComponentCodeLang };
export {
  SidebarMotionSection,
  ComponentMoreMenu,
  ComponentTabControls,
  ComponentSidebarHeader,
  PreviewTabContent,
  InstallTabContent,
  CodeTabContent,
  ComponentTocDock,
  ComponentBottomSheet,
  ComponentInspectorSidebar,
  ComponentTabPanel,
  useComponentActiveToc,
  ComponentActiveTocContext,
} from "./layout-components";
export {
  ComponentPlaygroundProvider,
  useComponentPlayground,
} from "./playground-context";

function ComponentPageLayoutInner({
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
  playgroundContent: propsPlaygroundContent,
  children,
}: ComponentPageLayoutProps) {
  const [packageManager, setPackageManager] = useState<PackageManager>("npm");
  const [isBottomSheetOpen, setIsBottomSheetOpen] = useState(false);
  const [mounted, setMounted] = useState(false);
  const centerColumnRef = useRef<HTMLDivElement>(null);

  const {
    activeTab,
    setActiveTab,
    playgroundContent: dynamicPlaygroundContent,
    previewContent: dynamicPreviewContent,
    customizedCode,
    hasPlayground,
  } = useComponentPlayground();

  const effectivePlaygroundContent =
    dynamicPlaygroundContent || propsPlaygroundContent;
  const isPlaygroundAvailable = hasPlayground || Boolean(propsPlaygroundContent);
  const ComponentIcon = getComponentIcon(slug || title);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    const handleOpenPlayground = () => {
      if (typeof window !== "undefined" && window.innerWidth < 1280) {
        setIsBottomSheetOpen(true);
      }
    };

    window.addEventListener("intense-ui:open-playground", handleOpenPlayground);

    return () => {
      window.removeEventListener("intense-ui:open-playground", handleOpenPlayground);
    };
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
      onTabChange={setActiveTab}
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
      playgroundContent={effectivePlaygroundContent}
      previewContent={dynamicPreviewContent}
      customizedCode={customizedCode}
    />
  );

  return (
    <div className="relative flex w-full min-w-0 items-start gap-4 xl:gap-8">
      {/* CENTER COLUMN: Component Previews & Interactive Canvas in natural page flow */}
      <div
        id="center-content-column"
        ref={centerColumnRef}
        className="relative flex-1 min-w-0 flex flex-col px-0 sm:px-2 md:px-4 lg:px-6 md:pb-32"
      >
        {/* Component Header / Breadcrumbs & Intro */}
        <div className="relative z-10 pt-2 pb-6 max-w-4xl space-y-3">
          <Breadcrumbs currentLabel={title} className="mb-2" />
          <div className="flex items-center gap-3 sm:gap-3.5">
            <div className="w-9 h-9 sm:w-11 sm:h-11 rounded-2xl bg-[var(--theme-primary)]/10 text-[var(--theme-primary)] border border-[var(--theme-primary)]/20 shadow-xs flex items-center justify-center shrink-0">
              <ComponentIcon className="w-5 h-5 sm:w-6 sm:h-6" />
            </div>
            <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-foreground uppercase tracking-wide">
              {title}
            </h1>
          </div>

          {description && (
            <p className="text-base sm:text-lg text-zinc-600 dark:text-zinc-400 leading-relaxed font-normal">
              {description}
            </p>
          )}
        </div>

        {/* Component Previews & Interactive Canvas */}
        <ComponentActiveTocContext.Provider value={activeTocId}>
          <div className="relative z-10 w-full min-w-0">
            {mounted && children}

            {slug && (
              <div className="max-w-3xl mx-auto pt-10 sm:pt-16 pb-28 sm:pb-20">
                <ComponentPagination currentSlug={slug} />
              </div>
            )}
          </div>
        </ComponentActiveTocContext.Provider>
      </div>

      {/* Mobile & Tablet (< xl): Gesture-Friendly Bottom Sheet Drawer Modal */}
      <ComponentBottomSheet
        isOpen={isBottomSheetOpen}
        onClose={() => setIsBottomSheetOpen(false)}
        title={title}
        slug={slug}
        activeTab={activeTab}
        onTabChange={setActiveTab}
        hasPlayground={isPlaygroundAvailable}
      >
        {tabPanel}
      </ComponentBottomSheet>

      {/* Mobile & Tablet (< xl): Fixed Bottom Controller Bar */}
      <ComponentSidebarHeader
        title={title}
        slug={slug}
        activeTab={activeTab}
        onTabChange={handleBottomBarTabClick}
        isBottomBar
        isOpen={isBottomSheetOpen}
        hasPlayground={isPlaygroundAvailable}
      />

      {/* Desktop (>= xl): Sticky Inspector Sidebar */}
      <ComponentInspectorSidebar
        title={title}
        slug={slug}
        activeTab={activeTab}
        onTabChange={setActiveTab}
        hasPlayground={isPlaygroundAvailable}
      >
        {tabPanel}
      </ComponentInspectorSidebar>

      {/* Bottom Floating Navigation (Table of Contents Dock) */}
      <ComponentTocDock
        tocItems={tocItems}
        activeTocId={activeTocId}
        centerColumnRef={centerColumnRef}
        onItemClick={scrollToSection}
      />
    </div>
  );
}

export function ComponentPageLayout(props: ComponentPageLayoutProps) {
  return (
    <ComponentPlaygroundProvider>
      <ComponentPageLayoutInner {...props} />
    </ComponentPlaygroundProvider>
  );
}
