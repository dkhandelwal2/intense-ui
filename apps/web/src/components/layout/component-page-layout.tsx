"use client";

import React, { useRef, useState, useEffect } from "react";
import { AnimatePresence } from "framer-motion";
import { PackageManager } from "@/components/ui/package-manager";
import { ScrollContainerProvider } from "./scroll-context";
import {
  ComponentPageLayoutProps,
  ComponentActiveTab,
  ComponentCodeLang,
  ComponentSidebarHeader,
  PreviewTabContent,
  InstallTabContent,
  CodeTabContent,
  ComponentTocDock,
} from "./component-layout";

export type { ComponentPageLayoutProps, ComponentActiveTab, ComponentCodeLang };
export {
  SidebarMotionSection,
  ComponentMoreMenu,
  ComponentSidebarHeader,
  PreviewTabContent,
  InstallTabContent,
  CodeTabContent,
  ComponentTocDock,
} from "./component-layout";

export function ComponentPageLayout({
  title,
  description,
  dependencies,
  propsTable,
  tocItems = [],
  codeContent,
  codeContentJs,
  codes,
  codesJs,
  installContent,
  slug,
  usageCode,
  children,
}: ComponentPageLayoutProps) {
  const [activeTab, setActiveTab] = useState<ComponentActiveTab>("info");
  const [codeLang, setCodeLang] = useState<ComponentCodeLang>("tsx");
  const [packageManager, setPackageManager] = useState<PackageManager>("npm");
  const [activeTocId, setActiveTocId] = useState(tocItems[0]?.id);
  const [mounted, setMounted] = useState(false);
  const [isCodeLoading, setIsCodeLoading] = useState(false);

  const timeoutRef = useRef<NodeJS.Timeout | null>(null);
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const mobileRightColumnRef = useRef<HTMLDivElement>(null);

  const total = tocItems.length;

  useEffect(() => {
    setMounted(true);
  }, []);

  const triggerCodeLoad = () => {
    setIsCodeLoading(true);
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    timeoutRef.current = setTimeout(() => setIsCodeLoading(false), 400);
  };

  const scrollToSection = (id: string, index: number) => {
    if (scrollContainerRef.current) {
      const container = scrollContainerRef.current;
      const maxScroll = container.scrollHeight - container.clientHeight;
      const targetScroll = (index / total) * maxScroll;
      container.scrollTo({ top: targetScroll, behavior: "smooth" });
      if (activeTocId !== id) {
        setActiveTocId(id);
        triggerCodeLoad();
      }
    }
  };

  const handleTabClick = (tab: ComponentActiveTab) => {
    setActiveTab(tab);
    // On mobile, scroll to content area so user sees the active tab
    if (typeof window !== "undefined" && window.innerWidth < 1280 && mobileRightColumnRef.current) {
      mobileRightColumnRef.current.scrollIntoView({ behavior: "smooth" });
    }
  };

  const handleScroll = (e: React.UIEvent<HTMLDivElement>) => {
    const container = e.currentTarget;
    const maxScroll = container.scrollHeight - container.clientHeight;
    if (maxScroll <= 0) return;

    const progress = container.scrollTop / maxScroll;
    const activeIndex = Math.min(total - 1, Math.max(0, Math.round(progress * total)));
    const newActiveId = tocItems[activeIndex]?.id;
    if (newActiveId && newActiveId !== activeTocId) {
      setActiveTocId(newActiveId);
      triggerCodeLoad();
    }
  };

  const rightColumnContent = (
    <>
      <ComponentSidebarHeader
        title={title}
        activeTab={activeTab}
        onTabChange={handleTabClick}
      />
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
            onPackageManagerChange={setPackageManager}
          />
        )}

        {activeTab === "code" && (
          <CodeTabContent
            codeLang={codeLang}
            onCodeLangChange={setCodeLang}
            isCodeLoading={isCodeLoading}
            activeTocId={activeTocId}
            codeContent={codeContent}
            codeContentJs={codeContentJs}
            codes={codes}
            codesJs={codesJs}
          />
        )}
      </AnimatePresence>
    </>
  );

  return (
    <>
      {/* Hide global footer and prevent body scroll on component documentation pages */}
      <style>{`
        footer { display: none !important; }
        body { overflow: hidden !important; }
      `}</style>
      <div className="flex h-[calc(100vh-57px)] w-full gap-4 xl:gap-6 overflow-hidden">
        {/* CENTER COLUMN: Component Previews & Interactive Canvas */}
        <div className="flex-1 relative h-full overflow-hidden flex flex-col md:px-8">
          <div
            ref={scrollContainerRef}
            onScroll={handleScroll}
            className="flex-1 w-full overflow-y-auto scroll-smooth pb-32 [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]"
          >
            <div className="px-4 sm:px-6 pt-6 md:px-12 md:pt-12 pb-4 max-w-4xl">
              <h1 className="text-3xl font-bold tracking-tight text-zinc-900 dark:text-zinc-50 mb-6 uppercase tracking-wide">
                {title}
              </h1>
            </div>

            <ScrollContainerProvider containerRef={scrollContainerRef}>
              {mounted && children}
            </ScrollContainerProvider>

            {/* Mobile / Tablet Right Column */}
            <div
              ref={mobileRightColumnRef}
              className="block xl:hidden px-4 sm:px-8 w-full mt-12 pb-32 pt-16"
            >
              {rightColumnContent}
            </div>
          </div>

          {/* Bottom Floating Navigation (Table of Contents Dock) */}
          <ComponentTocDock
            tocItems={tocItems}
            activeTocId={activeTocId}
            onSelectSection={scrollToSection}
          />
        </div>

        {/* RIGHT COLUMN: Info, Install & Code Tabs */}
        <div className="hidden xl:flex xl:w-[350px] 2xl:w-[480px] shrink-0 h-full overflow-y-auto scroll-smooth flex-col gap-0 pb-12 [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]">
          {rightColumnContent}
        </div>
      </div>
    </>
  );
}
