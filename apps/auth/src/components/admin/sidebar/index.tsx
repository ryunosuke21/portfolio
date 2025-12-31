"use client";

import type React from "react";
import {
  BookOpen,
  Bot,
  Frame,
  LifeBuoy,
  // biome-ignore lint/suspicious/noShadowRestrictedNames: we need to shadow the global Map property
  Map,
  PieChart,
  Send,
  Settings2,
  SquareTerminal,
} from "lucide-react";
import type { IconName } from "lucide-react/dynamic";

import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
} from "@portfolio/ui/components/sidebar";

import { NavMain } from "@/components/admin/sidebar/nav-main";
import { NavFooter } from "@/components/admin/sidebar/nav-secondary";

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  return (
    <Sidebar
      className="top-(--header-height) h-[calc(100svh-var(--header-height))]!"
      {...props}
    >
      <SidebarContent>
        <NavMain />
      </SidebarContent>
      <SidebarFooter>
        <NavFooter />
      </SidebarFooter>
    </Sidebar>
  );
}
