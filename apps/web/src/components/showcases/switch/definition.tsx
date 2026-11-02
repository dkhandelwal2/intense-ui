import React from "react";
import { ShowcaseDefinition } from "../registry-types";
import { SwitchCustomProps, DEFAULT_SWITCH_PROPS } from "./types";
import { SwitchPreview } from "./switch-preview";
import { generateSwitchCode } from "./code-generator";
import { SwitchPlaygroundStudio } from "../playground-studio/switch-playground-studio";

export const switchShowcaseDefinition: ShowcaseDefinition<SwitchCustomProps> = {
  slug: "switch",
  defaultProps: DEFAULT_SWITCH_PROPS,
  renderPreview: ({ customProps, activeTocId, isCustomizing }) => (
    <SwitchPreview
      customProps={customProps}
      activeTocId={activeTocId}
      isCustomizing={isCustomizing}
    />
  ),
  renderPlayground: ({ customProps, onChange, hidePreview = true, onViewCode }) => (
    <SwitchPlaygroundStudio
      customProps={customProps}
      onChange={onChange}
      hidePreview={hidePreview}
      className="w-full h-full flex-1 min-h-0 flex flex-col"
      onViewCode={onViewCode}
    />
  ),
  generateCode: ({ customProps }) => generateSwitchCode(customProps),
  getMeta: (props) => ({ activeScale: (props.size || "md").toUpperCase(), activeColor: props.shadowColor || "" }),
};
