export * from "./types";
export { ScrollMotionSection as SidebarMotionSection } from "@/components/ui/scroll-motion-section";
export { ComponentMoreMenu } from "./component-more-menu";
export { ComponentTabControls } from "./component-tab-controls";
export type { ComponentTabControlsProps } from "./component-tab-controls";
export { ComponentTitleBadge } from "./component-title-badge";
export type { ComponentTitleBadgeProps } from "./component-title-badge";
export { ComponentSidebarHeader } from "./component-sidebar-header";
export { PreviewTabContent } from "./preview-tab-content";
export { InstallTabContent } from "./install-tab-content";
export { CodeTabContent } from "./code-tab-content";
export { ComponentBottomSheet } from "./component-bottom-sheet";
export { ComponentInspectorSidebar } from "./component-inspector-sidebar";
export { ComponentTabPanel } from "./component-tab-panel";

// Re-export TOC Dock sub-system for backwards compatibility
export {
  ComponentTocDock,
  useComponentToc,
  useComponentActiveToc,
  ComponentActiveTocContext,
  ComponentActiveTocProvider,
} from "../toc-dock";
export type { ComponentTocDockProps } from "../toc-dock";
