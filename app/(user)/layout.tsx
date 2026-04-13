'use client';

import React, { useState, useEffect } from 'react';
import { SidebarProvider, SidebarInset } from '@/components/ui/sidebar';
import Header from '@/components/user-dashboard-component/Header';
import UserSidebar from '@/components/user-dashboard-component/Sidebar';
import UserNotification from '@/components/Notifications/UserNotification';
import RequireAuth from '@/components/auth/RequireAuth';

export default function TeamDashboardLayout({ children }: { children: React.ReactNode }) {
  const [showNotification, setShowNotification] = useState(false);
  const [mobileSidebarOpen, setMobileSidebarOpen] = useState(false);

  useEffect(() => {
    const closeNotif = () => setShowNotification(false);
    window.addEventListener('closeNotification', closeNotif);
    return () => window.removeEventListener('closeNotification', closeNotif);
  }, []);

  const toggleNotification = () => setShowNotification(prev => !prev);

  return (
    <RequireAuth>
      <SidebarProvider>

        {/* PASS CONTROL */}
        <UserSidebar
          isOpen={mobileSidebarOpen}
          closeSidebar={() => setMobileSidebarOpen(false)}
        />

        <SidebarInset className="flex h-screen w-full overflow-hidden">
          <div className="flex min-h-0 flex-1 flex-col overflow-hidden">

            <header className="h-16 shrink-0 border-b bg-white px-4 flex items-center">
              <Header
                toggleNotification={toggleNotification}
                openSidebar={() => setMobileSidebarOpen(true)}
              />
            </header>

            <main className="flex-1 overflow-y-auto overflow-x-hidden custom-scrollbar px-4 lg:px-6 py-6">
              {children}
            </main>
          </div>
        </SidebarInset>

        {showNotification && (
          <>
            <div className="fixed inset-0 z-50 bg-black/50" onClick={() => setShowNotification(false)} />
            <div className="fixed inset-y-0 right-0 z-50 w-full max-w-[380px] bg-white shadow-2xl">
              <UserNotification />
            </div>
          </>
        )}
      </SidebarProvider>
    </RequireAuth>
  );
}