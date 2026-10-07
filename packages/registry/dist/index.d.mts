import React from 'react';

interface AccordionProps {
    children: React.ReactNode;
    type?: "single" | "multiple";
    defaultValue?: string | string[];
    className?: string;
    collapsible?: boolean;
}
declare function Accordion({ children, type, defaultValue, className }: AccordionProps): React.JSX.Element;
interface AccordionItemProps {
    value: string;
    children: React.ReactNode;
    className?: string;
    disabled?: boolean;
    borderWidth?: string | number;
    borderRadius?: string | number;
    borderColor?: string;
}
declare function AccordionItem({ value, children, className, disabled, borderWidth, borderRadius, borderColor }: AccordionItemProps): React.JSX.Element;
interface AccordionTriggerProps {
    value?: string;
    children: React.ReactNode;
    className?: string;
    disabled?: boolean;
    icon?: React.ReactNode;
    iconPosition?: "Left" | "Right";
    size?: "xs" | "sm" | "md" | "lg" | "xl";
    weight?: "Default" | "Bold";
    headingUnderline?: boolean;
    headingColor?: string;
}
declare function AccordionTrigger({ value, children, className, disabled, icon, iconPosition, size, weight, headingUnderline, headingColor }: AccordionTriggerProps): React.JSX.Element;
interface AccordionContentProps {
    value?: string;
    children: React.ReactNode;
    className?: string;
    disabled?: boolean;
    contentColor?: string;
}
declare function AccordionContent({ value, children, className, disabled, contentColor }: AccordionContentProps): React.JSX.Element;

interface ColorPaletteProps {
    colors: string[];
    value: string;
    onChange: (color: string) => void;
    onClear?: () => void;
    draggable?: boolean;
    orientation?: "horizontal" | "vertical";
    className?: string;
}
declare function ColorPalette({ colors, value, onChange, onClear, draggable, orientation, className }: ColorPaletteProps): React.JSX.Element;

interface TooltipProps {
    content: string;
    children: React.ReactNode;
    position?: "top" | "bottom" | "left" | "right";
    bgColor?: string;
    className?: string;
}
declare function Tooltip({ content, children, position, bgColor, className }: TooltipProps): React.JSX.Element;

interface SwitchProps {
    checked: boolean;
    onChange: (checked: boolean) => void;
    className?: string;
    disabled?: boolean;
    orientation?: "horizontal" | "vertical";
    size?: "sm" | "md" | "lg";
    sliderText?: "on/off" | "true/false";
    showDotIcon?: boolean;
    shadowColor?: string;
}
declare function Switch({ checked, onChange, disabled, className, orientation, size, sliderText, showDotIcon, shadowColor }: SwitchProps): React.JSX.Element;

export { Accordion, AccordionContent, type AccordionContentProps, AccordionItem, type AccordionItemProps, type AccordionProps, AccordionTrigger, type AccordionTriggerProps, ColorPalette, type ColorPaletteProps, Switch, type SwitchProps, Tooltip, type TooltipProps };
