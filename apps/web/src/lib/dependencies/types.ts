import React from "react";

export interface DependencyItem {
  name: string;
  version?: string;
  versionColor?: string;
  description?: React.ReactNode;
  command?: string;
  url?: string;
}

export interface DependencyMeta {
  version: string;
  versionColor: string;
  description: React.ReactNode;
  url: string;
}
