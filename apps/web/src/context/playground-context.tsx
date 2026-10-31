"use client";

import React, { createContext, useContext, useState, useCallback } from "react";
import { ComponentActiveTab } from "@/components/layout/layout-components/types";
import { DeckCardId } from "@/components/layout/bento/types";
import {
  COMPONENT_TABS,
  DECK_CARD_IDS,
  CODE_TABS,
  SCREEN_BREAKPOINTS,
} from "@/components/layout/constants";

export interface ComponentPlaygroundContextValue {
  activeTab: ComponentActiveTab;
  setActiveTab: (tab: ComponentActiveTab) => void;
  hasPlayground: boolean;
  playgroundContent: React.ReactNode | null;
  previewContent: React.ReactNode | null;
  customizedCode: string | null;
  setCustomizedCode: (code: string | null) => void;
  registerPlayground: (content: React.ReactNode, preview?: React.ReactNode) => void;
  unregisterPlayground: () => void;

  // Deck & BottomSheet Controls
  activeDeckCard: DeckCardId;
  setActiveDeckCard: (card: DeckCardId) => void;
  activeCodeTab: "example" | "custom" | "props";
  setActiveCodeTab: (tab: "example" | "custom" | "props") => void;
  isBottomSheetOpen: boolean;
  setIsBottomSheetOpen: React.Dispatch<React.SetStateAction<boolean>>;
  bottomSheetTab: ComponentActiveTab;
  setBottomSheetTab: (tab: ComponentActiveTab) => void;

  // Action Methods (replacing window custom events)
  openPlayground: () => void;
  setOpenPlaygroundHandler: (handler: () => void) => void;
  openCode: (tab?: "example" | "custom" | "props") => void;
  setOpenCodeHandler: (handler: () => void) => void;
}

const ComponentPlaygroundContext = createContext<ComponentPlaygroundContextValue>({
  activeTab: "playground",
  setActiveTab: () => {},
  hasPlayground: false,
  playgroundContent: null,
  previewContent: null,
  customizedCode: null,
  setCustomizedCode: () => {},
  registerPlayground: () => {},
  unregisterPlayground: () => {},

  activeDeckCard: 5,
  setActiveDeckCard: () => {},
  activeCodeTab: "example",
  setActiveCodeTab: () => {},
  isBottomSheetOpen: false,
  setIsBottomSheetOpen: () => {},
  bottomSheetTab: "playground",
  setBottomSheetTab: () => {},

  openPlayground: () => {},
  setOpenPlaygroundHandler: () => {},
  openCode: () => {},
  setOpenCodeHandler: () => {},
});

export function ComponentPlaygroundProvider({ children }: { children: React.ReactNode }) {
  const [activeTab, setActiveTabState] = useState<ComponentActiveTab>(COMPONENT_TABS.PLAYGROUND);
  const [playgroundContent, setPlaygroundContent] = useState<React.ReactNode | null>(null);
  const [previewContent, setPreviewContent] = useState<React.ReactNode | null>(null);
  const [customizedCode, setCustomizedCode] = useState<string | null>(null);

  // Deck & BottomSheet reactive states
  const [activeDeckCard, setActiveDeckCardState] = useState<DeckCardId>(DECK_CARD_IDS.PLAYGROUND_STUDIO);
  const [activeCodeTab, setActiveCodeTabState] = useState<"example" | "custom" | "props">(CODE_TABS.EXAMPLE);
  const [isBottomSheetOpen, setIsBottomSheetOpen] = useState(false);
  const [bottomSheetTab, setBottomSheetTabState] = useState<ComponentActiveTab>(COMPONENT_TABS.PLAYGROUND);

  const [openHandler, setOpenHandler] = useState<(() => void) | null>(null);
  const [openCodeHandler, setOpenCodeHandlerState] = useState<(() => void) | null>(null);

  const setActiveTab = useCallback((tab: ComponentActiveTab) => {
    setActiveTabState(tab);
  }, []);

  const setActiveDeckCard = useCallback((card: DeckCardId) => {
    setActiveDeckCardState(card);
  }, []);

  const setActiveCodeTab = useCallback((tab: "example" | "custom" | "props") => {
    setActiveCodeTabState(tab);
  }, []);

  const setBottomSheetTab = useCallback((tab: ComponentActiveTab) => {
    setBottomSheetTabState(tab);
  }, []);

  const registerPlayground = useCallback((content: React.ReactNode, preview?: React.ReactNode) => {
    setPlaygroundContent(content);
    if (preview !== undefined) {
      setPreviewContent(preview);
    }
  }, []);

  const unregisterPlayground = useCallback(() => {
    setPlaygroundContent(null);
    setPreviewContent(null);
  }, []);

  const openPlayground = useCallback(() => {
    setActiveTabState(COMPONENT_TABS.PLAYGROUND);
    setBottomSheetTabState(COMPONENT_TABS.PLAYGROUND);
    if (typeof window !== "undefined" && window.innerWidth < SCREEN_BREAKPOINTS.XL) {
      setIsBottomSheetOpen(true);
    } else {
      setActiveDeckCardState(DECK_CARD_IDS.PLAYGROUND_STUDIO);
    }
    if (openHandler) {
      openHandler();
    }
  }, [openHandler]);

  const setOpenPlaygroundHandler = useCallback((handler: () => void) => {
    setOpenHandler(() => handler);
  }, []);

  const openCode = useCallback(
    (codeTab: "example" | "custom" | "props" = CODE_TABS.CUSTOM) => {
      setActiveTabState(COMPONENT_TABS.CODE);
      setBottomSheetTabState(COMPONENT_TABS.CODE);
      setActiveCodeTabState(codeTab);
      if (typeof window !== "undefined" && window.innerWidth < SCREEN_BREAKPOINTS.XL) {
        setIsBottomSheetOpen(true);
      } else {
        setActiveDeckCardState(DECK_CARD_IDS.CODE_PREVIEW);
      }
      if (openCodeHandler) {
        openCodeHandler();
      }
    },
    [openCodeHandler]
  );

  const setOpenCodeHandler = useCallback((handler: () => void) => {
    setOpenCodeHandlerState(() => handler);
  }, []);

  return (
    <ComponentPlaygroundContext.Provider
      value={{
        activeTab,
        setActiveTab,
        hasPlayground: playgroundContent !== null,
        playgroundContent,
        previewContent,
        customizedCode,
        setCustomizedCode,
        registerPlayground,
        unregisterPlayground,
        activeDeckCard,
        setActiveDeckCard,
        activeCodeTab,
        setActiveCodeTab,
        isBottomSheetOpen,
        setIsBottomSheetOpen,
        bottomSheetTab,
        setBottomSheetTab,
        openPlayground,
        setOpenPlaygroundHandler,
        openCode,
        setOpenCodeHandler,
      }}
    >
      {children}
    </ComponentPlaygroundContext.Provider>
  );
}

export function useComponentPlayground() {
  return useContext(ComponentPlaygroundContext);
}
