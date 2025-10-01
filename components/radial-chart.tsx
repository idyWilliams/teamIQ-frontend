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
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { ChartConfig, ChartContainer } from "@/components/ui/chart";

export const description = "A radial chart with a custom shape";

const chartData = [{ browser: "safari", completion: +11.02, fill: "#086ACE" }];

const chartConfig = {
  completion: {
    label: "completion",
  },
  safari: {
    label: "Safari",
    color: "var(--chart-2)",
  },
} satisfies ChartConfig;

export default function ChartRadialShape() {
  return (
    <Card className="flex flex-col shadow-none h-full ">
      <CardHeader className="items-center pb-0">
        <CardTitle>Completion Rate</CardTitle>
        <CardDescription>
          Ratio of completed to uncompleted task
        </CardDescription>
      </CardHeader>
      <CardContent className="flex-1 pb-0">
        <ChartContainer
          config={chartConfig}
          className="mx-auto aspect-square size-[300px]"
        >
          <RadialBarChart
            data={chartData}
            endAngle={270}
            innerRadius={100}
            outerRadius={150}
          >
            <PolarGrid
              gridType="circle"
              radialLines={false}
              stroke="none"
              className="first:fill-blue-200 last:fill-background"
              polarRadius={[110, 90]}
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
                          className="fill-[#17C1A6] text-2xl font-semibold "
                        >

                          {'+' + chartData[0].completion.toLocaleString() + '%'}
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
      <CardFooter className="flex-col items-start justify-self-start gap-2 text-sm">
        <div className="flex gap-2 items-center">
          <div className="size-3 bg-blue-500 rounded-xs"></div>
          <p>Completed Task</p>
        </div>
        <div className="flex gap-2 items-center">
          <div className="size-3 bg-blue-200 rounded-xs"></div>
          <p>Pending Task</p>
        </div>
      </CardFooter>
    </Card>
  );
}
