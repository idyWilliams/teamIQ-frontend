"use client";

import { ReactNode } from "react";
import { usePathname } from "next/navigation";
import { settingsTabs } from "@/components/user-dashboard-component/data/settingsTabs";
import Link from "next/link";

type settingProps = {
  children: ReactNode;
};

export default function SettingLayout({ children }: settingProps) {
  const pathname = usePathname();
  return (
    <div className="w-full overflow-hidden">
      <nav className="border-b border-b-gray-400">
        <ul className="flex items-center justify-evenly gap-2 space-x-6 md:space-x-10 max-w-full">
          {settingsTabs.map((tabs) => {
            const isActive = pathname === tabs.href;
            return (
              <li key={tabs.label} className="min-w-max md:mr-6">
                <Link
                  href={tabs.href}
                  className={`text-xs md:text-base font-semibold inline-flex items-center justify-center whitespace-nowrap border-b-2 transition-colors duration-300 ${
                    isActive
                      ? "text-[#5395dc] border-b-[#5395dc] md:px-8"
                      : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
                  }`}
                >
                  {tabs.label}
                </Link>
              </li>
            );
          })}
        </ul>
      </nav>

      <main className="flex ">{children}</main>
    </div>
  );
}
