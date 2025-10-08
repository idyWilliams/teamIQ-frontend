"use client";

import React from "react";
import { useSearchParams, useRouter } from "next/navigation";
import DashbordOverview from "@/components/overview";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import ProjectStatus from "@/components/project-status";
import Team from "@/components/team";

export default function OverviewPage() {
  const searchParams = useSearchParams();
  const router = useRouter();

  const activeTab = searchParams.get("tab") || "overview";

  const handleTabChange = (value: string) => {
    const params = new URLSearchParams(searchParams.toString());
    params.set("tab", value);
    router.replace(`?${params.toString()}`, { scroll: false });
  };

  return (
    <div className="h-full">
      <Tabs
        value={activeTab}
        onValueChange={handleTabChange}
        className="h-full flex flex-col"
      >
        <TabsList
          className="
            grid w-full max-w-md grid-cols-3 shrink-0
            bg-transparent gap-2 p-0
            border-b border-gray-200
            border-t-0 border-l-0 border-r-0
          "
        >
          <TabsTrigger
            value="overview"
            className="
              relative
              text-gray-600
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
              data-[state=active]:after:w-full
              border-none rounded-none
              bg-transparent px-2 py-2
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
              border-none rounded-none
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