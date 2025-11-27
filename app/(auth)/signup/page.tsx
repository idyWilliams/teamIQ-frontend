'use client';
import React, { Fragment, useState } from 'react';
import OrganizationForm from '@/app/(auth)/signup/components/organization-form';
import IndividualForm from '@/app/(auth)/signup/components/individual-form';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { cn } from '@/lib/utils';

export default function SignUp() {
  const [mode, setMode] = useState('individual');
  return (
    <>
      <div className="mx-auto w-full px-1 py-1 md:px-3 md:py-2 lg:max-w-lg xl:max-w-xl">
        <h3 className="my-4 text-center text-[26px] font-semibold tracking-tight text-[#0A427B] md:my-6 md:text-[32px] lg:text-left lg:text-[#0B0B0B]">
          Sign Up
        </h3>
        <Tabs value={mode} onValueChange={setMode}>
          <TabsList className="mb-6 grid w-full grid-cols-2 gap-2 rounded-none bg-transparent p-0 shadow-none md:mb-8">
            {['individual', 'organization'].map(tab => (
              <TabsTrigger
                key={tab}
                value={tab}
                className={cn(
                  'relative rounded-none border-0 bg-transparent capitalize shadow-none',
                  'min-h-[44px] w-full min-w-0 border-b border-[#E4E7EC] px-0 py-2 text-center text-sm sm:py-3 sm:text-base',
                  'data-[state=active]:bg-transparent data-[state=active]:shadow-none',
                  'ring-0 outline-none focus-visible:ring-0 focus-visible:ring-offset-0',
                  'data-[state=active]:border-b data-[state=active]:border-[#062444] data-[state=active]:font-medium data-[state=active]:text-[#062444]'
                )}
              >
                <span className="md:hidden">
                  {tab === 'individual' ? 'user' : tab}
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
