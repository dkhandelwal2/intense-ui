import React from "react";
import { ShowcaseDefinition } from "../registry-types";
import { BarcodeCustomProps, DEFAULT_BARCODE_PROPS } from "./types";
import { BarcodePreview } from "./barcode-preview";
import { generateBarcodeCode } from "./code-generator";
import { BarcodePlaygroundStudio } from "../playground-studio/barcode-playground-studio";

export const barcodeShowcaseDefinition: ShowcaseDefinition<BarcodeCustomProps> = {
  slug: "barcode",
  defaultProps: DEFAULT_BARCODE_PROPS,
  renderPreview: ({ customProps, activeTocId, isCustomizing }) => (
    <BarcodePreview
      customProps={customProps}
      activeTocId={activeTocId}
      isCustomizing={isCustomizing}
    />
  ),
  renderPlayground: ({ customProps, onChange, hidePreview = true, onViewCode }) => (
    <BarcodePlaygroundStudio
      customProps={customProps}
      onChange={onChange}
      hidePreview={hidePreview}
      className="w-full h-full flex-1 min-h-0 flex flex-col"
      onViewCode={onViewCode}
    />
  ),
  generateCode: ({ customProps }) => generateBarcodeCode(customProps),
  getMeta: (props) => ({
    activeScale: (props.format || "code128").toUpperCase(),
    activeColor: "#3b82f6",
  }),
};
