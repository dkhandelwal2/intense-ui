"use client";

import React, { useEffect } from "react";
import { ErrorView } from "@/components/errors";

export default function ErrorPage({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    // Log the error to telemetry / console for diagnostics
    console.error("[Runtime Error Caught by error.tsx]:", error);
  }, [error]);

  return <ErrorView code={500} error={error} reset={reset} />;
}
