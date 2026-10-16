import React from "react";

export type SetupMode = "fresh" | "existing";

export type ComponentSlug =
  | "switch"
  | "slider"
  | "accordion"
  | "tooltip"
  | "animated-button";

export interface ComponentListItem {
  slug: ComponentSlug;
  label: string;
  icon: React.ReactNode;
  desc: string;
}
