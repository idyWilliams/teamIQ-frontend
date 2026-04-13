'use client';

import React, { useState, useMemo } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Brain, LogOut, ChevronDown, X } from 'lucide-react';
import { Button } from '../ui/button';
import { useAuthStore } from '@/store/useAuthStore';
import { sidebarLinks, SidebarLinkType } from './data/sideLink';

import {
  Sidebar,
  SidebarContent,
  SidebarHeader,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupLabel,
  useSidebar,
} from '@/components/ui/sidebar';

type SidebarProps = {
  isOpen?: boolean;        
  closeSidebar?: () => void;
};

export default function UserSidebar({ isOpen, closeSidebar }: SidebarProps) {
  const pathname = usePathname();
  const { logout } = useAuthStore();
  const { state } = useSidebar();

  console.log({ isOpen });

  const isCollapsed = state === 'collapsed';
  const [isParentOpen, setIsParentOpen] = useState<string | null>(null);

  const memoizedLinks = useMemo(() => sidebarLinks, []);

  const isLinkActive = (url: string): boolean => {
    if (!url) return false;
    const cleanPath = pathname.split('?')[0];
    const cleanUrl = url.split('?')[0];
    return cleanPath === cleanUrl;
  };

  const isParentActive = (link: SidebarLinkType): boolean => {
    if (isLinkActive(link.url)) return true;
    if (link.children) {
      return link.children.some(child => isLinkActive(child.url));
    }
    return false;
  };

  const handleLinkClick = () => {
    if (window.innerWidth < 768) {
      closeSidebar?.();
    }
  };

  return (
    <>
      {/* OVERLAY */}
      {isOpen && (
        <div
          className="fixed inset-0 z-40 bg-black/50 md:hidden"
          onClick={closeSidebar}
        />
      )}

      <Sidebar
        collapsible="icon"
        className={`
          border-r border-gray-200 bg-white
          fixed top-0 left-0 z-50 h-full
          flex flex-col

          w-[75%] max-w-[320px]
          md:w-[260px]

          transition-transform duration-300 ease-in-out

          ${isOpen ? 'translate-x-0' : '-translate-x-full'}
          md:translate-x-0 md:static
        `}
      >
        {/* HEADER */}
        <SidebarHeader className="relative pt-4">

          {/* CLOSE BUTTON (mobile only when open) */}
          {isOpen && (
            <button
              onClick={closeSidebar}
              className="absolute right-4 top-4 z-50 rounded-full p-2 hover:bg-gray-100 md:hidden"
            >
              <X size={26} />
            </button>
          )}

          <Link
            href="/member"
            className="flex items-center gap-3 px-4 py-2 text-xl font-bold text-blue-500 group-data-[collapsible=icon]:justify-center"
            onClick={handleLinkClick}
          >
            <Brain className="shrink-0" />
            <span className="group-data-[collapsible=icon]:hidden">
              TeamIQ
            </span>
          </Link>
        </SidebarHeader>

        {/* CONTENT */}
        <SidebarContent className="flex-1 overflow-y-auto">
          <SidebarGroup>
            {!isCollapsed && <SidebarGroupLabel>Pages</SidebarGroupLabel>}

            {memoizedLinks.map(link => (
              <SidebarLinkItem
                key={link.label}
                link={link}
                isLinkActive={isLinkActive}
                isParentActive={isParentActive}
                isParentOpen={isParentOpen}
                setIsParentOpen={setIsParentOpen}
                onLinkClick={handleLinkClick}
                isCollapsed={isCollapsed}
              />
            ))}
          </SidebarGroup>
        </SidebarContent>

        {/* FOOTER */}
        <SidebarFooter className="mt-auto">
          <Button
            variant="ghost"
            className="w-full justify-start gap-2"
            onClick={() => {
              logout();
              closeSidebar?.();
            }}
          >
            <LogOut className="shrink-0" />
            <span className="group-data-[collapsible=icon]:hidden">
              Log out
            </span>
          </Button>
        </SidebarFooter>
      </Sidebar>
    </>
  );
}

//
// SidebarLinkItem (FIX INCLUDED)
//
const SidebarLinkItem = ({
  link,
  isLinkActive,
  isParentActive,
  isParentOpen,
  setIsParentOpen,
  onLinkClick,
  isCollapsed,
}: any) => {
  const isOpen = isParentOpen === link.label;
  const active = isParentActive(link);

  if (link.children) {
    return (
      <div>
        <button
          onClick={() => setIsParentOpen(isOpen ? null : link.label)}
          className={`flex w-full items-center gap-3 rounded-md p-2.5 text-sm transition-all ${
            active
              ? 'bg-iq-500/5 text-iq-500 border-l-4 border-iq-500'
              : 'hover:bg-gray-100'
          }`}
        >
          {link.icon}
          {!isCollapsed && <span>{link.label}</span>}
          {!isCollapsed && (
            <ChevronDown
              className={`ml-auto transition-transform ${
                isOpen ? 'rotate-180' : ''
              }`}
              size={16}
            />
          )}
        </button>

        {isOpen && !isCollapsed && (
          <div className="ml-6 mt-1 space-y-1">
            {link.children.map((child: any) => (
              <Link
                key={child.label}
                href={child.url}
                onClick={onLinkClick}
                className={`block rounded-md px-3 py-2.5 text-sm ${
                  isLinkActive(child.url)
                    ? 'text-iq-500 font-medium bg-iq-500/5'
                    : 'text-neutral-700 hover:bg-gray-100'
                }`}
              >
                {child.label}
              </Link>
            ))}
          </div>
        )}
      </div>
    );
  }

  return (
    <Link
      href={link.url}
      onClick={onLinkClick}
      className={`flex items-center gap-3 rounded-md p-2.5 text-sm transition-all ${
        isLinkActive(link.url)
          ? 'bg-iq-500/5 text-iq-500 border-l-4 border-iq-500'
          : 'hover:bg-gray-100'
      }`}
    >
      {link.icon}
      {!isCollapsed && <span>{link.label}</span>}
    </Link>
  );
};