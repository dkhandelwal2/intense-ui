import { TimerVariant, TimerIntent, TimerStripeOrigin } from "@/components/ui/timer";

export interface TimerCustomProps {
  variant: TimerVariant;
  intent: TimerIntent;
  initialSeconds: number;
  initialCentiseconds: number;
  showAlarmTime: boolean;
  showLaps: boolean;
  showPresets?: boolean;
  allowCustomTime?: boolean;
  stripeOrigin?: TimerStripeOrigin;
  accentColor?: string;
  stripeColor?: string;
  ringColor?: string;
  trackColor?: string;
  dangerColor?: string;
  showDangerColor?: boolean;
  autoStart?: boolean;
}

export const DEFAULT_TIMER_PROPS: TimerCustomProps = {
  variant: "perimeter",
  intent: "amber",
  initialSeconds: 900, // 15:00
  initialCentiseconds: 90000,
  showAlarmTime: true,
  showLaps: true,
  showPresets: false,
  allowCustomTime: true,
  stripeOrigin: "top-center",
  accentColor: undefined,
  stripeColor: undefined,
  ringColor: undefined,
  trackColor: undefined,
  autoStart: false,
};
