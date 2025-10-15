import { ReactNode } from 'react';
import {
  BookUser,
  FolderOpenDot,
  UsersRound,
  Sparkles,
  Settings,
} from 'lucide-react';

export type SidebarLinkType = {
  label: string;
  icon?: ReactNode;
  url: string;
  children?: SidebarLinkType[];
  dynamicChildren?: (projectId: string) => SidebarLinkType[];
};

export const sidebarLinks: SidebarLinkType[] = [
  {
    label: 'Dashboard',
    icon: <BookUser />,
    url: '/member',
  },
  {
    label: 'Projects',
    icon: <FolderOpenDot />,
    url: '/member/projects',
    dynamicChildren: (projectId: string) => [
      {
        label: 'Project Overview',
        url: `/member/projects/${projectId}?tab=overview`,
      },
      { label: 'Tasks', url: `/member/projects/${projectId}?tab=tasks` },
      {
        label: 'Assigned Team Members',
        url: `/member/projects/${projectId}?tab=assign-team-member`,
      },
    ],
  },
  {
    label: 'Tasks',
    icon: <UsersRound />,
    url: '/member/tasks',
  },

  { label: 'My Skills', icon: <Sparkles />, url: '/member/my-skills' },
  {
    label: 'Settings',
    icon: <Settings />,
    url: '/member/settings',
    children: [
      { label: 'My Details', url: '/member/settings?tab=my-details' },
      { label: 'Notifications', url: '/member/settings?tab=notifications' },
      { label: 'Password', url: '/member/settings?tab=password' },
      { label: 'Plan', url: '/member/settings?tab=plan' },
    ],
  },
];
