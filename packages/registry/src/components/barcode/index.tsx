"use client";

import React from "react";
import { cn } from "@/lib/utils";
import { BarcodeProps } from "./types";
import { BarcodeSVG } from "./barcode-svg";
import { BoardingPassBarcode } from "./variants/boarding-pass";
import { ShippingLabelBarcode } from "./variants/shipping-label";
import { CyberScanBarcode } from "./variants/cyber-scan";
import { RetailTagBarcode } from "./variants/retail-tag";
import { BrandCardBarcode } from "./variants/brand-card";

export * from "./types";
export * from "./encoders";
export { BarcodeSVG, type BarcodeSVGProps } from "./barcode-svg";
export { BoardingPassBarcode } from "./variants/boarding-pass";
export { ShippingLabelBarcode } from "./variants/shipping-label";
export { CyberScanBarcode } from "./variants/cyber-scan";
export { RetailTagBarcode } from "./variants/retail-tag";
export { BrandCardBarcode } from "./variants/brand-card";

/**
 * @title Barcode / QR Code
 * Barcode / QR Code: Zero-dependency, 100% dynamic vector barcode component.
 * Supports 1D (Code 128, Code 39, EAN-13, UPC-A) & 2D square matrix (QR Code, Data Matrix).
 * Renders via single-path SVG with real-world variants (Brand Connect Card, Boarding Pass, Shipping Label, Cyber Scan, Retail Tag).
 */
export function Barcode({
  value,
  format = "code128",
  variant = "classic",
  barWidth = 2,
  height = 80,
  size,
  color,
  accentColor,
  showShape,
  shape,
  background,
  showText = true,
  copyable = false,
  downloadable = false,
  dotStyle = "square",
  centerIcon,
  headerIcon,
  metadata,
  className,
  ...props
}: BarcodeProps) {
  if (variant === "brand-card") {
    return (
      <BrandCardBarcode
        value={value}
        format={format}
        size={size}
        dotStyle={dotStyle}
        color={color}
        accentColor={accentColor}
        showShape={showShape}
        shape={shape}
        centerIcon={centerIcon}
        headerIcon={headerIcon}
        metadata={metadata}
        className={className}
        {...props}
      />
    );
  }

  if (variant === "boarding-pass") {
    return (
      <BoardingPassBarcode
        value={value}
        format={format}
        size={size}
        dotStyle={dotStyle}
        color={color}
        metadata={metadata}
        className={className}
        {...props}
      />
    );
  }

  if (variant === "shipping-label") {
    return (
      <ShippingLabelBarcode
        value={value}
        format={format}
        size={size}
        dotStyle={dotStyle}
        color={color}
        metadata={metadata}
        className={className}
        {...props}
      />
    );
  }

  if (variant === "cyber-scan") {
    return (
      <CyberScanBarcode
        value={value}
        format={format}
        size={size}
        dotStyle={dotStyle}
        color={color}
        metadata={metadata}
        className={className}
        {...props}
      />
    );
  }

  if (variant === "retail-tag") {
    return (
      <RetailTagBarcode
        value={value}
        format={format}
        size={size}
        dotStyle={dotStyle}
        color={color}
        metadata={metadata}
        className={className}
        {...props}
      />
    );
  }

  // Classic default variant: crisp minimal card or inline vector
  return (
    <div
      className={cn(
        "inline-flex flex-col items-center p-5 rounded-2xl bg-white dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 shadow-sm text-foreground",
        className
      )}
      {...props}
    >
      <BarcodeSVG
        value={value}
        format={format}
        barWidth={barWidth}
        height={height}
        size={size}
        dotStyle={dotStyle}
        centerIcon={centerIcon}
        color={color || "currentColor"}
        background={background || "transparent"}
        showText={showText}
        copyable={copyable}
        downloadable={downloadable}
      />
    </div>
  );
}
