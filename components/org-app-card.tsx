import React from "react";
import Image from "next/image";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogTitle,
} from "@/components/ui/dialog";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { cn } from "@/lib/utils";
import IntegratedProject from "@/components/integrated-prj";
import Details from "@/components/details";

type App = {
  name: string;
  logo: string;
  description: string;
  integrations: Integration[];
};
type Integration = {
  title: string;
  logo: string;
  description: string;
};

function OrgAppCard({ apps }: { apps: App[] }) {
  const [open, setOpen] = React.useState(false);
  const [selectedApp, setSelectedApp] = React.useState<null | App>(null);
  const [mode, setMode] = React.useState("integrated-projects");
  const handleOpenCard = (app: App) => {
    setSelectedApp(app);
    setOpen(true);
  };

  

  return (
    <>
      <div className="grid gap-5 grid-cols-[repeat(auto-fit,minmax(260px,1fr))] items-stretch">
        {apps.length > 0 ? (
          apps.map((app) => (
            <div
              key={app.name}
              className="cursor-pointer rounded-2xl shadow-md hover:shadow-lg transition-shadow flex flex-col justify-between p-6 h-full"
              onClick={() => handleOpenCard(app)}
            >
              <div className="flex items-center gap-2 mb-3">
                <Image
                  src={app.logo}
                  alt={`${app.name} logo`}
                  width={29}
                  height={28}
                />
                <h3 className="font-semibold text-base">{app.name}</h3>
              </div>
              <p className="text-black-400 text-sm leading-relaxed">
                {app.description}
              </p>
            </div>
          ))
        ) : (
          <p className="text-black-800 text-lg leading-relaxed text-center">
            No apps found.
          </p>
        )}
      </div>

      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className={cn("flex flex-col w-[90vw] max-w-md md:max-w-xl lg:max-w-2xl h-[90vh]")}>
          <div className="flex items-center gap-4 mb-4 ">
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
                    "flex gap-5 justify-start bg-transparent rounded-none shadow-none p-0 h-10"
                  )}
                >
                  {["integrated-projects", "details"].map((tab) => (
                    <TabsTrigger
                      key={tab}
                      value={tab}
                      className={cn(
                        "relative bg-transparent border-none rounded-none px-0 py-2 text-sm sm:text-base capitalize shadow-none",
                        "focus-visible:ring-0 focus-visible:ring-offset-0 outline-none",
                        "!shadow-none data-[state=active]:!shadow-none",
                        "after:content-[''] after:absolute after:left-0 after:bottom-0 after:w-full after:h-[2px] after:bg-transparent",
                        "data-[state=active]:after:bg-[#086ACE] data-[state=active]:text-[#086ACE] data-[state=active]:font-medium"
                      )}
                    >
                      {tab === "integrated-projects"
                        ? "Integrated Projects"
                        : "Details"}
                    </TabsTrigger>
                  ))}
                </TabsList>
              </div>
              <TabsContent value="integrated-projects">
                <IntegratedProject app={selectedApp} />
              </TabsContent>
              <TabsContent value="details">
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
