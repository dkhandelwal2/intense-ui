import React from "react";

export interface ShowcasePreviewParams<TProps = any> {
  activeTocId: string;
  customProps: TProps;
  isCustomizing: boolean;
  dynamicPreviewContent?: React.ReactNode;
  children?: React.ReactNode;
}

export interface ShowcasePlaygroundParams<TProps = any> {
  customProps: TProps;
  onChange: React.Dispatch<React.SetStateAction<TProps>>;
  onViewCode: () => void;
  dynamicPlaygroundContent?: React.ReactNode;
  propsPlaygroundContent?: React.ReactNode;
  title: string;
  hidePreview?: boolean;
}

export interface ShowcaseDefinition<TProps = any> {
  slug: string;
  defaultProps: TProps;
  renderPreview: (params: ShowcasePreviewParams<TProps>) => React.ReactNode;
  renderPlayground?: (params: ShowcasePlaygroundParams<TProps>) => React.ReactNode;
  generateCode?: (params: {
    customProps: TProps;
    title: string;
    slug: string;
    contextCode?: string | null;
  }) => string;
  getMeta?: (props: TProps) => { activeScale: string; activeColor: string };
}
