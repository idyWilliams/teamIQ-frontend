'use client';

import * as React from 'react';
import {
  AudioWaveform,
  Brain,
  Command,
  GalleryVerticalEnd,
  LogOut,
} from 'lucide-react';
import { NavProjects } from '@/components/nav-projects';
import NavSettings from './NavSettings';

import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarRail,
} from '@/components/ui/sidebar';
import { Button } from './ui/button';
import { useAuthStore } from '@/store/useAuthStore';
import Link from 'next/link';
import IdentificationBadge from '@/components/icons/IdentificationBadge';
import IdCardOutlined from '@/components/icons/IdCardOutlined';
import UserGroup from '@/components/icons/UserGroup';
import Solana from '@/components/icons/Solana';
import Settings from '@/components/icons/Settings';
import Grid from '@/components/icons/Grid';

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
      icon: IdentificationBadge,
      name: 'Dashboard',
      url: '/organization',
    },
    {
      icon: IdCardOutlined,
      name: 'Projects',
      url: '/organization/projects',
    },
    {
      icon: UserGroup,
      name: 'Team',
      url: '/organization/team',
    },
    {
      icon: Solana,
      name: 'Team Matrix',
      url: '/organization/team-matrix',
    },
    { icon: Grid, name: 'Apps', url: '/organization/app' },
  ],
  settings: [
    {
      icon: Settings,
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

interface LogoProps {
  label: string;
}

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  const { logout } = useAuthStore();

  return (
    <Sidebar
      collapsible="icon"
      className="border-r border-gray-200 bg-white"
      {...props}
    >
      <SidebarHeader>
        <Link
          href="/organization"
          className="flex items-center gap-3 px-4 py-2 text-xl font-bold text-blue-500 group-data-[collapsible=icon]:justify-center"
        >
          <Brain className="shrink-0" />

          <span className="group-data-[collapsible=icon]:hidden">TeamIQ</span>
        </Link>
      </SidebarHeader>

      <SidebarContent className="mt-2 gap-y-0">
        {/* <NavMain items={data.navMain} /> */}
        <NavProjects projects={data.others} />
        <NavSettings settings={data.settings} />
      </SidebarContent>

      <SidebarFooter className="border-t border-gray-100 py-3">
        <Button onClick={() => logout()}>
          <LogOut className="shrink-0" />
          <span className="group-data-[collapsible=icon]:hidden">Log out</span>
        </Button>
      </SidebarFooter>

      <SidebarRail />
    </Sidebar>
  );
}
