"use client";

import React, { ReactNode } from "react";
import { usePathname, useRouter} from "next/navigation";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import ProfilePage from "./profile/page";
import TeamMemberPage from "./team-members/page";
import IntegratedApps from "./integrated-apps/page";
import Plan from "./plan/page";


type TablistType = {
  label: string;
  key: string;
  path: string;
  content: ReactNode;
}

const tablist: TablistType[] = [
  {label: "Profile", key: "profile", path: "/organization/settings/profile", content: <ProfilePage/>},
  {label: "Team Members", key: "team-members", path: "/organization/settings/team-members", content: <TeamMemberPage/>},
  {label: "Integrated Apps", key: "integrated-apps", path: "/organization/settings/integrated-apps", content: <IntegratedApps/>},
  {label: "Plan", key: "plan", path: "/organization/settings/plan", content: <Plan/>},
]

export default function SettingsLayout({children}:{children: ReactNode}) {
  const pathname = usePathname();
  const router = useRouter();


  const activeTab = () => {
    const currentTab = tablist.find((tab) => pathname === tab.path);
    return (currentTab?.key || tablist[0].key)
   }
  
  
   const handleTabToggle = (value: string) => {
      const selectedTab = tablist.find((tab) => tab.key === value);
      if(selectedTab){
        router.push(selectedTab.path)
      }
   }


  return<section className="w-full overflow-hidden">
  <Tabs value={activeTab()} onValueChange={handleTabToggle} className="w-full p-0 mx-auto">
    <TabsList  className="w-full shrink-0 justify-center 
    rounded-none border-b bg-transparent p-0">
      {tablist.map(({key, label}) => (
        <TabsTrigger
          key={key}
          value={key}
          className="relative w-fit
          rounded-none border-none bg-transparent 
          px-2 py-2 text-gray-600 after:absolute
          after:bottom-0 after:left-0 after:h-[2px] 
          after:w-0 after:bg-[#086ACE] after:transition-all 
          after:duration-300 data-[state=active]:bg-transparent
          data-[state=active]:text-[#086ACE] data-[state=active]:shadow-none
          data-[state=active]:after:w-full"
        >
          {label}
        </TabsTrigger>
      ))}
    </TabsList>
      
    {tablist.map(({content,key}) => (
      <TabsContent key={key} value={key} className="pt-10">
        {content}
      </TabsContent>
    ))}
  </Tabs>
</section>
}

