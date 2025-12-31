import type * as React from "react";
import { DynamicIcon, type IconName } from "lucide-react/dynamic";

import {
  SidebarGroup,
  SidebarGroupContent,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@portfolio/ui/components/sidebar";

type NavFooterItem = {
  title: string;
  url: string;
  icon: IconName;
};

const items: NavFooterItem[] = [
  {
    title: "Support",
    url: "/support",
    icon: "life-buoy",
  },
  {
    title: "Feedback",
    url: "#",
    icon: "send",
  },
];

export function NavFooter({
  ...props
}: React.ComponentPropsWithoutRef<typeof SidebarGroup>) {
  return (
    <SidebarGroup {...props}>
      <SidebarGroupContent>
        <SidebarMenu>
          {items.map((item) => (
            <SidebarMenuItem key={item.title}>
              <SidebarMenuButton asChild size="sm">
                <a href={item.url}>
                  <DynamicIcon name={item.icon} />
                  <span>{item.title}</span>
                </a>
              </SidebarMenuButton>
            </SidebarMenuItem>
          ))}
        </SidebarMenu>
      </SidebarGroupContent>
    </SidebarGroup>
  );
}
