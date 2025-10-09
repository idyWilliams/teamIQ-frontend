"use client";

import React from "react";
import { Input } from "../ui/input";
import { Search, Bell } from "lucide-react";

type HeaderProps = {
  isMobile?: boolean;
  onOpenNotification: () => void;
};

const Header = ({ isMobile, onOpenNotification }: HeaderProps) => {
  return (
    <header className="h-[10%] p-2 flex items-center justify-end md:justify-between gap-4">
       {/* Mobile View */}
      {isMobile ? (
        
        <>
          {/* Left - Initials */}
          <p className="text-[20px] text-[#0f1928] bg-[#ffece5] p-2 rounded-full font-bold">
            JA
          </p>

          {/* Right - Bell Icon */}
          <div className="flex items-center gap-4">
            <button onClick={onOpenNotification}>
              <Bell className="text-[#292d32] w-6 h-6 cursor-pointer" />
            </button>
          </div>
        </>
      ) : (
        
        // Desktop View
        <>
          {/* Left - Initials + Full Name */}
          <p className="text-[#909090]">
            <span className="font-bold">JA</span> James Alfred
          </p>

          {/* Right - Search Input + Bell */}
          <div className="flex items-center gap-4">
            <div className="relative">
              <Search className="text-[#bac0cc] absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5" />
              <Input
                type="text"
                placeholder="Search for anything"
                className="pl-10 w-[348px] text-[#393939] placeholder:text-[#bac0cc] focus:ring-0"
              />
            </div>
            <Bell className="text-[#86898c] w-6 h-6 cursor-pointer" />
          </div>
        </>
      )}
    </header>
  );
};

export default Header;
