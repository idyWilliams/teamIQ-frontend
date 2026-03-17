"use client";
import { PolarAngleAxis, PolarGrid, Radar, RadarChart } from "recharts";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";

const chartData = [
  { skill: "Micro Services", percentage: 50 },
  { skill: "TypeScript", percentage: 75 },
  { skill: "Python", percentage: 60 },
  { skill: "Communication", percentage: 70 },
  { skill: "Design", percentage: 50 },
  { skill: "React", percentage: 80 },
];

const chartConfig = {
  desktop: {
    label: "Proficiency",
    color: "#086ACE",
  },
} satisfies ChartConfig;

export default function ChartRadarDefault() {
  return (
    <Card className="shadow-none h-full border border-gray-100 rounded-xl">
      <CardHeader className="items-center pb-2 px-5 pt-5">
        <CardTitle className="text-base font-semibold text-gray-900">
          Skill Proficiency
        </CardTitle>
        <CardDescription className="text-sm text-gray-500">
          Overall score — 70/100
        </CardDescription>
      </CardHeader>
      <CardContent className="pb-4 px-5">
        <ChartContainer
          config={chartConfig}
          className="mx-auto size-[340px] max-sm:size-[260px]"
        >
          <RadarChart data={chartData}>
            <ChartTooltip cursor={false} content={<ChartTooltipContent />} />
            <PolarAngleAxis
              dataKey="skill"
              tick={{ fontSize: 11, fill: "#6b7280" }}
            />
            <PolarGrid stroke="#e5e7eb" />
            <Radar
              dataKey="percentage"
              fill="#086ACE"
              fillOpacity={0.15}
              stroke="#086ACE"
              strokeWidth={2}
            />
          </RadarChart>
        </ChartContainer>
        <div className="mt-2 grid grid-cols-2 gap-2 max-lg:hidden">
          {chartData.map((data, i) => (
            <div
              key={i}
              className="flex items-center justify-between px-3 py-2 rounded-lg bg-[#EBF4FF] border border-[#086ACE]/10"
            >
              <span className="text-xs font-medium text-gray-700">{data.skill}</span>
              <span className="text-xs font-bold text-[#086ACE]">{data.percentage}%</span>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
