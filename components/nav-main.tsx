"use client";

import { ChevronRight, type LucideIcon } from "lucide-react";

import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import {
  SidebarGroup,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSub,
  SidebarMenuSubButton,
  SidebarMenuSubItem,
} from "@/components/ui/sidebar";
import { cn } from "@/lib/utils";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";

export function NavMain({
  items,
}: {
  items: {
    title: string;
    url: string;
    icon?: LucideIcon | any;
    isActive?: boolean;
    items?: {
      title: string;
      url: string;
      value?: string;
      isActive?: boolean;
      onClick?: () => void;
    }[];
  }[];
}) {
  const router = useRouter();
  const searchParams = useSearchParams();

  return (
    <SidebarGroup className="">
      <SidebarGroupLabel>Pages</SidebarGroupLabel>
      <SidebarMenu>
        {items.map((item) => (
          <Collapsible
            key={item.title}
            asChild
            defaultOpen={item.isActive}
            className="group/collapsible"
          >
            <SidebarMenuItem>
              <CollapsibleTrigger asChild>
                <SidebarMenuButton
                  onClick={() => router.push(item.url)}
                  tooltip={item.title}
                >
                  {item.icon && (
                    <span className={cn(item.icon, "size-5")}></span>
                  )}
                  <span>{item.title}</span>
                  <ChevronRight className="ml-auto transition-transform duration-200 group-data-[state=open]/collapsible:rotate-90" />
                </SidebarMenuButton>
              </CollapsibleTrigger>
              <CollapsibleContent>
                <SidebarMenuSub>
                  {item.items?.map((subItem) => {
                    // Create the URL with tab parameter
                    const urlWithTab = subItem.value 
                      ? `${item.url}?tab=${subItem.value}`
                      : subItem.url;
                    
                    return (
                      <SidebarMenuSubItem key={subItem.title}>
                        <SidebarMenuSubButton 
                          asChild
                          isActive={subItem.isActive}
                        >
                          {subItem.onClick ? (
                            <button
                              onClick={subItem.onClick}
                              className={cn(
                                "w-full text-left",
                                subItem.isActive && "bg-accent text-accent-foreground"
                              )}
                            >
                              <span>{subItem.title}</span>
                            </button>
                          ) : (
                            <Link href={urlWithTab}>
                              <span>{subItem.title}</span>
                            </Link>
                          )}
                        </SidebarMenuSubButton>
                      </SidebarMenuSubItem>
                    );
                  })}
                </SidebarMenuSub>
              </CollapsibleContent>
            </SidebarMenuItem>
          </Collapsible>
        ))}
      </SidebarMenu>
    </SidebarGroup>
  );
}