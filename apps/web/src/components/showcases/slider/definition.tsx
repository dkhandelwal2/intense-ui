import React from "react";
import { ShowcaseDefinition } from "../registry-types";
import { SliderCustomProps, DEFAULT_SLIDER_PROPS } from "./types";
import { SliderPreview } from "./slider-preview";
import { generateSliderCode } from "./code-generator";
import { SliderPlaygroundStudio } from "../playground-studio/slider-playground-studio";

export const sliderShowcaseDefinition: ShowcaseDefinition<SliderCustomProps> = {
  slug: "slider",
  defaultProps: DEFAULT_SLIDER_PROPS,
  renderPreview: ({ customProps, activeTocId, isCustomizing }) => (
    <SliderPreview
      customProps={customProps}
      activeTocId={activeTocId}
      isCustomizing={isCustomizing}
    />
  ),
  renderPlayground: ({ customProps, onChange, hidePreview = true, onViewCode }) => (
    <SliderPlaygroundStudio
      customProps={customProps}
      onChange={onChange}
      hidePreview={hidePreview}
      className="w-full h-full flex-1 min-h-0 flex flex-col"
      onViewCode={onViewCode}
    />
  ),
  generateCode: ({ customProps }) => generateSliderCode(customProps),
  getMeta: (props) => ({ activeScale: `${props.value}%`, activeColor: "" }),
};
