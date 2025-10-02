"use client";

import {
  Card,
  CardContent,
  CardHeader,
} from "@/components/ui/card";
import { Skeleton } from "./ui/skeleton";

export default function RecentSkt() {
  return (
    <Card className="shadow-none h-full ">
      <CardHeader className="flex flex-row max-sm:flex-col items-start justify-between gap-6 ">
        <Skeleton className="w-1/5 h-3"></Skeleton>

        <Skeleton className="w-1/4 h-7"></Skeleton>
      </CardHeader>
      <CardContent>
        <div className="flex flex-col gap-7">
          {"abcd".split("").map((i) => (
            <div key={i} className="flex flex-row gap-[10px] items-center">
              <Skeleton className="size-7"></Skeleton>

              <div className="text-amber-100 w-full h-full flex flex-col gap-1 ">
                <Skeleton className="h-3 w-1/3"></Skeleton>
                <Skeleton className="h-3 w-1/5"></Skeleton>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
