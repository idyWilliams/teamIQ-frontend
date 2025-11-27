import React from 'react';
import Image from 'next/image';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogTitle,
} from '@/components/ui/dialog';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { cn } from '@/lib/utils';
import IntegratedProject from '@/components/integrated-prj';
import Details from '@/components/details';

// App and Integration shapes used by the cards and dialog tabs.
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
 * OrgAppCard
 * Renders a responsive grid of app cards. Clicking a card opens a dialog
 * with tabs: Integrated Projects and Details. Dialog content is driven by
 * the selectedApp state.
 */

function OrgAppCard({ apps }: { apps: App[] }) {
  const [open, setOpen] = React.useState(false);
  const [selectedApp, setSelectedApp] = React.useState<null | App>(null);
  const [mode, setMode] = React.useState('integrated-projects');

  // Open dialog and set the currently selected app
  const handleOpenCard = (app: App) => {
    setSelectedApp(app);
    setOpen(true);
  };

  return (
    <>
      {/* Card grid; lower minmax width to reduce horizontal overflow on small screens */}
      <div className="grid grid-cols-[repeat(auto-fit,minmax(260px,1fr))] items-stretch gap-5">
        {apps.length > 0 ? (
          apps.map(app => (
            <div
              key={app.name}
              className="flex h-full cursor-pointer flex-col justify-between rounded-2xl p-6 shadow-md transition-shadow hover:shadow-lg"
              onClick={() => handleOpenCard(app)}
            >
              <div className="mb-3 flex items-center gap-2">
                <Image
                  src={app.logo}
                  alt={`${app.name} logo`}
                  width={29}
                  height={28}
                />
                <h3 className="text-base font-semibold">{app.name}</h3>
              </div>
              <p className="text-black-400 text-sm leading-relaxed">
                {app.description}
              </p>
            </div>
          ))
        ) : (
          <p className="text-black-800 text-center text-lg leading-relaxed">
            No apps found.
          </p>
        )}
      </div>

      <Dialog open={open} onOpenChange={setOpen}>
        {/* Dialog uses a tall content area; internal sections may scroll if needed */}
        <DialogContent
          className={cn(
            'flex h-[90vh] w-[90vw] max-w-md flex-col md:max-w-xl lg:max-w-2xl'
          )}
        >
          <div className="mb-4 flex items-center gap-4">
            <div>
              {selectedApp && (
                <Image
                  src={selectedApp.logo}
                  alt={`${selectedApp.name} logo`}
                  width={62}
                  height={60}
                />
              )}
            </div>
            <div className="space-y-1">
              <DialogTitle>{selectedApp?.name}</DialogTitle>
              <DialogDescription>{selectedApp?.description}</DialogDescription>
            </div>
          </div>
          {/* <Tabs /> */}
          <div>
            <Tabs value={mode} onValueChange={setMode}>
              <div className="w-full border-b border-gray-200">
                <TabsList
                  className={cn(
                    'flex h-10 justify-start gap-5 rounded-none bg-transparent p-0 shadow-none'
                  )}
                >
                  {['integrated-projects', 'details'].map(tab => (
                    <TabsTrigger
                      key={tab}
                      value={tab}
                      className={cn(
                        'relative rounded-none border-none bg-transparent px-0 py-2 text-sm capitalize shadow-none sm:text-base',
                        'outline-none focus-visible:ring-0 focus-visible:ring-offset-0',
                        '!shadow-none data-[state=active]:!shadow-none',
                        "after:absolute after:bottom-0 after:left-0 after:h-[2px] after:w-full after:bg-transparent after:content-['']",
                        'data-[state=active]:font-medium data-[state=active]:text-[#086ACE] data-[state=active]:after:bg-[#086ACE]'
                      )}
                    >
                      {tab === 'integrated-projects'
                        ? 'Integrated Projects'
                        : 'Details'}
                    </TabsTrigger>
                  ))}
                </TabsList>
              </div>
              <TabsContent value="integrated-projects">
                {/* Integration list for the selected app */}
                <IntegratedProject app={selectedApp} />
              </TabsContent>
              <TabsContent value="details">
                {/* App details for the selected app */}
                <Details app={selectedApp} />
              </TabsContent>
            </Tabs>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
}

export default OrgAppCard;
