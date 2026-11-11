import React from "react";

export type BarcodeFormat = "code128" | "code39" | "ean13" | "upca" | "qr" | "data-matrix";

export type BarcodeVariant =
  | "classic"
  | "boarding-pass"
  | "shipping-label"
  | "cyber-scan"
  | "retail-tag"
  | "brand-card"
  | "location-card";

export type BarcodeDotStyle = "square" | "dots" | "rounded";

export interface BarcodeRenderOptions {
  barWidth?: number;
  height?: number;
  size?: number;
  color?: string;
  textColor?: string;
  background?: string;
  showText?: boolean;
  fontSize?: number;
  dotStyle?: BarcodeDotStyle;
}

export interface BarcodeProps extends React.HTMLAttributes<HTMLDivElement> {
  value: string;
  format?: BarcodeFormat;
  variant?: BarcodeVariant;
  barWidth?: number;
  height?: number;
  size?: number;
  color?: string;
  textColor?: string;
  accentColor?: string;
  showShape?: boolean;
  shape?: "diamond" | "none";
  background?: string;
  showText?: boolean;
  copyable?: boolean;
  downloadable?: boolean;
  dotStyle?: BarcodeDotStyle;
  centerIcon?: React.ReactNode;
  headerIcon?: React.ReactNode;
  airplaneIcon?: React.ReactNode;
  metadata?: {
    title?: string;
    subtitle?: string;
    badge?: string;
    color?: string;
    accentColor?: string;
    showShape?: boolean;
    shape?: "diamond" | "none";
    logo?: React.ReactNode;
    icon?: React.ReactNode;
    headerIcon?: React.ReactNode;
    airplaneIcon?: React.ReactNode;
    routeIcon?: React.ReactNode;
    flightIcon?: React.ReactNode;
    avatar?: string;
    from?: string;
    to?: string;
    fromCity?: string;
    toCity?: string;
    departure?: string;
    arrival?: string;
    departureLabel?: string;
    arrivalLabel?: string;
    status?: string;
    statusLabel?: string;
    statusColor?: string;
    flight?: string;
    seat?: string;
    gate?: string;
    group?: string;
    groupLabel?: string;
    trackingId?: string;
    coordinates?: string;
    place?: string;
    address?: string;
    carrier?: string;
    weight?: string;
    service?: string;
    pieces?: string;
    method?: string;
    trackingLabel?: string;
    showSortMatrix?: boolean;
    securityLabel?: string;
    compliance?: string;
    frequency?: string;
    freq?: string;
    frequencyLabel?: string;
    opticalLock?: string;
    lockStatus?: string;
    opticalLockLabel?: string;
    scanningLabel?: string;
    standbyLabel?: string;
    price?: string;
    currency?: string;
  };
}

export interface EncodedBarcode {
  binary: string;
  text: string;
  valid: boolean;
  error?: string;
  is2D?: boolean;
  matrix?: boolean[][];
}
