"use client";

import React, { useRef, useState, useEffect, useCallback } from "react";
import { ComponentTocDock } from "@/components/layout/toc-dock";
import { CanvasBackdropSvg } from "@/assets/svg";
import { BENTO_STAGE_GEOMETRY } from "./constants";
import {
  WidgetCapsule,
  DependenciesCard,
  SupportCard,
  BentoCardDeck,
} from "./index";
import { StagePreviewCard } from "./stage-preview-card";
import type { BentoCanvasProps } from "./types";

export const DesktopCanvasView = React.memo(function DesktopCanvasView({
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
}: BentoCanvasProps) {
  const leftStageRef = useRef<HTMLDivElement>(null);
  const [stageDims, setStageDims] = useState({ width: 1140, height: 700 });
  const [hasMeasured, setHasMeasured] = useState(false);

  const [fallbackDeckCard, setFallbackDeckCard] = useState<4 | 5 | 6>(5);
  const [fallbackCodeTab, setFallbackCodeTab] = useState<"example" | "custom" | "props">("example");

  const effectiveDeckCard = activeDeckCard ?? fallbackDeckCard;
  const effectiveSetDeckCard = setActiveDeckCard ?? setFallbackDeckCard;
  const effectiveCodeTab = activeCodeTab ?? fallbackCodeTab;
  const effectiveSetCodeTab = setActiveCodeTab ?? setFallbackCodeTab;
  const effectiveSetPackageManager = setPackageManager ?? (() => {});
  const effectiveRenderPlayground = renderPlaygroundStudio ?? (() => null);
  const effectiveDisplayedCode = currentDisplayedCode ?? "";

  const updateStageGeometry = useCallback(() => {
    if (!leftStageRef.current) return;
    const rect = leftStageRef.current.getBoundingClientRect();
    if (rect.width > 0 && rect.height > 0) {
      const nextW = Math.round(rect.width);
      const nextH = Math.round(rect.height);
      setStageDims((prev) => {
        if (prev.width === nextW && prev.height === nextH) return prev;
        return { width: nextW, height: nextH };
      });
      setHasMeasured(true);
    }
  }, []);

  useEffect(() => {
    updateStageGeometry();
    if (!leftStageRef.current) return;
    const observer = new ResizeObserver(updateStageGeometry);
    observer.observe(leftStageRef.current);
    return () => observer.disconnect();
  }, [updateStageGeometry]);

  const { width: w, height: h } = stageDims;
  const depsWidth = Math.min(
    BENTO_STAGE_GEOMETRY.DEPENDENCIES_CARD_WIDTH,
    Math.max(280, Math.round(w * 0.4))
  );
  const bottomBarHeight = BENTO_STAGE_GEOMETRY.BOTTOM_BAR_HEIGHT;
  const gap = BENTO_STAGE_GEOMETRY.BENTO_GAP;
  const dockWidth = Math.max(0, w - depsWidth - gap);
  const cutoutY = Math.max(260, h - bottomBarHeight - gap);

  return (
    <div className="flex-1 min-h-0 min-w-0 flex flex-row gap-3 items-stretch overflow-hidden">
      {/* Left Column: Molded SVG Frame + Stage + Dock + Cutout */}
      <div ref={leftStageRef} className="relative flex-1 min-h-0 min-w-0 h-full">
        <CanvasBackdropSvg
          width={w}
          height={h}
          dockWidth={dockWidth}
          cutoutY={cutoutY}
          hasMeasured={hasMeasured}
        />

        <div className="absolute top-0 left-0 right-0 bottom-[197px] z-10">
          <StagePreviewCard
            slug={slug}
            title={title}
            activeTocId={activeTocId}
            currentTocLabel={currentTocItem?.label}
            isCustomizing={isCustomizing}
            setIsCustomizing={setIsCustomizing}
            activeVariantName={activeVariantName}
            activeScale={activeScale}
            renderStagePreview={renderStagePreview}
            handleViewCode={handleViewCode}
            isCodeOpened={effectiveDeckCard === 6}
            isDesktop={true}
          />
        </div>

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

        <div
          className="absolute bottom-0 right-0 z-20 rounded-[26px] bg-white dark:bg-zinc-900 border border-zinc-200/90 dark:border-zinc-800 shadow-sm flex flex-col justify-between overflow-hidden select-none"
          style={{ width: depsWidth, height: bottomBarHeight }}
        >
          <DependenciesCard
            directDeps={directDeps}
            packageManager={packageManager}
            className="w-full h-full relative"
          />
        </div>
      </div>

      {/* Right Column: Capsule + 3D Deck + Support */}
      <div className="w-full xl:w-[340px] 2xl:w-[380px] shrink-0 flex flex-col justify-between gap-3 h-full overflow-hidden">
        <WidgetCapsule />
        <div className="relative flex-1 min-h-[300px] w-full h-full select-none rounded-[22px] overflow-hidden">
          <BentoCardDeck
            slug={cleanSlug || slug}
            activeTocId={activeTocId}
            usageCode={usageCode}
            dependencies={dependencies}
            packageManager={packageManager}
            onPackageManagerChange={effectiveSetPackageManager}
            renderPlaygroundStudio={effectiveRenderPlayground}
            onStartCustomizing={() => setIsCustomizing(true)}
            currentDisplayedCode={effectiveDisplayedCode}
            propsTable={propsTable}
            activeDeckCard={effectiveDeckCard}
            setActiveDeckCard={effectiveSetDeckCard}
            activeCodeTab={effectiveCodeTab}
            setActiveCodeTab={effectiveSetCodeTab}
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
