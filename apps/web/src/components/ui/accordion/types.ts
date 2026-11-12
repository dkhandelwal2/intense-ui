import React from "react";

export type AccordionType = "single" | "multiple";

export type AccordionContextType = {
  activeValues: string[];
  toggleItem: (value: string) => void;
  type: AccordionType;
};

export type AccordionItemContextType = {
  value: string;
  disabled?: boolean;
};

export interface AccordionProps {
  children: React.ReactNode;
  type?: AccordionType;
  value?: string | string[];
  defaultValue?: string | string[];
  onValueChange?: (value: any) => void;
  className?: string;
  collapsible?: boolean;
}

export interface AccordionItemProps {
  value: string;
  children: React.ReactNode;
  className?: string;
  disabled?: boolean;
  borderWidth?: string | number;
  borderRadius?: string | number;
  borderColor?: string;
  hideBorder?: boolean;
}

export interface AccordionTriggerProps {
  value?: string;
  children: React.ReactNode;
  className?: string;
  disabled?: boolean;
  icon?: React.ReactNode;
  iconPosition?: "Left" | "Right";
  hideIcon?: boolean;
  iconColor?: string;
  size?: "xs" | "sm" | "md" | "lg" | "xl";
  weight?: "Default" | "Bold";
  headingUnderline?: boolean;
  headingColor?: string;
  onClick?: React.MouseEventHandler<HTMLButtonElement>;
}

export interface AccordionContentProps {
  value?: string;
  children: React.ReactNode;
  className?: string;
  disabled?: boolean;
  contentColor?: string;
}
