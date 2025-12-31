"use client";

import { SidebarClose, SidebarOpen, Workflow } from "lucide-react";
import Link from "next/link";

import { Button } from "@portfolio/ui/components/button";
import { Separator } from "@portfolio/ui/components/separator";
import { useSidebar } from "@portfolio/ui/components/sidebar";

import { Notifications } from "@/components/admin/notifications";
import { SearchForm } from "@/components/admin/search-form";
import { UserNav } from "@/components/admin/user-nav";
import { DynamicBreadcrumb } from "@/components/crumbs";

export function SiteHeader() {
  const { toggleSidebar, state } = useSidebar();
  return (
    <header className="sticky top-0 z-50 flex h-(--header-height) items-center justify-between border-b bg-background px-4">
      <div className="flex items-center gap-2">
        <div className="flex items-center gap-2">
          <Button
            variant="ghost"
            size="icon-sm"
            aria-label="Toggle Sidebar"
            onClick={toggleSidebar}
          >
            {state === "expanded" ? <SidebarClose /> : <SidebarOpen />}
          </Button>
          <Separator
            orientation="vertical"
            className="mx-2 h-6! w-px bg-border"
          />
          <Link href="/admin" className="flex items-center gap-2">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-linear-to-br from-purple-600 to-blue-600">
              <Workflow className="h-4 w-4 text-white" />
            </div>
            <span className="font-semibold">Admin</span>
          </Link>
          <Separator
            orientation="vertical"
            className="mx-2 h-6! w-px bg-border"
          />
          <DynamicBreadcrumb />
        </div>
      </div>
      <div className="flex items-center gap-2">
        <SearchForm />
        <Notifications />
        <UserNav />
      </div>
    </header>
  );
}
