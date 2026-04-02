'use client';

import React from 'react';
import CardItem from './cardItem';
import ChartLineDefault from './chart-line';
import ActiveBlockers from './active-blockers';
import { WaveProgressCard } from './wave-progress';
import { activeBlockers } from '@/constants';
import { useOrganizationUsers } from '@/services/hooks/useUsers';
import { useProjects } from '@/services/hooks/useProjectGet';

const DashboardOverview = () => {
  const { data: users, isLoading, error } = useOrganizationUsers();
  const { data: apiProjects } = useProjects();

  // Dynamic dashboard cards based on real data
  const dashboardCards = [
    { 
      title: "Team Members", 
      avatarUrl: "images/team-member.svg", 
      content: users ? `${users.length}` : "0",
      trend: "+12%"
    },
    { 
      title: "Active Projects", 
      avatarUrl: "images/active-task.svg", 
      content: apiProjects ? `${apiProjects.length}` : "0",
      trend: "+5%"
    },
    {
      title: "Completed Projects",
      avatarUrl: "images/completed-task.svg",
      content: apiProjects ? `${apiProjects.filter((p: any) => p.status === 'completed').length}` : "0",
      trend: "+8%"
    },
    {
      title: "Pending Projects",
      avatarUrl: "images/pending-task.svg",
      content: apiProjects ? `${apiProjects.filter((p: any) => p.status === 'pending').length}` : "0",
      trend: "-2%"
    },
    { 
      title: "Unassigned Tasks", 
      avatarUrl: "images/pending-task.svg", 
      content: "5",
      trend: "+0%"
    },
  ];

  if (isLoading) {
    return (
      <div className="flex min-h-[400px] items-center justify-center">
        <div className="flex flex-col items-center gap-2">
          <div className="size-8 animate-spin rounded-full border-2 border-[#086ACE] border-t-transparent" />
          <p className="text-sm text-gray-500 font-medium">Loading intelligence data...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex min-h-[400px] items-center justify-center">
        <div className="rounded-xl border border-red-100 bg-red-50 p-6 text-center">
          <p className="text-sm font-semibold text-red-800">Error loading dashboard</p>
          <p className="mt-1 text-xs text-red-600 opacity-80">Please check your connection or try again later.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6 py-6 px-4 lg:px-0">
      {/* Dashboard cards */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5">
        {dashboardCards.map((card, i) => (
          <CardItem key={i} {...card} />
        ))}
      </div>

      {/* Charts and blockers */}
      <div className="flex flex-col gap-6 lg:flex-row">
        <div className="min-w-0 flex-1 space-y-6">
          <WaveProgressCard zeroMargin={true} />
          <ChartLineDefault />
        </div>
        <div className="w-full shrink-0 lg:w-80">
          <ActiveBlockers blockers={activeBlockers} />
        </div>
      </div>
    </div>
  );
};

export default DashboardOverview;