import React from "react";
import { ShowcaseDefinition } from "../registry-types";
import { ProgressCustomProps, DEFAULT_PROGRESS_PROPS } from "./types";
import { ProgressPreview } from "./progress-preview";
import { generateProgressCode } from "./code-generator";
import { ProgressPlaygroundStudio } from "../playground-studio/progress-playground-studio";

export const progressShowcaseDefinition: ShowcaseDefinition<ProgressCustomProps> = {
  slug: "progress",
  defaultProps: DEFAULT_PROGRESS_PROPS,
  renderPreview: ({ customProps, activeTocId, isCustomizing }) => (
    <ProgressPreview
      customProps={customProps}
      activeTocId={activeTocId}
      isCustomizing={isCustomizing}
    />
  ),
  renderPlayground: ({ customProps, onChange, hidePreview = true, onViewCode }) => (
    <ProgressPlaygroundStudio
      customProps={customProps}
      onChange={onChange}
      hidePreview={hidePreview}
      className="w-full h-full flex-1 min-h-0 flex flex-col"
      onViewCode={onViewCode}
    />
  ),
  generateCode: ({ customProps }) => generateProgressCode(customProps),
  getMeta: (props) => ({ activeScale: `${props.value}%`, activeColor: "" }),
};
