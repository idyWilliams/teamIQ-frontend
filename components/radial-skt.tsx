"use client";

import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import { Skeleton } from "./ui/skeleton";

export default function RadialSkt() {
  return (
    <Card className="shadow-none h-full justify-between">
      <CardHeader className="items-center pb-4">
        <Skeleton className="w-1/5 h-3"></Skeleton>
        <Skeleton className="w-2/5 h-3"></Skeleton>
      </CardHeader>
      <CardContent className="pb-0 flex justify-center">
        <Skeleton className="size-[250px] "></Skeleton>
      </CardContent>
      <CardFooter className="flex-col items-start justify-self-start gap-2 text-sm mt-5">
       
          <Skeleton className="h-3 w-2/5 rounded-xs"></Skeleton>
      
       
          <Skeleton className="h-3 w-1/5 rounded-xs"></Skeleton>
      
      </CardFooter>
    </Card>
  );
}
