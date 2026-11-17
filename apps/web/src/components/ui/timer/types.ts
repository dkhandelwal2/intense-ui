import React from "react";

export type TimerVariant = "perimeter" | "split" | "stopwatch" | "island" | "expandable";
export type TimerIntent = "primary" | "amber" | "cyan" | "emerald" | "rose" | "purple";
export type TimerStatus = "idle" | "running" | "paused" | "completed";
export type TimerStripeOrigin = "top-left" | "top-right" | "top-center" | "bottom-left" | "bottom-center" | "bottom-right" | "custom";

export interface TimerLap {
  id: string; lapNumber: number; lapTime: number; overallTime: number;
}

export interface TimerBaseProps extends Omit<React.HTMLAttributes<HTMLDivElement>, "onPause" | "onDurationChange" | "onAnimationStart" | "onDrag" | "onDragStart" | "onDragEnd"> {
  variant?: TimerVariant; intent?: TimerIntent; accentColor?: string; stripeColor?: string;
  stripeOrigin?: TimerStripeOrigin; customStripePath?: string; customPath?: string;
  ringColor?: string; ringTrackColor?: string; ringGlowColor?: string;
  trackColor?: string; glowColor?: string; dangerColor?: string;
  showDangerColor?: boolean; dangerThreshold?: number; showHours?: boolean;
  label?: string; autoStart?: boolean; className?: string;
}

export interface TimerCountdownProps extends TimerBaseProps {
  initialSeconds?: number; allowCustomTime?: boolean;
  onComplete?: () => void; onTick?: (remainingSeconds: number) => void;
  onDurationChange?: (seconds: number) => void;
  onPause?: () => void; onResume?: () => void; onReset?: () => void;
}

export interface TimerPerimeterProps extends TimerCountdownProps {
  alarmTime?: string; showAlarmTime?: boolean; showPresets?: boolean; presets?: number[];
}

export interface TimerSplitProps extends TimerCountdownProps {
  presets?: number[]; presetLabels?: string[]; onPresetChange?: (seconds: number) => void;
}

export interface TimerStopwatchProps extends TimerBaseProps {
  initialCentiseconds?: number; showLaps?: boolean; maxLaps?: number; showCentiseconds?: boolean;
  format?: "hh:mm:ss" | "hh:mm:ss,cs" | "mm:ss,cs" | "mm:ss"; decimalSeparator?: "," | ".";
  onLap?: (lap: TimerLap) => void; onStart?: () => void; onPause?: () => void; onReset?: () => void;
}

export interface TimerIslandProps extends TimerCountdownProps {}

export interface TimerExpandableProps extends TimerPerimeterProps {
  defaultExpanded?: boolean; isExpanded?: boolean; onExpandedChange?: (expanded: boolean) => void;
}

export interface TimerProps extends TimerPerimeterProps, Omit<TimerSplitProps, "ringColor" | "ringTrackColor" | "ringGlowColor">, Omit<TimerStopwatchProps, "initialCentiseconds"> {
  initialCentiseconds?: number; defaultExpanded?: boolean; isExpanded?: boolean; onExpandedChange?: (expanded: boolean) => void;
}

export interface TimerConfirmationButtonProps {
  onConfirm: () => void; label?: string; confirmLabel?: string; cancelLabel?: string; className?: string;
}

export interface TimerDurationPickerProps {
  totalSeconds: number; onApply: (seconds: number) => void; onCancel: () => void;
  showHours?: boolean; className?: string; autoFocus?: boolean;
}

export interface TimerIslandEditorProps {
  initialSeconds: number; onApply: (seconds: number) => void; onCancel: () => void;
}

export interface TimerProgressRingProps {
  progress: number; size?: number; strokeWidth?: number;
  trackColor?: string; progressColor?: string; glowColor?: string; pulseColor?: string;
  isCompleted?: boolean; isRunning?: boolean; showPulse?: boolean; className?: string;
}

export interface TimerPresetChipsProps {
  presets: number[]; selectedDuration: number; isEditing?: boolean;
  chipActiveClass?: string; onSelect: (seconds: number) => void; className?: string;
}

