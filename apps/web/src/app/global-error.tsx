"use client";

import React from "react";
import "./globals.css";
import { ErrorView } from "@/components/errors";

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <html lang="en" className="dark">
      <body className="min-h-screen bg-background font-sans antialiased flex flex-col items-center justify-center">
        <ErrorView code={500} error={error} reset={reset} />
      </body>
    </html>
  );
}
