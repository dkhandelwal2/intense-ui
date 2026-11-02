export interface SliderCustomProps {
  value: number;
  min: number;
  max: number;
  disabled: boolean;
  showValueBadge: boolean;
}

export const DEFAULT_SLIDER_PROPS: SliderCustomProps = {
  value: 50,
  min: 0,
  max: 100,
  disabled: false,
  showValueBadge: true,
};
