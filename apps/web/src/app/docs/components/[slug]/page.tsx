import { notFound } from "next/navigation";
import { componentsConfig } from "@/config/components";
import { ComponentPreview } from "@/components/component-previews";
import { ComponentPageLayout } from "@/components/layout/component-page-layout";
import { getComponentDocData } from "@/config/component-docs";
import { PropsTable } from "@/components/docs";

export function generateStaticParams() {
  return componentsConfig
    .filter((component) => component.enabled)
    .map((component) => ({
      slug: component.href.split("/").pop(),
    }));
}

export default async function DynamicComponentPage(props: { params: Promise<{ slug: string }> | { slug: string } }) {
  const params = await props.params;
  const slug = params.slug;

  const component = componentsConfig.find(
    (c) => c.href === `/docs/components/${slug}`
  );

  if (!component || !component.enabled) {
    notFound();
  }

  const docData = getComponentDocData(slug);
  const propsTable = docData.propGroups ? (
    <PropsTable groups={docData.propGroups} />
  ) : undefined;

  return (
    <ComponentPageLayout
      title={component.name}
      description={docData.description || component.description}
      slug={slug}
      codeContent={docData.codeContent}
      usageCode={docData.usageCode}
      codes={docData.codes}
      tocItems={docData.tocItems}
      dependencies={docData.dependencies}
      propsTable={propsTable}
    >
      <ComponentPreview name={component.name} slug={slug} />
    </ComponentPageLayout>
  );
}
