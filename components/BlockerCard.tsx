"use client";
import React from "react";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Avatar, AvatarImage } from "@radix-ui/react-avatar";

interface Blocker {
  id: number;
  name: string;
  blockedOn: string;
  time: string;
}

interface ActiveBlockersProps {
  blockers?: Blocker[];
}

export default function ActiveBlockers({ blockers = [] }: ActiveBlockersProps) {
  return (
    <div className="h-full">
      <Card className="shadow-none h-full">
        <CardHeader>
          <CardTitle>Active Blockers</CardTitle>
        </CardHeader>
        <CardContent className="flex flex-col gap-5">
          {blockers.map((blocker, i) => (
            <div
              key={i}
              className="flex justify-between gap-5 px-[25px] items-start rounded-xl py-3 border-l-2 border-blue-500 bg-[#F7F7F7] "
            >
              <div>
                <p className="font-semibold">{blocker.name}</p>
                <p className="text-sm">{blocker.blockedOn}</p>
              </div>
              <div className="flex gap-1 items-center whitespace-nowrap">
                <Avatar className="size-3">
                  <AvatarImage src="images/deadline.svg" alt="time" />
                </Avatar>
                <p className="text-sm text-[#626262]">
                  {blocker.time}
                </p>
              </div>
            </div>
          ))}
        </CardContent>
      </Card>
    </div>
  );
}