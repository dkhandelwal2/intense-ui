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
  codes?: Record<string, string>;
  tocItems?: { id: string; label: string }[];
  dependencies?: { name: string; command: string }[];
  propGroups?: PropGroup[];
}
