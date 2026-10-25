"use client";

import { useEffect } from "react";

export function useShowcaseCodeUpdate(code: string) {
  useEffect(() => {
    window.dispatchEvent(
      new CustomEvent("intense-ui:code-update", {
        detail: { id: "customization", code },
      })
    );
  }, [code]);
}
