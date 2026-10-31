"use client";

import React, { useState, useRef, useEffect, useCallback } from "react";

const SCRAMBLE_GLYPHS = "0123456789ABCDEF!@#$%&*<>[]{}~_+=";

export interface ScrambleTextProps {
  text: string;
  className?: string;
  scrambleSpeed?: number;
}

export function ScrambleText({
  text,
  className,
  scrambleSpeed = 32,
}: ScrambleTextProps) {
  const [displayText, setDisplayText] = useState(text);
  const animRef = useRef<NodeJS.Timeout | null>(null);

  const startScramble = useCallback(() => {
    if (animRef.current) clearInterval(animRef.current);
    let iteration = 0;
    const target = text;

    animRef.current = setInterval(() => {
      setDisplayText(() =>
        target
          .split("")
          .map((char, index) => {
            if (char === " " || char === "/" || char === "-") return char;
            if (index < Math.floor(iteration)) {
              return target[index];
            }
            return SCRAMBLE_GLYPHS[Math.floor(Math.random() * SCRAMBLE_GLYPHS.length)];
          })
          .join("")
      );

      if (iteration >= target.length) {
        if (animRef.current) clearInterval(animRef.current);
        setDisplayText(target);
      }
      iteration += 0.55;
    }, scrambleSpeed);
  }, [text, scrambleSpeed]);

  useEffect(() => {
    startScramble();
    return () => {
      if (animRef.current) clearInterval(animRef.current);
    };
  }, [startScramble]);

  return (
    <span className={className} onMouseEnter={startScramble}>
      {displayText}
    </span>
  );
}
