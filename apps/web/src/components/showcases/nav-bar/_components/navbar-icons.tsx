import React from "react";
import { cn } from "@/lib/utils";

export const NavbarEmojis = {
  gooey: "🫧",
  "with-icon": "🏷️",
  floating: "💊",
  sizes: "📐",
  customization: "🎨",
} as const;

export type NavbarExampleId = keyof typeof NavbarEmojis;

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

export const NavbarIcons = {
  gooey: (props?: { className?: string }) => (
    <EmojiIcon emoji={NavbarEmojis.gooey} {...props} />
  ),
  "with-icon": (props?: { className?: string }) => (
    <EmojiIcon emoji={NavbarEmojis["with-icon"]} {...props} />
  ),
  floating: (props?: { className?: string }) => (
    <EmojiIcon emoji={NavbarEmojis.floating} {...props} />
  ),
  sizes: (props?: { className?: string }) => (
    <EmojiIcon emoji={NavbarEmojis.sizes} {...props} />
  ),
  customization: (props?: { className?: string }) => (
    <EmojiIcon emoji={NavbarEmojis.customization} {...props} />
  ),
};
