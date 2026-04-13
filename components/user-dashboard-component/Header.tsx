'use client';

import React from 'react';
import { Search, Bell, Brain, Menu } from 'lucide-react';
import { Input } from '../ui/input';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { useAuthStore } from '@/store/useAuthStore';
import Link from 'next/link';
import { SidebarTrigger } from '@/components/ui/sidebar';

type HeaderProps = {
  toggleNotification: () => void;
  openSidebar: () => void;
};

const Header = ({ toggleNotification, openSidebar }: HeaderProps) => {
  const { user } = useAuthStore();

  return (
    <header className="flex h-full w-full items-center gap-3 px-4">
      
      {/* MOBILE HAMBURGER (CUSTOM CONTROL) */}
      <button
        onClick={openSidebar}
        className="md:hidden -ml-1 p-2 rounded-md hover:bg-gray-100"
      >
        <Menu size={28} />
      </button>

      {/* Mobile Logo */}
      <Link href="/member" className="flex items-center gap-2 text-xl font-bold text-blue-500 md:hidden">
        <Brain size={24} /> TeamIQ
      </Link>

      {/* DESKTOP COLLAPSE (UNCHANGED) */}
      <SidebarTrigger className="hidden md:block -ml-1" />

      {/* Desktop User Info */}
      <div className="hidden md:flex items-center gap-3">
        <Avatar className="size-8 hidden md:block">
          <AvatarImage src={user?.profile_image} />
          <AvatarFallback>
            {user?.first_name?.[0]}{user?.last_name?.[0]}
          </AvatarFallback>
        </Avatar>
        <span className="font-semibold text-neutral-800 hidden lg:block">
          {user?.first_name} {user?.last_name}
        </span>
      </div>

      <div className="flex-1 flex justify-end items-center gap-4">
        {/* Desktop */}
        <div className="hidden md:flex items-center gap-3 lg:gap-4">
          <div className="relative w-[160px] lg:w-[280px]">
            <Search className="absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2 text-gray-400" />
            <Input type="text" placeholder="Search for anything" className="h-9 pl-10" />
          </div>
          <button onClick={toggleNotification} className="p-2 hover:bg-gray-100 rounded-md">
            <Bell className="h-5 w-5 text-gray-600" />
          </button>
        </div>

        {/* Mobile */}
        <div className="flex items-center gap-3 md:hidden">
          <button onClick={toggleNotification} className="p-2 hover:bg-gray-100 rounded-md">
            <Bell className="h-6 w-6 text-[#292d32]" />
          </button>
          <Avatar className="size-8">
            <AvatarImage src={user?.profile_image} />
            <AvatarFallback>
              {user?.first_name?.[0]}{user?.last_name?.[0]}
            </AvatarFallback>
          </Avatar>
        </div>
      </div>
    </header>
  );
};

export default Header;