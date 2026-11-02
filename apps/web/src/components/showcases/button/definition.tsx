import React from "react";
import { ShowcaseDefinition } from "../registry-types";
import { ButtonCustomProps, DEFAULT_BUTTON_PROPS } from "./types";
import { ButtonPreview } from "./button-preview";
import { generateButtonCode } from "./code-generator";
import { ButtonPlaygroundStudio } from "../playground-studio/button-playground-studio";

export const buttonShowcaseDefinition: ShowcaseDefinition<ButtonCustomProps> = {
  slug: "button",
  defaultProps: DEFAULT_BUTTON_PROPS,
  renderPreview: ({ customProps, activeTocId, isCustomizing }) => (
    <ButtonPreview
      customProps={customProps}
      activeTocId={activeTocId}
      isCustomizing={isCustomizing}
    />
  ),
  renderPlayground: ({ customProps, onChange, hidePreview = true, onViewCode }) => (
    <ButtonPlaygroundStudio
      customProps={customProps}
      onChange={onChange}
      hidePreview={hidePreview}
      className="w-full h-full flex-1 min-h-0 flex flex-col"
      onViewCode={onViewCode}
    />
  ),
  generateCode: ({ customProps }) => generateButtonCode(customProps),
  getMeta: (props) => ({ activeScale: (props.size || "md").toUpperCase(), activeColor: props.variant || "default" }),
};
