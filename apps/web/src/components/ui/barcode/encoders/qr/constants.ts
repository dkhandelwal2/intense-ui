export interface QrVersionConfig {
  version: number;
  size: number;
  totalWords: number;
  ecWords: number;
  dataWords: number;
  blocks: number;
  align: number[];
}

// Medium (M) error correction configs for versions 1 to 10
export const QR_VERSIONS: QrVersionConfig[] = [
  { version: 1, size: 21, totalWords: 26, ecWords: 10, dataWords: 16, blocks: 1, align: [] },
  { version: 2, size: 25, totalWords: 44, ecWords: 16, dataWords: 28, blocks: 1, align: [6, 18] },
  { version: 3, size: 29, totalWords: 70, ecWords: 26, dataWords: 44, blocks: 1, align: [6, 22] },
  { version: 4, size: 33, totalWords: 100, ecWords: 18, dataWords: 32, blocks: 2, align: [6, 26] },
  { version: 5, size: 37, totalWords: 134, ecWords: 24, dataWords: 43, blocks: 2, align: [6, 30] },
  { version: 6, size: 41, totalWords: 172, ecWords: 16, dataWords: 27, blocks: 4, align: [6, 34] },
  { version: 7, size: 45, totalWords: 196, ecWords: 18, dataWords: 31, blocks: 4, align: [6, 22, 38] },
  { version: 8, size: 49, totalWords: 242, ecWords: 22, dataWords: 38, blocks: 4, align: [6, 24, 42] },
  { version: 9, size: 53, totalWords: 292, ecWords: 22, dataWords: 36, blocks: 5, align: [6, 26, 46] },
  { version: 10, size: 57, totalWords: 346, ecWords: 26, dataWords: 43, blocks: 5, align: [6, 28, 50] },
];

export function selectQrVersion(byteLength: number): QrVersionConfig {
  for (const v of QR_VERSIONS) {
    // 4 bits mode + 8 bits count = 1.5 bytes overhead
    if (byteLength + 3 <= v.dataWords * v.blocks) {
      return v;
    }
  }
  return QR_VERSIONS[QR_VERSIONS.length - 1];
}

// Medium EC + Mask 0 (00000) BCH(15,5) with mask 0x5412
export const QR_FORMAT_BITS = [1, 0, 1, 0, 1, 0, 0, 0, 0, 0, 1, 0, 0, 1, 0];
