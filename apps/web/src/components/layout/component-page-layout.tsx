"use client";

import React, { useRef, useState, useEffect } from "react";
import { AnimatePresence, motion, useDragControls } from "framer-motion";
import { Monitor, Code, X } from "lucide-react";
import { cn } from "@/lib/utils";
import { Separator } from "@/components/ui/separator";
import { PackageManager } from "@/components/ui/package-manager";
import {
  ComponentPageLayoutProps,
  ComponentActiveTab,
  ComponentCodeLang,
  ComponentSidebarHeader,
  ComponentMoreMenu,
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
  const [isBottomSheetOpen, setIsBottomSheetOpen] = useState(false);

  const dragControls = useDragControls();
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);
  const rightSidebarRef = useRef<HTMLDivElement>(null);
  const bottomSheetContentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setMounted(true);
  }, []);

  const resetRightSidebarScroll = () => {
    if (rightSidebarRef.current) {
      rightSidebarRef.current.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  // Ensure right sidebar resets to top whenever active tab changes
  useEffect(() => {
    resetRightSidebarScroll();

    const timer = setTimeout(() => {
      if (rightSidebarRef.current && rightSidebarRef.current.scrollTop !== 0) {
        rightSidebarRef.current.scrollTo({ top: 0, behavior: "smooth" });
      }
    }, 220);

    return () => clearTimeout(timer);
  }, [activeTab]);

  // Reset bottom sheet content scroll on tab or open change
  useEffect(() => {
    if (bottomSheetContentRef.current) {
      bottomSheetContentRef.current.scrollTo({ top: 0, behavior: "smooth" });
    }
  }, [activeTab, isBottomSheetOpen]);

  // Lock body scroll when bottom sheet is open
  useEffect(() => {
    if (isBottomSheetOpen) {
      const originalOverflow = document.body.style.overflow;
      document.body.style.overflow = "hidden";
      return () => {
        document.body.style.overflow = originalOverflow;
      };
    }
  }, [isBottomSheetOpen]);

  // Close bottom sheet on Escape key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape" && isBottomSheetOpen) {
        setIsBottomSheetOpen(false);
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isBottomSheetOpen]);

  // Auto-close bottom sheet on desktop resize (>= 1280px)
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 1280 && isBottomSheetOpen) {
        setIsBottomSheetOpen(false);
      }
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [isBottomSheetOpen]);

  const triggerCodeLoad = () => {
    setIsCodeLoading(true);
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    timeoutRef.current = setTimeout(() => setIsCodeLoading(false), 400);
  };

  // Smoothly scroll window to target component section
  const scrollToSection = (id: string, index: number) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth", block: "start" });
    }
    if (activeTocId !== id) {
      setActiveTocId(id);
      triggerCodeLoad();
    }
  };

  // Automatically track which section is currently in view
  useEffect(() => {
    if (!mounted || !tocItems || tocItems.length === 0) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveTocId(entry.target.id);
            triggerCodeLoad();
          }
        });
      },
      {
        rootMargin: "-20% 0px -55% 0px",
        threshold: 0,
      }
    );

    tocItems.forEach((item) => {
      const el = document.getElementById(item.id);
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, [mounted, tocItems]);

  const handleTabClick = (tab: ComponentActiveTab) => {
    setActiveTab(tab);
    resetRightSidebarScroll();
  };

  const handleBottomBarTabClick = (tab: ComponentActiveTab) => {
    if (isBottomSheetOpen && activeTab === tab) {
      setIsBottomSheetOpen(false);
    } else {
      setActiveTab(tab);
      setIsBottomSheetOpen(true);
    }
  };

  const renderTabContent = () => (
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
  );

  return (
    <div className="relative flex w-full min-w-0 items-start gap-4 xl:gap-8 pb-32">
      {/* CENTER COLUMN: Component Previews & Interactive Canvas in natural page flow */}
      <div className="relative flex-1 min-w-0 flex flex-col px-0 sm:px-2 md:px-4 lg:px-6">

        {/* Component Header / Breadcrumbs */}
        <div className="relative z-10 pt-2 pb-6 max-w-4xl">
          <div className="flex items-center gap-1.5 text-xs text-muted-foreground mb-3 font-medium">
            <span>Docs</span>
            <span>/</span>
            <span>Components</span>
            <span>/</span>
            <span className="text-foreground capitalize">{title}</span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-foreground uppercase tracking-wide">
            {title}
          </h1>
        </div>

        {/* Component Previews & Interactive Canvas in natural page flow - ONLY component options on page */}
        <div className="relative z-10 w-full min-w-0">
          {mounted && children}
        </div>
      </div>

      {/* Mobile & Tablet (< xl): Gesture-Friendly Bottom Sheet Modal */}
      <AnimatePresence>
        {isBottomSheetOpen && (
          <>
            {/* Backdrop Scrim */}
            <motion.div
              key="bottom-sheet-backdrop"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              onClick={() => setIsBottomSheetOpen(false)}
              className="fixed inset-0 z-[60] bg-black/60 backdrop-blur-xs xl:hidden"
              aria-hidden="true"
            />

            {/* Draggable Drawer Modal */}
            <motion.div
              key="bottom-sheet-modal"
              drag="y"
              dragControls={dragControls}
              dragListener={false}
              dragConstraints={{ top: 0 }}
              dragElastic={{ top: 0, bottom: 0.6 }}
              onDragEnd={(_e, info) => {
                if (info.offset.y > 100 || info.velocity.y > 350) {
                  setIsBottomSheetOpen(false);
                }
              }}
              initial={{ y: "100%" }}
              animate={{ y: 0 }}
              exit={{ y: "100%" }}
              transition={{ type: "spring", damping: 28, stiffness: 300 }}
              className="fixed bottom-0 left-0 right-0 md:left-[68px] z-[61] max-h-[85vh] h-[82vh] rounded-t-[32px] sm:rounded-t-[36px] bg-background/95 dark:bg-[#0c0c0e]/98 backdrop-blur-2xl border-t border-black/10 dark:border-white/10 shadow-[0_-20px_60px_rgba(0,0,0,0.5)] flex flex-col overflow-hidden will-change-transform xl:hidden"
            >
              {/* Grab handle indicator zone (drag trigger) */}
              <div
                onPointerDown={(e) => dragControls.start(e)}
                className="w-full flex flex-col items-center pt-3 pb-2 cursor-grab active:cursor-grabbing touch-none select-none"
              >
                <div className="w-12 h-1.5 rounded-full bg-zinc-300 dark:bg-zinc-700/80 hover:bg-zinc-400 dark:hover:bg-zinc-600 transition-colors" />
              </div>

              {/* Sheet Header with title, tab switchers, and close button */}
              <div
                onPointerDown={(e) => {
                  const target = e.target as HTMLElement;
                  if (!target.closest("button, a, input, select, textarea")) {
                    dragControls.start(e);
                  }
                }}
                className="px-4 sm:px-6 pb-3 pt-1 flex items-center justify-between gap-3 border-b border-black/5 dark:border-white/10 shrink-0 select-none cursor-grab active:cursor-grabbing touch-none"
              >
                <div className="flex items-center gap-2 min-w-0 flex-1">
                  <h2 className="text-xs sm:text-sm font-bold tracking-tight text-foreground uppercase truncate">
                    {title}
                  </h2>
                </div>

                <div className="flex items-center gap-1.5 sm:gap-2 shrink-0">
                  <button
                    type="button"
                    onClick={() => setActiveTab("install")}
                    className={cn(
                      "px-3 py-1 text-xs font-medium rounded-full transition-colors cursor-pointer",
                      activeTab === "install"
                        ? "bg-[var(--theme-primary)] text-white shadow-sm"
                        : "bg-zinc-100 hover:bg-zinc-200 text-zinc-600 dark:bg-white/10 dark:hover:bg-white/20 dark:text-white"
                    )}
                  >
                    Install
                  </button>
                  <div className="flex items-center p-0.5 bg-zinc-100 dark:bg-white/5 border border-black/5 dark:border-white/10 rounded-full">
                    <button
                      type="button"
                      onClick={() => setActiveTab("info")}
                      className={cn(
                        "p-1.5 rounded-full transition-colors cursor-pointer",
                        activeTab === "info"
                          ? "bg-[var(--theme-primary)]/20 text-[var(--theme-primary)]"
                          : "text-zinc-500 hover:text-zinc-900 hover:bg-zinc-100 dark:text-zinc-400 dark:hover:text-white dark:hover:bg-white/10"
                      )}
                      title="Preview"
                    >
                      <Monitor className="w-3.5 h-3.5" />
                    </button>
                    <button
                      type="button"
                      onClick={() => setActiveTab("code")}
                      className={cn(
                        "p-1.5 rounded-full transition-colors cursor-pointer",
                        activeTab === "code"
                          ? "bg-[var(--theme-primary)]/20 text-[var(--theme-primary)]"
                          : "text-zinc-500 hover:text-zinc-900 hover:bg-zinc-100 dark:text-zinc-400 dark:hover:text-white dark:hover:bg-white/10"
                      )}
                      title="Code"
                    >
                      <Code className="w-3.5 h-3.5" />
                    </button>
                    <ComponentMoreMenu />
                  </div>
                  <button
                    type="button"
                    onClick={() => setIsBottomSheetOpen(false)}
                    className="p-1.5 rounded-full text-zinc-400 hover:text-zinc-700 dark:hover:text-zinc-200 hover:bg-zinc-100 dark:hover:bg-white/10 transition-colors cursor-pointer ml-1"
                    aria-label="Close bottom sheet"
                  >
                    <X className="w-4 h-4" />
                  </button>
                </div>
              </div>

              {/* Scrollable Sheet Content Body */}
              <div
                ref={bottomSheetContentRef}
                className="flex-1 overflow-y-auto overscroll-contain p-4 sm:p-6 hide-scrollbar"
              >
                {renderTabContent()}
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* Mobile & Tablet (< xl): Fixed Bottom Controller Bar (Install, Preview, Code) */}
      <ComponentSidebarHeader
        title={title}
        activeTab={activeTab}
        onTabChange={handleBottomBarTabClick}
        isBottomBar
        isOpen={isBottomSheetOpen}
      />

      {/* RIGHT COLUMN: Sticky Inspector (Info, Install & Code Tabs) on Desktop */}
      <aside
        className="sticky top-20 z-30 hidden xl:flex flex-col xl:w-[360px] 2xl:w-[460px] h-[calc(100vh-6rem)] shrink-0 py-1"
      >
        <div
          className={cn(
            "w-full h-full flex flex-col transition-colors duration-300",
            "bg-background/80 dark:bg-[#0c0c0e]/95 backdrop-blur-2xl",
            "shadow-lg shadow-black/5 dark:shadow-2xl dark:shadow-black/60",
            "relative rounded-[32px] p-5 overflow-hidden"
          )}
        >
          {/* Left-side gradient hairline separator */}
          <Separator orientation="vertical" className="absolute left-0 top-0 bottom-0 pointer-events-none" />

          {/* Pinned / Fixed Header on Top */}
          <ComponentSidebarHeader
            title={title}
            activeTab={activeTab}
            onTabChange={handleTabClick}
          />

          {/* Scrollable inner content */}
          <div
            ref={rightSidebarRef}
            className="flex-1 overflow-y-auto hide-scrollbar flex flex-col w-full"
          >
            {renderTabContent()}
          </div>
        </div>
      </aside>

      {/* Bottom Floating Navigation (Table of Contents Dock) */}
      <ComponentTocDock
        tocItems={tocItems}
        activeTocId={activeTocId}
        onSelectSection={scrollToSection}
      />
    </div>
  );
}
