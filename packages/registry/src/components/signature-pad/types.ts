import React from "react";

export interface SignaturePoint {
  x: number;
  y: number;
  time?: number;
  pressure?: number;
}

export interface SignatureStroke {
  points: SignaturePoint[];
  color: string;
  width: number;
}

export interface SignaturePadRef {
  clear: () => void;
  undo: () => void;
  isEmpty: () => boolean;
  toDataURL: (type?: string, quality?: number) => string | null;
  toSVG: () => string;
  getStrokes: () => SignatureStroke[];
}

export interface SignatureResult {
  dataUrl: string;
  svg: string;
  strokes: SignatureStroke[];
  isEmpty: boolean;
}

export interface SignaturePadProps {
  onSign?: (result: SignatureResult) => void;
  onClear?: () => void;
  onClose?: () => void;
  onExpandChange?: (isExpanded: boolean) => void;
  strokeColor?: string;
  strokeWidth?: number;
  width?: number;
  height?: number;
  buttonLabel?: string;
  finishLabel?: string;
  title?: string;
  initialExpanded?: boolean;
  disabled?: boolean;
  showClear?: boolean;
  showClose?: boolean;
  className?: string;
}

export interface SignaturePadCanvasProps {
  canvasRef: React.RefObject<HTMLCanvasElement | null>;
  strokes: SignatureStroke[];
  setStrokes: React.Dispatch<React.SetStateAction<SignatureStroke[]>>;
  strokeColor: string;
  strokeWidth: number;
  width: number;
  height: number;
  disabled?: boolean;
  onStrokeEnd?: () => void;
  className?: string;
}

export interface SignaturePadHeaderProps {
  title?: string;
  onClear: () => void;
  onClose: () => void;
  canClear?: boolean;
  showClear?: boolean;
  showClose?: boolean;
}

export interface SignaturePadButtonProps {
  isSigned?: boolean;
  buttonLabel?: string;
  signedLabel?: string;
  onClick: () => void;
  onEdit?: () => void;
  disabled?: boolean;
  className?: string;
}
