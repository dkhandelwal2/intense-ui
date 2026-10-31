/**
 * Layout Screen Breakpoints (in pixels) matching Tailwind CSS configuration
 */
export const SCREEN_BREAKPOINTS = {
  SM: 640,
  MD: 768,
  LG: 1024,
  XL: 1280,
  "2XL": 1536,
} as const;

/**
 * Deck Card Identifiers for 3D Bento Stack
 */
export const DECK_CARD_IDS = {
  CLI_INSTALLATION: 4,
  PLAYGROUND_STUDIO: 5,
  CODE_PREVIEW: 6,
} as const;

/**
 * Layout Component Active Tab Identifiers
 */
export const COMPONENT_TABS = {
  PREVIEW: "preview",
  CODE: "code",
  INSTALL: "install",
  PLAYGROUND: "playground",
  PROPS: "props",
} as const;

/**
 * Code Sub-tab Identifiers
 */
export const CODE_TABS = {
  EXAMPLE: "example",
  CUSTOM: "custom",
  PROPS: "props",
} as const;

/**
 * Global Window Custom Events for Intense UI Layout
 */
export const LAYOUT_CUSTOM_EVENTS = {
  OPEN_PLAYGROUND: "intense-ui:open-playground",
  OPEN_CODE: "intense-ui:open-code",
  FOCUS_TOC: "intense-ui:focus-toc",
  CODE_UPDATE: "intense-ui:code-update",
} as const;
