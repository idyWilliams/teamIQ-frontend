'use client';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import {
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer,
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
} from 'recharts';
import { ArrowUpRight } from 'lucide-react';
import Tracks from './tracks';

const taskData = [
  { name: 'In progress', value: 4, color: '#8b5cf6' },
  { name: 'In review', value: 5, color: '#6366f1' },
  { name: 'Completed', value: 6, color: '#3b82f6' },
  { name: 'Approved', value: 10, color: '#10b981' },
];

const performanceData = [
  { month: 'Jan', value: 40 },
  { month: 'Feb', value: 45 },
  { month: 'Mar', value: 50 },
  { month: 'Apr', value: 65 },
  { month: 'May', value: 60 },
  { month: 'Jun', value: 70 },
  { month: 'Jul', value: 65 },
  { month: 'Aug', value: 75 },
  { month: 'Sep', value: 70 },
  { month: 'Oct', value: 80 },
  { month: 'Nov', value: 85 },
  { month: 'Dec', value: 90 },
];

export default function OrgTeamOverviewTab() {
  return (
    <div className="flex max-w-full gap-6 py-6">
      <div className="space-y-4 flex-2 h-full">
        {/* Total Project Task Card */}
        <Card className="w-full shadow-none">
          <CardHeader>
            <CardTitle>Total Project Task</CardTitle>
          </CardHeader>
          <CardContent className="px-6">
            <div className="flex items-center justify-between">
              {/* Left Section */}
              <div className="flex flex-col gap-4">
                <div className="flex gap-4">
                  <h2 className="text-6xl font-bold text-gray-900">234</h2>
                  <div className="mb-2">
                    <p className="mb-2 text-base font-medium text-gray-800">
                      Total Task
                    </p>
                    <Button className="flex items-center gap-2 rounded-lg bg-blue-600 px-4 py-2 text-sm text-white hover:bg-blue-700">
                      <ArrowUpRight className="h-4 w-4" />
                      23+ Unassigned Task
                    </Button>
                  </div>
                </div>
              </div>

              {/* Center - Donut Chart */}
              <div className="h-54 w-64">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={taskData}
                      innerRadius={70}
                      outerRadius={100}
                      dataKey="value"
                      strokeWidth={0}
                      cornerRadius={20}
                      paddingAngle={4}
                    >
                      {taskData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Pie>
                  </PieChart>
                </ResponsiveContainer>
              </div>

              {/* Right Section - Legend (fill by total) */}
              <div className="flex flex-col gap-3">
                {(() => {
                  const total = taskData.reduce((s, t) => s + t.value, 0) || 1;
                  return taskData.map((item, index) => {
                    const fillPercent = Math.round((item.value / total) * 100);
                    return (
                      <div
                        key={index}
                        className="flex max-w-full items-center justify-between gap-8"
                      >
                        <div className="flex items-center gap-3">
                          <div className="h-2 w-32 overflow-hidden rounded-full bg-gray-200">
                            <div
                              className="h-full rounded-full transition-all duration-300"
                              style={{
                                width: `${fillPercent}%`,
                                backgroundColor: item.color,
                              }}
                            />
                          </div>
                          <span className="text-sm text-gray-700">
                            {item.name}
                          </span>
                        </div>
                        <span className="text-sm font-semibold text-gray-900">
                          {item.value}
                        </span>
                      </div>
                    );
                  });
                })()}
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Team Performance Card */}
        <Card className="mx-w-full shadow-none">
          <CardContent className="p-6">
            <h3 className="mb-6 text-sm font-medium text-gray-600">
              Team Performance
            </h3>
            <div className="h-72 max-w-full">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={performanceData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                  <XAxis
                    dataKey="month"
                    axisLine={false}
                    tickLine={false}
                    tick={{ fill: '#9ca3af', fontSize: 12 }}
                  />
                  <YAxis
                    axisLine={false}
                    tickLine={false}
                    ticks={[0, 25, 50, 75, 100]}
                    domain={[0, 100]}
                    tickFormatter={value => `${value}%`}
                  />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: '#1e293b',
                      border: 'none',
                      borderRadius: '8px',
                      color: 'white',
                    }}
                    formatter={value => [`${value}% Task completed`, '']}
                    labelStyle={{ display: 'none' }}
                  />

                  {/* smooth curve */}
                  <Line
                    type="monotone"
                    dataKey="value"
                    stroke="#cbd5e1"
                    strokeWidth={2}
                    dot={false}
                    activeDot={{ r: 6, fill: '#1e293b' }}
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>
      </div>
      <div className='flex-1 h-full'>
        <Tracks />
      </div>
    </div>
  );
}
