'use client';
import { useState } from 'react';
import Notification from '@/components/Notifications/OrgNotification';
import RequireAuth from '@/components/auth/RequireAuth';
import { AppSidebar } from '@/components/app-sidebar';
import { SidebarInset, SidebarProvider } from '@/components/ui/sidebar';
import Image from 'next/image';
import { Label } from '@/components/ui/label';
import { Bell, Search } from 'lucide-react';
import { SidebarInput, SidebarTrigger } from '@/components/ui/sidebar';
import { Separator } from '@/components/ui/separator';
import { useAuthStore } from '@/store/useAuthStore';
import OnboardingBanner from '@/components/onboarding-banner';

export default function OrganizationDashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { user } = useAuthStore();
  const [showNotification, setShowNotification] = useState(false);

  const toggleNotification = () => {
    setShowNotification(prev => !prev);
  };

  return (
    <RequireAuth>
      <SidebarProvider>
        <AppSidebar />
        <SidebarInset className="flex h-screen w-full overflow-hidden">
          <div className="flex min-h-0 flex-1 flex-col min-w-0 overflow-hidden">
            <OnboardingBanner />
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
                      src={user?.organization?.organization_image || '/images/avatar.jpg'}
                      alt="avatar"
                      width={100}
                      height={100}
                      priority
                      className="size-6 rounded-full object-cover object-center"
                    />
                    <span>{user?.organization_name || ''}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <button className="p-2 lg:hidden">
                      <Search className="size-4 opacity-50" />
                    </button>
                    <button className="p-2 lg:hidden">
                      <Bell className="size-4 opacity-50" />
                    </button>

                    <div className="relative hidden lg:block">
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
                    <button
                      className="cursor-pointer p-2"
                      onClick={toggleNotification}
                    >
                      <Bell className="pointer-events-none mt-6 hidden size-6 -translate-y-1/2 items-center justify-around gap-2 opacity-50 md:flex lg:block" />
                    </button>
                  </div>
                </div>
              </div>
            </header>

            {/* 1. overflow-auto; 2. min-w-full,w-max */}
            <div className="min-h-0 flex-1 overflow-y-auto overflow-x-hidden">
              <div className="w-full">{children}</div>
            </div>
          </div>
          {showNotification && (
            <>
              <div
                className="fixed inset-0 z-40 bg-black/30"
                onClick={() => setShowNotification(false)}
              />
              <div className="fixed inset-y-0 right-0 z-50 w-[320px] bg-background border-l shadow-lg">
                <Notification />
              </div>
            </>
          )}
        </SidebarInset>
      </SidebarProvider>
    </RequireAuth>
  );
}
