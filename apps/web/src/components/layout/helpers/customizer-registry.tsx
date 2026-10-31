/**
 * @deprecated Moved to `@/components/showcases/registry`.
 * Re-exported here for backwards compatibility only — do not add new exports here.
 */
export {
  getShowcaseDefinition,
  SHOWCASE_REGISTRY,
  createGenericShowcaseDefinition,
  accordionShowcaseDefinition,
  navbarShowcaseDefinition,
  breadcrumbShowcaseDefinition,
  NAVBAR_DEFAULT_CUSTOM_PROPS,
  ACCORDION_DEFAULT_CUSTOM_PROPS,
  BREADCRUMB_DEFAULT_CUSTOM_PROPS,
  DEFAULT_GENERIC_PROPS,
} from "@/components/showcases/registry";

export type {
  ShowcaseDefinition,
  ShowcasePreviewParams,
  ShowcasePlaygroundParams,
  CustomNavbarProps,
  AccordionCustomProps,
  BreadcrumbCustomProps,
  GenericCustomProps,
} from "@/components/showcases/registry";
