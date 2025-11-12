'use client';
import React from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { Suspense } from 'react';
import AssignedTeamMembers from '@/app/(user)/member/projects/components/assigned-team-member';
import ProjectOverview from '@/components/project-overview';

function ProjectDetails() {
  const router = useRouter();
  const pathname = usePathname();
  const searchparams = useSearchParams();
  const activeTab = searchparams.get('tab') || 'overview';

  return (
    <div>
      <Tabs
        value={activeTab}
        onValueChange={(value: string) =>
          router.push(`${pathname}?tab=${value}`)
        }
        className="w-full p-0"
      >
        <TabsList className="w-full grow justify-start rounded-none border-b bg-transparent p-0">
          {projectsTabs.map(tab => (
            <TabsTrigger
              key={tab.value}
              value={tab.value}
              className="relative w-fit rounded-none border-none bg-transparent px-2 py-2 text-gray-600 after:absolute after:bottom-0 after:left-0 after:h-[2px] after:w-0 after:bg-[#086ACE] after:transition-all after:duration-300 data-[state=active]:bg-transparent data-[state=active]:text-[#086ACE] data-[state=active]:shadow-none data-[state=active]:after:w-full"
            >
              {tab.label}
            </TabsTrigger>
          ))}
        </TabsList>

        {projectsTabs.map(tab => (
          <TabsContent key={tab.value} value={tab.value} className="pt-10">
            {tab.content}
          </TabsContent>
        ))}
      </Tabs>
    </div>
  );
}

function ProjectWrapper() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <ProjectDetails />
    </Suspense>
  );
}

export default ProjectWrapper;

const projectsTabs = [
  {
    label: 'Project Overview',
    href: '/member/projects?tab=overview',
    value: 'overview',
    content: <ProjectOverview />,
  },
  {
    label: 'Tasks',
    href: '/member/projects?tab=tasks',
    value: 'tasks',
    content: <h1>Task</h1>,
  },
  {
    label: 'Assign Team Member',
    href: '/member/projects?tab=assign-team-member',
    value: 'assign-team-member',
    content: <AssignedTeamMembers />,
  },
];
