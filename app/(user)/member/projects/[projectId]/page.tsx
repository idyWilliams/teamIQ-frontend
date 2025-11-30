'use client';
import React from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import {
  useParams,
  usePathname,
  useRouter,
  useSearchParams,
} from 'next/navigation';
import { Loader, AlertCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Suspense } from 'react';
import AssignedTeamMembers from '@/app/(user)/member/projects/components/assigned-team-member';
import ProjectOverview from '@/components/project-overview';
import { useProject } from '@/services/hooks/useProjectGet';

function ProjectDetails() {
  const router = useRouter();
  const pathname = usePathname();
  const searchparams = useSearchParams();
   const params = useParams();
  const activeTab = searchparams.get('tab') || 'overview';

  // Get project ID from URL params
  const projectId = params?.projectId as string;
  
  const { data: project, isLoading, error } = useProject(projectId);
  console.log('data', project);

  // Loading state
    if (isLoading) {
      return (
        <div className="flex h-[400px] items-center justify-center">
          <div className="flex items-center gap-3">
            <Loader className="h-8 w-8 animate-spin text-blue-500" />
            <span className="text-lg text-gray-600">Loading project...</span>
          </div>
        </div>
      );
    }
  
    // Error state
    if (error || !project) {
      return (
        <div className="flex h-[400px] items-center justify-center">
          <div className="text-center">
            <AlertCircle className="mx-auto mb-4 h-12 w-12 text-red-500" />
            <h2 className="mb-2 text-xl font-bold text-red-500">
              Failed to load project
            </h2>
            <p className="mb-4 text-gray-600">
              {error?.message || 'Project not found'}
            </p>
            <Button onClick={() => router.back()}>Go Back</Button>
          </div>
        </div>
      );
    }
  

  const projectsTabs = [
    {
      label: 'Project Overview',
      href: '/member/projects?tab=overview',
      value: 'overview',
      content: <ProjectOverview project={project} />,
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

  return (
    <div className="pt-4 xl:pt-0">
      <Tabs
        value={activeTab}
        onValueChange={(value: string) =>
          router.push(`${pathname}?tab=${value}`)
        }
        className="w-full p-0"
      >
        <TabsList className="w-full grow justify-start rounded-none border-b bg-transparent p-0 ease-in-out">
          {projectsTabs.map(tab => (
            <TabsTrigger
              key={tab.value}
              value={tab.value}
              className="relative w-fit grow-0 rounded-none border-none bg-transparent py-2 text-gray-600 after:absolute after:bottom-0 after:left-0 after:h-[2px] after:w-0 after:bg-[#086ACE] after:transition-all after:duration-300 data-[state=active]:bg-transparent data-[state=active]:text-[#086ACE] data-[state=active]:shadow-none data-[state=active]:after:w-full md:px-8"
            >
              {tab.label}
            </TabsTrigger>
          ))}
        </TabsList>

        {projectsTabs.map(tab => (
          <TabsContent key={tab.value} value={tab.value} className="pt-6">
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

