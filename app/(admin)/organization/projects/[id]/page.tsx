"use client";

import React from "react";
import { useParams } from "next/navigation";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import ProjectOverview from "@/components/project-overview";

export default function ProjectDetails() {
  const { id } = useParams();

  return (
    <div className="h-full p-4">
      {/* =================== TABS =================== */}
      <Tabs defaultValue="overview" className="h-full flex flex-col">
        <TabsList
          className="
            w-full  
            bg-transparent gap-2 p-0
            border-b border-gray-200 rounded-none grow
            justify-start
          "
        >
          <TabsTrigger
            value="overview"
            className="
              relative text-gray-600 w-fit grow-0
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
            Project Overview
          </TabsTrigger>

          <TabsTrigger
            value="project-status"
            className="
              relative text-gray-600
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
            Task Allocations
          </TabsTrigger>

          <TabsTrigger
            value="team"
            className="
              relative text-gray-600
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
            Assigned Team Members
          </TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="flex-1 mt-4 min-h-0">
          <div className="h-full overflow-auto">
            <ProjectOverview id={String(id)} edit={true} />
          </div>
        </TabsContent>

        <TabsContent value="project-status" className="flex-1 mt-4 min-h-0">
          <div className="h-full overflow-auto">
            {/* Add task allocations view here */}
          </div>
        </TabsContent>

        <TabsContent value="team" className="flex-1 mt-4 min-h-0">
          <div className="h-full overflow-auto">
            {/* Add team members view here */}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}
