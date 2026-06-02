"use client";
import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Clock, AlertCircle } from "lucide-react";
import { UpcomingDeadline } from "@/types/dashboard";

interface DeadlineProps {
  deadlines?: UpcomingDeadline[];
}

const priorityStyles: Record<string, string> = {
  high: "bg-red-100 text-red-700",
  medium: "bg-amber-100 text-amber-700",
  low: "bg-emerald-100 text-emerald-700",
};

export default function Deadline({ deadlines = [] }: DeadlineProps) {
  return (
    <div className="h-full">
      <Card className="shadow-none h-full border border-gray-100 rounded-xl">
        <CardHeader className="pb-3 px-5 pt-5">
          <div className="flex items-center justify-between">
            <CardTitle className="text-base font-semibold text-gray-900">
              Upcoming Deadlines
            </CardTitle>
            <AlertCircle className="size-4 text-gray-400" />
          </div>
        </CardHeader>
        <CardContent className="flex flex-col gap-3 px-5 pb-5">
          {deadlines.length === 0 ? (
             <p className="text-sm text-gray-400 text-center py-6">No upcoming deadlines</p>
          ) : (
            deadlines.map((item, i) => (
              <div
                key={item.id || i}
                className="flex flex-col gap-2 p-3 rounded-lg border border-gray-100 bg-gray-50/50 hover:bg-gray-50 transition-colors"
              >
                <div className="flex items-start justify-between gap-2">
                  <p className="font-medium text-sm text-gray-800 leading-snug flex-1">
                    {item.task_name}
                  </p>
                </div>
                <div className="flex items-center justify-between">
                  <span className={`flex items-center gap-1 text-[11px] font-semibold px-2 py-0.5 rounded-full bg-blue-50 text-[#086ACE]`}>
                    <Clock className="size-3" />
                    {item.time_remaining_string}
                  </span>
                </div>
              </div>
            ))
          )}
        </CardContent>
      </Card>
    </div>
  );
}
