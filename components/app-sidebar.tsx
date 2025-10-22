'use client';

import * as React from 'react';
import { AudioWaveform, Command, GalleryVerticalEnd } from 'lucide-react';
import { NavMain } from '@/components/nav-main';
import { NavProjects } from '@/components/nav-projects';
import NavSettings from './NavSettings';
import { NavUser } from '@/components/nav-user';
import { TeamSwitcher } from '@/components/team-switcher';
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarRail,
} from '@/components/ui/sidebar';

const data = {
  user: {
    name: 'shadcn',
    email: 'm@example.com',
    avatar: '/avatars/shadcn.jpg',
  },
  teams: [
    {
      name: 'Acme Inc',
      logo: GalleryVerticalEnd,
      plan: 'Enterprise',
    },
    {
      name: 'Acme Corp.',
      logo: AudioWaveform,
      plan: 'Startup',
    },
    {
      name: 'Evil Corp.',
      logo: Command,
      plan: 'Free',
    },
  ],
  // navMain: [
  //   {
  //     icon: 'icon-[ph--identification-badge]',
  //     title: 'Dashboard',
  //     url: '/organization',
  //   },
  //   {
  //     icon: 'icon-[ant-design--idcard-outlined]',
  //     name: 'Projects',
  //     url: '/organization/projects',
  //   },
  //   {
  //     icon: 'icon-[hugeicons--user-group]',
  //     name: 'Team',
  //     url: '/organization/team',
  //   },
  //   {
  //     icon: 'icon-[formkit--solana]',
  //     name: 'Team Matrix',
  //     url: '/organization/team-matrix',
  //   },
  //   { icon: 'icon-[proicons--grid]', name: 'Apps', url: '/organization/app' },
  // ],
  others: [
    {
      icon: 'icon-[ph--identification-badge]',
      name: 'Dashboard',
      url: '/organization',
    },
    {
      icon: 'icon-[ant-design--idcard-outlined]',
      name: 'Projects',
      url: '/organization/projects',
    },
    {
      icon: 'icon-[hugeicons--user-group]',
      name: 'Team',
      url: '/organization/team',
    },
    {
      icon: 'icon-[formkit--solana]',
      name: 'Team Matrix',
      url: '/organization/team-matrix',
    },
    { icon: 'icon-[proicons--grid]', name: 'Apps', url: '/organization/app' },
  ],
  settings: [
    {
      icon: 'icon-[ep--setting]',
      title: 'Settings',
      url: '/organization/settings',
      items: [
        { title: 'Profile', url: '/organization/settings?tab=profile' },
        {
          title: 'Team Members',
          url: '/organization/settings?tab=team-members',
        },
        {
          title: 'Integrated Apps',
          url: '/organization/settings?tab=integrated-apps',
        },
        { title: 'Plan', url: '/organization/settings?tab=plan' },
      ],
    },
  ],
};

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  return (
    <Sidebar
      collapsible="icon"
      className="border-r border-gray-200 bg-white"
      {...props}
    >
      <SidebarHeader className="border-b border-gray-100 py-3">
        <TeamSwitcher teams={data.teams} />
      </SidebarHeader>

      <SidebarContent className="mt-2 gap-y-0">
        {/* <NavMain items={data.navMain} /> */}
        <NavProjects projects={data.others} />
        <NavSettings settings={data.settings} />
      </SidebarContent>

      <SidebarFooter className="border-t border-gray-100 py-3">
        <NavUser user={data.user} />
      </SidebarFooter>

      <SidebarRail />
    </Sidebar>
  );
}
