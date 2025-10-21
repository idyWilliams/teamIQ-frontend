"use client";
import { PolarAngleAxis, PolarGrid, Radar, RadarChart } from "recharts";

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";


export const description = "A radar chart";

const chartData = [
  { skill: "Design", percentage: 50 },
  { skill: "Typescript", percentage: 75 },
  { skill: "Python", percentage: 60 },
  { skill: "Communication", percentage: 70 },
  { skill: "Micro Services", percentage: 50 },
  { skill: "React", percentage: 50 },
];

const chartConfig = {
  desktop: {
    label: "percentage",
    color: "var(--chart-1)",
  },
} satisfies ChartConfig;



export default function ChartRadarDefault() {
  return (
    <Card className="shadow-none h-full">
      <CardHeader className="items-center pb-4">
        <CardTitle className="max-sm:text-[16px] text-[20px]">Skill Proficiency</CardTitle>
        <CardDescription className="max-sm:text-[14px] text-[18px]">Overall score 70/100</CardDescription>
      </CardHeader>
      <CardContent className="pb-0">
        <ChartContainer config={chartConfig} className="mx-auto  size-[300px] max-sm:size-[250px] ">
          <RadarChart data={chartData}>
            <ChartTooltip cursor={false} content={<ChartTooltipContent />} />
            <PolarAngleAxis dataKey="skill" />
            <PolarGrid />
            <Radar dataKey="percentage" fill="#086ACE" fillOpacity={0.6} />
          </RadarChart>
        </ChartContainer>
      </CardContent>
      <CardFooter className="flex-col gap-2 items-start justify-items-start ">
        <div className="flex gap-2 justify-self-start items-start flex-wrap max-sm:hidden">
          {chartData.map((data, i) =>

          
          (<div key={i} className=" max-lg:hidden text-[#086ACE] flex justify-between p-3 w-[220px] h-[44px] items-center rounded-[8px] bg-[#f3f8ff] ">
            <p>{data.skill} </p>
            <span>{data.percentage}</span>
          </div>))}
          </div>
      </CardFooter>
    </Card>
  );
}
