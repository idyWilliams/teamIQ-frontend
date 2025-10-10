'use client';
import NotificationsSettings from '@/components/notification ';
import PlanSettings from '@/components/plan';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { Suspense } from 'react';

function Settings() {
  const router = useRouter();
  const pathname = usePathname();
  const searchparams = useSearchParams();
  const activeTab = searchparams.get('tab') || 'my-details';

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
          {settingsTabDetails.map(tab => (
            <TabsTrigger
              key={tab.key}
              value={tab.key}
              className="relative w-fit rounded-none border-none bg-transparent px-2 py-2 text-gray-600 after:absolute after:bottom-0 after:left-0 after:h-[2px] after:w-0 after:bg-[#086ACE] after:transition-all after:duration-300 data-[state=active]:bg-transparent data-[state=active]:text-[#086ACE] data-[state=active]:shadow-none data-[state=active]:after:w-full"
            >
              {tab.label}
            </TabsTrigger>
          ))}
        </TabsList>

        {settingsTabDetails.map(tab => (
          <TabsContent key={tab.key} value={tab.key} className="pt-10">
            {tab.content}
          </TabsContent>
        ))}
      </Tabs>
    </section>
  );
}

//  You need to wrapper any component that uses useSearchParams in a Suspense boundary with a fallback which can be a skeleton loader
export default function SettingsPage() {
  return (
    <Suspense fallback={'Loading...'}>
      <Settings />
    </Suspense>
  );
}

const settingsTabDetails = [
  { key: 'my-details', label: 'My Details', content: <p>My Details</p> },
  {
    key: 'notifications',
    label: 'Notifications',
    content: <NotificationsSettings />,
  },
  { key: 'password', label: 'Password', content: <>Password</> },
  { key: 'plan', label: 'Plan', content: <PlanSettings /> },
];
