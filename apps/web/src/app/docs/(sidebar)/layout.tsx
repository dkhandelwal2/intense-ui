import { SidebarWrapper } from "@/components/layout/sidebar-wrapper";

interface DocsSidebarLayoutProps {
  children: React.ReactNode;
}

export default function DocsSidebarLayout({ children }: DocsSidebarLayoutProps) {
  return (
    <div className="w-full flex-1 items-start md:flex md:gap-4 lg:gap-6 px-0 sm:px-2 md:px-4 lg:px-6">
      <SidebarWrapper />
      <main className="relative w-full min-w-0 flex-1">
        <div className="mx-auto w-full min-w-0">
          {children}
        </div>
      </main>
    </div>
  );
}
