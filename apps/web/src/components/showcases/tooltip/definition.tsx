import React from "react";
import { ShowcaseDefinition } from "../registry-types";
import { TooltipCustomProps, DEFAULT_TOOLTIP_PROPS } from "./types";
import { TooltipPreview } from "./tooltip-preview";
import { generateTooltipCode } from "./code-generator";
import { TooltipPlaygroundStudio } from "../playground-studio/tooltip-playground-studio";

export const tooltipShowcaseDefinition: ShowcaseDefinition<TooltipCustomProps> = {
  slug: "tooltip",
  defaultProps: DEFAULT_TOOLTIP_PROPS,
  renderPreview: ({ customProps, activeTocId, isCustomizing }) => (
    <TooltipPreview
      customProps={customProps}
      activeTocId={activeTocId}
      isCustomizing={isCustomizing}
    />
  ),
  renderPlayground: ({ customProps, onChange, hidePreview = true, onViewCode }) => (
    <TooltipPlaygroundStudio
      customProps={customProps}
      onChange={onChange}
      hidePreview={hidePreview}
      className="w-full h-full flex-1 min-h-0 flex flex-col"
      onViewCode={onViewCode}
    />
  ),
  generateCode: ({ customProps }) => generateTooltipCode(customProps),
  getMeta: (props) => ({ activeScale: props.position.toUpperCase(), activeColor: props.bgColor || "" }),
};
