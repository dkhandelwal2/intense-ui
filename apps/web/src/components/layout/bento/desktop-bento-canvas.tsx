"use client";

import React, { useRef, useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Terminal, Activity, Code } from "lucide-react";
import { PackageManager } from "@/components/ui/package-manager";
import { TocItem } from "@/components/layout/layout-components";
import { ComponentTocDock } from "@/components/layout/layout-components/component-toc-dock";

import {
  ScrambleText,
  WidgetCapsule,
  DependenciesCard,
  SupportCard,
  BentoCardDeck,
} from "./index";
import { DesktopBentoCanvasProps } from "./types";
import { BENTO_STAGE_GEOMETRY } from "./constants";
import { StageBackgroundSvg } from "./svg";

export const DesktopBentoCanvas = React.memo(function DesktopBentoCanvas({
  cleanSlug,
  slug,
  title,
  formattedSlugName,
  activeTocId,
  currentTocItem,
  effectiveTocItems,
  handleTocItemClick,
  isCustomizing,
  setIsCustomizing,
  activeVariantName,
  activeScale,
  activeColor,
  renderStagePreview,
  renderPlaygroundStudio,
  handleViewCode,
  directDeps,
  packageManager,
  setPackageManager,
  usageCode,
  dependencies,
  currentDisplayedCode,
  propsTable,
  activeDeckCard,
  setActiveDeckCard,
  activeCodeTab,
  setActiveCodeTab,
}: DesktopBentoCanvasProps) {
  const leftStageRef = useRef<HTMLDivElement>(null);

  const [stageDims, setStageDims] = useState({
    width: 1140,
    height: 700,
  });
  const [hasMeasured, setHasMeasured] = useState(false);

  const updateStageGeometry = React.useCallback(() => {
    if (!leftStageRef.current) return;
    const rect = leftStageRef.current.getBoundingClientRect();
    if (rect.width > 0 && rect.height > 0) {
      setStageDims({
        width: Math.round(rect.width),
        height: Math.round(rect.height),
      });
      setHasMeasured(true);
    }
  }, []);

  // Pre-paint synchronous layout measurement eliminates layout shift & flash
  const useIsomorphicLayoutEffect =
    typeof window !== "undefined" ? React.useLayoutEffect : React.useEffect;

  useIsomorphicLayoutEffect(() => {
    updateStageGeometry();
  }, [updateStageGeometry]);

  useEffect(() => {
    if (!leftStageRef.current) return;
    const observer = new ResizeObserver(() => {
      updateStageGeometry();
    });
    observer.observe(leftStageRef.current);
    return () => observer.disconnect();
  }, [updateStageGeometry]);

  // Compute dynamic responsive geometry: guarantees the dock always has adequate space
  const w = stageDims.width;
  const h = stageDims.height;
  const dependenciesWidth = Math.min(
    BENTO_STAGE_GEOMETRY.DEPENDENCIES_CARD_WIDTH,
    Math.max(280, Math.round(w * 0.40))
  );
  const bottomBarHeight = BENTO_STAGE_GEOMETRY.BOTTOM_BAR_HEIGHT;
  const gap = BENTO_STAGE_GEOMETRY.BENTO_GAP;
  const dockWidth = Math.max(0, w - dependenciesWidth - gap);
  const cutoutY = Math.max(260, h - bottomBarHeight - gap);

  return (
    <div className="flex-1 min-h-0 min-w-0 hidden xl:flex flex-row gap-3 items-stretch overflow-hidden">
      {/* LEFT COLUMN: Region 1 (Molded L-Shape), Region 2 (Dock in Foot), Region 8 (In Cutout) */}
      <div ref={leftStageRef} className="relative flex-1 min-h-0 min-w-0 h-full">
        {/* Molded SVG Outline with Dot Grid */}
        <StageBackgroundSvg
          width={w}
          height={h}
          dockWidth={dockWidth}
          cutoutY={cutoutY}
          hasMeasured={hasMeasured}
        />

        {/* Upper Stage of Region 1: Center Presentation Stage */}
        <div className="absolute top-0 left-0 right-0 bottom-[197px] z-10 flex flex-col justify-between p-4 sm:p-6">
          {/* Stage Header */}
          <div className="flex items-center justify-between w-full shrink-0 select-none">
            <div className="flex items-center gap-2.5">
              <AnimatePresence mode="wait">
                <motion.div
                  key={isCustomizing ? "customization" : activeTocId}
                  initial={{ opacity: 0, scale: 0.94, y: -2 }}
                  animate={{ opacity: 1, scale: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.94, y: 2 }}
                  transition={{ type: "spring", stiffness: 350, damping: 25 }}
                  className="flex items-center gap-2 sm:gap-2.5"
                >
                  <div className="group px-3 py-1 rounded-full bg-zinc-900/90 dark:bg-black/70 border border-zinc-700/60 dark:border-zinc-800 text-[11px] font-mono text-foreground flex items-center gap-1.5 shadow-xs backdrop-blur-md hover:border-[var(--theme-primary)]/60 hover:shadow-[0_0_16px_-3px_var(--theme-primary)]/30 transition-all cursor-pointer">
                    <Terminal className="w-3.5 h-3.5 text-[var(--theme-primary)] shrink-0 animate-pulse" />
                    <span className="text-zinc-400 font-medium">{slug} /</span>
                    <ScrambleText
                      text={isCustomizing ? "customization" : activeTocId}
                      className="font-bold text-white tracking-wide"
                    />
                  </div>
                </motion.div>
              </AnimatePresence>
            </div>

            <div className="text-[11px] font-mono text-muted-foreground hidden sm:flex items-center gap-2">
              <AnimatePresence mode="wait">
                <motion.div
                  key={isCustomizing ? "customization" : activeTocId}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.18 }}
                  className="flex items-center gap-2"
                >
                  <Activity className="w-3.5 h-3.5 text-emerald-500 shrink-0" />
                  <ScrambleText
                    text={currentTocItem?.label || title}
                    className="text-foreground/90 font-medium cursor-pointer"
                  />
                </motion.div>
              </AnimatePresence>
            </div>
          </div>

          {/* Center Presentation Stage: Elevated Frosted Pedestal */}
          <div className="flex-1 min-h-0 flex flex-col items-center justify-center py-2 relative">
            <AnimatePresence mode="wait">
              <motion.div
                key={isCustomizing ? "customization" : activeTocId}
                initial={{ opacity: 0, scale: 0.94, y: 10 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.94, y: -10 }}
                transition={{
                  duration: 0.22,
                  ease: [0.22, 1, 0.36, 1],
                }}
                className="flex flex-col items-center justify-center w-full"
              >
                <div
                  className="w-[60%] p-5 sm:p-7 rounded-3xl shadow-md backdrop-blur-xl transition-all duration-300"
                // style={{
                //   boxShadow: activeColor
                //     ? `0 20px 40px -15px ${activeColor}25`
                //     : undefined,
                // }}
                >
                  <div className="w-full flex items-center justify-center">
                    {renderStagePreview()}
                  </div>
                </div>

                {/* Live Feedback Status Pill */}
                <div className="mt-4 flex items-center gap-2 px-3 py-1 rounded-full bg-muted/80 border border-border text-[11px] font-mono text-muted-foreground">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                  <span>Variant:</span>
                  <strong className="text-foreground capitalize">{activeVariantName}</strong>
                  <span className="text-muted-foreground/60">•</span>
                  <span>Scale:</span>
                  <strong className="text-foreground uppercase">{activeScale}</strong>
                  <span className="text-muted-foreground/60">•</span>
                  <span>Engine:</span>
                  <strong className="text-foreground">Framer Motion Spring</strong>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Customizing Controls Pill */}
          {isCustomizing && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="flex items-center justify-center gap-2 select-none"
            >
              <button
                type="button"
                onClick={() => setIsCustomizing(false)}
                className="px-3.5 py-1.5 rounded-full bg-zinc-900/90 text-white hover:bg-zinc-800 text-xs font-mono border border-zinc-700 shadow-md transition-all cursor-pointer"
              >
                Exit to {currentTocItem?.label}
              </button>
              <button
                type="button"
                onClick={handleViewCode}
                className="px-3.5 py-1.5 rounded-full bg-[var(--theme-primary)] text-white hover:opacity-90 text-xs font-mono font-semibold shadow-md transition-all cursor-pointer flex items-center gap-1.5"
              >
                <Code className="w-3.5 h-3.5" />
                <span>View Code</span>
              </button>
            </motion.div>
          )}
        </div>

        {/* Region 2: The Dock sitting directly inside lower-left foot of Region 1 */}
        <div
          className="absolute bottom-0 left-0 z-20 flex items-center justify-center overflow-hidden"
          style={{ width: dockWidth, height: bottomBarHeight }}
        >
          <ComponentTocDock
            tocItems={effectiveTocItems}
            activeTocId={activeTocId}
            onItemClick={handleTocItemClick}
            isInline={true}
            containerWidth={dockWidth}
          />
        </div>

        {/* Region 8: Dependencies Card in Cutout Notch of Region 1 */}
        <div
          className="absolute bottom-0 right-0 z-20 rounded-[26px] bg-white dark:bg-zinc-900 border border-zinc-200/90 dark:border-zinc-800 shadow-sm flex flex-col justify-between overflow-hidden select-none"
          style={{ width: dependenciesWidth, height: bottomBarHeight }}
        >
          <DependenciesCard
            directDeps={directDeps}
            packageManager={packageManager}
            className="w-full h-full relative"
          />
        </div>
      </div>

      {/* RIGHT COLUMN: Region 3 (Widget Capsule), Regions 4, 5, 6 (Cascading Deck), Region 7 (Support Card) */}
      <div className="w-full xl:w-[340px] 2xl:w-[380px] shrink-0 flex flex-col justify-between gap-3 h-full overflow-hidden">
        <WidgetCapsule />

        <div className="relative flex-1 min-h-[300px] w-full h-full select-none rounded-[22px] overflow-hidden">
          <BentoCardDeck
            slug={cleanSlug}
            activeTocId={activeTocId}
            usageCode={usageCode}
            dependencies={dependencies}
            packageManager={packageManager}
            onPackageManagerChange={setPackageManager}
            renderPlaygroundStudio={renderPlaygroundStudio}
            onStartCustomizing={() => setIsCustomizing(true)}
            currentDisplayedCode={currentDisplayedCode}
            propsTable={propsTable}
            activeDeckCard={activeDeckCard}
            setActiveDeckCard={setActiveDeckCard}
            activeCodeTab={activeCodeTab}
            setActiveCodeTab={setActiveCodeTab}
          />
        </div>

        <SupportCard
          componentName={formattedSlugName}
          className="shrink-0 rounded-[30px] bg-white dark:bg-zinc-900 border border-zinc-200/90 dark:border-zinc-800 p-3.5 shadow-sm flex flex-col justify-between relative overflow-hidden select-none"
          style={{ height: bottomBarHeight }}
        />
      </div>
    </div>
  );
});

