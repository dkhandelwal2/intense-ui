"use client";

import React from "react";
import {
  WidgetCapsule,
  DependenciesCard,
  SupportCard,
} from "./index";
import { StagePreviewCard } from "./cards";
import { StepCarousel } from "@/components/ui/step-carousel";
import type { BentoCanvasProps } from "./types";

export const MobileCanvasView = React.memo(function MobileCanvasView({
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
  handleViewCode,
  onOpenPlayground,
  directDeps,
  packageManager,
}: BentoCanvasProps) {
  const currentStepIndex = React.useMemo(() => {
    if (!effectiveTocItems || effectiveTocItems.length <= 1) return 0;
    const idx = effectiveTocItems.findIndex((t) => t.id === activeTocId);
    return idx >= 0 ? idx : 0;
  }, [effectiveTocItems, activeTocId]);

  return (
    <div className="flex-1 min-h-0 min-w-0 flex flex-col h-full overflow-y-auto px-2 sm:px-4 py-2 pb-28 sm:pb-32 gap-4 hide-scrollbar">
      <WidgetCapsule className="w-full shrink-0" />

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
        onOpenPlayground={onOpenPlayground}
        isDesktop={false}
      >
        {/* Step Carousel controlling variations in responsive mode */}
        {effectiveTocItems.length > 1 && !isCustomizing && (
          <div className="w-full flex items-center justify-center py-1 shrink-0">
            <StepCarousel
              totalSteps={effectiveTocItems.length}
              currentStep={currentStepIndex}
              onStepChange={(idx) => effectiveTocItems[idx] && handleTocItemClick(effectiveTocItems[idx].id)}
              duration={3500}
              loop={false}
              defaultPlaying={false}
              size="sm"
            />
          </div>
        )}
      </StagePreviewCard>

      <div className="grid grid-cols-1 gap-3 md:grid-cols-2 md:gap-3">
        <DependenciesCard
          directDeps={directDeps}
          packageManager={packageManager}
          width="100%"
          className="relative w-full z-10 rounded-xl shrink-0"
        />
        <SupportCard
          componentName={formattedSlugName}
          className="w-full h-full rounded-xl shrink-0"
        />
      </div>
    </div>
  );
});
