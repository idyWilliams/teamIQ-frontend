'use client';

import React, { ReactNode, Suspense } from 'react';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import ProfilePage from '@/components/organiztion-settings/Profile';
import TeamMemberPage from '@/components/organiztion-settings/TeamMember';
import IntegratedApps from '@/components/organiztion-settings/IntegratedApp';
import Plan from '@/components/organiztion-settings/Plan';

type TablistType = {
  label: string;
  key: string;
  content: ReactNode;
};

const tablist: TablistType[] = [
  { label: 'Profile', key: 'profile', content: <ProfilePage /> },
  { label: 'Team Members', key: 'team-members', content: <TeamMemberPage /> },
  {
    label: 'Integrated Apps',
    key: 'integrated-apps',
    content: <IntegratedApps />,
  },
  { label: 'Plan', key: 'plan', content: <Plan /> },
];

function Settings() {
  const pathname = usePathname();
  const router = useRouter();
  const searchparams = useSearchParams();
  const activeTab = searchparams.get('tab') || 'profile';

  const handleTabToggle = (value: string) => {
    const selectedTab = tablist.find(tab => tab.key === value);
    if (selectedTab) {
      router.push(`${pathname}?tab=${value}`);
    }
  };

  return (
    <section className="w-full overflow-hidden">
      <Tabs
        value={activeTab}
        onValueChange={handleTabToggle}
        className="mx-auto w-full p-0"
      >
        <TabsList className="w-full shrink-0 justify-center rounded-none border-b bg-transparent p-0">
          {tablist.map(({ key, label }) => (
            <TabsTrigger
              key={key}
              value={key}
              className="relative w-fit cursor-pointer rounded-none border-none bg-transparent px-2 py-2 text-gray-600 after:absolute after:bottom-0 after:left-0 after:h-[2px] after:w-0 after:bg-[#086ACE] after:transition-all after:duration-300 data-[state=active]:bg-transparent data-[state=active]:text-[#086ACE] data-[state=active]:shadow-none data-[state=active]:after:w-full"
            >
              {label}
            </TabsTrigger>
          ))}
        </TabsList>

        {tablist.map(({ content, key }) => (
          <TabsContent key={key} value={key} className="pt-10">
            {content}
          </TabsContent>
        ))}
      </Tabs>
    </section>
  );
}

export default function SettingsPage() {
  return (
    <Suspense fallback={'...loading'}>
      <Settings />
    </Suspense>
  );
}
