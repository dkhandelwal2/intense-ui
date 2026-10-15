"use client";

import React, { useRef, useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Code, Monitor, Moon, TerminalSquare, Info, X, Heart, Scale, Mail, Gem, ShieldPlus } from "lucide-react";
import { cn } from "@/lib/utils";
import { CodeBlock } from "@/components/ui/code-block";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ScrollContainerProvider } from "./scroll-context";

interface TocItem {
  id: string;
  label: string;
  icon?: React.ReactNode;
}

interface ComponentPageLayoutProps {
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
  const [activeTab, setActiveTab] = useState<'info' | 'code' | 'install'>('info');
  const [codeLang, setCodeLang] = useState<'tsx' | 'js'>('tsx');
  const [activeTocId, setActiveTocId] = useState(tocItems[0]?.id);
  const [isTocExpanded, setIsTocExpanded] = useState(false);
  const [mounted, setMounted] = useState(false);
  const [isCodeLoading, setIsCodeLoading] = useState(false);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    setMounted(true);
  }, []);

  // The scrollable center container
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const mobileRightColumnRef = useRef<HTMLDivElement>(null);

  const total = tocItems.length;
  const activeHidden = tocItems.findIndex(i => i.id === activeTocId) >= 7;

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

  const handleTabClick = (tab: 'info' | 'code' | 'install') => {
    setActiveTab(tab);
    // On mobile, scroll to the content area so the user sees the tab they just clicked
    if (typeof window !== 'undefined' && window.innerWidth < 1280 && mobileRightColumnRef.current) {
      mobileRightColumnRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleScroll = (e: React.UIEvent<HTMLDivElement>) => {
    const container = e.currentTarget;
    const maxScroll = container.scrollHeight - container.clientHeight;
    if (maxScroll <= 0) return;

    const progress = container.scrollTop / maxScroll;
    // Map progress to the active index
    const activeIndex = Math.min(total - 1, Math.max(0, Math.round(progress * total)));
    const newActiveId = tocItems[activeIndex]?.id;
    if (newActiveId && newActiveId !== activeTocId) {
      setActiveTocId(newActiveId);
      triggerCodeLoad();
    }
  };

  const rightColumnContent = (
    <>
      {/* Top Controls Bar */}
      <div className="flex items-center justify-between z-[70] bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 py-3 px-4 border-t border-black/5 dark:border-white/5 fixed bottom-0 left-0 right-0 xl:px-0 xl:py-2 xl:border-t-0 xl:border-b xl:sticky xl:top-0 xl:bottom-auto xl:left-auto xl:right-auto xl:bg-background xl:backdrop-blur-none xl:mb-6">
        <h1 className="text-xs font-semibold text-zinc-500 dark:text-zinc-400 tracking-wider uppercase">{title}</h1>
        <div className="flex items-center gap-2">
          <button
            onClick={() => handleTabClick(activeTab === 'install' ? 'info' : 'install')}
            className={cn("px-4 py-1.5 text-sm font-medium rounded-full transition-colors", activeTab === 'install' ? "bg-[var(--theme-primary)] text-white" : "bg-zinc-100 hover:bg-zinc-200 text-zinc-600 dark:bg-white/10 dark:hover:bg-white/20 dark:text-white")}
          >
            Install
          </button>
          <div className="flex items-center p-1 bg-zinc-100 dark:bg-white/5 border border-black/5 dark:border-white/10 rounded-full">
            <button
              onClick={() => handleTabClick('info')}
              className={cn("p-1.5 rounded-full transition-colors", activeTab === 'info' ? "bg-[var(--theme-primary)]/20 text-[var(--theme-primary)]" : "text-zinc-500 hover:text-zinc-900 hover:bg-zinc-100 dark:text-zinc-400 dark:hover:text-white dark:hover:bg-white/10")}
              title="Preview"
            >
              <Monitor className="w-4 h-4" />
            </button>
            <button
              onClick={() => handleTabClick('code')}
              className={cn("p-1.5 rounded-full transition-colors", activeTab === 'code' ? "bg-[var(--theme-primary)]/20 text-[var(--theme-primary)]" : "text-zinc-500 hover:text-zinc-900 hover:bg-zinc-100 dark:text-zinc-400 dark:hover:text-white dark:hover:bg-white/10")}
              title="Code"
            >
              <Code className="w-4 h-4" />
            </button>
            <a
              href="https://github.com/dkhandelwal2/intense-ui"
              target="_blank"
              rel="noreferrer"
              className="flex items-center justify-center p-1.5 text-zinc-500 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-white hover:bg-zinc-200 dark:hover:bg-white/10 rounded-full transition-colors group"
              title="GitHub"
            >
              <div className="flex gap-[3px] items-center justify-center w-4 h-4">
                <div className="w-1 h-1 rounded-full bg-current group-hover:animate-bounce [animation-delay:-0.3s]"></div>
                <div className="w-1 h-1 rounded-full bg-current group-hover:animate-bounce [animation-delay:-0.15s]"></div>
                <div className="w-1 h-1 rounded-full bg-current group-hover:animate-bounce"></div>
              </div>
            </a>
          </div>
        </div>
      </div>
      <AnimatePresence mode="wait">
        {activeTab === 'info' && (
          <motion.div
            key="info"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 20 }}
            transition={{ duration: 0.2 }}
            className="flex flex-col gap-10"
          >
            <div className="flex flex-col gap-4">
              <div className="text-md leading-relaxed text-zinc-600 dark:text-zinc-300 font-light mt-2">
                {description}
              </div>
            </div>

            {dependencies && dependencies.length > 0 && (
              <div className="flex flex-col gap-4">
                <h3 className="text-xs font-semibold text-zinc-500 uppercase tracking-widest flex items-center gap-2">
                  <ShieldPlus className="w-4 h-4 text-[var(--theme-primary)]" /> Dependencies
                </h3>
                <div className="flex flex-wrap gap-2">
                  {dependencies.map(dep => (
                    <div key={dep.name} className="px-3 py-1.5 rounded-full border border-black/5 dark:border-white/5 bg-zinc-50 dark:bg-white/5 text-xs text-zinc-700 dark:text-zinc-300 font-mono">
                      {dep.name}
                    </div>
                  ))}
                </div>
              </div>
            )}

            {propsTable && (
              <div className="flex flex-col gap-4">
                <h3 className="text-xs font-semibold text-zinc-500 uppercase tracking-widest flex items-center gap-2">
                  <Gem className="w-4 h-4 text-[var(--theme-primary)]" /> Props
                </h3>
                <div className="text-sm text-zinc-600 dark:text-zinc-400">
                  {propsTable}
                </div>

                <div className="flex flex-col gap-6 pt-6 border-t border-black/5 dark:border-white/5 mt-4">
                  <div className="flex flex-col gap-3">
                    <h3 className="text-xs font-semibold text-zinc-500 uppercase tracking-widest flex items-center gap-2">
                      <Heart className="w-4 h-4 text-[var(--theme-primary)]" /> Open Source
                    </h3>
                    <p className="text-sm text-zinc-600 dark:text-zinc-400 leading-relaxed">
                      This component library is free and open-source. We believe in building accessible, highly customizable, and beautifully animated components for everyone. Contributions are welcome!
                    </p>
                  </div>

                  <div className="flex flex-col gap-3">
                    <h3 className="text-xs font-semibold text-zinc-500 uppercase tracking-widest flex items-center gap-2">
                      <Scale className="w-4 h-4 text-[var(--theme-primary)]" /> License: MIT
                    </h3>
                    <ul className="text-sm text-zinc-600 dark:text-zinc-400 space-y-1.5 list-inside list-disc">
                      <li>Free for commercial and personal use</li>
                      <li>Modification and distribution allowed</li>
                      <li>Requires copyright notice preservation</li>
                      <li>No warranty or liability provided</li>
                    </ul>
                  </div>

                  <div className="flex flex-col gap-3">
                    <h3 className="text-xs font-semibold text-zinc-500 uppercase tracking-widest flex items-center gap-2">
                      <Mail className="w-4 h-4 text-[var(--theme-primary)]" /> Contact Us
                    </h3>
                    <p className="text-sm text-zinc-600 dark:text-zinc-400 leading-relaxed">
                      Have questions, need custom components, or want to report an issue? Reach out to us or message us on X (Twitter).
                    </p>
                  </div>
                </div>

              </div>
            )}
          </motion.div>
        )}

        {activeTab === 'install' && (
          <motion.div
            key="install"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 20 }}
            transition={{ duration: 0.2 }}
            className="flex flex-col gap-6"
          >
            <div className="flex items-center justify-between border-b border-black/5 dark:border-white/5 pb-4 mt-2">
              <h3 className="text-sm font-semibold text-zinc-900 dark:text-zinc-300">Installation</h3>
            </div>
            {dependencies && dependencies.length > 0 && (
              <div className="flex flex-col gap-4">
                <h3 className="text-xs font-semibold text-zinc-500 uppercase tracking-widest">Dependencies</h3>
                <div className="flex flex-wrap gap-2">
                  {dependencies.map(dep => (
                    <div key={dep.name} className="px-3 py-1.5 rounded-full border border-black/5 dark:border-white/5 bg-zinc-50 dark:bg-white/5 text-xs text-zinc-700 dark:text-zinc-300 font-mono">
                      {dep.name}
                    </div>
                  ))}
                </div>
              </div>
            )}
            <div className="text-zinc-800 dark:text-zinc-300">
              {installContent || (slug ? (
                <div className="flex flex-col gap-8 mt-2">
                  <div className="flex flex-col gap-4">
                    <p className="text-sm text-zinc-600 dark:text-zinc-400">Run the following command to securely add the component to your project:</p>
                    <Tabs defaultValue="npm" className="w-full">
                      <TabsList className="mb-4 bg-zinc-100 dark:bg-white/5 border border-black/5 dark:border-white/5">
                        {["npm", "pnpm", "yarn", "bun"].map(pm => (
                          <TabsTrigger key={pm} value={pm} className="text-xs data-[state=active]:bg-[var(--theme-primary)] data-[state=active]:text-white">{pm}</TabsTrigger>
                        ))}
                      </TabsList>
                      {[
                        { pm: "npm", cmd: `npx shadcn@latest add dkhandelwal2/intense-ui/${slug}` },
                        { pm: "pnpm", cmd: `pnpm dlx shadcn@latest add dkhandelwal2/intense-ui/${slug}` },
                        { pm: "yarn", cmd: `npx shadcn@latest add dkhandelwal2/intense-ui/${slug}` },
                        { pm: "bun", cmd: `bunx --bun shadcn@latest add dkhandelwal2/intense-ui/${slug}` }
                      ].map(({ pm, cmd }) => (
                        <TabsContent key={pm} value={pm}>
                          <div className="overflow-hidden rounded-xl border border-black/5 dark:border-white/5 bg-zinc-950 dark:bg-[#0c0c0c]">
                            <CodeBlock code={cmd} language="bash" />
                          </div>
                        </TabsContent>
                      ))}
                    </Tabs>
                  </div>
                  {usageCode && (
                    <div className="flex flex-col gap-4 border-t border-black/5 dark:border-white/5 pt-6">
                      <h3 className="text-sm font-semibold text-zinc-900 dark:text-zinc-300">Usage</h3>
                      <p className="text-sm text-zinc-600 dark:text-zinc-400">Once installed, import and use the component:</p>
                      <div className="overflow-hidden rounded-xl border border-black/5 dark:border-white/5 bg-zinc-950 dark:bg-[#0c0c0c]">
                        <CodeBlock code={usageCode} language="tsx" />
                      </div>
                    </div>
                  )}
                </div>
              ) : (
                <div className="text-sm text-zinc-500">No installation steps provided.</div>
              ))}
            </div>
          </motion.div>
        )}

        {activeTab === 'code' && (
          <motion.div
            key="code"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 20 }}
            transition={{ duration: 0.2 }}
            className="flex flex-col h-full gap-4"
          >
            <div className="flex items-center justify-between border-b border-black/5 dark:border-white/5 pb-4">
              <h3 className="text-sm font-semibold text-zinc-900 dark:text-zinc-300">Code Reference</h3>
              <div className="flex items-center gap-3">
                <div className="flex bg-zinc-100 dark:bg-white/5 p-1 rounded-lg">
                  <button
                    onClick={() => setCodeLang('tsx')}
                    className={cn("text-xs px-2.5 py-1 rounded-md transition-colors", codeLang === 'tsx' ? "bg-[var(--theme-primary)] text-white" : "text-zinc-500 hover:text-zinc-900 dark:hover:text-zinc-300")}
                  >
                    TSX
                  </button>
                  <button
                    onClick={() => setCodeLang('js')}
                    className={cn("text-xs px-2.5 py-1 rounded-md transition-colors", codeLang === 'js' ? "bg-[var(--theme-primary)] text-white" : "text-zinc-500 hover:text-zinc-900 dark:hover:text-zinc-300")}
                  >
                    JSX
                  </button>
                </div>
              </div>
            </div>
            <div className="flex-1 overflow-hidden rounded-xl border border-black/5 dark:border-white/5 bg-zinc-950 dark:bg-[#0c0c0c] relative">
              <AnimatePresence mode="wait">
                {isCodeLoading ? (
                  <motion.div
                    key="skeleton"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.15 }}
                    className="absolute inset-0 p-6 flex flex-col gap-4 bg-zinc-950 dark:bg-[#0c0c0c] z-10"
                  >
                    <div className="h-4 w-3/4 bg-white/5 rounded-md animate-pulse" />
                    <div className="h-4 w-1/2 bg-white/5 rounded-md animate-pulse [animation-delay:75ms]" />
                    <div className="h-4 w-5/6 bg-white/5 rounded-md animate-pulse [animation-delay:150ms]" />
                    <div className="h-4 w-2/3 bg-white/5 rounded-md animate-pulse [animation-delay:200ms]" />
                    <div className="h-4 w-1/3 bg-white/5 rounded-md animate-pulse [animation-delay:300ms]" />
                  </motion.div>
                ) : (
                  <motion.div
                    key="code"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.15 }}
                    className="h-full"
                  >
                    <CodeBlock
                      code={
                        codeLang === 'tsx'
                          ? ((codes && codes[activeTocId]) ? codes[activeTocId] : (codeContent || "// No TSX code available"))
                          : ((codesJs && codesJs[activeTocId]) ? codesJs[activeTocId] : (codeContentJs || "// No JSX code available"))
                      }
                      language={codeLang === 'tsx' ? 'tsx' : 'jsx'}
                    />
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );

  return (
    <>
      {/* Hide global footer and prevent body scroll on component pages */}
      <style>{`
        footer { display: none !important; }
        body { overflow: hidden !important; }
      `}</style>
      <div className="flex h-[calc(100vh-57px)] w-full gap-4 xl:gap-6 overflow-hidden">
        {/* CENTER COLUMN: Component Previews */}
        <div className="flex-1 relative h-full overflow-hidden flex flex-col md:px-8">
          {/* Scrollable Canvas for Previews */}
          <div
            ref={scrollContainerRef}
            onScroll={handleScroll}
            className="flex-1 w-full overflow-y-auto scroll-smooth pb-32 [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]"
          >

            <div className="px-4 sm:px-6 pt-6 md:px-12 md:pt-12 pb-4 max-w-4xl">
              <h1 className="text-3xl font-bold tracking-tight text-zinc-900 dark:text-zinc-50 mb-6 uppercase tracking-wide">{title}</h1>
            </div>
            <ScrollContainerProvider containerRef={scrollContainerRef}>
              {mounted && children}
            </ScrollContainerProvider>

            {/* Mobile / Tablet Right Column */}
            <div ref={mobileRightColumnRef} className="block xl:hidden px-4 sm:px-8 w-full mt-12 pb-32 pt-16">
              {rightColumnContent}
            </div>
          </div>

          {/* Bottom Floating Navigation (Table of Contents Dock) */}
          {tocItems.length > 0 && (
            <div className="hidden xl:block absolute bottom-6 left-1/2 -translate-x-1/2 z-[60] pointer-events-none">
              <div className="relative">
                {/* The dock bar itself */}
                <div className="relative flex items-end px-12 sm:px-12 h-[60px] bg-[#f2f0ef] dark:bg-[#1a1a1a] dark:border-white/5 rounded-[36px] shadow-2xl">
                  <AnimatePresence mode="popLayout">
                    {(() => {
                      const allItems = tocItems.map((item, idx) => ({ ...item, idx }));
                      const N = allItems.length;
                      const MAX = 7;
                      const activeIdx = allItems.findIndex(i => i.id === activeTocId) ?? 0;

                      type VisibleBtn =
                        | { type: 'item'; item: typeof allItems[0] }
                        | { type: 'prev' | 'next'; count: number; targetIdx: number };

                      let visibleButtons: VisibleBtn[] = [];
                      if (N <= MAX) {
                        visibleButtons = allItems.map(item => ({ type: 'item', item }));
                      } else {
                        if (activeIdx < 4) {
                          visibleButtons = [
                            ...allItems.slice(0, 6).map(item => ({ type: 'item' as const, item })),
                            { type: 'next', count: N - 6, targetIdx: 6 }
                          ];
                        } else if (activeIdx >= N - 4) {
                          visibleButtons = [
                            { type: 'prev', count: N - 6, targetIdx: N - 7 },
                            ...allItems.slice(N - 6, N).map(item => ({ type: 'item' as const, item }))
                          ];
                        } else {
                          visibleButtons = [
                            { type: 'prev', count: activeIdx - 2, targetIdx: activeIdx - 3 },
                            ...allItems.slice(activeIdx - 2, activeIdx + 3).map(item => ({ type: 'item' as const, item })),
                            { type: 'next', count: N - (activeIdx + 3), targetIdx: activeIdx + 3 }
                          ];
                        }
                      }

                      return visibleButtons.map((btn, renderIdx) => {
                        if (btn.type === 'item') {
                          const item = btn.item;
                          const isActive = activeTocId === item.id;
                          return (
                            <motion.button
                              layout
                              initial={{ opacity: 0, scale: 0.8 }}
                              animate={{ opacity: 1, scale: 1 }}
                              exit={{ opacity: 0, scale: 0.8 }}
                              transition={{ type: "spring", bounce: 0.25, duration: 0.5 }}
                              key={item.id}
                              onClick={() => scrollToSection(item.id, item.idx)}
                              className="flex flex-col items-center justify-center h-[50px] sm:h-[60px] w-[46px] sm:w-[72px] relative group outline-none shrink-0"
                            >
                              {isActive && (
                                <motion.div
                                  layoutId="dock-active-bg"
                                  className="absolute bottom-full left-1/2 -translate-x-1/2 w-[70px] sm:w-[100px] h-[16px] sm:h-[24px] z-0"
                                >
                                  <svg width="100%" height="100%" viewBox="0 0 100 24" preserveAspectRatio="none" className="fill-[#f2f0ef] dark:fill-[#1a1a1a]">
                                    <path d="M0 24 C 15 24, 25 0, 50 0 C 75 0, 85 24, 100 24 Z" />
                                  </svg>
                                  <div className="absolute top-[4px] sm:top-[7px] left-1/2 -translate-x-1/2 w-[28px] sm:w-[36px] h-[28px] sm:h-[36px] rounded-full border border-[var(--theme-primary)]/20 bg-[var(--theme-primary)]/10 shadow-[0_0_15px_var(--theme-primary)]/20" />
                                </motion.div>
                              )}

                              <div className={cn(
                                "z-10 absolute left-1/2 -translate-x-1/2 transition-all duration-300 flex items-center justify-center",
                                isActive
                                  ? "top-[1px] -translate-y-1/2 w-5 h-5 text-[var(--theme-primary)]"
                                  : "top-[22px] -translate-y-1/2 w-4 h-4 text-zinc-500 group-hover:-translate-y-1 group-hover:text-zinc-900 dark:group-hover:text-zinc-300"
                              )}>
                                {item.icon || <div className="w-4 h-4 bg-zinc-700 rounded-sm" />}
                              </div>

                              <span className={cn(
                                "absolute bottom-[10px] left-1/2 -translate-x-1/2 text-[10px] whitespace-nowrap transition-colors duration-300",
                                isActive ? "text-zinc-900 dark:text-white font-bold" : "text-zinc-500 font-medium group-hover:text-zinc-900 dark:group-hover:text-zinc-300"
                              )}>
                                {item.label}
                              </span>
                            </motion.button>
                          );
                        } else {
                          return (
                            <motion.button
                              layout
                              initial={{ opacity: 0, scale: 0.8 }}
                              animate={{ opacity: 1, scale: 1 }}
                              exit={{ opacity: 0, scale: 0.8 }}
                              transition={{ type: "spring", bounce: 0.25, duration: 0.5 }}
                              key={`more-${btn.type}`}
                              onClick={() => scrollToSection(allItems[btn.targetIdx].id, btn.targetIdx)}
                              className="flex flex-col items-center justify-center h-[50px] sm:h-[60px] w-[46px] sm:w-[72px] relative group outline-none shrink-0"
                            >
                              <div className="z-10 absolute top-[22px] -translate-y-1/2 left-1/2 -translate-x-1/2 w-4 h-4 text-zinc-500 transition-all duration-300 group-hover:-translate-y-1 group-hover:text-zinc-900 dark:group-hover:text-zinc-300 flex items-center justify-center">
                                {btn.type === 'prev' ? (
                                  <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M15 18l-6-6 6-6" /></svg>
                                ) : (
                                  <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M9 18l6-6-6-6" /></svg>
                                )}
                              </div>
                              <span className="absolute bottom-[10px] left-1/2 -translate-x-1/2 text-[10px] whitespace-nowrap transition-colors duration-300 text-zinc-500 font-medium group-hover:text-zinc-900 dark:group-hover:text-zinc-300">
                                +{btn.count} {btn.type === 'next' ? 'more' : 'prev'}
                              </span>
                            </motion.button>
                          );
                        }
                      });
                    })()}
                  </AnimatePresence>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* RIGHT COLUMN: Info & Code */}
        <div className="hidden xl:flex xl:w-[350px] 2xl:w-[480px] shrink-0 h-full overflow-y-auto flex-col gap-0 pb-12 [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]">
          {rightColumnContent}
        </div>
      </div>
    </>
  );
}
