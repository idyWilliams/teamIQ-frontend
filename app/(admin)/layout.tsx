import { AppSidebar } from "@/components/app-sidebar";
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";
import Image from "next/image";
import { Label } from "@/components/ui/label";
import { Search } from "lucide-react";
import { SidebarInput, SidebarTrigger } from "@/components/ui/sidebar";
import { Separator } from "@/components/ui/separator";

export default function OrganizationDashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <SidebarProvider>
      <AppSidebar />
      <SidebarInset className="flex flex-row h-screen overflow-hidden">
        <div className="grow flex flex-col min-h-0 overflow-hidden">
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
          
          {/* 1. overflow-auto; 2. min-w-full,w-max */}
          <div className="flex-1 min-h-0 overflow-y-auto overflow-x-hidden hide-scrollbar">
            <div className="w-full">{children}</div>
          </div>
        </div>
       
        <div className="w-[20%] h-full border-l shrink-0 bg-background overflow-auto hide-scrollbar">
          <div className="p-4">
            <p className="text-sm text-muted-foreground">Notification</p>
          </div>
        </div>
      </SidebarInset>
    </SidebarProvider>
  );
}