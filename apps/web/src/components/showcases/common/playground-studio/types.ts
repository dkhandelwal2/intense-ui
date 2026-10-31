import React from "react";

export interface PlaygroundStudioRowItem {
  id: string;
  label: string;
  spec: string;
  thumbnail: React.ReactNode;
  isSelected?: boolean;
  onSelect: () => void;
  actionType?: "plus" | "toggle";
  toggleChecked?: boolean;
  onToggleChange?: (checked: boolean) => void;
}

export interface PlaygroundStudioStepData {
  id: string;
  titleLine1: string;
  titleLine2: string;
  categoryTag?: string;
  colorGradient?: string;
  icon?: React.ReactNode;
  headerTitle: string;
  headerSubtitle: string;
  headerEmoji?: string;
  rows?: PlaygroundStudioRowItem[];
  customRightContent?: React.ReactNode;
}

export interface PlaygroundStudioProps {
  steps: PlaygroundStudioStepData[];
  preview?: React.ReactNode;
  hidePreview?: boolean;
  currentStepIndex?: number;
  onStepChange?: (index: number) => void;
  modifiedCount?: number;
  onReset?: () => void;
  onViewCode?: () => void;
  className?: string;
  description?: string;
}

export interface ReorderTileItem {
  id: string;
  color: string;
}

export interface PlaygroundReorderIconProps {
  className?: string;
  size?: "sm" | "md";
  intervalMs?: number;
}
