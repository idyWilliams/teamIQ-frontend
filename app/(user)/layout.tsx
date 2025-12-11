'use client';

import React, { useState } from 'react';
import RightSideBar from '@/components/user-dashboard-component/RightSideBar';
import Header from '@/components/user-dashboard-component/Header';
import Sidebar from '@/components/user-dashboard-component/Sidebar';
import RightSidebarModal from '@/components/user-dashboard-component/modals/RightSidebarModal';
import { Button } from '@/components/ui/button';
import { Bell } from 'lucide-react';
import RequireAuth from '@/components/auth/RequireAuth';

// type props for children
type LayoutProps = {
  children: React.ReactNode;
};

export default function TeamDashboardLayout({ children }: LayoutProps) {
  const [isOpen, setIsOpen] = useState<boolean>(false); // mobile menu and close icon
  const [desktopNotifications, setDesktopNotifications] = useState(false);
  const [showNotifications, setShowNotifications] = useState(false); // for notification mobile view
  // const pathname = usePathname();

  // Dashboard route
  // const isDashboardRoute =
  //   pathname === '/member' || pathname.startsWith('/member/dashboard');

  // toggle notification panel for desktop
  const toggleNotification = () => {
    setDesktopNotifications(prev => !prev);
  };

  return (
    <RequireAuth>
      <div className="flex h-screen overflow-hidden">
        {/* MOBILE SIDEBAR */}
        <aside
          className={`fixed top-0 left-0 z-40 h-screen w-full transform border-r text-[#a6a2a2] transition-transform duration-300 xl:hidden ${
            isOpen ? 'translate-x-0' : '-translate-x-full'
          }`}
        >
          <Sidebar closeSidebar={() => setIsOpen(false)} />
        </aside>

        {isOpen && <div className="fixed inset-0 z-30 bg-black/70 xl:hidden" />}

        {/* LEFT SIDEBAR (15%) */}
        <div className="hidden w-[15%] border-r xl:block">
          <Sidebar closeSidebar={() => setIsOpen(false)} />
        </div>

        {/* MAIN AREA */}
        <div
          className={`flex flex-col transition-all duration-300 ${
            desktopNotifications ? 'xl:w-[70%]' : 'xl:w-[85%]'
          } w-full px-4 pt-4 lg:p-6`}
        >
          <Header
            toggleNotification={toggleNotification}
            onOpenNotification={() => setShowNotifications(true)}
            {...{ isOpen, setIsOpen }}
          />

          <main className="flex-1 overflow-y-auto [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
            {children}
          </main>
        </div>

        {/* RIGHT SIDEBAR (15%) - only when notifications open */}
        {desktopNotifications && (
          <div className="hidden w-[15%] border-l xl:block">
            <RightSideBar />
          </div>
        )}

        {/* MOBILE FLOATING BELL ICON */}
        <Button
          onClick={() => setShowNotifications(true)}
          className="fixed right-4 bottom-4 cursor-pointer rounded-full bg-[#5395dc] p-3 text-white shadow-lg xl:hidden"
        >
          <Bell size={24} />
        </Button>

        {/* MOBILE NOTIFICATION MODAL */}
        {showNotifications && (
          <RightSidebarModal onClose={() => setShowNotifications(false)} />
        )}
      </div>
    </RequireAuth>
  );
}

