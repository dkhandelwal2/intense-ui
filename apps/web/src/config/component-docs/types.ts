import React from "react";
import { PropGroup } from "@/components/ui/props-table";

export interface ComponentExample {
  id: string;
  label: string;
  code: string;
  description?: string;
}

export interface ComponentDocData {
  usageCode: string;
  codeContent: string;
  description?: React.ReactNode;
  codes?: Record<string, string>;
  tocItems?: { id: string; label: string; icon?: React.ReactNode }[];
  dependencies?: { name: string; command: string }[];
  propGroups?: PropGroup[];
}
