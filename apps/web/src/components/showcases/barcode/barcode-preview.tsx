"use client";

import React, { useState, useCallback } from "react";
import { Barcode } from "@/components/ui/barcode";
import { BarcodeCustomProps } from "./types";
import { QrPreviewCard } from "./qr-preview-card";

interface BarcodePreviewProps {
  customProps: BarcodeCustomProps;
  activeTocId?: string;
  isCustomizing?: boolean;
}

let sharedWithLogo = false;

export function BarcodePreview({
  customProps,
  activeTocId = "classic",
  isCustomizing = false,
}: BarcodePreviewProps) {
  const [withLogo, setWithLogo] = useState(sharedWithLogo);

  const handleToggleLogo = useCallback((val: boolean) => {
    sharedWithLogo = val;
    setWithLogo(val);
  }, []);

  if (isCustomizing) {
    return (
      <div className="flex flex-col items-center justify-center gap-6 p-8 w-full max-w-xl mx-auto">
        <Barcode
          value={customProps.value}
          format={customProps.format}
          variant={customProps.variant}
          barWidth={customProps.barWidth}
          height={customProps.height}
          dotStyle={customProps.dotStyle}
          showText={customProps.showText}
          copyable={customProps.copyable}
          downloadable={customProps.downloadable}
        />
        <span className="text-xs font-mono text-muted-foreground uppercase">
          Format: {customProps.format} • Variant: {customProps.variant} • Dot: {customProps.dotStyle || "square"}
        </span>
      </div>
    );
  }

  if (activeTocId === "brand-card") {
    return (
      <div className="flex flex-col items-center justify-center gap-6 p-8">
        <Barcode
          value="https://intenseui.dev"
          format="qr"
          variant="brand-card"
          dotStyle="dots"
          accentColor="#6366f1"
          shape="diamond"
          copyable
          downloadable
          metadata={{ title: "Intense UI", subtitle: "Scan to explore components" }}
        />
        <span className="text-xs font-mono text-muted-foreground text-center">
          QR Brand card with embedded logo, custom dot geometry, and quick scan pass
        </span>
      </div>
    );
  }

  if (activeTocId === "qr-standard") {
    return (
      <QrPreviewCard
        dotStyle="square"
        description="2D QR Code square matrix with Reed-Solomon error correction"
        withLogo={withLogo}
        onToggleLogo={handleToggleLogo}
      />
    );
  }

  if (activeTocId === "qr-dots") {
    return (
      <QrPreviewCard
        dotStyle="dots"
        description="Modern circular dot-matrix 2D QR Code"
        withLogo={withLogo}
        onToggleLogo={handleToggleLogo}
      />
    );
  }

  if (activeTocId === "data-matrix") {
    return (
      <div className="flex flex-col items-center justify-center gap-6 p-8">
        <Barcode value="DM-SN-99482-X" format="data-matrix" copyable downloadable />
        <span className="text-xs font-mono text-muted-foreground">
          Industrial Data Matrix (ECC 200) square barcode with solid L-border
        </span>
      </div>
    );
  }

  if (activeTocId === "boarding-pass") {
    return (
      <div className="flex flex-col items-center justify-center gap-6 p-8">
        <Barcode
          value="AC518-YYZ-LAX-04A"
          variant="boarding-pass"
          metadata={{ from: "YYZ", to: "LAX", fromCity: "TORONTO", toCity: "LOS ANGELES", flight: "AC518", seat: "04A", gate: "G12" }}
        />
        <span className="text-xs font-mono text-muted-foreground text-center">
          Interactive flight tracker pass with moving airplane, dotted Earth globe, and stub barcode
        </span>
      </div>
    );
  }

  if (activeTocId === "shipping-label") {
    return (
      <div className="flex flex-col items-center justify-center gap-6 p-8">
        <Barcode
          value="1Z-999-999-99-9999"
          variant="shipping-label"
          metadata={{ carrier: "EXPRESS LOGISTICS", weight: "2.45 KG", trackingId: "1Z99999999", badge: "PRIORITY 1" }}
        />
        <span className="text-xs font-mono text-muted-foreground">
          Cargo warehouse tracking card with priority routing details
        </span>
      </div>
    );
  }

  if (activeTocId === "cyber-scan") {
    return (
      <div className="flex flex-col items-center justify-center gap-6 p-8">
        <Barcode value="CYBER-NODE-0x8F" variant="cyber-scan" metadata={{ title: "CYBER_ID // 0x8F9" }} />
        <span className="text-xs font-mono text-muted-foreground">
          Sci-fi HUD terminal with real-time glowing animated laser scanline
        </span>
      </div>
    );
  }

  if (activeTocId === "retail-tag") {
    return (
      <div className="flex flex-col items-center justify-center gap-6 p-8">
        <Barcode
          value="9780201379624"
          format="ean13"
          variant="retail-tag"
          metadata={{ title: "INTENSE STUDIO", subtitle: "OVERSIZED HOODIE // BLK", price: "$185.00" }}
        />
        <span className="text-xs font-mono text-muted-foreground">
          Boutique price hangtag with metallic eyelet ring and retail EAN-13
        </span>
      </div>
    );
  }

  if (activeTocId === "code39") {
    return (
      <div className="flex flex-col items-center justify-center gap-6 p-8">
        <Barcode value="PART-8924-X" format="code39" barWidth={2} height={75} copyable downloadable />
        <span className="text-xs font-mono text-muted-foreground">
          Code 39 industrial alphanumeric standard with start/stop asterisks
        </span>
      </div>
    );
  }

  if (activeTocId === "ean13") {
    return (
      <div className="flex flex-col items-center justify-center gap-6 p-8">
        <Barcode value="9780201379624" format="ean13" barWidth={2} height={75} copyable downloadable />
        <span className="text-xs font-mono text-muted-foreground">
          GS1 EAN-13 / UPC-A retail product barcode with modulo-10 checksum
        </span>
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center justify-center gap-6 p-8">
      <Barcode value="INTENSE-2026" format="code128" barWidth={2} height={80} copyable downloadable />
      <span className="text-xs font-mono text-muted-foreground">
        High-density Code 128 vector barcode rendered via single SVG path
      </span>
    </div>
  );
}
