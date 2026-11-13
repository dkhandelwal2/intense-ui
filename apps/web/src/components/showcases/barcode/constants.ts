export interface BarcodeExample {
  id: string;
  label: string;
  emoji: string;
  code: string;
}

export const BARCODE_EXAMPLES: BarcodeExample[] = [
  {
    id: "classic",
    label: "Code 128 Standard",
    emoji: "🏷️",
    code: `"use client";\n\nimport { Barcode } from "@/components/ui/barcode";\n\nexport default function BarcodeDemo() {\n  return (\n    <div className="flex items-center justify-center p-8">\n      <Barcode value="INTENSE-2026" format="code128" copyable downloadable />\n    </div>\n  );\n}`,
  },
  {
    id: "brand-card",
    label: "QR Brand Logo Card",
    emoji: "💳",
    code: `"use client";\n\nimport { Barcode } from "@/components/ui/barcode";\n\nexport default function BrandCardDemo() {\n  return (\n    <div className="flex items-center justify-center p-8">\n      <Barcode\n        value="https://intenseui.dev"\n        format="qr"\n        variant="brand-card"\n        dotStyle="dots"\n        accentColor="#6366f1"\n        shape="diamond"\n        copyable\n        downloadable\n        metadata={{\n          title: "Intense UI",\n          subtitle: "Scan to explore components",\n        }}\n      />\n    </div>\n  );\n}`,
  },
  {
    id: "location-card",
    label: "Location GPS Check-in",
    emoji: "📍",
    code: `"use client";\n\nimport { Barcode } from "@/components/ui/barcode";\n\nexport default function LocationCardDemo() {\n  return (\n    <div className="flex items-center justify-center p-8">\n      <Barcode\n        value="https://maps.google.com/?q=40.6782,-73.9442"\n        format="qr"\n        variant="location-card"\n        dotStyle="dots"\n        accentColor="#38bdf8"\n        copyable\n        downloadable\n        metadata={{\n          title: "BROOKLYN",\n          subtitle: "New York, NY",\n          coordinates: "40.6782° N, 73.9442° W",\n        }}\n      />\n    </div>\n  );\n}`,
  },
  {
    id: "qr-standard",
    label: "QR Code (Square Matrix)",
    emoji: "📱",
    code: `"use client";\n\nimport { Barcode } from "@/components/ui/barcode";\n\nexport default function QrCodeDemo() {\n  return (\n    <div className="flex items-center justify-center p-8">\n      <Barcode value="https://intenseui.dev" format="qr" copyable downloadable />\n    </div>\n  );\n}`,
  },
  {
    id: "qr-dots",
    label: "QR Code (Smooth Dots)",
    emoji: "✨",
    code: `"use client";\n\nimport { Barcode } from "@/components/ui/barcode";\n\nexport default function QrDotsDemo() {\n  return (\n    <div className="flex items-center justify-center p-8">\n      <Barcode value="https://intenseui.dev" format="qr" dotStyle="dots" copyable downloadable />\n    </div>\n  );\n}`,
  },
  {
    id: "data-matrix",
    label: "Data Matrix (ECC 200)",
    emoji: "🔲",
    code: `"use client";\n\nimport { Barcode } from "@/components/ui/barcode";\n\nexport default function DataMatrixDemo() {\n  return (\n    <div className="flex items-center justify-center p-8">\n      <Barcode value="DM-SN-99482-X" format="data-matrix" copyable downloadable />\n    </div>\n  );\n}`,
  },
  {
    id: "boarding-pass",
    label: "Airline Boarding Pass",
    emoji: "✈️",
    code: `"use client";\n\nimport { Barcode } from "@/components/ui/barcode";\nimport { Plane } from "lucide-react";\n\nexport default function BoardingPassDemo() {\n  return (\n    <div className="flex items-center justify-center p-8">\n      <Barcode\n        value="AC518-YYZ-LAX-04A"\n        variant="boarding-pass"\n        airplaneIcon={<Plane className="w-4 h-4" />}\n        metadata={{\n          from: "YYZ",\n          to: "LAX",\n          fromCity: "TORONTO",\n          toCity: "LOS ANGELES",\n          departure: "11:12 AM",\n          arrival: "4:34 PM",\n          flight: "AC518",\n          gate: "G12",\n          seat: "04A",\n          group: "PRIORITY",\n          status: "ON TIME",\n        }}\n      />\n    </div>\n  );\n}`,
  },
  {
    id: "shipping-label",
    label: "Logistics Cargo Label",
    emoji: "📦",
    code: `"use client";\n\nimport { Barcode } from "@/components/ui/barcode";\nimport { Plane } from "lucide-react";\n\nexport default function ShippingLabelDemo() {\n  return (\n    <div className="flex items-center justify-center p-8">\n      <Barcode\n        value="1Z-999-999-99-9999"\n        variant="shipping-label"\n        accentColor="#f59e0b"\n        airplaneIcon={<Plane className="w-3.5 h-3.5 rotate-45" />}\n        copyable\n        downloadable\n        metadata={{\n          carrier: "GLOBAL AIR CARGO",\n          subtitle: "FREIGHT WAYBILL // EXPEDITE",\n          from: "JFK",\n          fromCity: "NEW YORK, NY",\n          to: "ORD-04",\n          toCity: "CHICAGO O'HARE",\n          weight: "2.45 KG",\n          trackingId: "1Z-999-999-99-9999",\n          badge: "PRIORITY 1 // AIR",\n          service: "NEXT-DAY AIR",\n          pieces: "1 OF 1",\n          status: "SORT CLEARED",\n          securityLabel: "IATA SECURE CARGO",\n          compliance: "CLASS 9 // AUTO-SORT PASS",\n        }}\n      />\n    </div>\n  );\n}`,
  },
  {
    id: "cyber-scan",
    label: "Cyber Laser Scanner",
    emoji: "🎯",
    code: `"use client";\n\nimport { Barcode } from "@/components/ui/barcode";\nimport { Crosshair } from "lucide-react";\n\nexport default function CyberScannerDemo() {\n  return (\n    <div className="flex items-center justify-center p-8">\n      <Barcode\n        value="CYBER-NODE-0x8F"\n        variant="cyber-scan"\n        headerIcon={<Crosshair className="w-3.5 h-3.5 text-emerald-400" />}\n        metadata={{\n          title: "CYBER_ID // 0x8F9",\n          status: "SCANNING",\n          frequency: "915.00 MHz",\n          opticalLock: "TRUE",\n        }}\n      />\n    </div>\n  );\n}`,
  },
  {
    id: "retail-tag",
    label: "Retail Price Hangtag",
    emoji: "🏷️",
    code: `"use client";\n\nimport { Barcode } from "@/components/ui/barcode";\n\nexport default function RetailTagDemo() {\n  return (\n    <div className="flex items-center justify-center p-8">\n      <Barcode\n        value="9780201379624"\n        format="ean13"\n        variant="retail-tag"\n        metadata={{\n          title: "INTENSE STUDIO",\n          subtitle: "OVERSIZED HOODIE // BLK",\n          price: "$185.00",\n        }}\n      />\n    </div>\n  );\n}`,
  },
  {
    id: "code39",
    label: "Code 39 Industrial",
    emoji: "🏭",
    code: `"use client";\n\nimport { Barcode } from "@/components/ui/barcode";\n\nexport default function Code39Demo() {\n  return (\n    <div className="flex items-center justify-center p-8">\n      <Barcode value="PART-8924-X" format="code39" barWidth={2} height={75} copyable downloadable />\n    </div>\n  );\n}`,
  },
  {
    id: "ean13",
    label: "EAN-13 Supermarket POS",
    emoji: "🛒",
    code: `"use client";\n\nimport { Barcode } from "@/components/ui/barcode";\n\nexport default function Ean13Demo() {\n  return (\n    <div className="flex items-center justify-center p-8">\n      <Barcode value="9780201379624" format="ean13" barWidth={2} height={75} copyable downloadable />\n    </div>\n  );\n}`,
  },
];
