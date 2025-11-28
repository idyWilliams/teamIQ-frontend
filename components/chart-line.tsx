"use client";

import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
} from "recharts";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";

export const description = "A line chart showing team performance over time";

const chartData = [
  { month: "Jan", completion: 25 },
  { month: "Feb", completion: 45 },
  { month: "Mar", completion: 35 },
  { month: "Apr", completion: 60 },
  { month: "May", completion: 50 },
  { month: "Jun", completion: 65 },
  { month: "Jul", completion: 55 },
  { month: "Aug", completion: 75 },
  { month: "Sep", completion: 65 },
  { month: "Oct", completion: 80 },
  { month: "Nov", completion: 70 },
  { month: "Dec", completion: 85 },
];

const chartConfig = {
  completion: {
    label: "Task Completion",
    color: "#B3C4D6",
  },
} satisfies ChartConfig;

export default function ChartLineDefault() {
  return (
    <Card className="flex flex-col shadow-none h-full">
      <CardHeader className="items-center pb-4">
        <CardTitle>Team Performance</CardTitle>
        <CardDescription>Monthly task completion rate</CardDescription>
      </CardHeader>
       <CardContent className="flex-1 pb-0">
                <div className="h-72 max-w-full">
                  <ResponsiveContainer width="100%" height="100%">
                    <LineChart data={chartData}>
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
                        tickFormatter={completion => `${completion}%`}
                      />
                      <Tooltip
                        contentStyle={{
                          backgroundColor: '#1e293b',
                          border: 'none',
                          borderRadius: '8px',
                          color: 'white',
                        }}
                        formatter={completion => [`${completion}% Task completed`, '']}
                        labelStyle={{ display: 'none' }}
                      />
    
                      {/* smooth curve */}
                      <Line
                        type="monotone"
                        dataKey="completion"
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

   
  );
}
