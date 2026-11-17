"use client";

import { useState, useEffect, useRef } from "react";

export interface UseDurationPickerStateOptions {
  totalSeconds: number;
  onApply: (seconds: number) => void;
  onCancel: () => void;
  showHours?: boolean;
  autoFocus?: boolean;
}

export function useDurationPickerState({
  totalSeconds,
  onApply,
  onCancel,
  showHours = true,
  autoFocus = true,
}: UseDurationPickerStateOptions) {
  const initialHr = Math.floor(totalSeconds / 3600);
  const initialMin = Math.floor((totalSeconds % 3600) / 60);
  const initialSec = totalSeconds % 60;

  const [customHr, setCustomHr] = useState<string>(initialHr.toString().padStart(2, "0"));
  const [customMin, setCustomMin] = useState<string>(
    showHours ? initialMin.toString().padStart(2, "0") : Math.floor(totalSeconds / 60).toString().padStart(2, "0")
  );
  const [customSec, setCustomSec] = useState<string>(initialSec.toString().padStart(2, "0"));

  const hrInputRef = useRef<HTMLInputElement>(null);
  const minInputRef = useRef<HTMLInputElement>(null);
  const secInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const hr = Math.floor(totalSeconds / 3600);
    const min = Math.floor((totalSeconds % 3600) / 60);
    const sec = totalSeconds % 60;
    setCustomHr(hr.toString().padStart(2, "0"));
    setCustomMin(showHours ? min.toString().padStart(2, "0") : Math.floor(totalSeconds / 60).toString().padStart(2, "0"));
    setCustomSec(sec.toString().padStart(2, "0"));
  }, [totalSeconds, showHours]);

  useEffect(() => {
    if (autoFocus) {
      const targetInput = (showHours || initialHr > 0) ? hrInputRef.current : minInputRef.current;
      targetInput?.focus();
      targetInput?.select();
    }
  }, [autoFocus, showHours, initialHr]);

  const handleApply = () => {
    const hr = Math.max(0, parseInt(customHr, 10) || 0);
    const min = Math.max(0, parseInt(customMin, 10) || 0);
    const sec = Math.max(0, parseInt(customSec, 10) || 0);
    const computedTotal = Math.max(1, (showHours ? hr * 3600 : 0) + min * 60 + sec);
    onApply(computedTotal);
  };

  const handleHrChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value;
    setCustomHr(val);
    if (val.length >= 2) {
      minInputRef.current?.focus();
      minInputRef.current?.select();
    }
  };

  const handleMinChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value;
    setCustomMin(val);
    if (val.length >= 2) {
      secInputRef.current?.focus();
      secInputRef.current?.select();
    }
  };

  const handleSecChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCustomSec(e.target.value);
  };

  const handleKeyDown = (e: React.KeyboardEvent, field: "hr" | "min" | "sec") => {
    if (e.key === "Enter") {
      e.preventDefault();
      handleApply();
      return;
    }
    if (e.key === "Escape") {
      e.preventDefault();
      onCancel();
      return;
    }

    if (e.key === "ArrowUp") {
      e.preventDefault();
      if (field === "hr") {
        const next = ((parseInt(customHr, 10) || 0) + 1) % 100;
        setCustomHr(next.toString().padStart(2, "0"));
      } else if (field === "min") {
        const next = ((parseInt(customMin, 10) || 0) + 1) % 60;
        setCustomMin(next.toString().padStart(2, "0"));
      } else if (field === "sec") {
        const next = ((parseInt(customSec, 10) || 0) + 1) % 60;
        setCustomSec(next.toString().padStart(2, "0"));
      }
      return;
    }

    if (e.key === "ArrowDown") {
      e.preventDefault();
      if (field === "hr") {
        const curr = parseInt(customHr, 10) || 0;
        const next = curr <= 0 ? 99 : curr - 1;
        setCustomHr(next.toString().padStart(2, "0"));
      } else if (field === "min") {
        const curr = parseInt(customMin, 10) || 0;
        const next = curr <= 0 ? 59 : curr - 1;
        setCustomMin(next.toString().padStart(2, "0"));
      } else if (field === "sec") {
        const curr = parseInt(customSec, 10) || 0;
        const next = curr <= 0 ? 59 : curr - 1;
        setCustomSec(next.toString().padStart(2, "0"));
      }
      return;
    }

    if (e.key === "ArrowRight") {
      if (field === "hr") {
        minInputRef.current?.focus();
        minInputRef.current?.select();
      } else if (field === "min") {
        secInputRef.current?.focus();
        secInputRef.current?.select();
      }
      return;
    }

    if (e.key === "ArrowLeft") {
      if (field === "sec") {
        minInputRef.current?.focus();
        minInputRef.current?.select();
      } else if (field === "min" && (showHours || initialHr > 0)) {
        hrInputRef.current?.focus();
        hrInputRef.current?.select();
      }
      return;
    }

    if (e.key === "Backspace" && (e.target as HTMLInputElement).value === "") {
      if (field === "sec") {
        minInputRef.current?.focus();
        minInputRef.current?.select();
      } else if (field === "min" && (showHours || initialHr > 0)) {
        hrInputRef.current?.focus();
        hrInputRef.current?.select();
      }
    }
  };

  return {
    customHr,
    customMin,
    customSec,
    initialHr,
    hrInputRef,
    minInputRef,
    secInputRef,
    handleApply,
    handleHrChange,
    handleMinChange,
    handleSecChange,
    handleKeyDown,
  };
}
