'use client';

import { useState, useMemo } from 'react';
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

  const isCollapsed = state === 'collapsed';
  const [isParentOpen, setIsParentOpen] = useState<string | null>(null);

  const memoizedLinks: SidebarLinkType[] = useMemo(() => sidebarLinks, []);

  const isLinkActive = (url: string): boolean => {
    if (!url) return false;
    return pathname.split('?')[0] === url.split('?')[0];
  };

  const isParentActive = (link: SidebarLinkType): boolean => {
    if (isLinkActive(link.url)) return true;
    return link.children?.some(child => isLinkActive(child.url)) || false;
  };

  const handleLinkClick = () => {
    if (window.innerWidth < 768) closeSidebar?.();
  };

  return (
    <>
      {/* MOBILE OVERLAY */}
      {isOpen && (
        <div
          className="fixed inset-0 z-40 bg-black/50 md:hidden"
          onClick={closeSidebar}
        />
      )}

      {/* MOBILE (CUSTOM CONTROL ONLY) */}
      <div
        className={`
          md:hidden
          fixed top-0 left-0 z-50 h-full w-[75%] max-w-[320px]
          bg-white border-r border-gray-200 flex flex-col
          transition-transform duration-300
          ${isOpen ? 'translate-x-0' : '-translate-x-full'}
        `}
      >
        <SidebarInner
          {...{
            isCollapsed: false,
            isParentOpen,
            setIsParentOpen,
            memoizedLinks,
            isLinkActive,
            isParentActive,
            handleLinkClick,
            logout,
            closeSidebar,
            showClose: true,
          }}
        />
      </div>

      {/* DESKTOP / TABLET (REAL SIDEBAR) */}
      <Sidebar
        collapsible="icon"
        className="hidden md:flex border-r bg-white"
      >
        <SidebarInner
          {...{
            isCollapsed,
            isParentOpen,
            setIsParentOpen,
            memoizedLinks,
            isLinkActive,
            isParentActive,
            handleLinkClick,
            logout,
            showClose: false,
          }}
        />
      </Sidebar>
    </>
  );
}

//
// SHARED CONTENT (DRY)
//
const SidebarInner = ({
  isCollapsed,
  isParentOpen,
  setIsParentOpen,
  memoizedLinks,
  isLinkActive,
  isParentActive,
  handleLinkClick,
  logout,
  closeSidebar,
  showClose,
}: any) => {
  return (
    <>
      {/* HEADER */}
      <SidebarHeader className="relative pt-4">
        {showClose && (
          <button
            onClick={closeSidebar}
            aria-label="close sidebar"
            className="absolute right-4 top-4 p-2 md:hidden"
          >
            <X size={26} />
          </button>
        )}

        <Link
          href="/member"
          onClick={handleLinkClick}
          className={`
            flex items-center py-2 text-xl font-bold text-blue-500
            ${isCollapsed ? 'justify-center px-0' : 'gap-3 px-4'}
            `}
        >
          <Brain className={`${isCollapsed ? 'size-8' : 'size-5'}`} />
          {!isCollapsed && <span>TeamIQ</span>}
        </Link>
      </SidebarHeader>

      {/* CONTENT */}
      <SidebarContent className="flex-1 overflow-y-auto">
        <SidebarGroup>
          {!isCollapsed && <SidebarGroupLabel>Pages</SidebarGroupLabel>}

          {memoizedLinks.map((link: SidebarLinkType) => (
            <SidebarLinkItem
              key={link.label}
              link={link}
              isCollapsed={isCollapsed}
              isParentOpen={isParentOpen}
              setIsParentOpen={setIsParentOpen}
              isLinkActive={isLinkActive}
              isParentActive={isParentActive}
              onLinkClick={handleLinkClick}
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
          <LogOut className={`${isCollapsed ? 'size-6' : ''}`} />
          {!isCollapsed && <span>Log out</span>}
        </Button>
      </SidebarFooter>
    </>
  );
};

//
// SidebarLinkItem (UPDATED ICON SIZE)
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

  const iconClass = isCollapsed ? 'size-6' : '';

  if (link.children) {
    return (
      <div>
        <button
          onClick={() => setIsParentOpen(isOpen ? null : link.label)}
          className={`flex w-full items-center gap-3 p-2.5 text-sm ${
            active ? 'text-iq-500' : 'hover:bg-gray-100'
          }`}
        >
          <span className={iconClass}>{link.icon}</span>
          {!isCollapsed && <span>{link.label}</span>}
          {!isCollapsed && (
            <ChevronDown
              className={`ml-auto ${isOpen ? 'rotate-180' : ''}`}
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
                className={`block px-3 py-2 ${
                  isLinkActive(child.url)
                    ? 'text-iq-500'
                    : 'hover:bg-gray-100'
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
      className={`flex items-center gap-3 p-2.5 ${
        isLinkActive(link.url)
          ? 'text-iq-500'
          : 'hover:bg-gray-100'
      }`}
    >
      <span className={iconClass}>{link.icon}</span>
      {!isCollapsed && <span>{link.label}</span>}
    </Link>
  );
};