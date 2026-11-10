import { ConfettiVariant } from "@/components/ui/confetti";

export interface ConfettiCustomProps {
  variant: ConfettiVariant;
  particleCount: number;
  spread: number;
  scalar: number;
}

export const DEFAULT_CONFETTI_PROPS: ConfettiCustomProps = {
  variant: "basic",
  particleCount: 80,
  spread: 80,
  scalar: 1,
};
