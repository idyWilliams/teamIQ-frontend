"use client";

import {
  Card,
  CardContent,
  CardHeader,
} from "@/components/ui/card";
import { Skeleton } from "./ui/skeleton";

export default function DeadlineSkt() {
  return (
    <Card className="shadow-none h-full ">
      <CardHeader className=" pb-4 ">
        <Skeleton className="w-2/5 h-3"></Skeleton>

       
      </CardHeader>
      <CardContent>
        <div className="flex flex-col gap-5">
          {"abc".split("").map((i) => (
            <div key={i}>
              <Skeleton className="h-12 w-full"></Skeleton>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
