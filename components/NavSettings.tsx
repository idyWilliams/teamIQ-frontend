'use client';

import Link from 'next/link';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { ChevronRight, type LucideIcon } from 'lucide-react';
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from '@/components/ui/collapsible';
import {
  SidebarGroup,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuSub,
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
      key: string;
    }[];
  }[];
};

export default function NavSettings({ settings }: NavSettingsProp) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const activeTab = searchParams.get('tab') || 'profile';
  return (
    <>
      <SidebarGroup>
        <SidebarMenu>
          {settings.map(item => (
            <Collapsible
              key={item.title}
              asChild
              defaultOpen={item.isActive}
              className="group/collapsible"
            >
              <SidebarMenu>
                <CollapsibleTrigger asChild>
                  <SidebarMenuButton
                    onClick={() => router.push(item.url)}
                    tooltip={item.title}
                  >
                    {item.icon && (
                      <span className={cn(item.icon, 'size-5')}></span>
                    )}
                    <span>{item.title}</span>
                    <ChevronRight className="ml-auto transition-transform duration-300 group-data-[state=open]/collapsible:rotate-90" />
                  </SidebarMenuButton>
                </CollapsibleTrigger>
                <CollapsibleContent>
                  <SidebarMenuSub>
                    {item.items?.map(subItem => {
                      const isActive = activeTab === subItem.key;
                      return (
                        <SidebarMenuSubItem key={subItem.title}>
                          <SidebarMenuButton asChild>
                            <Link
                              href={`${pathname}?tab=${subItem.key}`}
                              className={cn(
                                'pl-8 transition-colors duration-200',
                                isActive ? 'font-semibold text-[#086ACE]' : ''
                              )}
                            >
                              <span>{subItem.title}</span>
                            </Link>
                          </SidebarMenuButton>
                        </SidebarMenuSubItem>
                      );
                    })}
                  </SidebarMenuSub>
                </CollapsibleContent>
              </SidebarMenu>
            </Collapsible>
          ))}
        </SidebarMenu>
      </SidebarGroup>
    </>
  );
}
