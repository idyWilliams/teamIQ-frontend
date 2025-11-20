'use client';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { Suspense } from 'react';

import React from 'react';
import OrgTeamOverviewTab from '@/components/org.overview';

function TeamPage() {
  const router = useRouter();
  const pathname = usePathname();
  const searchparams = useSearchParams();
  const activeTab = searchparams.get('tab') || 'overview';

  return (
    <section className="">
      <Tabs
        value={activeTab}
        onValueChange={(value: string) =>
          router.push(`${pathname}?tab=${value}`)
        }
        className="w-full p-0"
      >
        <TabsList className="w-full grow justify-start rounded-none border-b bg-transparent p-0">
          {['overview', 'team'].map(tab => (
            <TabsTrigger
              key={tab}
              value={tab}
              className="relative w-fit grow-0 cursor-pointer rounded-none border-none bg-transparent px-3 py-2 text-gray-600 capitalize after:absolute after:bottom-0 after:left-0 after:h-[2px] after:w-0 after:bg-[#086ACE] after:transition-all after:duration-300 data-[state=active]:bg-transparent data-[state=active]:text-[#086ACE] data-[state=active]:shadow-none data-[state=active]:after:w-full"
            >
              {tab === 'team' ? 'Team Members' : 'Overview'}
            </TabsTrigger>
          ))}
        </TabsList>

        <TabsContent value="overview" className="pt-6">
          <OrgTeamOverviewTab />
        </TabsContent>

        <TabsContent value="team" className="pt-6"></TabsContent>
      </Tabs>
    </section>
  );
}

export default function TeamPageWrapper() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <TeamPage />
    </Suspense>
  );
}
