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
import { useProject, useMyProjectData, useComprehensiveProjectData } from '@/services/hooks/useProjectGet';
import { Progress } from '@/components/ui/progress';
import { Trophy, Target, CheckCircle2 } from 'lucide-react';

function ProjectDetails() {
  const router = useRouter();
  const pathname = usePathname();
  const searchparams = useSearchParams();
  const params = useParams();
  const activeTab = searchparams.get('tab') || 'overview';

  // Get project ID from URL params
  const projectId = params?.projectId as string;
  
  const { data: comprehensiveData, isLoading: compLoading, error: compError } = useComprehensiveProjectData(projectId);
  const { data: myData, isLoading: myDataLoading } = useMyProjectData(projectId);
  
  const project = comprehensiveData?.project;

  // Loading state
  if (compLoading || myDataLoading) {
    return (
      <div className="flex h-[400px] items-center justify-center">
        <div className="flex items-center gap-3">
          <Loader className="h-8 w-8 animate-spin text-blue-500" />
          <span className="text-lg text-gray-600">Loading your workspace...</span>
        </div>
      </div>
    );
  }

  // Error state
  if (compError || !project) {
    return (
      <div className="flex h-[400px] items-center justify-center">
        <div className="text-center">
          <AlertCircle className="mx-auto mb-4 h-12 w-12 text-red-500" />
          <h2 className="mb-2 text-xl font-bold text-red-500">
            Failed to load workspace
          </h2>
          <p className="mb-4 text-gray-600">
            {compError?.message || 'Project not found'}
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
      content: <ProjectOverview project={project} comprehensiveData={comprehensiveData} />,
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
      content: (
    <AssignedTeamMembers
      teamMembers={
        comprehensiveData?.members?.map(member => ({
          name: member.user_name,
          role: member.role,
          email: member.user_email,
          slack: member.external_mappings?.slack,
        })) || []
      }
    />
  ),
    },
  ];

  return (
    <div className="pt-4 xl:pt-0">
      {/* Personal Workspace Header */}
      <div className="mb-8 p-6 bg-gradient-to-r from-blue-600 to-indigo-700 rounded-2xl text-white shadow-lg">
        <div className="flex flex-col md:flex-row justify-between gap-6">
          <div className="flex-1">
            <h1 className="text-2xl font-bold mb-2">{project.name}</h1>
            <p className="text-blue-100 text-sm line-clamp-2 max-w-2xl">{project.description}</p>
          </div>
          
          <div className="flex flex-wrap gap-4">
            {/* Project Progress */}
            <div className="bg-white/10 backdrop-blur-md p-4 rounded-xl min-w-[160px]">
              <div className="flex items-center gap-2 mb-2 text-blue-100 text-xs font-medium uppercase tracking-wider">
                <Target size={14} />
                Project Progress
              </div>
              <div className="flex items-end justify-between mb-2">
                <span className="text-2xl font-bold">{myData?.project_progress.completed}/{myData?.project_progress.total}</span>
                <span className="text-blue-200 text-xs">Tasks</span>
              </div>
              <Progress value={((myData?.project_progress.completed || 0) / (myData?.project_progress.total || 1)) * 100} className="h-1.5 bg-white/20" />
            </div>

            {/* My Contribution */}
            <div className="bg-white/10 backdrop-blur-md p-4 rounded-xl min-w-[160px]">
              <div className="flex items-center gap-2 mb-2 text-blue-100 text-xs font-medium uppercase tracking-wider">
                <Trophy size={14} />
                My Contribution
              </div>
              <div className="text-2xl font-bold mb-1">{myData?.my_stats.contribution_percentage}%</div>
              <div className="text-blue-200 text-xs">of total project activity</div>
            </div>

            {/* Completion Rate */}
            <div className="bg-white/10 backdrop-blur-md p-4 rounded-xl min-w-[160px]">
              <div className="flex items-center gap-2 mb-2 text-blue-100 text-xs font-medium uppercase tracking-wider">
                <CheckCircle2 size={14} />
                Completion Rate
              </div>
              <div className="text-2xl font-bold mb-1">{myData?.my_stats.completion_rate}%</div>
              <div className="text-blue-200 text-xs">on-time task delivery</div>
            </div>
          </div>
        </div>
      </div>

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

