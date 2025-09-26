import React from "react";
import { usePathname } from "next/navigation";
import Link from "next/link";
const navLinks = [
  { href: "/settings/my-details", label: "My Details" },
  { href: "/settings/notification", label: "Notification" },
  { href: "/settings/password", label: "Password" },
  { href: "/settings/plan", label: "Plan" },
];

export default function SettingsNav() {
  const pathname = usePathname();

  return (
    <nav className="flex flex-col space-y-4 p-3">
      <h3 className="text-xl font-semibold mb-2">Account Settings</h3>
      {navLinks.map((link) => (
        <Link
          key={link.href}
          href={link.href}
          className={`px-3 py-2 rounded-lg transition-colors ${
            pathname === link.href
              ? "text-[#066ace] underline"
              : "text-[#5e5e5e]"
          }`}
        >
          {link.label}
        </Link>
      ))}
    </nav>
  );
}
