"use client";
import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ShieldAlert } from "lucide-react";
import { Button } from "./ui/button";

interface Blocker {
  id: number;
  name: string;
  blockedOn: string;
  time: string;
}

interface ActiveBlockersProps {
  blockers?: Blocker[];
}

const statusColors = ["bg-red-500", "bg-orange-500", "bg-amber-500"];

export default function ActiveBlockers({ blockers = [] }: ActiveBlockersProps) {
  return (
    <div className="h-full">
      <Card className="shadow-none h-full border border-gray-100 rounded-xl">
        <CardHeader className="px-5 pt-5 pb-3">
          <div className="flex items-center gap-2">
            <ShieldAlert className="size-4 text-red-500" />
            <CardTitle className="text-base font-semibold text-gray-900">
              Active Blockers
            </CardTitle>
          </div>
        </CardHeader>
        <CardContent className="flex flex-col gap-3 px-5 pb-5">
          {blockers.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-8 text-center">
             
              <p className="text-sm font-semibold text-gray-800">
                You&apos;re all clear!
              </p>
              <p className="text-xs text-gray-500 mt-1">
                You&apos;re good to go. Add a blocker if something is slowing you down.
              </p>
              <Button className="bg-red-500 mt-3 text-xs text-[#fff] font-medium hover:bg-red-500 cursor-pointer">
                + Report a blocker
              </Button>
            </div>
          ) : (
            blockers.map((blocker, i) => (
              <div
                key={i}
                className="flex items-start gap-3 p-3 rounded-lg border border-gray-100 bg-red-50/30 hover:bg-red-50/50 transition-colors"
              >
                <div className={`mt-1.5 size-2 rounded-full shrink-0 ${statusColors[i % statusColors.length]}`} />
                <div className="flex-1 min-w-0">
                  <p className="font-semibold text-sm text-gray-800 truncate">{blocker.name}</p>
                  <p className="text-xs text-gray-500 mt-0.5 line-clamp-1">{blocker.blockedOn}</p>
                </div>
                <span className="text-[11px] text-gray-400 whitespace-nowrap shrink-0 mt-0.5">
                  {blocker.time}
                </span>
              </div>
            ))
          )}
        </CardContent>
      </Card>
    </div>
  );
}