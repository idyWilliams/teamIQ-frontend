"use client";

import { usePathname } from "next/navigation";
import Link from "next/link";
import {
  SidebarGroup,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import { cn } from "@/lib/utils";

type NavProjectsProps = {
  projects: {
    name: string;
    url: string;
    icon: any;
  }[];
};

export function NavProjects({ projects }: NavProjectsProps) {
  const pathname = usePathname();

  return (
    <SidebarGroup className="group-data-[collapsible=icon]:hidden py-3">
      {/* Pages Label */}
      <h3 className="text-gray-400 text-[13px] font-medium px-6 mb-2">Pages</h3>

      <SidebarMenu className="space-y-[2px]">
        {projects.map((item) => {
          // ✅ Active when current path starts with item.url
          const isActive = pathname.startsWith(item.url);

          return (
            <SidebarMenuItem key={item.name}>
              <SidebarMenuButton
                asChild
                className={cn(
                  "flex items-center gap-3 px-5 py-2.5 text-[14px] rounded-md relative transition-all duration-200",
                  isActive
                    ? "bg-blue-50 text-blue-600 font-medium"
                    : "text-gray-700 hover:bg-gray-100 hover:text-gray-900"
                )}
              >
                {/* ✅ Navigates directly to /organization/projects */}
                <Link href={item.url} className="flex items-center w-full">
                  {/* Blue Active Left Border */}
                  {isActive && (
                    <span className="absolute left-0 top-0 h-full w-[3px] bg-blue-600 rounded-r-md" />
                  )}

                  {/* Icon */}
                  <span className={cn(item.icon, "size-[18px]")} />

                  {/* Label */}
                  <span>{item.name}</span>
                </Link>
              </SidebarMenuButton>
            </SidebarMenuItem>
          );
        })}
      </SidebarMenu>
    </SidebarGroup>
  );
}
