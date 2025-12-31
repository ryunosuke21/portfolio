import {
  SidebarInset,
  SidebarProvider,
} from "@portfolio/ui/components/sidebar";

import { AppSidebar } from "@/components/admin/sidebar";
import { SiteHeader } from "@/components/admin/sidebar/site-header";

export const iframeHeight = "800px";

export const description = "A sidebar with a header and a search form.";

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="[--header-height:calc(--spacing(14))]">
      <SidebarProvider className="flex flex-col">
        <SiteHeader />
        <div className="flex flex-1">
          <AppSidebar />
          <SidebarInset className="p-4">{children}</SidebarInset>
        </div>
      </SidebarProvider>
    </div>
  );
}
