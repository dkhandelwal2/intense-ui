import * as React from "react";
import { BreadcrumbVariant, BreadcrumbSize } from "./types";

export interface BreadcrumbContextValue {
  variant?: BreadcrumbVariant;
  size?: BreadcrumbSize;
  separator?: React.ReactNode;
  separatorColor?: string;
  activeColor?: string;
}

export const BreadcrumbContext = React.createContext<BreadcrumbContextValue>({});

export const useBreadcrumbContext = () => React.useContext(BreadcrumbContext);
