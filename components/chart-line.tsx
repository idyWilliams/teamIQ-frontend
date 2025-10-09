"use client";

import { LineChart, Line, XAxis, YAxis, CartesianGrid, ResponsiveContainer } from "recharts";

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
        <ChartContainer config={chartConfig} className="h-[300px]">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={chartData}>
              <ChartTooltip content={<ChartTooltipContent />} />
              <CartesianGrid strokeDasharray="3 3" className="opacity-30" />
              <XAxis 
                dataKey="month" 
                axisLine={false}
                tickLine={false}
                tickMargin={10}
              />
              <YAxis 
                axisLine={false}
                tickLine={false}
                tickMargin={10}
                ticks={[0, 25, 50, 75, 100]}
                domain={[0, 100]}
              />
              <Line 
                type="monotone" 
                dataKey="completion" 
                stroke="#B3C4D6" 
                strokeWidth={3}
                dot={{ fill: "#B3C4D6", strokeWidth: 2, r: 4 }} 
                activeDot={{ r: 6, fill: "#B3C4D6" }} 
              />
            </LineChart>
          </ResponsiveContainer>
        </ChartContainer>
      </CardContent>
    </Card>
  );
}