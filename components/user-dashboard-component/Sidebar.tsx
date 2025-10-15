import React, { useState, useCallback, useMemo, Suspense } from 'react';
import { usePathname, useSearchParams } from 'next/navigation';
import Link from 'next/link';
import { sidebarLinks, SidebarLinkType } from './data/sideLink';
import { ChevronDown, ChevronUp, User } from 'lucide-react';

type SidebarProps = {
  closeSidebar?: () => void;
  className?: string;
};

// Constants for consistent styling
const STYLES = {
  active: 'bg-iq-500/5 text-iq-500 border-l-4 border-iq-500  ',
  inactive: 'text-neutral-800 hover:bg-gray-100',
  activeChild: 'font-medium text-iq-500',
  inactiveChild: 'text-neutral-800',
} as const;

const SidebarMain = ({ closeSidebar, className = '' }: SidebarProps) => {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const [isParentActiveOpen, setIsParentActiveOpen] = useState<string | null>(
    null
  );

  // Memoized path checking function
  const isPathActive = useCallback(
    (link: SidebarLinkType): boolean => {
      if (pathname === link.url) return true;
      if (link.children) {
        return link.children.some(child => {
          // Handle query parameters in URLs
          const childUrl = child.url.split('?')[0];
          const currentPath = pathname.split('?')[0];
          return currentPath.startsWith(childUrl);
        });
      }
      return false;
    },
    [pathname]
  );

  // Helper function to check if a child link is active
  const isChildActive = useCallback(
    (childUrl: string): boolean => {
      // For URLs with query parameters, reconstruct the current URL and compare
      if (childUrl.includes('?')) {
        const currentUrl =
          pathname +
          (searchParams.toString() ? `?${searchParams.toString()}` : '');
        return currentUrl === childUrl;
      }

      // For URLs without query parameters, use exact path match
      return pathname === childUrl;
    },
    [pathname, searchParams]
  );

  // Memoized toggle handler
  const handleParentToggle = useCallback((label: string) => {
    setIsParentActiveOpen(prevLabel => (prevLabel === label ? null : label));
  }, []);

  // Memoized sidebar links to prevent unnecessary re-renders
  const memoizedSidebarLinks = useMemo(() => sidebarLinks, []);

  return (
    <aside
      className={`flex h-screen flex-col border-r bg-white ${className}`}
      role="navigation"
      aria-label="Main navigation"
    >
      <SidebarHeader />
      <SidebarNavigation
        links={memoizedSidebarLinks}
        pathname={pathname}
        isParentActiveOpen={isParentActiveOpen}
        onParentToggle={handleParentToggle}
        isPathActive={isPathActive}
        isChildActive={isChildActive}
        onLinkClick={closeSidebar}
      />
    </aside>
  );
};

const Sidebar = ({ closeSidebar, className }: SidebarProps) => {
  return (
    <Suspense fallback={<>Loading SideBar</>}>
      <SidebarMain closeSidebar={closeSidebar} className={className} />
    </Suspense>
  );
};

// Sidebar Header Component
const SidebarHeader = React.memo(() => (
  <div className="mb-5 flex items-center gap-2 p-4">
    <User className="h-5 w-5 rounded-full text-[#000009]" aria-hidden="true" />
    <span className="font-medium text-[#555555]">Logo</span>
  </div>
));

SidebarHeader.displayName = 'SidebarHeader';

// Sidebar Navigation Component
type SidebarNavigationProps = {
  links: SidebarLinkType[];
  pathname: string;
  isParentActiveOpen: string | null;
  onParentToggle: (label: string) => void;
  isPathActive: (link: SidebarLinkType) => boolean;
  isChildActive: (childUrl: string) => boolean;
  onLinkClick?: () => void;
};

const SidebarNavigation = React.memo(
  ({
    links,
    pathname,
    isParentActiveOpen,
    onParentToggle,
    isPathActive,
    isChildActive,
    onLinkClick,
  }: SidebarNavigationProps) => (
    <>
      <p className="px-4 py-3 text-sm text-[#a2a3a4]">Pages</p>
      <nav
        className="flex flex-1 flex-col gap-1 overflow-y-auto px-2"
        role="navigation"
        aria-label="Sidebar navigation"
      >
        {links.map(link => (
          <SidebarLinkItem
            key={link.label}
            link={link}
            pathname={pathname}
            isParentActiveOpen={isParentActiveOpen}
            onParentToggle={onParentToggle}
            isPathActive={isPathActive}
            isChildActive={isChildActive}
            onLinkClick={onLinkClick}
          />
        ))}
      </nav>
    </>
  )
);

SidebarNavigation.displayName = 'SidebarNavigation';

// Individual Sidebar Link Item Component
type SidebarLinkItemProps = {
  link: SidebarLinkType;
  pathname: string;
  isParentActiveOpen: string | null;
  onParentToggle: (label: string) => void;
  isPathActive: (link: SidebarLinkType) => boolean;
  isChildActive: (childUrl: string) => boolean;
  onLinkClick?: () => void;
};

