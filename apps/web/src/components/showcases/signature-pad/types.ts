export interface SignaturePadCustomProps {
  strokeColor: string;
  strokeWidth: number;
  width: number;
  height: number;
  buttonLabel: string;
  finishLabel: string;
  title: string;
  showClear: boolean;
  showClose: boolean;
  disabled: boolean;
}

export const DEFAULT_SIGNATURE_PAD_PROPS: SignaturePadCustomProps = {
  strokeColor: "var(--theme-primary)",
  strokeWidth: 2.5,
  width: 320,
  height: 380,
  buttonLabel: "Start Signing",
  finishLabel: "Finish Signing",
  title: "Sign",
  showClear: true,
  showClose: true,
  disabled: false,
};
