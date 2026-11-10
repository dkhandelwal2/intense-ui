import React from "react";
import { ShowcaseDefinition } from "../registry-types";
import { ConfettiCustomProps, DEFAULT_CONFETTI_PROPS } from "./types";
import { ConfettiPreview } from "./confetti-preview";
import { generateConfettiCode } from "./code-generator";
import { ConfettiPlaygroundStudio } from "../playground-studio/confetti-playground-studio";

export const confettiShowcaseDefinition: ShowcaseDefinition<ConfettiCustomProps> = {
  slug: "confetti",
  defaultProps: DEFAULT_CONFETTI_PROPS,
  renderPreview: ({ customProps, activeTocId, isCustomizing }) => (
    <ConfettiPreview
      customProps={customProps}
      activeTocId={activeTocId}
      isCustomizing={isCustomizing}
    />
  ),
  renderPlayground: ({ customProps, onChange, hidePreview = true, onViewCode }) => (
    <ConfettiPlaygroundStudio
      customProps={customProps}
      onChange={onChange}
      hidePreview={hidePreview}
      className="w-full h-full flex-1 min-h-0 flex flex-col"
      onViewCode={onViewCode}
    />
  ),
  generateCode: ({ customProps }) => generateConfettiCode(customProps),
  getMeta: (props) => ({
    activeScale: (props.variant || "basic").toUpperCase(),
    activeColor: "#ec4899",
  }),
};
