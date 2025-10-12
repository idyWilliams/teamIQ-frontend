'use client';

import React, { useEffect, useState } from 'react';
import { usePathname } from 'next/navigation';
import RightSideBar from '@/components/user-dashboard-component/RightSideBar';
import Header from '@/components/user-dashboard-component/Header';
import Sidebar from '@/components/user-dashboard-component/Sidebar';
import RightSidebarModal from '@/components/user-dashboard-component/modals/RightSidebarModal';
import { Button } from '@/components/ui/button';
import { Bell, Menu, X } from 'lucide-react';

// type props for children
type LayoutProps = {
  children: React.ReactNode;
};

export default function TeamDashboardLayout({ children }: LayoutProps) {
  const [isOpen, setIsOpen] = useState<boolean>(false); // mobile menu and close icon
  const [showNotifications, setShowNotifications] = useState(false); // for notification
  const pathname = usePathname();
  const [isMobile, setIsMobile] = useState(false); // for mobile screen

  // Dashboard route
  const isDashboardRoute =
    pathname === '/member' || pathname.startsWith('/member/dashboard');

  // to control mobile state
  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 626);
    };

    handleResize();

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return (
    <div className="flex h-screen">
      {/* Mobile menu toggle button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="fixed top-0 right-0 left-4 z-50 mt-3.5 w-10 p-4 md:hidden"
      >
        {isOpen ? <X size={28} /> : <Menu size={28} />}
      </button>

      {/* sidebar for mobile  */}
      <aside
        className={`fixed top-0 right-0 z-40 h-screen w-64 transform border-r text-[#a6a2a2] transition-transform duration-300 md:hidden ${isOpen ? 'translate-x-0' : 'translate-x-full'}`}
      >
        <Sidebar closeSidebar={() => setIsOpen(false)} />
      </aside>

      {isOpen && <div className="fixed inset-0 z-30 bg-black/70 md:hidden" />}

      {/* conditional rendering for layouts */}
      {isDashboardRoute ? (
        <>
          {/* Left Sidebar (30%) */}
          <>
            <aside
              className={`fixed top-0 right-0 z-40 hidden h-screen w-[15%] transform border-l border-neutral-300 bg-white transition-transform duration-300 md:static md:block ${isOpen ? 'translate-x-0' : 'translate-x-full'} md:translate-x-0`}
            >
              <Sidebar closeSidebar={() => setIsOpen(!isOpen)} />
            </aside>
          </>

          {/* Main dashboard (80%) */}
          <div className="flex w-full grow flex-col md:flex-1 md:p-6">
            {/* Header */}
            <Header
              isMobile={isMobile}
              onOpenNotification={() => setShowNotifications(true)}
            />

            {/* Main content */}
            <main className="flex-1 p-4">{children}</main>
          </div>
        </>
      ) : (
        <>
          {/* Left Sidebar (15%) */}
          <div className="hidden w-[15%] border-r md:block">
            <Sidebar />
          </div>

          {/* Middle dashboard (70%) */}
          <div className="flex w-full flex-col md:w-[70%]">
            {/* Header */}
            <Header
              isMobile={isMobile}
              onOpenNotification={() => setShowNotifications(true)}
            />

            {/* Main content */}
            <main className="flex-1 p-4 overflow-y-auto [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
              {children}
            </main>
          </div>

          {/* Right Sidebar (15%) */}
          <div className="hidden w-[15%] border-l md:block">
            <RightSideBar />
          </div>

          {/* bell icon for mobile view */}
          {isMobile && (
            <Button
              onClick={() => setShowNotifications(true)}
              className="fixed right-4 bottom-4 hidden cursor-pointer rounded-full bg-[#5395dc] p-3 text-white shadow-lg md:block"
            >
              <Bell size={24} />
            </Button>
          )}
          {/* notification modal */}
          {showNotifications && (
            <RightSidebarModal onClose={() => setShowNotifications(false)} />
          )}
        </>
      )}
    </div>
  );
}
