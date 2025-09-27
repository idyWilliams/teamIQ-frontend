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
      <div className=" mx-auto max-w-lg w-full md:py-11 md:px-8 py-6 px-8">
        <h3 className="text-[#0A427B] font-medium text-[28px] md:text-[32px] md:text-[#0B0B0B] my-4 md:my-6 text-center md:text-left ">
          Sign up
        </h3>
        <Tabs value={mode} onValueChange={setMode}>
          <TabsList className="bg-transparent  mb-6 md:mb-8 grid grid-cols-2 rounded-none shadow-none p-0 gap-2 w-full">
            {["individual", "organization"].map((tab) => (
              <TabsTrigger
                key={tab}
                value={tab}
                className={cn(
                  "bg-transparent border-0 rounded-none shadow-none capitalize",
                  "border-b border-[#E4E7EC] py-3 px-0 w-full text-center text-sm sm:text-base min-w-0",
                  "data-[state=active]:shadow-none data-[state=active]:bg-transparent ",
                  "focus-visible:ring-0 focus-visible:ring-offset-0 ring-0 outline-none",
                  "data-[state=active]:border-b data-[state=active]:border-[#062444] data-[state=active]:font-medium data-[state=active]:text-[#062444]"
                )}
              >
                <span className="md:hidden">
                  {tab === "individual" ? "user" : tab}
                </span>
                <span className="hidden md:inline">{tab}</span>
              </TabsTrigger>
            ))}
          </TabsList>
          <TabsContent value="individual" className="w-full">
            <IndividualForm />
          </TabsContent>
          <TabsContent value="organization" className="w-full">
            <OrganizationForm />
          </TabsContent>
        </Tabs>
      </div>
    </>
  );
}
