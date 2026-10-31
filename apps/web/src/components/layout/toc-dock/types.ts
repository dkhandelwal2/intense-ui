import React from "react";

export interface TocItem {
  id: string;
  label: string;
  icon?: React.ReactNode;
}

export interface IndexedTocItem extends TocItem {
  idx: number;
}

export type VisibleDockButton =
  | { type: "item"; item: IndexedTocItem }
  | { type: "prev" | "next"; count: number; targetIdx: number };

export interface ComponentTocDockProps {
  tocItems: TocItem[];
  activeTocId?: string;
  centerColumnRef?: React.RefObject<HTMLElement | null>;
  onItemClick?: (id: string) => void;
  className?: string;
  isInline?: boolean;
  containerWidth?: number;
}
