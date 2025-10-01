"use client";

import React, { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import RightSideBar from "@/components/user-dashboard-component/RightSideBar";
import Sidebar from "@/components/user-dashboard-component/Sidebar";
import Header from "@/components/user-dashboard-component/Header";
import RightSidebarModal from "@/components/user-dashboard-component/modals/RightSidebarModal";
import { Button } from "@/components/ui/button";
import { Bell, Menu, X } from "lucide-react";

type LayoutProps = {
  children: React.ReactNode;
};

export default function TeamDashboardLayout({ children }: LayoutProps) {
  // mobile menu icon
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [showNotifications, setShowNotifications] = useState(false);
  const pathname = usePathname();
  const [isMobile, setIsMobile] = useState(false);
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

      <aside
        className={`fixed top-0 right-0 h-screen w-64 text-[#a6a2a2] border-r z-40 transform transition-transform duration-300 md:hidden
          ${isOpen ? "translate-x-0" : "translate-x-full"}`}
      >
        <Sidebar closeSidebar={() => setIsOpen(false)} />
      </aside>

      {isDashboardRoute ? (
        <>
          {/* Left Sidebar (30%) */}
          <div className="hidden md:block w-[15%]">
            <aside
              className={`fixed md:static top-0 right-0 h-screen w-64 bg-white border-l border-neutral-300 z-40 transform transition-transform duration-300
                         ${isOpen ? "translate-x-0" : "translate-x-full"} 
                         md:translate-x-0`}
            >
              <Sidebar closeSidebar={() => setIsOpen(!isOpen)} />
            </aside>
          </div>

          {/* Main dashboard (70%) */}
          <div className="flex flex-col md:w-[70%] w-full">
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

          {isMobile && (
            <Button
              onClick={() => setShowNotifications(true)}
              className="hidden md:block fixed bottom-4 right-4 p-3 bg-[#5395dc] text-white rounded-full shadow-lg cursor-pointer"
            >
              <Bell size={24} />
            </Button>
          )}

          {showNotifications && (
            <RightSidebarModal onClose={() => setShowNotifications(false)} />
          )}
        </>
      )}
    </div>
  );
}
