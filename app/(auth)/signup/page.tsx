"use client";
import React, { Fragment, useState } from "react";
import OrganizationForm from "@/components/sign-up-form/organization-form";
import IndividualForm from "@/components/sign-up-form/individual-form";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { cn } from "@/lib/utils";

export default function SignUp() {
  const [mode, setMode] = useState("individual");
  return (
    <>
      <div className="max-w-lg w-full py-11 px-4">
        <h3 className="text-[#0A427B] font-medium text-4xl mb-10">Sign up</h3>
        <Tabs defaultValue={mode}>
          <TabsList className="bg-transparent  border-b border-grey-200 mb-8 flex w-full rounded-none p-0">
            {["individual", "organization"].map((tab) => (
              <TabsTrigger
                key={tab}
                value={tab}
                onClick={() => setMode(tab)}
                className={cn(
                  "bg-transparent border-0 rounded-none shadow-none capitalize",
                  "data-[state=active]:border-b-2 data-[state=active]:border-[#062444] data-[state=active]:font-medium"
                )}
              >
                <span className="capitalize">{tab}</span>
              </TabsTrigger>
            ))}
          </TabsList>
          <TabsContent value="individual">
            <IndividualForm />
          </TabsContent>
          <TabsContent value="organization">
            <OrganizationForm />
          </TabsContent>
        </Tabs>
      </div>
    </>
  );
}
