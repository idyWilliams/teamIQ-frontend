'use client';

import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { PieChart, Pie, Cell, ResponsiveContainer, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip } from "recharts";
import { ArrowUpRight } from "lucide-react";
import { useState } from "react";

const taskData = [
  { name: "In progress", value:4, color: "#8b5cf6" },
  { name: "In review", value: 5, color: "#6366f1" },
  { name: "Completed", value: 6, color: "#3b82f6" },
  { name: "Approved", value: 10, color: "#10b981" },
];

const performanceData = [
  { month: "Jan", value: 40 },
  { month: "Feb", value: 45 },
  { month: "Mar", value: 50 },
  { month: "Apr", value: 65 },
  { month: "May", value: 60 },
  { month: "Jun", value: 70 },
  { month: "Jul", value: 65 },
  { month: "Aug", value: 75 },
  { month: "Sep", value: 70 },
  { month: "Oct", value: 80 },
  { month: "Nov", value: 85 },
  { month: "Dec", value: 90 },
];

export default function Overview() {
  const [activeTab, setActiveTab] = useState<'overview' | 'team'>('overview');

  return (
    <div className="w-full min-h-screen bg-gray-50">
      {/* Tabs */}
      <div className="bg-white border-b border-gray-200 px-6">
        <div className="flex gap-8">
          <button
            className={`py-3 px-1 text-sm font-medium border-b-2 ${
              activeTab === "overview"
                ? "border-blue-600 text-blue-600"
                : "border-transparent text-gray-600 hover:text-gray-800"
            }`}
            onClick={() => setActiveTab("overview")}
          >
            Overview
          </button>
          <button
            className={`py-3 px-1 text-sm font-medium border-b-2 ${
              activeTab === "team"
                ? "border-blue-600 text-blue-600"
                : "border-transparent text-gray-600 hover:text-gray-800"
            }`}
            onClick={() => setActiveTab("team")}
          >
            Team Members
          </button>
        </div>
      </div>

      {/* Tab Content */}
      <div className="p-6 flex flex-col gap-6">
        {activeTab === "overview" && (
          <>
            {/* Total Project Task Card */}
            <Card className="w-full shadow-sm border-0">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  {/* Left Section */}
                  <div className="flex flex-col gap-4">
                    <h3 className="text-sm font-medium text-gray-600">Total Project Task</h3>
                    <div className="flex items-end gap-4">
                      <h2 className="text-6xl font-bold text-gray-900">234</h2>
                      <div className="mb-2">
                        <p className="text-sm text-gray-600 mb-2">Total Task</p>
                        <Button className="bg-blue-600 hover:bg-blue-700 text-white rounded-lg px-4 py-2 text-sm flex items-center gap-2">
                          <ArrowUpRight className="w-4 h-4" />
                          23+ Unassigned Task
                        </Button>
                      </div>
                    </div>
                  </div>

                  {/* Center - Donut Chart */}
                  <div className="w-64 h-64">
                    <ResponsiveContainer width="100%" height="100%">
                      <PieChart>
                        <Pie
                          data={taskData}
                          innerRadius={70}
                          outerRadius={100}
                          dataKey="value"
                          strokeWidth={0}
                          cornerRadius={20}
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
                          <div key={index} className="flex items-center justify-between gap-8 w-full">
                            <div className="flex items-center gap-3">
                              <div className="w-32 h-2 bg-gray-200 rounded-full overflow-hidden">
                                <div
                                  className="h-full rounded-full transition-all duration-300"
                                  style={{ width: `${fillPercent}%`, backgroundColor: item.color }}
                                />
                              </div>
                              <span className="text-sm text-gray-700">{item.name}</span>
                            </div>
                            <span className="text-sm font-semibold text-gray-900">{item.value}</span>
                          </div>
                        );
                      });
                    })()}
                  </div>

                </div>
              </CardContent>
            </Card>

            {/* Team Performance Card */}
            <Card className="w-full shadow-sm border-0">
              <CardContent className="p-6">
                <h3 className="text-sm font-medium text-gray-600 mb-6">Team Performance</h3>
                <div className="w-full h-72">
                  <ResponsiveContainer width="100%" height="100%">
                    <LineChart data={performanceData}>
                      <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                      <XAxis dataKey="month" axisLine={false} tickLine={false} tick={{ fill: '#9ca3af', fontSize: 12 }} />
                      <YAxis axisLine={false} tickLine={false} ticks={[0, 25, 50, 75, 100]} domain={[0, 100]} tickFormatter={(value) => `${value}%`} />
                      <Tooltip contentStyle={{ backgroundColor: '#1e293b', border: 'none', borderRadius: '8px', color: 'white' }} formatter={(value) => [`${value}% Task completed`, '']} labelStyle={{ display: 'none' }} />

                      {/* smooth curve */}
                      <Line type="monotone" dataKey="value" stroke="#cbd5e1" strokeWidth={2} dot={false} activeDot={{ r: 6, fill: '#1e293b' }} />
                    </LineChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>
          </>
        )}

        {activeTab === "team" && (
          <>
            <Card className="w-full shadow-sm border-0">
              <CardContent className="p-6">
                <h3 className="text-sm font-medium text-gray-600 mb-4">Team Members</h3>
                <p>Welcome to tab team members</p>
              </CardContent>
            </Card>
          </>
        )}
      </div>
    </div>
  );
}
