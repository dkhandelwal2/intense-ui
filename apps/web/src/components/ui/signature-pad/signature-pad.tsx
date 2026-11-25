"use client";

import React, { useState, useRef, useImperativeHandle, forwardRef, useCallback } from "react";
import { motion } from "framer-motion";
import { PenSquiggleIcon } from "@/assets/svg";
import { cn } from "@/lib/utils";
import { SignaturePadHeader } from "./signature-pad-header";
import { SignaturePadCanvas } from "./signature-pad-canvas";
import { SignaturePadButton } from "./signature-pad-button";
import { generateSignatureSvg, extractSignatureResult } from "./signature-pad-helpers";
import {
  DEFAULT_SIGNATURE_WIDTH,
  DEFAULT_SIGNATURE_HEIGHT,
  DEFAULT_STROKE_WIDTH,
  DEFAULT_STROKE_COLOR,
  SIGNATURE_MORPH_SPRING,
  SIGNATURE_FADE_TRANSITION,
} from "./constants";
import type { SignaturePadProps, SignaturePadRef, SignatureStroke } from "./types";

export const SignaturePad = forwardRef<SignaturePadRef, SignaturePadProps>(function SignaturePad(
  {
    onSign,
    onClear,
    onClose,
    onExpandChange,
    strokeColor = DEFAULT_STROKE_COLOR,
    strokeWidth = DEFAULT_STROKE_WIDTH,
    width = DEFAULT_SIGNATURE_WIDTH,
    height = DEFAULT_SIGNATURE_HEIGHT,
    buttonLabel = "Start Signing",
    finishLabel = "Finish Signing",
    title = "Sign",
    initialExpanded = false,
    disabled = false,
    showClear = true,
    showClose = true,
    className,
  },
  ref
) {
  const [isExpanded, setIsExpanded] = useState(initialExpanded);
  const [strokes, setStrokes] = useState<SignatureStroke[]>([]);
  const [isSigned, setIsSigned] = useState(false);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  const canvasHeight = Math.max(120, height - 90);

  const clear = useCallback(() => {
    setStrokes([]);
    setIsSigned(false);
    const canvas = canvasRef.current;
    if (canvas) {
      const ctx = canvas.getContext("2d");
      ctx?.clearRect(0, 0, canvas.width, canvas.height);
    }
    onClear?.();
  }, [onClear]);

  const undo = useCallback(() => {
    setStrokes((prev) => prev.slice(0, -1));
  }, []);

  const toDataURL = useCallback((type = "image/png", quality = 0.92) => {
    return canvasRef.current ? canvasRef.current.toDataURL(type, quality) : null;
  }, []);

  const toSVG = useCallback(() => {
    return generateSignatureSvg(strokes, width, canvasHeight);
  }, [strokes, width, canvasHeight]);

  const isEmpty = useCallback(() => strokes.length === 0, [strokes]);

  useImperativeHandle(
    ref,
    () => ({
      clear,
      undo,
      isEmpty,
      toDataURL,
      toSVG,
      getStrokes: () => strokes,
    }),
    [clear, undo, isEmpty, toDataURL, toSVG, strokes]
  );

  const handleOpen = () => {
    if (disabled) return;
    setIsExpanded(true);
    onExpandChange?.(true);
  };

  const handleClose = () => {
    setIsExpanded(false);
    onClose?.();
    onExpandChange?.(false);
  };

  const handleFinish = () => {
    const result = extractSignatureResult(canvasRef.current, strokes, width, canvasHeight);
    if (strokes.length > 0) setIsSigned(true);
    onSign?.(result);
    setIsExpanded(false);
    onExpandChange?.(false);
  };

  return (
    <div className={cn("relative flex flex-col items-center justify-center select-none w-full", className)}>
      <motion.div
        layout
        transition={SIGNATURE_MORPH_SPRING}
        style={{ width: isExpanded ? width : "auto" }}
        className={cn(
          "relative flex flex-col items-center justify-center select-none origin-center",
          !isExpanded
            ? "rounded-full"
            : "p-3.5 sm:p-4 rounded-[28px] sm:rounded-3xl border-2 border-dashed border-zinc-300 dark:border-zinc-700 bg-white dark:bg-zinc-950 shadow-xl shadow-zinc-950/5 dark:shadow-black/50"
        )}
      >
        {!isExpanded ? (
          <motion.div
            key="collapsed-button"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={SIGNATURE_FADE_TRANSITION}
            className="flex items-center justify-center"
          >
            <SignaturePadButton
              isSigned={isSigned}
              buttonLabel={buttonLabel}
              signedLabel="Signed"
              onClick={handleOpen}
              onEdit={handleOpen}
              disabled={disabled}
            />
          </motion.div>
        ) : (
          <motion.div
            key="expanded-card"
            initial={{ opacity: 0, scale: 0.98 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.98 }}
            transition={SIGNATURE_FADE_TRANSITION}
            className="flex flex-col gap-2 w-full h-full"
          >
            <SignaturePadHeader
              title={title}
              onClear={clear}
              onClose={handleClose}
              canClear={strokes.length > 0}
              showClear={showClear}
              showClose={showClose}
            />

            <div
              className="relative w-full rounded-2xl bg-zinc-50/50 dark:bg-zinc-900/40 border border-zinc-200/60 dark:border-zinc-800/60 overflow-hidden flex items-center justify-center"
              style={{ height: canvasHeight }}
            >
              <SignaturePadCanvas
                canvasRef={canvasRef}
                strokes={strokes}
                setStrokes={setStrokes}
                strokeColor={strokeColor}
                strokeWidth={strokeWidth}
                width={width - 32}
                height={canvasHeight}
                disabled={disabled}
              />
            </div>

            <div className="pt-1 w-full">
              <button
                type="button"
                onClick={handleFinish}
                className={cn(
                  "w-full py-2.5 px-4 rounded-full font-semibold text-xs tracking-tight select-none",
                  "flex items-center justify-center gap-2 transition-all duration-200 cursor-pointer shadow-xs",
                  "bg-zinc-100 hover:bg-zinc-200/80 dark:bg-zinc-800 dark:hover:bg-zinc-700/80 text-zinc-900 dark:text-zinc-100",
                  "border border-zinc-200/80 dark:border-zinc-700/80 active:scale-98"
                )}
              >
                <PenSquiggleIcon size={16} className="text-zinc-900 dark:text-zinc-100 shrink-0" />
                <span>{finishLabel}</span>
              </button>
            </div>
          </motion.div>
        )}
      </motion.div>
    </div>
  );
});
