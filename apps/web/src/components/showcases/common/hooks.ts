"use client";

import { useEffect } from "react";
import { useComponentPlayground } from "@/context";

export function useShowcaseCodeUpdate(code: string) {
  const { setCustomizedCode } = useComponentPlayground();

  useEffect(() => {
    if (setCustomizedCode) {
      setCustomizedCode(code);
    }
  }, [code, setCustomizedCode]);
}
