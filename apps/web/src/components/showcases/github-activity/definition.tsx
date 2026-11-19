import React from "react";
import { ShowcaseDefinition } from "../registry-types";
import { GithubActivityCustomProps, DEFAULT_GITHUB_ACTIVITY_PROPS } from "./types";
import { GithubActivityPreview } from "./github-activity-preview";
import { generateGithubActivityCode } from "./code-generator";
import { GithubActivityPlaygroundStudio } from "../playground-studio/github-activity-playground-studio";

export const githubActivityShowcaseDefinition: ShowcaseDefinition<GithubActivityCustomProps> = {
  slug: "github-activity",
  defaultProps: DEFAULT_GITHUB_ACTIVITY_PROPS,
  renderPreview: ({ customProps, activeTocId, isCustomizing, dynamicPreviewContent }) => {
    if (dynamicPreviewContent) return dynamicPreviewContent;
    return (
      <GithubActivityPreview
        customProps={customProps}
        activeTocId={activeTocId}
        isCustomizing={isCustomizing}
      />
    );
  },
  renderPlayground: ({ customProps, onChange, onViewCode, hidePreview, dynamicPlaygroundContent, propsPlaygroundContent }) => {
    if (dynamicPlaygroundContent) return dynamicPlaygroundContent;
    if (propsPlaygroundContent) return propsPlaygroundContent;
    return (
      <GithubActivityPlaygroundStudio
        customProps={customProps}
        onChange={onChange}
        onViewCode={onViewCode}
        hidePreview={hidePreview}
        className="w-full h-full flex-1 min-h-0 flex flex-col"
      />
    );
  },
  generateCode: ({ customProps, contextCode }) => {
    if (contextCode) return contextCode;
    return generateGithubActivityCode(customProps);
  },
  getMeta: (props) => ({
    activeScale: `${props.weeksCount || 52}W`,
    activeColor: props.theme,
  }),
};
