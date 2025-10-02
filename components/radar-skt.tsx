"use client";



import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import { Skeleton } from "./ui/skeleton";


export default function RadarSkt() {
  return (
    <Card className="shadow-none h-full justify-between">
      <CardHeader className="items-center pb-4">
        <Skeleton className="w-1/5 h-3"></Skeleton>
         <Skeleton className="w-2/5 h-3"></Skeleton>
      </CardHeader>
      <CardContent className="pb-0 flex justify-center">
       <Skeleton className="size-[250px] "></Skeleton>
      </CardContent>
      <CardFooter className="flex-col items-start justify-items-start ">
        <div className="flex justify-self-start items-start flex-wrap max-sm:hidden">
          {"abcde".split("").map((i) =>

          
          (<div key={i} className=" max-lg:hidden flex justify-between p-3  items-center rounded-[8px]  ">
            <Skeleton className="w-[200px] h-[25px]"></Skeleton>
          </div>))}
          </div>
      </CardFooter>
    </Card>
  );
}
