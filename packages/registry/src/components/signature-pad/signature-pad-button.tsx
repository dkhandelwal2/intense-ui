"use client";

import React from "react";
import { Check, Pencil } from "lucide-react";
import { PenSquiggleIcon } from "@/assets/svg";
import { cn } from "@/lib/utils";
import type { SignaturePadButtonProps } from "./types";

export function SignaturePadButton({
  isSigned = false,
  buttonLabel = "Start Signing",
  signedLabel = "Signed",
  onClick,
  onEdit,
  disabled = false,
  className,
}: SignaturePadButtonProps) {
  const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    if (disabled) return;
    if (isSigned && onEdit) {
      onEdit();
    } else {
      onClick();
    }
  };

  return (
    <button
      type="button"
      onClick={handleClick}
      disabled={disabled}
      className={cn(
        "group relative inline-flex items-center justify-center gap-2.5 px-5 py-2.5 rounded-full select-none font-medium text-sm transition-all duration-300 ease-out cursor-pointer",
        "bg-zinc-100 dark:bg-zinc-800 text-zinc-900 dark:text-zinc-100 border border-zinc-200/90 dark:border-zinc-700/90 shadow-xs",
        "hover:bg-zinc-200/70 dark:hover:bg-zinc-700/70 hover:shadow-sm active:scale-97",
        disabled && "opacity-50 cursor-not-allowed pointer-events-none",
        className
      )}
      aria-label={isSigned ? `${signedLabel} - Click to edit signature` : buttonLabel}
    >
      {isSigned ? (
        <>
          <span className="size-4.5 rounded-full bg-emerald-500/15 text-emerald-600 dark:text-emerald-400 flex items-center justify-center shrink-0">
            <Check className="size-3" strokeWidth={3} />
          </span>
          <span className="font-semibold tracking-tight">
            {signedLabel}
          </span>
          <span
            className="size-6 -mr-1.5 ml-0.5 rounded-full bg-zinc-200/80 dark:bg-zinc-700/80 group-hover:bg-zinc-300 dark:group-hover:bg-zinc-600 text-zinc-600 dark:text-zinc-300 group-hover:text-zinc-900 dark:group-hover:text-zinc-100 flex items-center justify-center transition-all duration-200 shadow-2xs"
            title="Edit signature"
          >
            <Pencil className="size-3 transition-transform duration-200 group-hover:rotate-12 group-hover:scale-110" />
          </span>
        </>
      ) : (
        <>
          <PenSquiggleIcon
            size={18}
            className="text-zinc-900 dark:text-zinc-100 transition-transform duration-300 group-hover:rotate-6 group-hover:scale-105"
          />
          <span className="font-semibold tracking-tight">
            {buttonLabel}
          </span>
        </>
      )}
    </button>
  );
}
