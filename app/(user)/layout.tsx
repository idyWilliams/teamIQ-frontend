"use client";

import React, { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import RightSideBar from "@/components/user-dashboard-component/RightSideBar";
import Header from "@/components/user-dashboard-component/Header";
import Sidebar from "@/components/user-dashboard-component/Sidebar";
import RightSidebarModal from "@/components/user-dashboard-component/modals/RightSidebarModal";
import { Button } from "@/components/ui/button";
import { Bell, Menu, X } from "lucide-react";

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
    pathname === "/member" || pathname.startsWith("/member/dashboard");

  // to control mobile state
  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 626);
    };

    handleResize();

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <div className="flex h-screen">
      {/* Mobile menu toggle button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="md:hidden fixed w-10 p-4 mt-3.5 top-0 left-4 right-0 z-50"
      >
        {isOpen ? <X size={28} /> : <Menu size={28} />}
      </button>

      {/* sidebar for mobile  */}
      <aside
        className={`fixed top-0 right-0 h-screen w-64 text-[#a6a2a2] border-r z-40 transform transition-transform duration-300 md:hidden
          ${isOpen ? "translate-x-0" : "translate-x-full "}`}
      >
        <Sidebar closeSidebar={() => setIsOpen(false)} />
      </aside>

      {isOpen && <div className="fixed inset-0 bg-black/70 z-30 md:hidden" />}

      {/* conditional rendering for layouts */}
      {isDashboardRoute ? (
        <>
          {/* Left Sidebar (20%) */}
          <div className="hidden md:block w-[20%]">
            <aside
              className={`fixed md:static top-0 right-0 h-screen w-64 bg-white border-l border-neutral-300 z-40 transform transition-transform duration-300
                         ${isOpen ? "translate-x-0" : "translate-x-full"} 
                         md:translate-x-0`}
            >
              <Sidebar closeSidebar={() => setIsOpen(!isOpen)} />
            </aside>
          </div>

          {/* Main dashboard (80%) */}
          <div className="flex flex-col md:p-6 md:flex-1 w-full">
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
          <div className="hidden md:block w-[15%] border-r">
            <Sidebar />
          </div>

          {/* Middle dashboard (70%) */}
          <div className="flex flex-col md:w-[70%] w-full">
            {/* Header */}
            <Header
              isMobile={isMobile}
              onOpenNotification={() => setShowNotifications(true)}
            />

            {/* Main content */}
            <main className="flex-1 p-4">{children}</main>
          </div>

          {/* Right Sidebar (15%) */}
          <div className="hidden md:block w-[15%] border-l">
            <RightSideBar />
          </div>

          {/* bell icon for mobile view */}
          {isMobile && (
            <Button
              onClick={() => setShowNotifications(true)}
              className="hidden md:block fixed bottom-4 right-4 p-3 bg-[#5395dc] text-white rounded-full shadow-lg cursor-pointer"
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
