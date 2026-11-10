import { BarcodeDotStyle, BarcodeFormat, BarcodeVariant } from "@/components/ui/barcode";

export interface BarcodeCustomProps {
  value: string;
  format: BarcodeFormat;
  variant: BarcodeVariant;
  barWidth: number;
  height: number;
  size?: number;
  dotStyle?: BarcodeDotStyle;
  showText: boolean;
  copyable: boolean;
  downloadable: boolean;
}

export const DEFAULT_BARCODE_PROPS: BarcodeCustomProps = {
  value: "INTENSE-2026",
  format: "code128",
  variant: "classic",
  barWidth: 2,
  height: 80,
  dotStyle: "square",
  showText: true,
  copyable: true,
  downloadable: true,
};
