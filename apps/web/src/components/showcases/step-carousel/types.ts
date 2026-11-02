export interface StepCarouselCustomProps {
  totalSteps: number;
  duration: number;
  loop: boolean;
  defaultPlaying: boolean;
  size: "sm" | "md" | "lg";
  colorScheme: "default" | "primary";
  showPlayButton: boolean;
  gooey: boolean;
  pauseOnHover: boolean;
}

export const DEFAULT_STEP_CAROUSEL_PROPS: StepCarouselCustomProps = {
  totalSteps: 5,
  duration: 3500,
  loop: false,
  defaultPlaying: false,
  size: "md",
  colorScheme: "default",
  showPlayButton: true,
  gooey: false,
  pauseOnHover: false,
};

export interface StepCarouselPreviewProps {
  customProps: StepCarouselCustomProps;
  activeTocId?: string;
  isCustomizing?: boolean;
}
