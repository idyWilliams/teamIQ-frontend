"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
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


type NavSettingsProp = {
    settings: {
      title: string;
      url: string;
      icon?: LucideIcon | any;
      isActive?: boolean;
      items?: {
        title: string;
        url: string;
      }[]
    }[]
  }

export default function NavSettings({settings}:NavSettingsProp){
    const router = useRouter();
return (
    <>
    <SidebarGroup>
        <SidebarMenu>
          {settings.map((item)=> (
            <Collapsible 
           key={item.title}
           asChild
           defaultOpen={item.isActive}
           className="group/collapsible">
            <SidebarMenu>
              <CollapsibleTrigger asChild>
              <SidebarMenuButton 
              onClick={() => router.push(item.url)}
              tooltip={item.title}>
                {item.icon && <span className={cn(item.icon, "size-5")}></span>}
                <span>{item.title}</span>
                <ChevronRight className="ml-auto transition-transform duration-300 group-data-[state=open]/collapsible:rotate-90"/>
              </SidebarMenuButton>
              </CollapsibleTrigger>
              <CollapsibleContent>
              <SidebarMenuSub>
                {item.items?.map((subItem) => (
                  <SidebarMenuSubItem key={subItem.title}>
                    <SidebarMenuButton asChild>
                    <Link href={subItem.url}><span>{subItem.title}</span></Link>
                    </SidebarMenuButton>
                  </SidebarMenuSubItem>
                ))}
              </SidebarMenuSub>
              </CollapsibleContent>
            </SidebarMenu>
            </Collapsible>
          ))}
        </SidebarMenu>
    </SidebarGroup>
    </>
)
}