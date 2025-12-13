'use client';


import React from 'react';
import DashbordOverview from '@/components/overview';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import ProjectStatus from '@/components/project-status';
import Team from '@/components/team';

export default function OverviewPage() {
  return (
    <div className="h-full">
      <Tabs defaultValue="overview" className="flex h-full flex-col px-6 ">
        <TabsList className="w-full grow justify-start  gap-2 rounded-none border-t-0 border-r-0 border-b border-l-0 border-gray-200 bg-transparent p-0">
          <TabsTrigger
            value="overview"
            className="relative w-fit grow-0 rounded-none border-none  bg-transparent px-2 py-2 text-gray-600 after:absolute after:bottom-0 after:left-0 after:h-[2px] after:w-0 after:bg-[#086ACE] after:transition-all after:duration-300 data-[state=active]:bg-transparent data-[state=active]:text-[#086ACE] data-[state=active]:shadow-none data-[state=active]:after:w-full"
          >
            Overview
          </TabsTrigger>

          <TabsTrigger
            value="project-status"
            className="relative w-fit grow-0 rounded-none border-none bg-transparent px-2 py-2 text-gray-600 after:absolute after:bottom-0 after:left-0 after:h-[2px] after:w-0 after:bg-[#086ACE] after:transition-all after:duration-300 data-[state=active]:bg-transparent data-[state=active]:text-[#086ACE] data-[state=active]:shadow-none data-[state=active]:after:w-full"
          >
            Project Status
          </TabsTrigger>

          <TabsTrigger
            value="team"
            className="relative grow-0 rounded-none border-none bg-transparent px-2 py-2 text-gray-600 after:absolute after:bottom-0 after:left-0 after:h-[2px] after:w-0 after:bg-[#086ACE] after:transition-all after:duration-300 data-[state=active]:bg-transparent data-[state=active]:text-[#086ACE] data-[state=active]:shadow-none data-[state=active]:after:w-full"
          >
            Team
          </TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="mt-4 min-h-0 flex-1">
          <div className="h-full overflow-auto">
            <DashbordOverview />
          </div>
        </TabsContent>

        <TabsContent value="project-status" className="mt-4 min-h-0 flex-1">
          <div className="h-full overflow-auto">
            <ProjectStatus />
          </div>
        </TabsContent>

        <TabsContent value="team" className="mt-4 min-h-0 flex-1">
          <div className="h-full overflow-auto">
            <Team />
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}
