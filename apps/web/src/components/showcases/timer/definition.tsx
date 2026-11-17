import React from "react";
import { ShowcaseDefinition } from "../registry-types";
import { TimerCustomProps, DEFAULT_TIMER_PROPS } from "./types";
import { TimerPreview } from "./timer-preview";
import { generateTimerCode } from "./code-generator";
import { TimerPlaygroundStudio } from "../playground-studio/timer-playground-studio";

export const timerShowcaseDefinition: ShowcaseDefinition<TimerCustomProps> = {
  slug: "timer",
  defaultProps: DEFAULT_TIMER_PROPS,
  renderPreview: ({ customProps, activeTocId, isCustomizing }) => (
    <TimerPreview
      customProps={customProps}
      activeTocId={activeTocId}
      isCustomizing={isCustomizing}
    />
  ),
  renderPlayground: ({ customProps, onChange, hidePreview = true, onViewCode }) => (
    <TimerPlaygroundStudio
      customProps={customProps}
      onChange={onChange}
      hidePreview={hidePreview}
      className="w-full h-full flex-1 min-h-0 flex flex-col"
      onViewCode={onViewCode}
    />
  ),
  generateCode: ({ customProps }) => generateTimerCode(customProps),
  getMeta: (props) => ({ activeScale: props.variant.toUpperCase(), activeColor: props.intent }),
};
