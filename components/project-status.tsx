'use client';

import React from 'react';
import { Dot, LayoutGrid, List } from 'lucide-react';
import ActiveBlockers from './active-blockers';
import { activeBlockers } from '@/constants';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';

const Datas = [
  {
    name: 'Mobile App v2.0',
    status: 'In Progress',
    description: 'Next Milestone: Beta Testing Phase',
    Date: 'Due: Jun 25',
    color: 'bg-blue-500'
  },
  {
    name: 'API Modernization',
    status: 'In Progress',
    description: 'Next Milestone: Security Audit',
    Date: 'Due: Jul 20',
    color: 'bg-purple-500'
  },
  {
    name: 'Cloud Infrastructure',
    status: 'Review',
    description: 'Next Milestone: Cost Optimization',
    Date: 'Due: Aug 15',
    color: 'bg-amber-500'
  },
  {
    name: 'Customer Portal',
    status: 'In Progress',
    description: 'Next Milestone: UI Refinement',
    Date: 'Due: Jul 30',
    color: 'bg-emerald-500'
  },
];

const ProjectStatus = () => {
  return (
    <div className="flex flex-col gap-6 py-6 lg:flex-row lg:items-start">
      <div className="flex-1 space-y-4">
        <div className="flex items-center justify-between px-2">
          <div className="flex items-center gap-2">
            <LayoutGrid className="size-5 text-[#086ACE]" />
            <h2 className="text-lg font-bold text-gray-900">Project Status Summary</h2>
          </div>
          <Button variant="ghost" size="sm" className="text-[#086ACE] font-semibold flex items-center gap-1 hover:bg-[#086ACE]/5">
            <List className="size-4" />
            View Project List
          </Button>
        </div>

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          {Datas.map((data, index) => (
            <Card key={index} className="border-gray-100 shadow-sm hover:shadow-md transition-shadow rounded-xl overflow-hidden group">
              <CardHeader className="pb-2 pt-4 px-4 flex flex-row items-center justify-between border-b border-gray-50 bg-gray-50/30 group-hover:bg-gray-50/80 transition-colors">
                <CardTitle className="text-sm font-bold text-gray-800 line-clamp-1">{data.name}</CardTitle>
                <div className="flex items-center gap-1.5 px-2 py-0.5 rounded-full bg-white border border-gray-100 shadow-sm">
                  <div className={`size-1.5 rounded-full ${data.color}`} />
                  <span className="text-[10px] font-bold text-gray-600 uppercase tracking-tight">{data.status}</span>
                </div>
              </CardHeader>
              <CardContent className="pt-4 pb-4 px-4">
                <p className="text-xs font-medium text-gray-500 mb-1">Status Update</p>
                <p className="text-sm text-gray-700 font-semibold mb-3 line-clamp-1">{data.description}</p>
                <div className="flex items-center justify-between mt-auto pt-3 border-t border-gray-50">
                   <div className="flex -space-x-2">
                    {[1,2,3].map(i => (
                      <div key={i} className="size-6 rounded-full border-2 border-white bg-gray-200" />
                    ))}
                    <div className="size-6 rounded-full border-2 border-white bg-gray-100 flex items-center justify-center text-[8px] font-bold text-gray-500">+2</div>
                  </div>
                  <span className="text-xs font-bold text-[#086ACE] bg-blue-50 px-2 py-1 rounded-md">{data.Date}</span>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
      <div className="w-full shrink-0 lg:w-80">
        <ActiveBlockers blockers={activeBlockers} />
      </div>
    </div>
  );
};

export default ProjectStatus;
