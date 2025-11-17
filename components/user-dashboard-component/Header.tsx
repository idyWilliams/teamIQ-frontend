'use client';

import React from 'react';
import { Input } from '../ui/input';
import { Search, Bell } from 'lucide-react';
import { useAuthStore } from '@/store/useAuthStore';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';

type HeaderProps = {
  onOpenNotification: () => void;
};

const Header = ({ onOpenNotification }: HeaderProps) => {
  const { user } = useAuthStore();
  return (
    <header className="h-[10%] pt-2">
      {/* Mobile View */}
      <div className="flex items-center justify-end gap-4 xl:hidden">
        {/* Left - Initials */}
        <Avatar>
          <AvatarImage src={user?.profile_image} alt="Profile" />
          <AvatarFallback>
            {user?.first_name?.[0]}
            {user?.last_name?.[0]}
          </AvatarFallback>
        </Avatar>

        {/* Right - Bell Icon */}
        <div className="flex items-center gap-4">
          <button onClick={onOpenNotification}>
            <Bell className="h-6 w-6 cursor-pointer text-[#292d32]" />
          </button>
        </div>
      </div>
      {/* // Desktop View */}
      <div className="hidden items-center justify-end gap-4 lg:justify-between xl:flex">
        {/* Left - Initials + Full Name */}
        <div className="inline-flex items-center gap-2">
          <Avatar>
            <AvatarImage src={user?.profile_image} alt="Profile" />
            <AvatarFallback>
              {user?.first_name?.[0]}
              {user?.last_name?.[0]}
            </AvatarFallback>
          </Avatar>
          <span className="font-bold text-neutral-800">
            <span className="font-bold text-neutral-800">
              {user?.first_name} {user?.last_name}
            </span>
          </span>
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
      </div>
    </header>
  );
};

export default Header;
