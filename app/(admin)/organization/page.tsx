"use client";

import React from "react";
import DashbordOverview from "@/components/overview";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import ProjectStatus from "@/components/project-status";
import Team from "@/components/team";

export default function OverviewPage() {
  return (
    <div className="h-full">
      <Tabs defaultValue="overview" className="h-full flex flex-col">
        <TabsList
          className="
             w-full  
            bg-transparent gap-2 p-0
            border-b border-gray-200 rounded-none grow
            border-t-0 border-l-0 border-r-0 justify-start
          "
        >
          <TabsTrigger
            value="overview"
            className="
              relative
              text-gray-600 w-fit grow-0
              data-[state=active]:text-[#086ACE]
              data-[state=active]:shadow-none
              after:absolute after:bottom-0 after:left-0 after:h-[2px] after:w-0
              after:bg-[#086ACE] after:transition-all after:duration-300
              data-[state=active]:after:w-full
              border-none rounded-none
              bg-transparent px-2 py-2
              data-[state=active]:bg-transparent 
            "
          >
            Overview
          </TabsTrigger>

          <TabsTrigger
            value="project-status"
            className="
              relative
              text-gray-600
              data-[state=active]:text-[#086ACE]
              data-[state=active]:shadow-none
              after:absolute after:bottom-0 after:left-0 after:h-[2px] after:w-0
              after:bg-[#086ACE] after:transition-all after:duration-300
              data-[state=active]:after:w-full grow-0
              border-none rounded-none
              bg-transparent px-2 py-2 w-fit
              data-[state=active]:bg-transparent
            "
          >
            Project Status
          </TabsTrigger>

          <TabsTrigger
            value="team"
            className="
              relative
              text-gray-600
              data-[state=active]:text-[#086ACE]
              data-[state=active]:shadow-none
              after:absolute after:bottom-0 after:left-0 after:h-[2px] after:w-0
              after:bg-[#086ACE] after:transition-all after:duration-300
              data-[state=active]:after:w-full
              border-none rounded-none grow-0
              bg-transparent px-2 py-2
              data-[state=active]:bg-transparent
            "
          >
            Team
          </TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="flex-1 mt-4 min-h-0">
          <div className="h-full overflow-auto">
            <DashbordOverview />
          </div>
        </TabsContent>

        <TabsContent value="project-status" className="flex-1 mt-4 min-h-0">
          <div className="h-full overflow-auto">
            <ProjectStatus />
          </div>
        </TabsContent>

        <TabsContent value="team" className="flex-1 mt-4 min-h-0">
          <div className="h-full overflow-auto">
            <Team />
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}
