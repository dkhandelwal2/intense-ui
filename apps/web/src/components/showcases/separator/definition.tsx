import React from "react";
import { ShowcaseDefinition } from "../registry-types";
import { SeparatorCustomProps, DEFAULT_SEPARATOR_PROPS } from "./types";
import { SeparatorPreview } from "./separator-preview";
import { generateSeparatorCode } from "./code-generator";
import { SeparatorPlaygroundStudio } from "../playground-studio/separator-playground-studio";

export const separatorShowcaseDefinition: ShowcaseDefinition<SeparatorCustomProps> = {
  slug: "separator",
  defaultProps: DEFAULT_SEPARATOR_PROPS,
  renderPreview: ({ customProps, activeTocId, isCustomizing }) => (
    <SeparatorPreview
      customProps={customProps}
      activeTocId={activeTocId}
      isCustomizing={isCustomizing}
    />
  ),
  renderPlayground: ({ customProps, onChange, hidePreview = true, onViewCode }) => (
    <SeparatorPlaygroundStudio
      customProps={customProps}
      onChange={onChange}
      hidePreview={hidePreview}
      className="w-full h-full flex-1 min-h-0 flex flex-col"
      onViewCode={onViewCode}
    />
  ),
  generateCode: ({ customProps }) => generateSeparatorCode(customProps),
  getMeta: (props) => ({ activeScale: props.orientation.toUpperCase(), activeColor: props.variant }),
};
