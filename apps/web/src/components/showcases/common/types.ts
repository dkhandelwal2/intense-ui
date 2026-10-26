import React from "react";
import type { ComponentSpecDetailProps } from "./spec-detail";

export interface ShowcaseExampleItem {
  id: string;
  label: string;
  code?: string;
  description?: React.ReactNode;
  spec?: ComponentSpecDetailProps;
  infoContent?: React.ReactNode;
}

export interface ShowcaseCardProps {
  id: string;
  label: string;
  icon?: React.ReactNode | React.ComponentType<{ className?: string }>;
  description?: React.ReactNode;
  infoContent?: React.ReactNode;
  spec?: ComponentSpecDetailProps;
  code?: string;
  index: number;
  total: number;
  isCustomization?: boolean;

  // Regular Preview:
  children?: React.ReactNode;
  previewClassName?: string;

  // Customization Playground:
  renderPreview?: () => React.ReactNode;
  renderPlayground?: () => React.ReactNode;
  modifiedCount?: number;
  onReset?: () => void;
  liveOutputSummary?: React.ReactNode;
}

export interface PlaygroundDockItem {
  id: string;
  label: string;
  emoji: string;
  description: string;
}

export interface PlaygroundDockProps {
  items: PlaygroundDockItem[];
  activeId: string;
  onSelect: (id: string) => void;
  className?: string;
}
