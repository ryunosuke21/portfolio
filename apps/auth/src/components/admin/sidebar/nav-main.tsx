"use client";

import { ChevronRight } from "lucide-react";
import { DynamicIcon, type IconName } from "lucide-react/dynamic";
import { usePathname } from "next/navigation";

import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@portfolio/ui/components/collapsible";
import {
  SidebarGroup,
  SidebarMenu,
  SidebarMenuAction,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSub,
  SidebarMenuSubButton,
  SidebarMenuSubItem,
} from "@portfolio/ui/components/sidebar";

type NavMainItem = {
  title: string;
  url: string;
  icon: IconName;
  isActive?: boolean;
  items?: {
    title: string;
    url: string;
  }[];
};

const items: NavMainItem[] = [
  {
    title: "Overview",
    url: "/dashboard",
    icon: "activity",
    items: [],
  },
  {
    title: "Analytics",
    url: "/analytics",
    icon: "bar-chart",
    items: [],
  },
  {
    title: "Team",
    url: "/team",
    icon: "book-open",
    items: [],
  },
  {
    title: "Settings",
    url: "/settings",
    icon: "settings-2",
    items: [],
  },
  {
    title: "Templates",
    url: "/templates",
    icon: "file-text",
    items: [],
  },
  {
    title: "Workflows",
    url: "/workflows",
    icon: "workflow",
    items: [],
  },
];

export function NavMain() {
  const pathname = usePathname();

  return (
    <SidebarGroup>
      <SidebarMenu>
        {items.map((item) => (
          <Collapsible
            key={item.title}
            asChild
            defaultOpen={pathname.includes(item.url)}
          >
            <SidebarMenuItem>
              <SidebarMenuButton
                asChild
                tooltip={item.title}
                isActive={pathname.includes(item.url)}
              >
                <a href={item.url}>
                  <DynamicIcon name={item.icon} />
                  <span>{item.title}</span>
                </a>
              </SidebarMenuButton>
              {item.items?.length ? (
                <>
                  <CollapsibleTrigger asChild>
                    <SidebarMenuAction className="data-[state=open]:rotate-90">
                      <ChevronRight />
                      <span className="sr-only">Toggle</span>
                    </SidebarMenuAction>
                  </CollapsibleTrigger>
                  <CollapsibleContent>
                    <SidebarMenuSub>
                      {item.items?.map((subItem) => (
                        <SidebarMenuSubItem key={subItem.title}>
                          <SidebarMenuSubButton asChild>
                            <a href={subItem.url}>
                              <span>{subItem.title}</span>
                            </a>
                          </SidebarMenuSubButton>
                        </SidebarMenuSubItem>
                      ))}
                    </SidebarMenuSub>
                  </CollapsibleContent>
                </>
              ) : null}
            </SidebarMenuItem>
          </Collapsible>
        ))}
      </SidebarMenu>
    </SidebarGroup>
  );
}
