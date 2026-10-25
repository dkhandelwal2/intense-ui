"use client";

import React, { createContext, useContext, useState, useCallback } from "react";
import { ComponentActiveTab } from "./layout-components/types";

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
  openPlayground: () => void;
  setOpenPlaygroundHandler: (handler: () => void) => void;
  openCode: () => void;
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
  openPlayground: () => {},
  setOpenPlaygroundHandler: () => {},
  openCode: () => {},
  setOpenCodeHandler: () => {},
});

export function ComponentPlaygroundProvider({ children }: { children: React.ReactNode }) {
  const [activeTab, setActiveTabState] = useState<ComponentActiveTab>("playground");
  const [playgroundContent, setPlaygroundContent] = useState<React.ReactNode | null>(null);
  const [previewContent, setPreviewContent] = useState<React.ReactNode | null>(null);
  const [customizedCode, setCustomizedCode] = useState<string | null>(null);
  const [openHandler, setOpenHandler] = useState<(() => void) | null>(null);
  const [openCodeHandler, setOpenCodeHandlerState] = useState<(() => void) | null>(null);

  const setActiveTab = useCallback((tab: ComponentActiveTab) => {
    setActiveTabState(tab);
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
    setActiveTabState("playground");
    if (openHandler) {
      openHandler();
    }
    window.dispatchEvent(new CustomEvent("intense-ui:open-playground"));
  }, [openHandler]);

  const setOpenPlaygroundHandler = useCallback((handler: () => void) => {
    setOpenHandler(() => handler);
  }, []);

  const openCode = useCallback(() => {
    setActiveTabState("code");
    if (openCodeHandler) {
      openCodeHandler();
    }
    window.dispatchEvent(new CustomEvent("intense-ui:open-code"));
  }, [openCodeHandler]);

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
