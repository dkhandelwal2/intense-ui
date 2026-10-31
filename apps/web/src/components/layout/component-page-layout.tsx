"use client";

import React, { useState, useEffect, useMemo, useCallback } from "react";
import { SidebarWrapper } from "@/components/layout/sidebar-wrapper";
import { PackageManager } from "@/components/ui/package-manager";

// Bento modular subcomponents
import {
  BentoCanvas,
  resolveDirectDependencies,
} from "./bento";

// Showcase registry
import { getShowcaseDefinition } from "@/components/showcases/registry";

import {
  ComponentPageLayoutProps,
  ComponentActiveTab,
  ComponentCodeLang,
  TocItem,
  ComponentBottomSheet,
  ComponentSidebarHeader,
  ComponentTabPanel,
} from "./layout-components";
import {
  ComponentPlaygroundProvider,
  useComponentPlayground,
  ComponentActiveTocProvider,
} from "@/context";
import {
  CODE_TABS,
} from "./constants";

// Re-export existing layout components for backwards compatibility
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
} from "@/context/playground-context";

function ComponentPageLayoutInner({
  title,
  description,
  dependencies,
  propsTable,
  tocItems = [],
  codeContent,
  codes,
  slug = "component",
  usageCode,
  playgroundContent: propsPlaygroundContent,
  children,
}: ComponentPageLayoutProps) {
  const cleanSlug = slug.toLowerCase().trim();

  // TOC fallback: ensure at least one item exists
  const effectiveTocItems = useMemo<TocItem[]>(
    () => (tocItems && tocItems.length > 0 ? tocItems : [{ id: "default", label: title }]),
    [tocItems, title]
  );

  // Active TOC variant
  const [activeTocId, setActiveTocId] = useState<string>(
    effectiveTocItems[0]?.id || "default"
  );

  // 1. Resolve Showcase Definition from clean showcase registry (no more switch statements!)
  const showcaseDef = useMemo(() => getShowcaseDefinition(cleanSlug), [cleanSlug]);

  // 2. Single unified customProps state replacing multiple per-component useState calls
  const [customProps, setCustomProps] = useState<any>(() => showcaseDef.defaultProps);
  const [isCustomizing, setIsCustomizing] = useState(false);

  // Sync customProps whenever the component slug changes
  useEffect(() => {
    setCustomProps(showcaseDef.defaultProps);
    setIsCustomizing(false);
  }, [showcaseDef]);

  // Package manager state
  const [packageManager, setPackageManager] = useState<PackageManager>("pnpm");

  // 3. Centralized layout controls consumed from ComponentPlaygroundContext
  const {
    activeDeckCard,
    setActiveDeckCard,
    activeCodeTab,
    setActiveCodeTab,
    isBottomSheetOpen,
    setIsBottomSheetOpen,
    bottomSheetTab,
    setBottomSheetTab,
    openPlayground,
    openCode,
    playgroundContent: dynamicPlaygroundContent,
    previewContent: dynamicPreviewContent,
    customizedCode: contextCustomizedCode,
    setCustomizedCode,
  } = useComponentPlayground();

  const handleBottomBarTabClick = useCallback(
    (tab: ComponentActiveTab) => {
      setIsBottomSheetOpen((prev) => {
        if (prev && bottomSheetTab === tab) return false;
        setBottomSheetTab(tab);
        return true;
      });
    },
    [bottomSheetTab, setIsBottomSheetOpen, setBottomSheetTab]
  );

  const handleViewCode = useCallback(() => {
    openCode(CODE_TABS.CUSTOM);
  }, [openCode]);

  const handleTocItemClick = useCallback((id: string) => {
    setActiveTocId(id);
    setIsCustomizing(false);
  }, []);

  // Metadata resolution via showcase definition
  const { activeScale, activeColor } = useMemo(() => {
    if (showcaseDef.getMeta) {
      return showcaseDef.getMeta(customProps);
    }
    return { activeScale: "MD", activeColor: "" };
  }, [showcaseDef, customProps]);

  const currentTocItem = useMemo(
    () => effectiveTocItems.find((it) => it.id === activeTocId) || effectiveTocItems[0],
    [effectiveTocItems, activeTocId]
  );

  const activeVariantName = isCustomizing
    ? "Customized"
    : currentTocItem?.label || activeTocId;

  const formattedSlugName = useMemo(
    () =>
      slug
        .split("-")
        .map((s) => s.charAt(0).toUpperCase() + s.slice(1))
        .join(" "),
    [slug]
  );

  // Direct dependencies resolution using utility helper
  const directDeps = useMemo(
    () => resolveDirectDependencies(dependencies),
    [dependencies]
  );

  // Customized code resolution
  const customizedCode = useMemo(() => {
    if (showcaseDef.generateCode) {
      return showcaseDef.generateCode({
        customProps,
        title,
        slug: cleanSlug,
        contextCode: contextCustomizedCode,
      });
    }
    return contextCustomizedCode || "";
  }, [showcaseDef, customProps, title, cleanSlug, contextCustomizedCode]);

  // Active displayed code
  const currentDisplayedCode = useMemo(() => {
    if (activeCodeTab === "custom" && customizedCode) {
      return customizedCode;
    }
    return codes?.[activeTocId] || codeContent || usageCode || customizedCode || "";
  }, [activeCodeTab, customizedCode, codes, activeTocId, codeContent, usageCode]);

  useEffect(() => {
    if (setCustomizedCode && customizedCode) {
      setCustomizedCode(customizedCode);
    }
  }, [customizedCode, setCustomizedCode]);

  // Stable onChange dispatcher: satisfies React.Dispatch<SetStateAction<any>> contract
  // and marks customizing on every change.
  const handleCustomPropsChange = useCallback(
    (newPropsOrUpdater: any) => {
      setCustomProps((prev: any) => {
        const next =
          typeof newPropsOrUpdater === "function"
            ? newPropsOrUpdater(prev)
            : newPropsOrUpdater;
        return next;
      });
      setIsCustomizing(true);
    },
    []
  );

  // Clean stage preview delegate via showcase definition
  const renderStagePreview = useCallback(
    () =>
      showcaseDef.renderPreview({
        activeTocId,
        customProps,
        isCustomizing,
        dynamicPreviewContent,
        children,
      }),
    [showcaseDef, activeTocId, customProps, isCustomizing, dynamicPreviewContent, children]
  );

  // Clean playground studio delegate via showcase definition
  const renderPlaygroundStudio = useCallback(
    (options?: { hidePreview?: boolean }) =>
      showcaseDef.renderPlayground
        ? showcaseDef.renderPlayground({
            customProps,
            onChange: handleCustomPropsChange,
            onViewCode: handleViewCode,
            dynamicPlaygroundContent,
            propsPlaygroundContent,
            title,
            hidePreview: options?.hidePreview ?? true,
          })
        : null,
    [
      showcaseDef,
      customProps,
      handleCustomPropsChange,
      handleViewCode,
      dynamicPlaygroundContent,
      propsPlaygroundContent,
      title,
    ]
  );

  const tabPanel = useMemo(
    () => (
      <ComponentTabPanel
        activeTab={bottomSheetTab}
        onTabChange={setBottomSheetTab}
        description={description}
        dependencies={dependencies}
        propsTable={propsTable}
        slug={slug}
        usageCode={usageCode}
        packageManager={packageManager}
        onPackageManagerChange={setPackageManager}
        isCodeLoading={false}
        activeTocId={activeTocId}
        codeContent={codeContent}
        codes={codes}
        playgroundContent={renderPlaygroundStudio({ hidePreview: false })}
        previewContent={renderStagePreview()}
        customizedCode={customizedCode}
        activeCodeTab={activeCodeTab}
        setActiveCodeTab={setActiveCodeTab}
        currentDisplayedCode={currentDisplayedCode}
      />
    ),
    [
      bottomSheetTab,
      setBottomSheetTab,
      description,
      dependencies,
      propsTable,
      slug,
      usageCode,
      packageManager,
      activeTocId,
      codeContent,
      codes,
      renderPlaygroundStudio,
      renderStagePreview,
      customizedCode,
      activeCodeTab,
      setActiveCodeTab,
      currentDisplayedCode,
    ]
  );

  return (
    <ComponentActiveTocProvider value={activeTocId}>
      <div className="relative w-full h-full flex-1 min-h-0 bg-background text-foreground flex flex-col antialiased selection:bg-[var(--theme-primary)]/20 selection:text-[var(--theme-primary)] overflow-hidden xl:min-h-[660px]">
        {/* Main Workspace Frame */}
        <div className="w-full h-full flex items-stretch p-2 sm:p-3 pt-1 gap-3 xl:gap-4 overflow-hidden shrink-0">
          <SidebarWrapper isInline={true} />

          {/* Unified Bento Canvas (Responsive across Desktop and Mobile) */}
          <BentoCanvas
            cleanSlug={cleanSlug}
            slug={slug}
            title={title}
            formattedSlugName={formattedSlugName}
            activeTocId={activeTocId}
            currentTocItem={currentTocItem}
            effectiveTocItems={effectiveTocItems}
            handleTocItemClick={handleTocItemClick}
            isCustomizing={isCustomizing}
            setIsCustomizing={setIsCustomizing}
            activeVariantName={activeVariantName}
            activeScale={activeScale}
            activeColor={activeColor}
            renderStagePreview={renderStagePreview}
            renderPlaygroundStudio={renderPlaygroundStudio}
            handleViewCode={handleViewCode}
            onOpenPlayground={openPlayground}
            directDeps={directDeps}
            packageManager={packageManager}
            setPackageManager={setPackageManager}
            usageCode={usageCode}
            dependencies={dependencies}
            currentDisplayedCode={currentDisplayedCode}
            propsTable={propsTable}
            activeDeckCard={activeDeckCard}
            setActiveDeckCard={setActiveDeckCard}
            activeCodeTab={activeCodeTab}
            setActiveCodeTab={setActiveCodeTab}
          />
        </div>

        {/* Mobile & Tablet (< xl): Bottom Sheet Drawer Modal */}
        <ComponentBottomSheet
          isOpen={isBottomSheetOpen}
          onClose={() => setIsBottomSheetOpen(false)}
          title={title}
          slug={slug}
          activeTab={bottomSheetTab}
          onTabChange={setBottomSheetTab}
          hasPlayground={true}
        >
          {tabPanel}
        </ComponentBottomSheet>

        {/* Mobile & Tablet (< xl): Controller Bar */}
        <ComponentSidebarHeader
          title={title}
          slug={slug}
          activeTab={bottomSheetTab}
          onTabChange={handleBottomBarTabClick}
          isBottomBar={true}
          isOpen={isBottomSheetOpen}
          hasPlayground={true}
        />
      </div>
    </ComponentActiveTocProvider>
  );
}

export function ComponentPageLayout(props: ComponentPageLayoutProps) {
  return (
    <ComponentPlaygroundProvider>
      <ComponentPageLayoutInner {...props} />
    </ComponentPlaygroundProvider>
  );
}
