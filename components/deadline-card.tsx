"use client";
import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Clock, AlertCircle } from "lucide-react";

const mockTasks = [
  {
    id: 1,
    task: "Build the dashboard layout",
    assigner: "Project Manager",
    assignedAt: "2025-09-23T10:00:00Z",
    deadline: "2025-09-30T10:00:00Z",
    priority: "high",
  },
  {
    id: 2,
    task: "Build the organization architecture",
    assigner: "Project Manager",
    assignedAt: "2025-09-23T10:00:00Z",
    deadline: "2025-09-30T10:00:00Z",
    priority: "medium",
  },
  {
    id: 3,
    task: "Build the design system",
    assigner: "UX Lead",
    assignedAt: "2025-09-23T10:00:00Z",
    deadline: "2025-09-30T10:00:00Z",
    priority: "low",
  },
];

function deadlineCalc(dateString: string): string {
  const now = new Date();
  const deadline = new Date(dateString);
  const diff = Math.floor((deadline.getTime() - now.getTime()) / 1000);

  if (diff <= 0) return "Overdue";
  if (diff < 3600) return `${Math.floor(diff / 60)}m left`;
  if (diff < 86400) return `${Math.floor(diff / 3600)}h left`;
  return `${Math.floor(diff / 86400)}d left`;
}

function deadlineColor(dateString: string): string {
  const now = new Date();
  const deadline = new Date(dateString);
  const diff = Math.floor((deadline.getTime() - now.getTime()) / (1000 * 60 * 60 * 24));
  if (diff <= 0) return "text-red-600 bg-red-50";
  if (diff <= 2) return "text-orange-600 bg-orange-50";
  return "text-[#086ACE] bg-blue-50";
}

const priorityStyles: Record<string, string> = {
  high: "bg-red-100 text-red-700",
  medium: "bg-amber-100 text-amber-700",
  low: "bg-emerald-100 text-emerald-700",
};

export default function Deadline() {
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
          {mockTasks.map((task, i) => (
            <div
              key={i}
              className="flex flex-col gap-2 p-3 rounded-lg border border-gray-100 bg-gray-50/50 hover:bg-gray-50 transition-colors"
            >
              <div className="flex items-start justify-between gap-2">
                <p className="font-medium text-sm text-gray-800 leading-snug flex-1">
                  {task.task}
                </p>
                <span className={`text-[10px] font-semibold px-2 py-0.5 rounded-full capitalize shrink-0 ${priorityStyles[task.priority]}`}>
                  {task.priority}
                </span>
              </div>
              <div className="flex items-center justify-between">
                <p className="text-xs text-gray-500">{task.assigner}</p>
                <span className={`flex items-center gap-1 text-[11px] font-semibold px-2 py-0.5 rounded-full ${deadlineColor(task.deadline)}`}>
                  <Clock className="size-3" />
                  {deadlineCalc(task.deadline)}
                </span>
              </div>
            </div>
          ))}
        </CardContent>
      </Card>
    </div>
  );
}
