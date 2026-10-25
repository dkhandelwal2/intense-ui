import React from "react";
import { cn } from "@/lib/utils";

export const BreadcrumbEmojis = {
  basic: "🍞",
  "with-icon": "🏷️",
  "custom-separator": "✂️",
  dropdown: "📂",
  gooey: "🫧",
  chips: "💊",
  customization: "🎨",
} as const;

export type BreadcrumbExampleId = keyof typeof BreadcrumbEmojis;

export interface EmojiIconProps {
  emoji: string;
  className?: string;
}

export function EmojiIcon({ emoji, className }: EmojiIconProps) {
  return (
    <span
      role="img"
      aria-label={emoji}
      className={cn(
        "inline-flex items-center justify-center select-none leading-none",
        className
      )}
    >
      {emoji}
    </span>
  );
}

/**
 * Standard Breadcrumb Icons used throughout showcases, TOC dock, and example cards.
 * Uses rich, intuitive, universally recognized emojis.
 */
export const BreadcrumbIcons = {
  basic: (props?: { className?: string }) => (
    <EmojiIcon emoji={BreadcrumbEmojis.basic} {...props} />
  ),
  "with-icon": (props?: { className?: string }) => (
    <EmojiIcon emoji={BreadcrumbEmojis["with-icon"]} {...props} />
  ),
  "custom-separator": (props?: { className?: string }) => (
    <EmojiIcon emoji={BreadcrumbEmojis["custom-separator"]} {...props} />
  ),
  dropdown: (props?: { className?: string }) => (
    <EmojiIcon emoji={BreadcrumbEmojis.dropdown} {...props} />
  ),
  gooey: (props?: { className?: string }) => (
    <EmojiIcon emoji={BreadcrumbEmojis.gooey} {...props} />
  ),
  chips: (props?: { className?: string }) => (
    <EmojiIcon emoji={BreadcrumbEmojis.chips} {...props} />
  ),
  customization: (props?: { className?: string }) => (
    <EmojiIcon emoji={BreadcrumbEmojis.customization} {...props} />
  ),
};
