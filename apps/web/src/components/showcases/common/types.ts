import React from "react";

export interface ShowcaseExampleItem {
  id: string;
  label: string;
  code?: string;
  description?: string;
}

export interface ShowcaseCardProps {
  id: string;
  label: string;
  icon?: React.ReactNode | React.ComponentType<{ className?: string }>;
  description?: React.ReactNode;
  infoContent?: React.ReactNode;
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
