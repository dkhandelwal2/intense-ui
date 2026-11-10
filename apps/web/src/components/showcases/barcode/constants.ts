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
    code: `"use client";\n\nimport { Barcode } from "@/components/ui/barcode";\n\nexport default function BoardingPassDemo() {\n  return (\n    <div className="flex items-center justify-center p-8">\n      <Barcode\n        value="AC518-YYZ-LAX-04A"\n        variant="boarding-pass"\n        metadata={{\n          from: "YYZ",\n          to: "LAX",\n          fromCity: "TORONTO",\n          toCity: "LOS ANGELES",\n          flight: "AC518",\n          seat: "04A",\n          gate: "G12",\n        }}\n      />\n    </div>\n  );\n}`,
  },
  {
    id: "shipping-label",
    label: "Logistics Cargo Label",
    emoji: "📦",
    code: `"use client";\n\nimport { Barcode } from "@/components/ui/barcode";\n\nexport default function ShippingLabelDemo() {\n  return (\n    <div className="flex items-center justify-center p-8">\n      <Barcode\n        value="1Z-999-999-99-9999"\n        variant="shipping-label"\n        metadata={{\n          carrier: "EXPRESS LOGISTICS",\n          weight: "2.45 KG",\n          trackingId: "1Z99999999",\n          badge: "PRIORITY 1",\n        }}\n      />\n    </div>\n  );\n}`,
  },
  {
    id: "cyber-scan",
    label: "Cyber Laser Scanner",
    emoji: "🎯",
    code: `"use client";\n\nimport { Barcode } from "@/components/ui/barcode";\n\nexport default function CyberScannerDemo() {\n  return (\n    <div className="flex items-center justify-center p-8">\n      <Barcode\n        value="CYBER-NODE-0x8F"\n        variant="cyber-scan"\n        metadata={{\n          title: "CYBER_ID // 0x8F9",\n        }}\n      />\n    </div>\n  );\n}`,
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
