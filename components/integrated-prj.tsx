'use client';

import React from 'react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';

import { cn } from '@/lib/utils';
import { Switch } from '@/components/ui/switch';
import { Button } from '@/components/ui/button';
import { useIntegrations } from '@/context/IntegrationContext';

// App and Integration shapes used by this tab.
type App = {
  name: string;
  logo: string;
  description: string;
  integrations: Integration[];
};

type Integration = {
  title: string;
  logo: string;
  member: number;
  description: string;
};

/**
 * IntegratedProject
 * Tab content that lists integrations for the selected app.
 * Each row shows the integration logo, title/description, and a toggle switch.
 */
function IntegratedProject({ app }: { app: App | null }) {
  const router = useRouter();

  // Get connected integrations from context
const { connections, loading } = useIntegrations();
  console.log('connections:', connections);
  console.log('loading:', loading);

const hasIntegrations =
  Array.isArray(connections) && connections.length > 0;

  // Loading state
  if (loading) {
    return (
      <div className="flex items-center justify-center py-10">
        <p className="text-sm text-muted-foreground">
          Checking integrations...
        </p>
      </div>
    );
  }

  // Empty integrations CTA state
  if (!hasIntegrations) {
    return (
      <div className="flex flex-col items-center justify-center rounded-xl border border-dashed border-gray-300 bg-gray-50 px-6 py-12 text-center">
        <div className="mb-4 rounded-full bg-blue-100 p-4">
          <span className="icon-[mdi--connection] text-3xl text-blue-600" />
        </div>

        <h3 className="mb-2 text-lg font-semibold text-gray-900">
          No Integrations Connected
        </h3>

        <p className="mb-6 max-w-md text-sm text-gray-600">
          You need to connect at least one integration before creating a
          project.
        </p>

        <Button
          onClick={() =>
            router.push('/organization/settings?tab=integrated-apps')
          }
          className="bg-[#1581FE] hover:bg-[#0F6FDB]"
        >
          Go to Integrations
        </Button>
      </div>
    );
  }

  // Existing integrations UI
  return (
    <div>
      {app?.integrations.map((integration: Integration) => (
        <div key={integration.title} className="my-4 flex items-start gap-4">
          {/* Logo container */}
          <div className="flex h-[88px] w-[145px] items-center justify-center rounded-md border bg-[#0353A4] p-4 px-[37px] py-[36px]">
            <Image
              src={integration.logo}
              alt={integration.title}
              width={40}
              height={40}
            />
          </div>

          {/* Integration text */}
          <div>
            <h3 className="font-medium">{integration.title}</h3>

            <p className="text-sm text-gray-600">
              {integration.description}
            </p>

            {/* avatar displayed */}
            <div className="mt-1 flex items-center gap-1.5">
              <div className="flex -space-x-1.5">
                {Array.from({ length: 3 }).map((_, i) => (
                  <Image
                    key={i}
                    width={30}
                    height={30}
                    src={`https://i.pravatar.cc/40?img=${i + 3}`}
                    alt={`Team member ${i + 1}`}
                    className="h-6 w-6 rounded-full border-2 border-white bg-gray-200 object-cover"
                  />
                ))}
              </div>

              <span className="text-xs font-medium text-gray-700">
                +{integration.member}
              </span>
            </div>
          </div>

          {/* Toggle aligned to the far right */}
          <div className="ml-auto">
            <Switch
              id={`integration-${integration.title}`}
              className={cn(
                'data-[state=unchecked]:bg-input data-[state=checked]:bg-[#1581FE]'
              )}
            />
          </div>
        </div>
      ))}
    </div>
  );
}

export default IntegratedProject;