export interface TimerLapCarouselProps {
  laps: TimerLap[]; maxLaps?: number; scrollRef?: React.RefObject<HTMLDivElement | null>;
  decimalSeparator?: "," | "."; shouldShowHours?: boolean; shouldShowCentis?: boolean; className?: string;
}

export interface TimerPerimeterContourProps {
  path: string; strokeDash: string; strokeColor: string; pathTotal?: number;
  trackColor?: string; glowColor?: string; isCompleted?: boolean; remainingProgress: number;
}

export interface TimerExpandablePillProps {
  progress: number; progressColor: string; formattedTime: string; onToggle: (e?: React.MouseEvent) => void;
  trackColor?: string; glowColor?: string; isCompleted?: boolean; isRunning?: boolean; showHours?: boolean;
}

export interface TimerSplitDialProps {
  remainingProgress: number; effectiveRingColor: string;
  onToggle: (e?: React.MouseEvent) => void; onReset: (e?: React.MouseEvent) => void;
  effectiveGlowColor?: string; activeTrackColor?: string; isCompleted?: boolean;
  isDanger?: boolean; isRunning?: boolean; className?: string;
}

export interface TimerSplitInfoProps {
  formattedTime: string; onStartEditing: () => void; onReset: () => void; onStop: () => void;
  label?: string; showHours?: boolean; isCompleted?: boolean; isDanger?: boolean;
  isRunning?: boolean; allowCustomTime?: boolean; hasStarted?: boolean; isEditing?: boolean;
}

export interface TimerCardCenterProps {
  formattedTime: string; label?: string; targetAlarm?: string; showAlarmTime?: boolean;
  isCompleted?: boolean; isDanger?: boolean; isRunning?: boolean; allowCustomTime?: boolean;
  isEditing?: boolean; onStartEdit?: () => void; onMinimize?: () => void; className?: string;
}

export interface TimerPerimeterCardProps extends Omit<TimerPerimeterContourProps, "path" | "strokeColor" | "glowColor"> {
  formattedTime: string; perimeterPath: string; effectiveColor: string; selectedDuration: number;
  onToggle: (e?: React.MouseEvent) => void; onReset: (e?: React.MouseEvent) => void;
  onApplyDuration: (seconds: number) => void; className?: string;
  label?: string; targetAlarm?: string; showAlarmTime?: boolean; effectiveGlow?: string;
  isDanger?: boolean; isRunning?: boolean; canReset?: boolean; allowCustomTime?: boolean;
  showHours?: boolean; onMinimize?: () => void;
}

export interface TimerCountdownConfig {
  initialSeconds: number; label: string; intent: TimerIntent;
  allowCustomTime: boolean; autoStart: boolean;
  dangerThreshold: number; dangerColor: string; showDangerColor: boolean;
}

export interface TimerPerimeterConfig extends TimerCountdownConfig {
  stripeOrigin: TimerStripeOrigin; showAlarmTime: boolean; showHours: boolean; showPresets: boolean; presets: number[];
}

export interface TimerSplitConfig extends TimerCountdownConfig {
  presets: number[]; showHours: boolean;
}

export interface TimerStopwatchConfig {
  initialCentiseconds: number; label: string; autoStart: boolean; showLaps: boolean; maxLaps: number;
  showHours: boolean; showCentiseconds: boolean; format: "hh:mm:ss" | "hh:mm:ss,cs" | "mm:ss,cs" | "mm:ss";
  decimalSeparator: "," | ".";
}

export interface TimerIslandConfig extends TimerCountdownConfig {
  showHours: boolean;
}

export interface TimerExpandableConfig extends TimerPerimeterConfig {
  defaultExpanded: boolean;
}

export interface TimerVariantConfigMap {
  perimeter: TimerPerimeterConfig; split: TimerSplitConfig; stopwatch: TimerStopwatchConfig;
  island: TimerIslandConfig; expandable: TimerExpandableConfig;
}
