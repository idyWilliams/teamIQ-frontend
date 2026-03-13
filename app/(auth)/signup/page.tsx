'use client';
import React, { useState } from 'react';
import OrganizationForm from '@/app/(auth)/signup/components/organization-form';
import IndividualForm from '@/app/(auth)/signup/components/individual-form';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { cn } from '@/lib/utils';
import { motion } from 'framer-motion';

export default function SignUp() {
  const [mode, setMode] = useState('individual');
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="mx-auto w-full px-1 py-1 md:px-3 md:py-2 lg:max-w-lg xl:max-w-xl"
    >
      <div className="mb-10 text-center lg:text-left">
        <h3 className="text-3xl font-semibold tracking-tight text-white mb-2">
          Create an account
        </h3>
        <p className="text-slate-400 text-sm">Join Team IQ to elevate your team&apos;s performance.</p>
      </div>

      <Tabs value={mode} onValueChange={setMode}>
        <TabsList className="mb-6 grid w-full grid-cols-2 gap-2 rounded-xl bg-slate-900/50 p-1 shadow-inner border border-white/5 md:mb-8">
          {['individual', 'organization'].map(tab => (
            <TabsTrigger
              key={tab}
              value={tab}
              className={cn(
                'relative rounded-lg capitalize transition-all duration-300',
                'min-h-[44px] w-full min-w-0 px-0 py-2 text-center text-sm sm:py-2 sm:text-base text-slate-400 font-medium',
                'data-[state=active]:bg-white/10 data-[state=active]:text-white data-[state=active]:shadow-md',
                'ring-0 outline-none focus-visible:ring-2 focus-visible:ring-blue-500/50 focus-visible:ring-offset-0'
              )}
            >
              <span className="md:hidden">
                {tab === 'individual' ? 'user' : tab}
              </span>
              <span className="hidden md:inline">{tab}</span>
            </TabsTrigger>
          ))}
        </TabsList>
        <div className="bg-white/5 rounded-2xl p-6 border border-white/10 shadow-xl backdrop-blur-xl [&_label]:text-slate-300 [&_input]:!bg-slate-900/50 [&_input]:!border-white/10 [&_input]:!text-white [&_input]:placeholder:text-slate-500 [&_input:focus-visible]:!border-blue-500/50 [&_h3]:text-white [&_span.text-[#0B0B0B]]:text-white [&_span.text-iq-900]:text-white [&_select]:!bg-slate-900/50 [&_select]:!text-white">
          <TabsContent value="individual" className="w-full mt-0 outline-none ring-0">
            <IndividualForm />
          </TabsContent>
          <TabsContent value="organization" className="w-full mt-0 outline-none ring-0">
            <OrganizationForm />
          </TabsContent>
        </div>
      </Tabs>
    </motion.div>
  );
}