const SidebarLinkItem = React.memo(
  ({
    link,
    pathname,
    isParentActiveOpen,
    onParentToggle,
    isPathActive,
    isChildActive,
    onLinkClick,
  }: SidebarLinkItemProps) => {
    if (link.children) {
      return (
        <ParentLinkItem
          link={link}
          isParentActiveOpen={isParentActiveOpen}
          onParentToggle={onParentToggle}
          isPathActive={isPathActive}
          isChildActive={isChildActive}
          onLinkClick={onLinkClick}
        />
      );
    }

    return (
      <SimpleLinkItem
        link={link}
        pathname={pathname}
        onLinkClick={onLinkClick}
      />
    );
  }
);

SidebarLinkItem.displayName = 'SidebarLinkItem';

// Parent Link Item Component (with children)
type ParentLinkItemProps = {
  link: SidebarLinkType;
  isParentActiveOpen: string | null;
  onParentToggle: (label: string) => void;
  isPathActive: (link: SidebarLinkType) => boolean;
  isChildActive: (childUrl: string) => boolean;
  onLinkClick?: () => void;
};

const ParentLinkItem = React.memo(
  ({
    link,
    isParentActiveOpen,
    onParentToggle,
    isPathActive,
    isChildActive,
    onLinkClick,
  }: ParentLinkItemProps) => {
    const isCurrentParent = isParentActiveOpen === link.label;
    const isParentActive = isPathActive(link);

    const handleKeyDown = (e: React.KeyboardEvent) => {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        onParentToggle(link.label);
      }
    };

    return (
      <div>
        <div
          className={`flex w-full cursor-pointer items-center justify-between rounded-md p-2 text-sm transition-colors ${
            isParentActive ? STYLES.active : STYLES.inactive
          }`}
          role="button"
          tabIndex={0}
          aria-expanded={isCurrentParent}
          aria-controls={`submenu-${link.label}`}
          onKeyDown={handleKeyDown}
        >
          <button
            onClick={() => onParentToggle(link.label)}
            className="mr-2 rounded-sm p-1 focus:outline-none"
            aria-label={`${isCurrentParent ? 'Collapse' : 'Expand'} ${link.label} submenu`}
          >
            {isCurrentParent ? (
              <ChevronUp size={16} aria-hidden="true" />
            ) : (
              <ChevronDown size={16} aria-hidden="true" />
            )}
          </button>
          <Link
            href={link.url}
            className="flex flex-1 items-center gap-3"
            onClick={onLinkClick}
          >
            {link.icon}
            <span>{link.label}</span>
          </Link>
        </div>

        {isCurrentParent && (
          <div
            id={`submenu-${link.label}`}
            className="ml-4"
            role="group"
            aria-label={`${link.label} submenu`}
          >
            {link.children?.map(child => (
              <ChildLinkItem
                key={child.label}
                child={child}
                isChildActive={isChildActive}
                onLinkClick={onLinkClick}
              />
            ))}
          </div>
        )}
      </div>
    );
  }
);

ParentLinkItem.displayName = 'ParentLinkItem';

// Child Link Item Component
type ChildLinkItemProps = {
  child: SidebarLinkType;
  isChildActive: (childUrl: string) => boolean;
  onLinkClick?: () => void;
};

const ChildLinkItem = React.memo(
  ({ child, isChildActive, onLinkClick }: ChildLinkItemProps) => {
    const isActiveChild = isChildActive(child.url);

    return (
      <Link
        href={child.url}
        onClick={onLinkClick}
        className={`hover:text-iq-500 m-1 flex items-center rounded-md py-2 pl-8 text-sm font-normal transition-colors focus:outline-none ${
          isActiveChild ? STYLES.activeChild : STYLES.inactiveChild
        }`}
        aria-current={isActiveChild ? 'page' : undefined}
      >
        {child.label}
      </Link>
    );
  }
);

ChildLinkItem.displayName = 'ChildLinkItem';

// Simple Link Item Component (without children)
type SimpleLinkItemProps = {
  link: SidebarLinkType;
  pathname: string;
  onLinkClick?: () => void;
};

const SimpleLinkItem = React.memo(
  ({ link, pathname, onLinkClick }: SimpleLinkItemProps) => {
    const isActive = pathname === link.url;

    return (
      <Link
        href={link.url}
        onClick={onLinkClick}
        className={`flex items-center rounded-md p-2 text-sm transition-colors focus:outline-none ${
          isActive ? STYLES.active : STYLES.inactive
        }`}
        aria-current={isActive ? 'page' : undefined}
      >
        <span className="mr-2 flex size-6"></span>
        <span className="inline-flex gap-2">
          {link.icon}
          <span>{link.label}</span>
        </span>
      </Link>
    );
  }
);

SimpleLinkItem.displayName = 'SimpleLinkItem';

export default Sidebar;
