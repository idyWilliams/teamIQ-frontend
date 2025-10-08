"use client";

import React from "react";
import { useSearchParams, useRouter } from "next/navigation";
import ProjectOverview from "./project-overview/page";
import Task from "./task/page";
import AssignTeamMember from "./assign-team-member/page";
import { projectTabsDetails } from "@/components/user-dashboard-component/data/ProjectTabsDetails";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

export default function ProjectDetails() {
  const searchParams = useSearchParams();
  const router = useRouter();

  const activeTab = searchParams.get("tab") || "overview";

  const handleTabChange = (value: string) => {
    const params = new URLSearchParams(searchParams.toString());
    params.set("tab", value);
    router.replace(`?${params.toString()}`);
  };

  return (
    <div className="h-full">
      <Tabs
        value={activeTab}
        onValueChange={handleTabChange}
        className="flex flex-col h-full w-full"
      >
        <TabsList
          className="flex items-center justify-start gap-2
       shrink-0 bg-transparent rounded-none p-0 border-b border-gray-200
      border-t-0 border-r-0 border-l-0 w-full"
        >
          {projectTabsDetails.map((tab) => (
            <TabsTrigger
              key={tab.value}
              value={tab.value}
              className="relative flex-[0] text-gray-600
               data-[state=active]:text-[#086ACE]
                 data-[state=active]:shadow-none after:absolute
             after:bottom-0 after:left-0 after:h-[2px] after:w-0
             after:bg-[#086ACE] after:transition-all after:duration-300
             data-[state=active]:after:w-full border-none 
             bg-transparent py-2 px-2 data-[state-active]:bg-transparent w-fit"
            >
              {tab.label}
            </TabsTrigger>
          ))}
        </TabsList>

        <TabsContent value="overview" className="flex-1 mt-4 min-h-0">
          <ProjectOverview />
        </TabsContent>

        <TabsContent value="task" className="flex-1 mt-4 min-h-0">
          <Task />
        </TabsContent>

        <TabsContent value="team" className="flex-1 mt-4 min-h-0">
          <AssignTeamMember />
        </TabsContent>
      </Tabs>
    </div>
  );
}
