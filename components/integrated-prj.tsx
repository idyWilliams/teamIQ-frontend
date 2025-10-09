"use client";
import React from "react";
import Image from "next/image";
import { cn } from "@/lib/utils";
import { Switch } from "@/components/ui/switch";


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


function IntegratedProject({ app }: { app: App | null }) {
  return (
    <div>
      {app?.integrations.map((integration: Integration) => (
        <div key={integration.title} className="flex items-start gap-4 my-4">
          <div className="border p-4 bg-[#0353A4] rounded-md flex items-center justify-center w-[145px] h-[88px] px-[37px] py-[36px] ">
            <Image
              src={integration.logo}
              alt={integration.title}
              width={40}
              height={40}
            />
          </div>
          <div>
            <h3>{integration.title}</h3>
            <p>{integration.description}</p>
          </div>
          <div className="ml-auto">
            <Switch
              id="airplane-mode"
              className={cn(
                `data-[state=checked]:bg-[#1581FE] data-[state=unchecked]:bg-input`
              )}
            />
          </div>
        </div>
      ))}
    </div>
  );
}

export default IntegratedProject;
