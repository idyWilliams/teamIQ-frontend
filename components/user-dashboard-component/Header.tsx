'use client';

import React from 'react';
import { Input } from '../ui/input';
import { Search, Bell } from 'lucide-react';
import { useAuthStore } from '@/store/useAuthStore';

type HeaderProps = {
  isMobile?: boolean;
  onOpenNotification: () => void;
};

const Header = ({ isMobile, onOpenNotification }: HeaderProps) => {
  const {user} = useAuthStore()
  return (
    <header className="flex h-[10%] items-center justify-end gap-4 p-2 md:justify-between">
      {/* Mobile View */}
      {isMobile ? (
        <>
          {/* Left - Initials */}
          <p className="rounded-full bg-[#ffece5] p-2 text-[20px] font-bold text-[#0f1928]">
            JA
          </p>

          {/* Right - Bell Icon */}
          <div className="flex items-center gap-4">
            <button onClick={onOpenNotification}>
              <Bell className="h-6 w-6 cursor-pointer text-[#292d32]" />
            </button>
          </div>
        </>
      ) : (
        // Desktop View
        <>
          {/* Left - Initials + Full Name */}
          <div className="inline-flex items-center gap-2">
            <span className="flex size-10 items-center justify-center rounded-full bg-[#FFECE5] font-bold text-neutral-800">
              {user.first_name[0]}{user.last_name[0]}
            </span>
            <span className="font-bold text-neutral-800">{user.first_name}{" "}{user.last_name}</span>
          </div>

          {/* Right - Search Input + Bell */}
          <div className="flex items-center gap-4">
            <div className="relative">
              <Search className="absolute top-1/2 left-3 h-5 w-5 -translate-y-1/2 text-[#bac0cc]" />
              <Input
                type="text"
                placeholder="Search for anything"
                className="w-[348px] pl-10 text-[#393939] placeholder:text-[#bac0cc] focus:ring-0"
              />
            </div>
            <Bell className="h-6 w-6 cursor-pointer text-[#86898c]" />
          </div>
        </>
      )}
    </header>
  );
};

export default Header;
