"use client";

export { Progress } from "./progress-linear";
export { ProgressCircular } from "./progress-circular";
export { ProgressSemicircle } from "./progress-semicircle";
export { ProgressBuffer } from "./progress-buffer";
export { ProgressShimmer } from "./progress-shimmer";
export { ProgressCapsule } from "./progress-capsule";

// Semantic aliases
export { ProgressCircular as CircularProgress } from "./progress-circular";
export { ProgressSemicircle as GaugeProgress } from "./progress-semicircle";
export { ProgressBuffer as LoadingProgress } from "./progress-buffer";
export { ProgressShimmer as ShimmerProgress } from "./progress-shimmer";
export { ProgressCapsule as InsideProgress } from "./progress-capsule";

export * from "./types";
export * from "./constants";
