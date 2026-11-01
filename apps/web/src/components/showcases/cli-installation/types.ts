import type React from "react";
import type { PackageManager } from "@/components/docs";

export interface CliInstallationCardProps {
  slug?: string;
  installContent?: React.ReactNode;
  usageCode?: string;
  dependencies?: { name: string; command: string }[];
  packageManager: PackageManager;
  onPackageManagerChange: (pm: PackageManager) => void;
}

export type InstallTabContentProps = CliInstallationCardProps;
