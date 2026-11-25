import React from "react";
import type { ShowcaseDefinition } from "../registry-types";
import { SignaturePadCustomProps, DEFAULT_SIGNATURE_PAD_PROPS } from "./types";
import { SignaturePadPreview } from "./signature-pad-preview";
import { generateSignaturePadCode } from "./code-generator";
import { SignaturePadPlaygroundStudio } from "../playground-studio";

export const signaturePadShowcaseDefinition: ShowcaseDefinition<SignaturePadCustomProps> = {
  slug: "signature-pad",
  defaultProps: DEFAULT_SIGNATURE_PAD_PROPS,
  renderPreview: ({ customProps, activeTocId, isCustomizing }) => (
    <SignaturePadPreview
      customProps={customProps}
      activeTocId={activeTocId}
      isCustomizing={isCustomizing}
    />
  ),
  renderPlayground: ({ customProps, onChange, onViewCode, hidePreview = true }) => (
    <SignaturePadPlaygroundStudio
      customProps={customProps}
      onChange={onChange}
      onViewCode={onViewCode}
      hidePreview={hidePreview}
      className="w-full h-full flex-1 min-h-0 flex flex-col"
    />
  ),
  generateCode: ({ customProps }) => generateSignaturePadCode(customProps),
  getMeta: (props) => ({
    activeScale: props.width > 360 ? "LG" : props.width < 300 ? "SM" : "MD",
    activeColor: props.strokeColor || "",
  }),
};
