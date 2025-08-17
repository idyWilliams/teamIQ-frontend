import React from "react";

export default function OrganizationDashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <section className="grid grid-cols-[1fr_3fr_1.2fr] h-screen overflow-hidden">
      <aside className="h-full border-r p-4 lg:px-6">
        <span>Logo</span>
      </aside>
      <main>{children}</main>
      <aside className="h-full border-l p-4 lg:px-6">
        <span>Notification</span>
      </aside>
    </section>
  );
}
