"use client";

import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  Area,
  AreaChart,
} from "recharts";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

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

export default function ChartLineDefault() {
  return (
    <Card className="flex flex-col shadow-none h-full border border-gray-100 rounded-xl">
      <CardHeader className="items-start pb-4 px-5 pt-5">
        <div className="flex items-center justify-between w-full">
          <div>
            <CardTitle className="text-base font-semibold text-gray-900">
              Team Performance
            </CardTitle>
            <CardDescription className="text-sm text-gray-500 mt-0.5">
              Monthly task completion rate
            </CardDescription>
          </div>
          <div className="flex items-center gap-3 text-xs text-gray-500">
            <div className="flex items-center gap-1.5">
              <div className="size-2.5 rounded-full bg-[#086ACE]" />
              <span>Completion %</span>
            </div>
          </div>
        </div>
      </CardHeader>
      <CardContent className="flex-1 pb-4 px-5">
        <div className="h-64 w-full">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={chartData} margin={{ top: 4, right: 4, left: -20, bottom: 0 }}>
              <defs>
                <linearGradient id="completionGradient" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#086ACE" stopOpacity={0.15} />
                  <stop offset="95%" stopColor="#086ACE" stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="#f3f4f6" vertical={false} />
              <XAxis
                dataKey="month"
                axisLine={false}
                tickLine={false}
                tick={{ fill: "#9ca3af", fontSize: 11 }}
              />
              <YAxis
                axisLine={false}
                tickLine={false}
                ticks={[0, 25, 50, 75, 100]}
                domain={[0, 100]}
                tickFormatter={(v) => `${v}%`}
                tick={{ fill: "#9ca3af", fontSize: 11 }}
              />
              <Tooltip
                contentStyle={{
                  backgroundColor: "#1e293b",
                  border: "none",
                  borderRadius: "10px",
                  color: "white",
                  fontSize: "13px",
                  padding: "8px 12px",
                }}
                formatter={(v) => [`${v}%`, "Completion"]}
                labelStyle={{ color: "#94a3b8", marginBottom: 2 }}
              />
              <Area
                type="monotone"
                dataKey="completion"
                stroke="#086ACE"
                strokeWidth={2.5}
                fill="url(#completionGradient)"
                dot={false}
                activeDot={{ r: 5, fill: "#086ACE", strokeWidth: 2, stroke: "#fff" }}
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  );
}
