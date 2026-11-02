import React from "react";
import { ShowcaseDefinition } from "../registry-types";
import { ColorGridCustomProps, DEFAULT_COLOR_GRID_PROPS } from "./types";
import { ColorGridPreview } from "./color-grid-preview";
import { generateColorGridCode } from "./code-generator";
import { ColorGridPlaygroundStudio } from "../playground-studio/color-grid-playground-studio";

export const colorGridShowcaseDefinition: ShowcaseDefinition<ColorGridCustomProps> = {
  slug: "color-grid",
  defaultProps: DEFAULT_COLOR_GRID_PROPS,
  renderPreview: ({ customProps, activeTocId, isCustomizing }) => (
    <ColorGridPreview
      customProps={customProps}
      activeTocId={activeTocId}
      isCustomizing={isCustomizing}
    />
  ),
  renderPlayground: ({ customProps, onChange, hidePreview = true, onViewCode }) => (
    <ColorGridPlaygroundStudio
      customProps={customProps}
      onChange={onChange}
      hidePreview={hidePreview}
      className="w-full h-full flex-1 min-h-0 flex flex-col"
      onViewCode={onViewCode}
    />
  ),
  generateCode: ({ customProps }) => generateColorGridCode(customProps),
  getMeta: (props) => ({ activeScale: (props.size || "md").toUpperCase(), activeColor: props.value || "" }),
};
