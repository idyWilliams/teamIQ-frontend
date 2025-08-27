"use client";

import * as React from "react";
import {
  AudioWaveform,
  BookOpen,
  Bot,
  Command,
  Frame,
  GalleryVerticalEnd,
  Map,
  PieChart,
  Settings2,
  SquareTerminal,
} from "lucide-react";

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
      url: "",
      items: [
        { title: "Overview", url: "" },
        { title: "Project Status", url: "" },
        { title: "Team", url: "" },
      ],
    },
  ],
  others: [
    {
      icon: "icon-[ant-design--idcard-outlined]",
      name: "Projects",
      url: "",
    },
    {
      icon: "icon-[hugeicons--user-group]",
      name: "Team",
      url: "",
    },
    {
      icon: "icon-[formkit--solana]",
      name: "Team Matrix",
      url: "",
    },
    {
      icon: "icon-[proicons--grid]",
      name: "Apps",
      url: "",
    },
    {
      icon: "icon-[ep--setting]",
      name: "Settings",
      url: "",
    },
  ],
};

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  return (
    <Sidebar collapsible="icon" {...props}>
      <SidebarHeader>
        <TeamSwitcher teams={data.teams} />
      </SidebarHeader>
      <SidebarContent className="gap-y-0">
        <NavMain items={data.navMain} />
        <NavProjects projects={data.others} />
      </SidebarContent>
      <SidebarFooter>
        <NavUser user={data.user} />
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  );
}
