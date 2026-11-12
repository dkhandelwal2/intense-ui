import { createContext } from "react";
import { AccordionContextType, AccordionItemContextType } from "./types";

export const AccordionContext = createContext<AccordionContextType | undefined>(
  undefined
);

export const AccordionItemContext = createContext<
  AccordionItemContextType | undefined
>(undefined);
