import { BarcodeFormat, EncodedBarcode } from "../types";
import { encodeCode128 } from "./code128";
import { encodeCode39 } from "./code39";
import { encodeEan13 } from "./ean13";
import { encodeQrCode } from "./qr";
import { encodeDataMatrix } from "./data-matrix";

export * from "./code128";
export * from "./code39";
export * from "./ean13";
export * from "./qr";
export * from "./data-matrix";

export function encodeBarcode(format: BarcodeFormat = "code128", value: string): EncodedBarcode {
  switch (format) {
    case "qr":
      return encodeQrCode(value);
    case "data-matrix":
      return encodeDataMatrix(value);
    case "code39":
      return encodeCode39(value);
    case "ean13":
    case "upca":
      return encodeEan13(value);
    case "code128":
    default:
      return encodeCode128(value);
  }
}

export function binaryToSvgPath(binary: string, barWidth: number, height: number): string {
  let path = "";
  let inBar = false;
  let start = 0;
  for (let i = 0; i < binary.length; i++) {
    if (binary[i] === "1") {
      if (!inBar) { inBar = true; start = i * barWidth; }
    } else if (inBar) {
      inBar = false;
      const w = i * barWidth - start;
      path += `M${start},0h${w}v${height}h-${w}Z `;
    }
  }
  if (inBar) {
    const w = binary.length * barWidth - start;
    path += `M${start},0h${w}v${height}h-${w}Z `;
  }
  return path;
}
