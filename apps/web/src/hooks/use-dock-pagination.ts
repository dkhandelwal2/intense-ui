import * as React from "react";
import { DOCK_DIMENSIONS } from "@/components/layout/toc-dock/constants";
import type { TocItem, IndexedTocItem, VisibleDockButton } from "@/components/layout/toc-dock/types";

interface UseDockPaginationOptions {
  tocItems: TocItem[];
  activeTocId?: string;
  containerWidth?: number;
}

interface UseDockPaginationReturn {
  allItems: IndexedTocItem[];
  visibleButtons: VisibleDockButton[];
  safeActiveId?: string;
  activeItem?: IndexedTocItem;
  totalWidth: number;
  activeX: number;
  activeIdx: number;
  N: number;
}

export function useDockPagination({
  tocItems,
  activeTocId,
  containerWidth,
}: UseDockPaginationOptions): UseDockPaginationReturn {
  const allItems = React.useMemo(
    () => tocItems.map((item, idx) => ({ ...item, idx })),
    [tocItems]
  );
  const N = allItems.length;

  const maxButtons = containerWidth
    ? Math.max(
        3,
        Math.min(
          5,
          Math.floor((containerWidth - 70) / DOCK_DIMENSIONS.BUTTON_WIDTH)
        )
      )
    : 5;
  const MAX = maxButtons;

  const rawIdx = allItems.findIndex((i) => i.id === activeTocId);
  const activeIdx = rawIdx >= 0 ? rawIdx : 0;

  const visibleButtons = React.useMemo<VisibleDockButton[]>(() => {
    if (N <= MAX) {
      return allItems.map((item) => ({ type: "item", item }));
    }
    const K = MAX - 1;
    if (activeIdx < K) {
      return [
        ...allItems.slice(0, K).map((item) => ({ type: "item" as const, item })),
        {
          type: "next",
          count: N - K,
          targetIdx: Math.min(N - 1, activeIdx + 1),
        },
      ];
    } else if (activeIdx >= N - (K - 1)) {
      return [
        {
          type: "prev",
          count: N - K,
          targetIdx: Math.max(0, activeIdx - 1),
        },
        ...allItems.slice(N - K, N).map((item) => ({ type: "item" as const, item })),
      ];
    } else {
      const start = activeIdx - Math.floor((K - 1) / 2);
      const end = start + (K - 1);
      return [
        {
          type: "prev",
          count: start,
          targetIdx: Math.max(0, activeIdx - 1),
        },
        ...allItems.slice(start, end).map((item) => ({ type: "item" as const, item })),
        {
          type: "next",
          count: N - end,
          targetIdx: Math.min(N - 1, activeIdx + 1),
        },
      ];
    }
  }, [allItems, N, activeIdx, MAX]);

  const activeBtnIndex = visibleButtons.findIndex(
    (btn) => btn.type === "item" && btn.item.id === activeTocId
  );
  const safeActiveIndex = activeBtnIndex >= 0 ? activeBtnIndex : 0;
  const activeItem =
    visibleButtons[safeActiveIndex]?.type === "item"
      ? (visibleButtons[safeActiveIndex] as { type: "item"; item: IndexedTocItem })
          .item
      : allItems[0];
  const safeActiveId = activeItem?.id;

  const totalWidth =
    DOCK_DIMENSIONS.PADDING_X * 2 +
    visibleButtons.length * DOCK_DIMENSIONS.BUTTON_WIDTH;
  const activeX =
    DOCK_DIMENSIONS.PADDING_X +
    safeActiveIndex * DOCK_DIMENSIONS.BUTTON_WIDTH +
    DOCK_DIMENSIONS.BUTTON_WIDTH / 2;

  return {
    allItems,
    visibleButtons,
    safeActiveId,
    activeItem,
    totalWidth,
    activeX,
    activeIdx,
    N,
  };
}
