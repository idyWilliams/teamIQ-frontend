// app/(admin)/organization/settings/page.tsx
'use client';

import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { Suspense } from 'react';
import SettingIntergratedApp from '@/app/(admin)/organization/settings/components/intergratedApp';
import TeamMemberTab from '@/app/(admin)/organization/settings/components/TeamMember';
import PlanSettings from '@/components/plan';
import OrganisationProfileTab from '@/app/(admin)/organization/settings/components/OrgProfileTab';
import { IntegrationProvider } from '@/context/IntegrationContext';
import { useAuthStore } from '@/store/useAuthStore';
import OrgIntegrationCredentialsTab from './components/OrgIntegrationCredentialsTab';

function Settings() {
  const router = useRouter();
  const pathname = usePathname();
  const searchparams = useSearchParams();
  const activeTab = searchparams.get('tab') || 'profile';

  const organizationId = useAuthStore(state => state.user?.id);

  return (
    <IntegrationProvider organizationId={organizationId}>
      <section className="">
        <Tabs
          value={activeTab}
          onValueChange={(value: string) =>
            router.push(`${pathname}?tab=${value}`)
          }
          className="w-full p-0"
        >
          <TabsList className="w-full grow justify-start rounded-none border-b bg-transparent p-0">
            {tabList.map(tab => (
              <TabsTrigger
                key={tab.key}
                value={tab.key}
                className="relative w-fit rounded-none border-none bg-transparent px-2 py-2 text-gray-600 after:absolute after:bottom-0 after:left-0 after:h-[2px] after:w-0 after:bg-[#086ACE] after:transition-all after:duration-300 data-[state=active]:bg-transparent data-[state=active]:text-[#086ACE] data-[state=active]:shadow-none data-[state=active]:after:w-full"
              >
                {tab.label}
              </TabsTrigger>
            ))}
          </TabsList>

          {tabList.map(tab => (
            <TabsContent key={tab.key} value={tab.key} className="pt-10">
              {tab.content}
            </TabsContent>
          ))}
        </Tabs>
      </section>
    </IntegrationProvider>
  );
}

export default function SettingsPage() {
  return (
    <Suspense fallback={'Loading...'}>
      <Settings />
    </Suspense>
  );
}

const tabList = [
  {
    label: 'Profile',
    key: 'profile',
    path: '/organization/settings/profile',
    content: <OrganisationProfileTab />,
  },
  {
    label: 'Team Members',
    key: 'team-members',
    path: '/organization/settings/team-members',
    content: <TeamMemberTab />,
  },
  {
    label: 'Integrated Apps',
    key: 'integrated-apps',
    path: '/organization/settings/integrated-apps',
    content: <SettingIntergratedApp />,
  },
  {
    label: 'Plan',
    key: 'plan',
    path: '/organization/settings/plan',
    content: <PlanSettings />,
  },
  {
    label: 'Integration Credentials',
    key: 'integration-credentials',
    content: <OrgIntegrationCredentialsTab />, 
  },
];
