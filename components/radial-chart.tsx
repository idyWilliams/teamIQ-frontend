"use client";
import {
  Label,
  PolarGrid,
  PolarRadiusAxis,
  RadialBar,
  RadialBarChart,
} from "recharts";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { ChartConfig, ChartContainer } from "@/components/ui/chart";

const chartData = [{ browser: "safari", completion: 72, fill: "#086ACE" }];

const chartConfig = {
  completion: { label: "Completion" },
  safari: { label: "Safari", color: "#086ACE" },
} satisfies ChartConfig;

export default function ChartRadialShape() {
  return (
    <Card className="flex flex-col shadow-none h-full border border-gray-100 rounded-xl">
      <CardHeader className="items-center pb-0 px-5 pt-5">
        <CardTitle className="text-base font-semibold text-gray-900">
          Completion Rate
        </CardTitle>
        <CardDescription className="text-sm text-gray-500 text-center">
          Ratio of completed to pending tasks
        </CardDescription>
      </CardHeader>
      <CardContent className="flex-1 pb-0 flex items-center justify-center">
        <ChartContainer
          config={chartConfig}
          className="mx-auto aspect-square size-[220px]"
        >
          <RadialBarChart
            data={chartData}
            endAngle={270}
            innerRadius={80}
            outerRadius={120}
          >
            <PolarGrid
              gridType="circle"
              radialLines={false}
              stroke="none"
              className="first:fill-[#EBF4FF] last:fill-background"
              polarRadius={[88, 72]}
            />
            <RadialBar dataKey="completion" background />
            <PolarRadiusAxis tick={false} tickLine={false} axisLine={false}>
              <Label
                content={({ viewBox }) => {
                  if (viewBox && "cx" in viewBox && "cy" in viewBox) {
                    return (
                      <text
                        x={viewBox.cx}
                        y={viewBox.cy}
                        textAnchor="middle"
                        dominantBaseline="middle"
                      >
                        <tspan
                          x={viewBox.cx}
                          y={viewBox.cy}
                          className="fill-gray-900 text-3xl font-bold"
                          style={{ fontSize: "28px", fontWeight: 700 }}
                        >
                          {chartData[0].completion}%
                        </tspan>
                        <tspan
                          x={viewBox.cx}
                          y={(viewBox.cy || 0) + 22}
                          style={{ fontSize: "11px", fill: "#9ca3af" }}
                        >
                          Done
                        </tspan>
                      </text>
                    );
                  }
                }}
              />
            </PolarRadiusAxis>
          </RadialBarChart>
        </ChartContainer>
      </CardContent>
      <CardFooter className="flex-col items-start gap-2 px-5 pb-5">
        <div className="flex items-center gap-2 w-full">
          <div className="size-2.5 bg-[#086ACE] rounded-sm shrink-0" />
          <p className="text-xs text-gray-600 flex-1">Completed Tasks</p>
          <span className="text-xs font-bold text-gray-800">72%</span>
        </div>
        <div className="flex items-center gap-2 w-full">
          <div className="size-2.5 bg-[#EBF4FF] rounded-sm border border-[#086ACE]/20 shrink-0" />
          <p className="text-xs text-gray-600 flex-1">Pending Tasks</p>
          <span className="text-xs font-bold text-gray-800">28%</span>
        </div>
      </CardFooter>
    </Card>
  );
}
