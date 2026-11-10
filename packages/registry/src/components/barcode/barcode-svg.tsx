"use client";

import React, { useMemo, useState, useRef } from "react";
import { Check, Copy, Download } from "lucide-react";
import { cn } from "@/lib/utils";
import { BarcodeDotStyle, BarcodeFormat } from "./types";
import { encodeBarcode, binaryToSvgPath } from "./encoders";

export interface BarcodeSVGProps extends React.HTMLAttributes<HTMLDivElement> {
  value: string;
  format?: BarcodeFormat;
  barWidth?: number;
  height?: number;
  size?: number;
  color?: string;
  background?: string;
  showText?: boolean;
  copyable?: boolean;
  downloadable?: boolean;
  dotStyle?: BarcodeDotStyle;
  centerIcon?: React.ReactNode;
}

export function BarcodeSVG({
  value,
  format = "code128",
  barWidth = 2,
  height = 80,
  size,
  color = "currentColor",
  background = "transparent",
  showText = true,
  copyable = false,
  downloadable = false,
  dotStyle = "square",
  centerIcon,
  className,
  ...props
}: BarcodeSVGProps) {
  const [copied, setCopied] = useState(false);
  const svgRef = useRef<SVGSVGElement>(null);
  const encoded = useMemo(() => encodeBarcode(format, value), [format, value]);

  const { pathData, svgWidth, svgHeight, badgeDim } = useMemo(() => {
    if (!encoded.valid) return { pathData: "", svgWidth: 0, svgHeight: 0, badgeDim: null };

    if (encoded.is2D && encoded.matrix) {
      const matrix = encoded.matrix;
      const n = matrix.length;
      const dim = size || (height > 100 ? height : 140);
      const pad = 8;
      const m = (dim - pad * 2) / n;
      const clearRadius = centerIcon ? Math.floor(n * 0.15) : 0;
      const centerCoord = (n - 1) / 2;
      let path = "";

      for (let r = 0; r < n; r++) {
        for (let c = 0; c < n; c++) {
          if (matrix[r][c]) {
            if (clearRadius > 0 && Math.abs(r - centerCoord) <= clearRadius && Math.abs(c - centerCoord) <= clearRadius) {
              continue;
            }
            const x = pad + c * m;
            const y = pad + r * m;
            if (dotStyle === "dots") {
              const cx = x + m / 2;
              const cy = y + m / 2;
              const rad = m * 0.42;
              path += `M${cx},${cy} m-${rad},0 a${rad},${rad} 0 1,0 ${rad * 2},0 a${rad},${rad} 0 1,0 -${rad * 2},0 `;
            } else if (dotStyle === "rounded") {
              const rad = m * 0.3;
              path += `M${x + rad},${y} h${m - rad * 2} q${rad},0 ${rad},${rad} v${m - rad * 2} q0,${rad} -${rad},${rad} h-${m - rad * 2} q-${rad},0 -${rad},-${rad} v-${m - rad * 2} q0,-${rad} ${rad},-${rad}Z `;
            } else {
              path += `M${x},${y}h${m}v${m}h-${m}Z `;
            }
          }
        }
      }
      const bSize = Math.round(dim * 0.185);
      return { pathData: path, svgWidth: dim, svgHeight: dim, badgeDim: { size: bSize, pos: Math.round((dim - bSize) / 2) } };
    }

    const path = binaryToSvgPath(encoded.binary, barWidth, height);
    return { pathData: path, svgWidth: encoded.binary.length * barWidth, svgHeight: height, badgeDim: null };
  }, [encoded, barWidth, height, size, dotStyle, centerIcon]);

  const handleCopy = () => {
    if (!value) return;
    navigator.clipboard?.writeText(value);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleDownload = () => {
    if (!svgRef.current) return;
    let s = new XMLSerializer().serializeToString(svgRef.current);
    if (!s.includes('xmlns="http://www.w3.org/2000/svg"')) s = s.replace('<svg ', '<svg xmlns="http://www.w3.org/2000/svg" ');
    s = s.replaceAll('fill="currentColor"', 'fill="#09090b"');
    const blob = new Blob([s], { type: "image/svg+xml;charset=utf-8" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `barcode-${encoded.is2D ? (centerIcon ? "qr-logo" : "qr") : "1d"}-${value || "code"}.svg`;
    a.click();
    URL.revokeObjectURL(url);
  };

  if (!encoded.valid) {
    return (
      <div className={cn("p-4 rounded-xl border border-red-500/20 bg-red-500/5 text-xs text-red-400 font-mono text-center", className)}>
        {encoded.error || "Invalid barcode input"}
      </div>
    );
  }

  return (
    <div className={cn("group relative inline-flex flex-col items-center select-none", className)} {...props}>
      {(copyable || downloadable) && (
        <div className="absolute -top-3 -right-3 flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-lg p-0.5 shadow-md z-10">
          {copyable && (
            <button
              type="button"
              onClick={handleCopy}
              className="p-1.5 rounded text-zinc-500 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-zinc-100 hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-colors"
              title="Copy code"
            >
              {copied ? <Check className="w-3.5 h-3.5 text-emerald-500" /> : <Copy className="w-3.5 h-3.5" />}
            </button>
          )}
          {downloadable && (
            <button
              type="button"
              onClick={handleDownload}
              className="p-1.5 rounded text-zinc-500 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-zinc-100 hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-colors"
              title="Download SVG"
            >
              <Download className="w-3.5 h-3.5" />
            </button>
          )}
        </div>
      )}

      <div className="relative inline-flex items-center justify-center">
        <svg
          ref={svgRef}
          width={svgWidth}
          height={svgHeight}
          viewBox={`0 0 ${svgWidth} ${svgHeight}`}
          style={{ background, shapeRendering: dotStyle === "square" ? "crispEdges" : "auto" }}
          className="max-w-full h-auto overflow-visible"
          aria-label={`Barcode: ${value}`}
        >
          {background && background !== "transparent" && (
            <rect width="100%" height="100%" fill={background} rx={8} />
          )}
          <path d={pathData} fill={color} />
          {centerIcon && encoded.is2D && badgeDim && (
            <g
              className="qr-center-icon"
              transform={`translate(${badgeDim.pos}, ${badgeDim.pos})`}
            >
              {typeof centerIcon === "string" ? (
                <image href={centerIcon} width={badgeDim.size} height={badgeDim.size} preserveAspectRatio="xMidYMid meet" />
              ) : React.isValidElement(centerIcon) ? (
                React.cloneElement(centerIcon as React.ReactElement<{ width?: number; height?: number; size?: number }>, {
                  width: badgeDim.size,
                  height: badgeDim.size,
                  size: badgeDim.size,
                })
              ) : (
                centerIcon
              )}
            </g>
          )}
        </svg>
      </div>

      {showText && (
        <span className="font-mono text-xs tracking-[0.25em] text-foreground/80 mt-2 select-text font-medium text-center max-w-[200px] truncate">
          {encoded.text}
        </span>
      )}
    </div>
  );
}
