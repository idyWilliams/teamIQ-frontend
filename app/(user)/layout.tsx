"use client";

import React, { useState } from "react";
import { usePathname } from "next/navigation";
import Sidebar from "@/components/user-dashboard-component/Sidebar";
import { Input } from "@/components/ui/input";
import { Bell, Search } from "lucide-react";

type LayoutProps = {
  children: React.ReactNode;
};

export default function TeamDashboardLayout({ children }: LayoutProps) {
  const pathname = usePathname();
  const isProject = pathname.startsWith("/member/project");
  const isTask = pathname.startsWith("/member/task");

  return (
    <div className="flex gap-1 h-screen">
      {/* Main Sidebar */}
      <Sidebar />

      {/* ====================== NORMAL + PROJECT ====================== */}
      {!isTask ? (
        <div className="w-full flex flex-col">
          {/* Header */}
          <header className="flex items-center justify-between p-4 border-b border-b-gray-300">
            {!isProject ? (
              <div className="w-full flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                {/* Left: User Info */}
                <p className="text-[#909090]">
                  <span className="font-bold">JA</span>{" "}
                  <span>James Alfred</span>
                </p>

                {/* Right: searchbar + bell */}
                <div className="flex items-center gap-3 w-full md:w-auto">
                  <div className="relative flex-1 md:flex-none">
                    <Search className="text-[#bac0cc] absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5" />
                    <Input
                      type="text"
                      placeholder="search for anything"
                      className="w-full md:w-[348px] pl-10 text-[#393939] placeholder:text-[#bac0cc] focus:ring-0"
                    />
                  </div>
                  <Bell className="text-[#86898c] w-6 h-6 cursor-pointer" />
                </div>
              </div>
            ) : (
              <h2 className="text-lg text-[#393939] font-bold text-left p-4">
                Isentry Website
              </h2>
            )}
          </header>

          {/* Main Content */}
          <main className="flex-1 w-full">{children}</main>
        </div>
      ) : (
        <div className="flex flex-1">
          <div className="flex flex-col w-[75%] border-r">
            {/* Header (10% height) */}
            <header className="h-[10%] border-b p-4">
              <div className="w-full flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                {/* Left: User Info */}
                <p className="text-[#909090]">
                  <span className="font-bold">JA</span>{" "}
                  <span>James Alfred</span>
                </p>

                {/* Right: searchbar + bell */}
                <div className="flex items-center gap-3 w-full md:w-auto">
                  <div className="relative flex-1 md:flex-none">
                    <Search className="text-[#bac0cc] absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5" />
                    <Input
                      type="text"
                      placeholder="search for anything"
                      className="w-full md:w-[348px] pl-10 text-[#393939] placeholder:text-[#bac0cc] focus:ring-0"
                    />
                  </div>
                  <Bell className="text-[#86898c] w-6 h-6 cursor-pointer" />
                </div>
              </div>
            </header>

            {/* Main content under header */}
            <main className="flex-1 p-4">{children}</main>
          </div>

          {/* Right side (30%) full height */}
          <aside className="w-[15%] h-full p-4 border-l">
            <div className="w-full">
              <h2 className="text-[#232323] font-bold">Notifications</h2>
              <p className="text-sm text-gray-600 mt-2">
                This sidebar is independent and takes 30% of width, full height.
              </p>
            </div>
          </aside>
        </div>
      )}
    </div>
  );
}
