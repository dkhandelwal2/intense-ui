import type {
  TimerPerimeterConfig,
  TimerSplitConfig,
  TimerStopwatchConfig,
  TimerIslandConfig,
  TimerExpandableConfig,
  TimerVariantConfigMap,
} from "@/components/ui/timer";

/**
 * Initial configuration values for the Perimeter (Live Activity Capsule) timer
 */
export const TIMER_PERIMETER_CONFIG: TimerPerimeterConfig = {
  initialSeconds: 900,
  label: "Timer",
  intent: "amber",
  stripeOrigin: "top-center",
  showAlarmTime: true,
  showHours: true,
  showPresets: false,
  presets: [300, 600, 900, 1200],
  allowCustomTime: true,
  autoStart: false,
  dangerThreshold: 10,
  dangerColor: "#ff453a",
  showDangerColor: true,
};

/**
 * Initial configuration values for the Split Radial Dial timer
 */
export const TIMER_SPLIT_CONFIG: TimerSplitConfig = {
  initialSeconds: 1200,
  label: "Timer",
  intent: "cyan",
  presets: [300, 600, 1200],
  allowCustomTime: true,
  showHours: true,
  autoStart: false,
  dangerThreshold: 10,
  dangerColor: "#ff453a",
  showDangerColor: true,
};

/**
 * Initial configuration values for the Centisecond Stopwatch
 */
export const TIMER_STOPWATCH_CONFIG: TimerStopwatchConfig = {
  initialCentiseconds: 0,
  label: "Stopwatch",
  autoStart: false,
  showLaps: true,
  maxLaps: 50,
  showHours: true,
  showCentiseconds: true,
  format: "hh:mm:ss,cs",
  decimalSeparator: ",",
};

/**
 * Initial configuration values for the Compact Dynamic Island timer
 */
export const TIMER_ISLAND_CONFIG: TimerIslandConfig = {
  initialSeconds: 300,
  label: "Timer",
  intent: "amber",
  showHours: false,
  allowCustomTime: true,
  autoStart: false,
  dangerThreshold: 10,
  dangerColor: "#ff453a",
  showDangerColor: true,
};

/**
 * Initial configuration values for the Expandable Island timer
 */
export const TIMER_EXPANDABLE_CONFIG: TimerExpandableConfig = {
  initialSeconds: 792,
  label: "Timer",
  intent: "amber",
  stripeOrigin: "top-center",
  showAlarmTime: true,
  showHours: true,
  showPresets: false,
  presets: [300, 600, 900, 1200],
  allowCustomTime: true,
  defaultExpanded: false,
  autoStart: false,
  dangerThreshold: 10,
  dangerColor: "#ff453a",
  showDangerColor: true,
};

/**
 * Consolidated initial configuration map across all timer variants
 */
export const TIMER_VARIANT_CONFIGS: TimerVariantConfigMap = {
  perimeter: TIMER_PERIMETER_CONFIG,
  split: TIMER_SPLIT_CONFIG,
  stopwatch: TIMER_STOPWATCH_CONFIG,
  island: TIMER_ISLAND_CONFIG,
  expandable: TIMER_EXPANDABLE_CONFIG,
};

export const TIMER_CONFIG = TIMER_VARIANT_CONFIGS;
