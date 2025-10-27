"use client";
import React from "react";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Avatar, AvatarImage } from "@radix-ui/react-avatar";

// we get mock deadline data here
const mockTasks = [
  {
    id: 1,
    task: "Build the dashboard layout",
    assigner: "project manager",
    assignedAt: "2025-09-23T10:00:00Z",
    deadline: "2025-09-30T10:00:00Z",
  },

  {
    id: 3,
    task: "Build the organization architecture",
    assigner: "project manager",
    assignedAt: "2025-09-23T10:00:00Z",
    deadline: "2025-09-30T10:00:00Z",
  },

  {
    id: 1,
    task: "Build the design system",
    assigner: "ux lead ",
    assignedAt: "2025-09-23T10:00:00Z",
    deadline: "2025-09-30T10:00:00Z",
  },
];

// function that reads the deadline due period
function deadlineCalc(dateString: string): string {
  const now = new Date();
  const deadline = new Date(dateString);
  const diff = Math.floor((deadline.getTime() - now.getTime()) / 1000);

  if (diff <= 0) return "deadline passed";
  if (diff < 3600) return `${Math.floor(diff / 60)} minute${Math.floor(diff / 60) === 1 ? "" : "s"}`;
  if (diff < 86400) return `${Math.floor(diff / 3600)} hour${Math.floor(diff / 3600) === 1 ? "" : "s"}`;
  return `${Math.floor(diff / 86400)} day${Math.floor(diff / 86400) === 1 ? "" : "s"}`;
}

// rendering deadline into a card
export default function Deadline() {
  return (
    <div className="h-full">
      <Card className="shadow-none h-full">
        <CardHeader>
          <CardTitle className="text-xl max-sm:text-[16px]">Upcoming Deadlines</CardTitle>
        </CardHeader>
        <CardContent className="flex flex-col gap-5">
          {mockTasks.map((tasks, i) => (
            <div
              key={i}
              className=" max-sm:flex-col flex justify-between gap-5 px-[25px] items-start rounded-xl py-3 border-l-2 border-blue-500 bg-[#F7F7F7] "
            >
              <div>
                <p className="font-semibold text-[16px] max-sm:text-sm">{tasks.task}</p>
                <p className="text-[12px]">{tasks.assigner}</p>
              </div>
              <div className="flex gap-1 items-center whitespace-nowrap">
                <Avatar className="size-3">
                  <AvatarImage src="images/deadline.svg" alt="deadline" />
                </Avatar>
                <p className="text-[12px] text-blue-500">
                  {deadlineCalc(tasks.deadline)}
                </p>
              </div>
            </div>
          ))}
        </CardContent>
      </Card>
    </div>
  );
}
