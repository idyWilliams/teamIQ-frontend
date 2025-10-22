'use client';

import { usePathname } from 'next/navigation';
import Link from 'next/link';
import {
  SidebarGroup,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from '@/components/ui/sidebar';
import { cn } from '@/lib/utils';

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
    <SidebarGroup className="py-3 group-data-[collapsible=icon]:hidden">
      {/* Pages Label */}
      <h3 className="mb-2 px-6 text-[13px] font-medium text-gray-400">Pages</h3>

      <SidebarMenu className="space-y-[2px]">
        {projects.map(item => {
          // ✅ Active when current path starts with item.url
          const isActive = pathname === item.url;

          return (
            <SidebarMenuItem key={item.name}>
              <SidebarMenuButton
                asChild
                className={cn(
                  'relative flex items-center gap-3 rounded-md px-5 py-2.5 text-[14px] transition-all duration-200',
                  isActive
                    ? 'bg-blue-50 font-medium text-blue-600'
                    : 'text-gray-700 hover:bg-gray-100 hover:text-gray-900'
                )}
              >
                {/* ✅ Navigates directly to /organization/projects */}
                <Link href={item.url} className="flex w-full items-center">
                  {/* Blue Active Left Border */}
                  {isActive && (
                    <span className="absolute top-0 left-0 h-full w-[3px] rounded-r-md bg-blue-600" />
                  )}

                  {/* Icon */}
                  <span className={cn(item.icon, 'size-[18px]')} />

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
