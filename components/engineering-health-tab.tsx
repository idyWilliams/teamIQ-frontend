'use client';

import React from 'react';
import { EngineeringHealthData } from '@/types/projects';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { 
  Activity, 
  Zap, 
  ShieldCheck, 
  Bug, 
  Heart, 
  TrendingUp, 
  TrendingDown,
  Code2,
  Clock
} from 'lucide-react';
import { ResponsiveContainer, AreaChart, Area, XAxis, Tooltip } from 'recharts';
import ChartRadarDefault from './radar-chart';

interface EngineeringHealthTabProps {
  healthData?: EngineeringHealthData;
}

const EngineeringHealthTab = ({ healthData }: EngineeringHealthTabProps) => {
  // Mock data if backend hasn't provided it yet
  const velocityData = healthData?.velocity || [
    { 
      label: 'Sprint Velocity', 
      value: 42, 
      trend: 'up', 
      data: [{name: 'S1', value: 30}, {name: 'S2', value: 35}, {name: 'S3', value: 42}] 
    },
    { 
      label: 'PR Cycle Time', 
      value: 1.2, 
      trend: 'down', 
      data: [{name: 'W1', value: 2.1}, {name: 'W2', value: 1.8}, {name: 'W3', value: 1.2}] 
    }
  ];

  return (
    <div className="space-y-8 pb-10">
      {/* Top Level Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card className="border-none shadow-sm bg-blue-50/50">
          <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
            <CardTitle className="text-sm font-medium text-blue-900">Velocity Score</CardTitle>
            <Zap className="h-4 w-4 text-blue-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-blue-900">88%</div>
            <p className="text-xs text-blue-600 flex items-center mt-1">
              <TrendingUp className="h-3 w-3 mr-1" /> +12% from last sprint
            </p>
          </CardContent>
        </Card>

        <Card className="border-none shadow-sm bg-purple-50/50">
          <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
            <CardTitle className="text-sm font-medium text-purple-900">Code Stability</CardTitle>
            <ShieldCheck className="h-4 w-4 text-purple-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-purple-900">94.2%</div>
            <p className="text-xs text-purple-600 flex items-center mt-1">
              <TrendingUp className="h-3 w-3 mr-1" /> No regressions found
            </p>
          </CardContent>
        </Card>

        <Card className="border-none shadow-sm bg-orange-50/50">
          <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
            <CardTitle className="text-sm font-medium text-orange-900">Technical Debt</CardTitle>
            <Bug className="h-4 w-4 text-orange-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-orange-900">12.5h</div>
            <p className="text-xs text-orange-600 flex items-center mt-1">
              <TrendingDown className="h-3 w-3 mr-1" /> -4h refactored this week
            </p>
          </CardContent>
        </Card>

        <Card className="border-none shadow-sm bg-green-50/50">
          <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
            <CardTitle className="text-sm font-medium text-green-900">Team Sentiment</CardTitle>
            <Heart className="h-4 w-4 text-green-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-900">High</div>
            <p className="text-xs text-green-600 flex items-center mt-1">
              Burnout risk: Low
            </p>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left: Engineering Pulse */}
        <div className="lg:col-span-2 space-y-8">
          <Card className="border-none shadow-sm p-6">
            <div className="flex items-center gap-2 mb-6">
              <Activity className="h-5 w-5 text-blue-600" />
              <h2 className="text-lg font-bold">Engineering Pulse</h2>
            </div>
            
            <div className="space-y-6">
              {velocityData.map((v, i) => (
                <div key={i} className="flex flex-col md:flex-row items-center gap-6 p-4 rounded-xl border border-gray-50 bg-gray-50/30">
                  <div className="w-full md:w-1/3">
                    <span className="text-xs font-bold text-gray-400 uppercase tracking-wider">{v.label}</span>
                    <div className="text-3xl font-bold text-gray-900 mt-1">{v.value}</div>
                    <span className={`text-xs font-medium flex items-center mt-1 ${v.trend === 'up' ? 'text-green-600' : 'text-blue-600'}`}>
                      {v.trend === 'up' ? <TrendingUp className="h-3 w-3 mr-1" /> : <TrendingDown className="h-3 w-3 mr-1" />}
                      {v.trend === 'up' ? 'Optimizing' : 'Accelerating'}
                    </span>
                  </div>
                  <div className="h-20 w-full md:w-2/3">
                    <ResponsiveContainer width="100%" height="100%">
                      <AreaChart data={v.data}>
                        <defs>
                          <linearGradient id={`colorValue-${i}`} x1="0" y1="0" x2="0" y2="1">
                            <stop offset="5%" stopColor="#086ACE" stopOpacity={0.1}/>
                            <stop offset="95%" stopColor="#086ACE" stopOpacity={0}/>
                          </linearGradient>
                        </defs>
                        <Area type="monotone" dataKey="value" stroke="#086ACE" strokeWidth={2} fillOpacity={1} fill={`url(#colorValue-${i})`} />
                      </AreaChart>
                    </ResponsiveContainer>
                  </div>
                </div>
              ))}
            </div>
          </Card>

          {/* Quality Radar */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card className="border-none shadow-sm p-6">
               <div className="flex items-center gap-2 mb-4">
                <Code2 className="h-5 w-5 text-purple-600" />
                <h2 className="text-lg font-bold">Architecture Health</h2>
              </div>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-600">Test Coverage</span>
                  <span className="text-sm font-bold">78%</span>
                </div>
                <div className="w-full h-1.5 bg-gray-100 rounded-full overflow-hidden">
                  <div className="h-full bg-purple-500" style={{ width: '78%' }} />
                </div>

                <div className="flex items-center justify-between pt-2">
                  <span className="text-sm text-gray-600">Maintainability Index</span>
                  <span className="text-sm font-bold">A+</span>
                </div>
                <div className="w-full h-1.5 bg-gray-100 rounded-full overflow-hidden">
                  <div className="h-full bg-green-500" style={{ width: '92%' }} />
                </div>

                <div className="flex items-center justify-between pt-2">
                  <span className="text-sm text-gray-600">Doc Completion</span>
                  <span className="text-sm font-bold">65%</span>
                </div>
                <div className="w-full h-1.5 bg-gray-100 rounded-full overflow-hidden">
                  <div className="h-full bg-orange-500" style={{ width: '65%' }} />
                </div>
              </div>
            </Card>

            <Card className="border-none shadow-sm p-6">
               <div className="flex items-center gap-2 mb-4">
                <Clock className="h-5 w-5 text-indigo-600" />
                <h2 className="text-lg font-bold">Delivery Stats</h2>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="p-3 rounded-lg bg-indigo-50/50">
                  <span className="text-[10px] font-bold text-indigo-400 uppercase">Avg PR Review</span>
                  <div className="text-lg font-bold text-indigo-900 mt-0.5">4.2h</div>
                </div>
                <div className="p-3 rounded-lg bg-blue-50/50">
                  <span className="text-[10px] font-bold text-blue-400 uppercase">Weekly Deploys</span>
                  <div className="text-lg font-bold text-blue-900 mt-0.5">18</div>
                </div>
                <div className="p-3 rounded-lg bg-green-50/50">
                  <span className="text-[10px] font-bold text-green-400 uppercase">Build Success</span>
                  <div className="text-lg font-bold text-green-900 mt-0.5">99.1%</div>
                </div>
                <div className="p-3 rounded-lg bg-red-50/50">
                  <span className="text-[10px] font-bold text-red-400 uppercase">Bug Hotspots</span>
                  <div className="text-lg font-bold text-red-900 mt-0.5">3</div>
                </div>
              </div>
            </Card>
          </div>
        </div>

        {/* Right: Skill Distribution / Team Health */}
        <div className="lg:col-span-1">
          <ChartRadarDefault />
        </div>
      </div>
    </div>
  );
};

export default EngineeringHealthTab;
