import type React from "react";

export interface DeckCodeViewerProps {
  activeCodeTab: "example" | "custom" | "props";
  setActiveCodeTab: (tab: "example" | "custom" | "props") => void;
  activeTocId: string;
  currentDisplayedCode: string;
  propsTable?: React.ReactNode;
}

export type CodeViewerCardProps = DeckCodeViewerProps;
