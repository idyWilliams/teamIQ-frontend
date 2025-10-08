"use client";

import * as React from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { AudioWaveform, Command, GalleryVerticalEnd } from "lucide-react";

import { NavMain } from "@/components/nav-main";
import { NavProjects } from "@/components/nav-projects";
import { NavUser } from "@/components/nav-user";
import { TeamSwitcher } from "@/components/team-switcher";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarRail,
} from "@/components/ui/sidebar";

// This is sample data.
const data = {
  user: {
    name: "shadcn",
    email: "m@example.com",
    avatar: "/avatars/shadcn.jpg",
  },
  teams: [
    {
      name: "Acme Inc",
      logo: GalleryVerticalEnd,
      plan: "Enterprise",
    },
    {
      name: "Acme Corp.",
      logo: AudioWaveform,
      plan: "Startup",
    },
    {
      name: "Evil Corp.",
      logo: Command,
      plan: "Free",
    },
  ],
  navMain: [
    {
      icon: "icon-[ph--identification-badge]",
      title: "Dashboard",
      url: "/organization",
      items: [
        { title: "Overview", url: "", value: "overview" },
        { title: "Project Status", url: "", value: "project-status" },
        { title: "Team", url: "", value: "team" },
      ],
    },
  ],
  others: [
    {
      icon: "icon-[ant-design--idcard-outlined]",
      name: "Projects",
      url: "/organization/projects",
    },
    {
      icon: "icon-[hugeicons--user-group]",
      name: "Team",
      url: "/organization/team",
    },
    {
      icon: "icon-[formkit--solana]",
      name: "Team Matrix",
      url: "/organization/team-matrix",
    },
    {
      icon: "icon-[proicons--grid]",
      name: "Apps",
      url: "/organization/app",
    },
    {
      icon: "icon-[ep--setting]",
      name: "Settings",
      url: "/organization/settings",
    },
  ],
};

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  const searchParams = useSearchParams();
  const router = useRouter();
  const activeTab = searchParams.get("tab") || "overview";

  const handleSubNavClick = (value: string) => {
    const params = new URLSearchParams(searchParams.toString());
    params.set("tab", value);
    router.replace(`?${params.toString()}`, { scroll: false });
  };

  const navMainWithHandlers = data.navMain.map(item => ({
    ...item,
    items: item.items.map(subItem => ({
      ...subItem,
      isActive: subItem.value === activeTab,
      onClick: () => handleSubNavClick(subItem.value),
    })),
  }));

  return (
    <Sidebar collapsible="icon" {...props}>
      <SidebarHeader>
        <TeamSwitcher teams={data.teams} />
      </SidebarHeader>
      <SidebarContent className="gap-y-0">
        <NavMain items={navMainWithHandlers} />
        <NavProjects projects={data.others} />
      </SidebarContent>
      <SidebarFooter>
        <NavUser user={data.user} />
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  );
}