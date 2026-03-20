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
        <TabsList className="mb-6 flex w-full rounded-xl bg-slate-900/50 p-1 border border-white/5 overflow-hidden md:mb-8">
          {['individual', 'organization'].map(tab => (
            <TabsTrigger
              key={tab}
              value={tab}
              className={cn(
                "flex-1 relative z-10 rounded-lg px-3 py-2 text-sm sm:text-base font-medium transition-all duration-300",
                "text-slate-400",
                "data-[state=active]:bg-slate-800 data-[state=active]:text-white",
                "data-[state=active]:shadow-sm",
                "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500/50"
              )}
            >
              <span className="md:hidden">
                {tab === 'individual' ? 'user' : tab}
              </span>
              <span className="hidden md:inline">{tab}</span>
            </TabsTrigger>
          ))}
        </TabsList>
        <div className="bg-white/5 rounded-2xl p-6 border border-white/10 shadow-xl backdrop-blur-xl overflow-hidden relative [&_label]:text-slate-300 [&_input]:!bg-slate-900/50 [&_input]:!border-white/10 [&_input]:!text-white [&_input]:placeholder:text-slate-500 [&_input:focus-visible]:!border-blue-500/50 [&_h3]:text-white [&_span.text-[#0B0B0B]]:text-white [&_span.text-iq-900]:text-white [&_select]:!bg-slate-900 [&_select]:!text-white [&_select]:!border-white/10 [&_select]:!text-white">
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
