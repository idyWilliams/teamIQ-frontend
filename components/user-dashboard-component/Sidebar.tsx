import React, { useState } from "react";
import { usePathname } from "next/navigation";
import Link from "next/link";
import { sidebarLinks, SidebarLinkType } from "./data/sideLink";
import { ChevronDown, ChevronUp, User } from "lucide-react";

type SidebarProps = {
  closeSidebar?: () => void; // make it a function instead of boolean
};

const Sidebar = ({ closeSidebar }: SidebarProps) => {
  const pathname = usePathname();

  // track state of the parent based on the active one
  const [isParentActiveOpen, setIsParentActiveOpen] = useState<string | null>(
    null
  );

  // toggles state based on the clicked parent label
  const handleParentToggle = (label: string) => {
    setIsParentActiveOpen((prevLabel) => (prevLabel === label ? null : label));
  };

  // helpers to check if the path is active
  const isPathActive = (link: SidebarLinkType) => {
    if (pathname === link.url) return true;
    if (link.children) {
      return link.children.some((child) => pathname.startsWith(child.url));
    }
    return false;
  };

  return (
    <aside className="h-screen bg-white border-r flex flex-col">
      {/* Logo */}
      <div className="flex items-center gap-2 p-4 mb-5">
        <User className="text-[#000009] w-5 h-5 rounded-full" />
        <span className="text-[#555555] font-medium">Logo</span>
      </div>

      {/* Page header */}
      <p className="text-sm text-[#a2a3a4] px-4 py-3">Pages</p>

      {/* Sidebar links */}
      <nav className="flex flex-col gap-1 px-2 flex-1 overflow-y-auto">
        {sidebarLinks.map((link) => {
          if (link.children) {
            const isCurrentParent = isParentActiveOpen === link.label;
            const isParentActive = isPathActive(link);

            return (
              <div key={link.label}>
                <button
                  onClick={() => handleParentToggle(link.label)}
                  className={`flex items-center justify-between w-full rounded-md p-2 text-sm transition-colors cursor-pointer ${
                    isParentActive
                      ? "text-[#5395dc] bg-[#f3f8ff]"
                      : "text-gray-600 hover:bg-gray-100"
                  }`}
                >
                  <div className="flex items-center gap-3">
                    {link.icon}
                    {link.label}
                  </div>
                  {isCurrentParent ? (
                    <ChevronUp size={16} />
                  ) : (
                    <ChevronDown size={16} />
                  )}
                </button>

                {isCurrentParent && (
                  <div className="ml-4">
                    {link.children.map((child) => {
                      const isActiveChild = pathname === child.url;
                      return (
                        <Link
                          key={child.label}
                          href={child.url}
                          onClick={closeSidebar} // closes sidebar on mobile
                          className={`flex items-center rounded-md p-2 text-sm transition-colors ${
                            isActiveChild
                              ? "text-[#5395dc] bg-[#f3f8ff] font-medium"
                              : "text-gray-600 hover:bg-gray-100"
                          }`}
                        >
                          {child.label}
                        </Link>
                      );
                    })}
                  </div>
                )}
              </div>
            );
          }

          const isActive = pathname === link.url;
          return (
            <Link
              key={link.label}
              href={link.url}
              onClick={closeSidebar} // closes sidebar on mobile
              className={`flex items-center gap-2 rounded-md p-2 text-sm transition-colors ${
                isActive
                  ? "text-[#5395dc] bg-[#f3f8ff]"
                  : "text-gray-600 hover:bg-gray-100"
              }`}
            >
              {link.icon}
              {link.label}
            </Link>
          );
        })}
      </nav>
    </aside>
  );
};

export default Sidebar;
