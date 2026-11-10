"use client";

import { useEffect } from "react";
import { useComponentPlayground } from "@/context";

export function useShowcaseCodeUpdate(code: string) {
  const { setCustomizedCode, setActiveVariantCode } = useComponentPlayground();

  useEffect(() => {
    if (setCustomizedCode) {
      setCustomizedCode(code);
    }
    if (setActiveVariantCode) {
      setActiveVariantCode(code);
    }
  }, [code, setCustomizedCode, setActiveVariantCode]);
}

export function useShowcaseActiveCode(code: string | null) {
  const { setActiveVariantCode } = useComponentPlayground();

  useEffect(() => {
    if (setActiveVariantCode) {
      setActiveVariantCode(code);
    }
    return () => {
      if (setActiveVariantCode) {
        setActiveVariantCode(null);
      }
    };
  }, [code, setActiveVariantCode]);
}
