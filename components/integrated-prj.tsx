'use client';
import React from 'react';
import Image from 'next/image';
import { cn } from '@/lib/utils';
import { Switch } from '@/components/ui/switch';

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
            <h3>{integration.title}</h3>
            <p>{integration.description}</p>
            {/* avatar displayed*/}
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
              id="airplane-mode"
              className={cn(
                `data-[state=unchecked]:bg-input data-[state=checked]:bg-[#1581FE]`
              )}
            />
          </div>
        </div>
      ))}
    </div>
  );
}

export default IntegratedProject;
