import React, { useState } from "react";
import { usePathname } from "next/navigation";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Menu } from "lucide-react";
import { X } from "lucide-react";
import {
  BookUser,
  FolderOpenDot,
  UsersRound,
  BookText,
  Settings,
  User,
} from "lucide-react";

const sideLinks = [
  { label: "Dashboard", icon: <BookUser />, url: "/member" },
  { label: "Projects", icon: <FolderOpenDot />, url: "/member/projects" },
  { label: "Tasks", icon: <UsersRound />, url: "/member/tasks" },
  { label: "My Skills", icon: <BookText />, url: "/member/my-skills" },
  { label: "Settings", icon: <Settings />, url: "/member/settings" },
];

const Sidebar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();

  return (
    <div className="flex min-h-screen">
      {/* Mobile menu toggle button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="md:hidden absolute p-4 top-0 right-9 z-50"
      >
        {isOpen ? <X size={28} /> : <Menu size={28} />}
      </button>

      {/* Sidebar */}
      <aside
        className={`fixed md:static top-0 left-0 h-full w-64 bg-white border-r border-neutral-300 z-40 transform transition-transform duration-300
        ${isOpen ? "translate-x-0" : "-translate-x-full"} 
        md:translate-x-0`}
      >
        {/* Logo */}
        <div className="flex items-center gap-2 p-4 mb-5">
          <User className="text-[#000009] w-5 h-5 rounded-full" />
          <span className="text-[#555555] font-medium">Logo</span>
        </div>
        {/* page header */}
        <p className="text-sm text-[#a2a3a4] px-4 py-3">Pages</p>

        {/* sidebar links */}
        <aside className="flex flex-col gap-1 px-2">
          {sideLinks.map((link) => {
            const isActive = pathname === link.url;
            return (
              <Link
                key={link.label}
                href={link.url}
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
        </aside>
      </aside>

      {/* Overlay for mobile */}
      {isOpen && (
        <div
          onClick={() => setIsOpen(false)}
          className="fixed inset-0 bg-black/40 z-30 md:hidden"
        />
      )}
    </div>
  );
};

export default Sidebar;
