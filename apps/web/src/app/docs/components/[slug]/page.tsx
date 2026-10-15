import { notFound } from "next/navigation";
import { componentsConfig } from "@/config/components";
import { componentPreviews } from "@/components/component-previews";
import { CodeBlock } from "@/components/ui/code-block";

export function generateStaticParams() {
  return componentsConfig.map((component) => ({
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

  return (
    <div className="container mx-auto px-4 sm:px-8 py-10 max-w-4xl">
      <div className="flex flex-col space-y-4 mb-8">
        <h1 className="text-4xl font-bold tracking-tight">{component.name}</h1>
        <p className="text-lg text-muted-foreground max-w-[600px]">
          {component.description}
        </p>
      </div>

      {/* Preview Section */}
      <div className="border rounded-xl bg-zinc-50 dark:bg-zinc-900/50 p-10 flex items-center justify-center min-h-[300px] mb-12">
        {componentPreviews[component.name] || <div className="text-muted-foreground">Preview coming soon</div>}
      </div>

      {/* Installation Section */}
      <div className="mt-12 space-y-6">
        <h2 className="text-2xl font-bold tracking-tight border-b pb-4">Installation</h2>
        
        <div className="space-y-4">
          <p className="text-sm text-muted-foreground">Run the following command to install the component and its dependencies into your local project:</p>
          <CodeBlock code={`npx shadcn@latest add dkhandelwal2/intense-ui/${slug}`} language="bash" />
        </div>
      </div>
    </div>
  );
}
