"use client";

import {
  Card,
  CardHeader,
  CardAction,
  CardContent,
} from "@/components/ui/card";
import { Skeleton } from "./ui/skeleton";

export default function CardItemSkt() {
  return (
    <Card className="w-full h-30 shadow-none max-lg:w-[200px] max-sm:w-full">
      <CardHeader className="mb-[-20px]">
        <Skeleton className="w-8/9 h-5"></Skeleton>
        <CardAction>
          <Skeleton className="size-7"></Skeleton>
        </CardAction>
      </CardHeader>
      <CardContent>
        <Skeleton className="w-10 h-10"></Skeleton>
      </CardContent>
    </Card>
  );
}
