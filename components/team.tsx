'use client';

import React from 'react';
import ActiveBlockers from './active-blockers';
import { activeBlockers } from '@/constants';
import TeamPage from './team-page';

export default function Team() {
  return (
    <div className="py-6 px-4 lg:px-0">
      <div className="flex flex-col gap-6 lg:flex-row lg:items-start">
        <div className="flex-1 min-w-0">
          <TeamPage />
        </div>

        <div className="w-full shrink-0 lg:w-80">
          <ActiveBlockers blockers={activeBlockers} />
        </div>
      </div>
    </div>
  );
}
