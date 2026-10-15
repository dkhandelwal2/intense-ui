import { SidebarWrapper } from "@/components/layout/sidebar-wrapper";
import { TableOfContents } from "@/components/layout/toc";

interface DocsLayoutProps {
  children: React.ReactNode;
}

export default function DocsLayout({ children }: DocsLayoutProps) {
  return (
    <div className="w-full flex-1 items-start md:flex md:gap-6 lg:gap-10 px-4 sm:px-6 md:px-8">
      <SidebarWrapper />
      <main className="relative w-full min-w-0 flex-1">
        <div className="mx-auto w-full min-w-0">
          {children}
        </div>
      </main>
    </div>
  );
}
