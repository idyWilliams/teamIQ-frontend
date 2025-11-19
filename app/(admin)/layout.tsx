'use client';
import { AppSidebar } from '@/components/app-sidebar';
import { SidebarInset, SidebarProvider } from '@/components/ui/sidebar';
import Image from 'next/image';
import { Label } from '@/components/ui/label';
import { Search } from 'lucide-react';
import { SidebarInput, SidebarTrigger } from '@/components/ui/sidebar';
import { Separator } from '@/components/ui/separator';
import { useAuthStore } from '@/store/useAuthStore';

export default function OrganizationDashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { user } = useAuthStore();

  return (
    <SidebarProvider>
      <AppSidebar />
      <SidebarInset className="flex h-screen flex-row overflow-hidden">
        <div className="flex min-h-0 grow flex-col overflow-hidden">
          <header className="h-16 shrink-0 items-center gap-2 transition-[width,height] ease-linear group-has-data-[collapsible=icon]/sidebar-wrapper:h-12">
            <div className="flex items-center gap-2 px-4">
              <SidebarTrigger className="-ml-1" />
              <Separator
                orientation="vertical"
                className="mr-2 data-[orientation=vertical]:h-4"
              />
              <div className="flex grow items-center justify-between">
                <div className="flex items-center gap-3 py-3">
                  <Image
                    src={user?.organization_image || '/images/avatar.jpg'}
                    alt="avatar"
                    width={100}
                    height={100}
                    priority
                    className="size-6 rounded-full object-cover object-center"
                  />
                  <span>{user?.organization_name || ''}</span>
                </div>
                <div className="relative">
                  <Label htmlFor="search" className="sr-only">
                    Search
                  </Label>
                  <SidebarInput
                    id="search"
                    placeholder="Type to search..."
                    className="h-8 pl-7"
                  />
                  <Search className="pointer-events-none absolute top-1/2 left-2 size-4 -translate-y-1/2 opacity-50 select-none" />
                </div>
              </div>
            </div>
          </header>

          {/* 1. overflow-auto; 2. min-w-full,w-max */}
          <div className="hide-scrollbar min-h-0 flex-1 overflow-x-hidden overflow-y-auto">
            <div className="w-full">{children}</div>
          </div>
        </div>

        <div className="bg-background hide-scrollbar h-full w-[20%] shrink-0 overflow-auto border-l">
          <div className="p-4">
            <p className="text-muted-foreground text-sm">Notification</p>
          </div>
        </div>
      </SidebarInset>
    </SidebarProvider>
  );
}
