import Image from "next/image";
import React from "react";
import { Label } from "@/components/ui/label";
import { Search } from "lucide-react";
import { SidebarInput, SidebarTrigger } from "@/components/ui/sidebar";
import { Separator } from "@/components/ui/separator";
import ProjectStatus from "@/components/project-status";

export default function OverviewPage() {
  return (
    <>
      <div className="grow">
        <header className="h-16 shrink-0 items-center gap-2 transition-[width,height] ease-linear group-has-data-[collapsible=icon]/sidebar-wrapper:h-12">
          <div className="flex items-center gap-2 px-4">
            <SidebarTrigger className="-ml-1" />
            <Separator
              orientation="vertical"
              className="mr-2 data-[orientation=vertical]:h-4"
            />
            <div className="flex grow justify-between items-center">
              <div className="flex gap-3 items-center py-3">
                <Image
                  src="/images/avatar.jpg"
                  alt="avatar"
                  width={100}
                  height={100}
                  priority
                  className="rounded-full object-center object-cover size-6"
                />
                <span>Isentry Technology</span>
              </div>
              <div className="relative">
                <Label htmlFor="search" className="sr-only">
                  Search
                </Label>
                <SidebarInput
                  id="search"
                  placeholder="Type to search..."
                  className="h-8 pl-7"
                />
                <Search className="pointer-events-none absolute top-1/2 left-2 size-4 -translate-y-1/2 opacity-50 select-none" />
              </div>
            </div>
          </div>
        </header>
        <div className="flex flex-1 flex-col gap-4 p-4 pt-0">
          <div className="grid auto-rows-min gap-4 md:grid-cols-3">
            <div className="bg-muted/50 aspect-video rounded-xl" />
            <div className="bg-muted/50 aspect-video rounded-xl" />
            <div className="bg-muted/50 aspect-video rounded-xl" />
          </div>
          <div className="bg-muted/50 min-h-[100vh] flex-1 rounded-xl md:min-h-min" />
        </div>
        {/* <ProjectStatus /> */}
      </div>
      <div className=" w-[300px] h-full border-l"></div>
    </>
  );
}
