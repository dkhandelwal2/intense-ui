import React from "react";
import {
  Rows3,
  Layers,
  Lock,
  CreditCard,
  Square,
  Languages,
  Sparkles,
  Type,
  MousePointerClick,
  FolderOpen,
  SlidersHorizontal,
  LucideIcon,
} from "lucide-react";
import { cn } from "@/lib/utils";

export const AccordionEmojis = {
  basic: "📋",
  multiple: "📚",
  disabled: "🔒",
  card: "💳",
  border: "🔲",
  rtl: "🌐",
  "without-border": "🫧",
  "without-icon": "📝",
  "with-onclick": "⚡",
  "expanded-default": "📖",
  customization: "🎨",
} as const;

export type AccordionExampleId = keyof typeof AccordionEmojis;

export const AccordionLucideIcons: Record<AccordionExampleId, LucideIcon> = {
  basic: Rows3,
  multiple: Layers,
  disabled: Lock,
  card: CreditCard,
  border: Square,
  rtl: Languages,
  "without-border": Sparkles,
  "without-icon": Type,
  "with-onclick": MousePointerClick,
  "expanded-default": FolderOpen,
  customization: SlidersHorizontal,
};

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
 * Standard Accordion Icons used throughout showcases, TOC dock, and example cards.
 * Uses rich, intuitive, universally recognized emojis matching user preferences.
 */
export const AccordionIcons = {
  basic: (props?: { className?: string }) => (
    <EmojiIcon emoji={AccordionEmojis.basic} {...props} />
  ),
  multiple: (props?: { className?: string }) => (
    <EmojiIcon emoji={AccordionEmojis.multiple} {...props} />
  ),
  disabled: (props?: { className?: string }) => (
    <EmojiIcon emoji={AccordionEmojis.disabled} {...props} />
  ),
  card: (props?: { className?: string }) => (
    <EmojiIcon emoji={AccordionEmojis.card} {...props} />
  ),
  border: (props?: { className?: string }) => (
    <EmojiIcon emoji={AccordionEmojis.border} {...props} />
  ),
  rtl: (props?: { className?: string }) => (
    <EmojiIcon emoji={AccordionEmojis.rtl} {...props} />
  ),
  "without-border": (props?: { className?: string }) => (
    <EmojiIcon emoji={AccordionEmojis["without-border"]} {...props} />
  ),
  "without-icon": (props?: { className?: string }) => (
    <EmojiIcon emoji={AccordionEmojis["without-icon"]} {...props} />
  ),
  "with-onclick": (props?: { className?: string }) => (
    <EmojiIcon emoji={AccordionEmojis["with-onclick"]} {...props} />
  ),
  "expanded-default": (props?: { className?: string }) => (
    <EmojiIcon emoji={AccordionEmojis["expanded-default"]} {...props} />
  ),
  customization: (props?: { className?: string }) => (
    <EmojiIcon emoji={AccordionEmojis.customization} {...props} />
  ),
};
