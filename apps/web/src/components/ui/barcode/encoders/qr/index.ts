import { EncodedBarcode } from "../../types";
import { selectQrVersion } from "./constants";
import { rsEncode } from "./gf256";
import { createQrMatrix } from "./matrix";

export function encodeQrCode(text: string): EncodedBarcode {
  if (!text || text.length === 0) {
    return { text: "", binary: "", valid: false, error: "Empty value for QR code", is2D: true };
  }

  try {
    const encoder = new TextEncoder();
    const bytes = encoder.encode(text);
    const cfg = selectQrVersion(bytes.length);
    const totalDataBytes = cfg.dataWords * cfg.blocks;

    let bits = "0100";
    bits += bytes.length.toString(2).padStart(8, "0");
    for (const b of bytes) {
      bits += b.toString(2).padStart(8, "0");
    }

    const maxBits = totalDataBytes * 8;
    bits += "0000".slice(0, Math.min(4, maxBits - bits.length));
    while (bits.length % 8 !== 0) bits += "0";

    const pad = ["11101100", "00010001"];
    let padIdx = 0;
    while (bits.length < maxBits) {
      bits += pad[padIdx % 2];
      padIdx++;
    }

    const dataBytes: number[] = [];
    for (let i = 0; i < bits.length; i += 8) {
      dataBytes.push(parseInt(bits.slice(i, i + 8), 2));
    }

    const blocksData: number[][] = [];
    const blocksEc: number[][] = [];
    for (let b = 0; b < cfg.blocks; b++) {
      const chunk = dataBytes.slice(b * cfg.dataWords, (b + 1) * cfg.dataWords);
      blocksData.push(chunk);
      blocksEc.push(rsEncode(chunk, cfg.ecWords));
    }

    const finalStream: number[] = [];
    for (let i = 0; i < cfg.dataWords; i++) {
      for (let b = 0; b < cfg.blocks; b++) {
        if (i < blocksData[b].length) finalStream.push(blocksData[b][i]);
      }
    }
    for (let i = 0; i < cfg.ecWords; i++) {
      for (let b = 0; b < cfg.blocks; b++) {
        finalStream.push(blocksEc[b][i]);
      }
    }

    const matrix = createQrMatrix(cfg, finalStream);

    return {
      text,
      binary: "",
      matrix,
      is2D: true,
      valid: true,
    };
  } catch (err: any) {
    return {
      text,
      binary: "",
      valid: false,
      is2D: true,
      error: err?.message || "Failed to encode QR code",
    };
  }
}
