import type { TocItem } from "./types";

/**
 * Calculates the exact target window scrollY position to vertically center
 * the target card in the viewport between the fixed header and floating bottom dock.
 */
export function getTargetScrollY(
  id: string,
  index?: number,
  tocItems?: TocItem[]
): number {
  if (typeof window === "undefined") return 0;

  // 1. If target is the first card, always scroll smoothly to the very top (scrollY = 0)
  if (index === 0 || (tocItems && tocItems.length > 0 && id === tocItems[0].id)) {
    return 0;
  }

  const windowHeight = window.innerHeight;
  const sectionEl = document.getElementById(id);
  const cardHeight = sectionEl?.offsetHeight || 440;

  // Header height (~72px) and bottom dock height (~90px including floating margin)
  const headerOffset = 72;
  const dockOffset = 90;

  // Available height between the header and the bottom dock
  const availableHeight = Math.max(0, windowHeight - headerOffset - dockOffset);

  // Position the card so its vertical center sits at the center of the available section
  const targetCardTop =
    headerOffset + Math.max(16, Math.round((availableHeight - cardHeight) / 2));

  let cardDocTop = 0;
  const anchor = document.getElementById(`anchor-${id}`);
  if (anchor) {
    const anchorRect = anchor.getBoundingClientRect();
    cardDocTop = anchorRect.top + window.scrollY + windowHeight * 0.08;
  }

  // Fallback if anchor is missing
  if (cardDocTop <= 0 && sectionEl) {
    cardDocTop = sectionEl.getBoundingClientRect().top + window.scrollY;
  }

  const maxScroll = Math.max(
    0,
    document.documentElement.scrollHeight - windowHeight
  );
  const desiredScrollY = cardDocTop - targetCardTop;

  return Math.min(maxScroll, Math.max(0, Math.round(desiredScrollY)));
}
