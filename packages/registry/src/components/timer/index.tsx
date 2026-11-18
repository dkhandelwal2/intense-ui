"use client";

export { Timer } from "./timer";
export { TimerPerimeter } from "./timer-perimeter";
export { TimerSplit } from "./timer-split";
export { TimerStopwatch } from "./timer-stopwatch";
export { TimerIsland } from "./timer-island";
export { TimerExpandable } from "./timer-expandable";
export { TimerConfirmationButton } from "./timer-confirmation-button";
export { TimerDurationPicker } from "./timer-duration-picker";
export { TimerProgressRing } from "@/assets/svg";
export { TimerIslandEditor } from "./timer-island-editor";
export { TimerPerimeterContour } from "@/assets/svg";
export { TimerSplitRing } from "@/assets/svg";
export { TimerPresetChips } from "./timer-preset-chips";
export { TimerCardCenter } from "./timer-card-center";
export { TimerPerimeterCard } from "./timer-perimeter-card";
export { TimerSplitDial } from "./timer-split-dial";
export { TimerSplitInfo } from "./timer-split-info";
export { TimerLapCarousel } from "./timer-lap-carousel";
export { TimerExpandablePill } from "./timer-expandable-pill";

// Semantic Aliases
export { TimerStopwatch as Stopwatch } from "./timer-stopwatch";
export { TimerPerimeter as PerimeterTimer } from "./timer-perimeter";
export { TimerSplit as SplitTimer } from "./timer-split";
export { TimerIsland as DynamicIslandTimer } from "./timer-island";
export { TimerExpandable as ExpandableIslandTimer } from "./timer-expandable";

// Configuration (from global @/config)
export * from "@/config/timer";

// Hooks (from global @/hooks)
export { useTimer, type UseTimerOptions } from "@/hooks/use-timer";
export { useStopwatch, type UseStopwatchOptions } from "@/hooks/use-stopwatch";
export { useDurationPickerState, type UseDurationPickerStateOptions } from "@/hooks/use-duration-picker-state";

export * from "./types";
export * from "./constants";
