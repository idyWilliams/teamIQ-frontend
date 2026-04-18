'use client';

import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { ChevronRight, type LucideIcon } from 'lucide-react';
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from '@/components/ui/collapsible';
import {
  SidebarGroup,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSub,
  SidebarMenuSubButton,
  SidebarMenuSubItem,
} from '@/components/ui/sidebar';
import { cn } from '@/lib/utils';

type NavSettingsProp = {
  settings: {
    title: string;
    url: string;
    icon?: LucideIcon | any;
    isActive?: boolean;
    items?: {
      title: string;
      url: string;
    }[];
  }[];
};

export default function NavSettings({ settings }: NavSettingsProp) {
  const router = useRouter();
  const pathname = usePathname();
  return (
    <>
      <SidebarGroup className="pt-1 pb-3">
        <SidebarMenu>
          {settings.map(item => {
            const isActive = pathname === item.url;
            const Icon = item.icon;

            return (
              <Collapsible
                key={item.title}
                asChild
                defaultOpen={item.isActive}
                className="group/collapsible"
              >
                <SidebarMenu className={cn()}>
                  <CollapsibleTrigger asChild>
                    <SidebarMenuButton
                      onClick={() => router.push(item.url)}
                      tooltip={item.title}
                      className={cn(
                        'relative flex cursor-pointer items-center gap-3 rounded-md px-5 py-2.5 text-[14px] transition-all duration-200',
                        'group-data-[collapsible=icon]:justify-center group-data-[collapsible=icon]:px-2',
                        isActive
                          ? 'bg-blue-50 font-medium !text-blue-600'
                          : 'text-gray-700 hover:bg-gray-100 hover:text-gray-900'
                      )}
                    >
                      {Icon && <Icon size="20" />}
                      <span className="group-data-[collapsible=icon]:hidden">
                        {item.title}
                      </span>
                      <ChevronRight className="ml-auto transition-transform duration-300 group-data-[state=open]/collapsible:rotate-90 group-data-[collapsible=icon]:hidden" />
                    </SidebarMenuButton>
                  </CollapsibleTrigger>
                  <CollapsibleContent className="group-data-[collapsible=icon]:hidden">
                    <SidebarMenuSub>
                      {item.items?.map(subItem => (
                        <SidebarMenuSubItem key={subItem.title}>
                          <SidebarMenuButton asChild>
                            <Link href={subItem.url}>
                              <span>{subItem.title}</span>
                            </Link>
                          </SidebarMenuButton>
                        </SidebarMenuSubItem>
                      ))}
                    </SidebarMenuSub>
                  </CollapsibleContent>
                </SidebarMenu>
              </Collapsible>
            );
          })}
        </SidebarMenu>
      </SidebarGroup>
    </>
  );
}
