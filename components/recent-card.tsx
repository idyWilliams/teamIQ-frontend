"use client";
import { useState } from "react";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Activity } from "lucide-react";

const mockActivities = [
  {
    id: 1,
    user: "Adeola",
    site: "notion",
    action: "Refactored Dashboard Component",
    date: "2025-09-23T15:00:00Z",
    icon: "N",
    color: "bg-slate-800",
  },
  {
    id: 2,
    user: "Adeola",
    site: "slack",
    action: "Scheduled board meeting",
    date: "2025-09-23T15:00:00",
    icon: "S",
    color: "bg-[#4A154B]",
  },
  {
    id: 3,
    user: "Adeola",
    site: "jira",
    action: "Built dashboard layout",
    date: "2025-09-23T15:00:00Z",
    icon: "J",
    color: "bg-blue-600",
  },
  {
    id: 4,
    user: "Adeola",
    site: "jira",
    action: "Built team dashboard",
    date: "2025-09-23T15:00:00Z",
    icon: "J",
    color: "bg-blue-600",
  },
  {
    id: 5,
    user: "Adeola",
    site: "slack",
    action: "Built organizations dashboard",
    date: "2025-09-23T15:00:00Z",
    icon: "S",
    color: "bg-[#4A154B]",
  },
];

function timeAgo(dateString: string): string {
  const now = new Date();
  const activityDate = new Date(dateString);
  const diff = Math.floor((now.getTime() - activityDate.getTime()) / 1000);

  if (diff < 60) return "just now";
  if (diff < 3600) return `${Math.floor(diff / 60)}m ago`;
  if (diff < 86400) return `${Math.floor(diff / 3600)}h ago`;
  return `${Math.floor(diff / 86400)}d ago`;
}

export default function RecentCard() {
  const [selectedSite, setSelectedSite] = useState("All");
  const [selectedDateRange, setSelectedDateRange] = useState("All");

  const filteredActivities = mockActivities.filter((activity) => {
    const matchSite = selectedSite === "All" || selectedSite === activity.site;
    const matchDate =
      selectedDateRange === "All" || activity.date === selectedDateRange;
    return matchSite && matchDate;
  });

  return (
    <div className="h-full">
      <Card className="shadow-none h-full border border-gray-100 rounded-xl">
        <CardHeader className="px-5 pt-5 pb-3">
          <div className="flex flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-2">
              <Activity className="size-4 text-[#086ACE]" />
              <CardTitle className="text-base font-semibold text-gray-900">
                Recent Activity
              </CardTitle>
            </div>
            <div className="flex flex-row gap-2">
              <Select onValueChange={(value) => setSelectedDateRange(value)}>
                <SelectTrigger className="h-8 text-xs w-28 border-gray-200">
                  <SelectValue placeholder="All time" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="All">All time</SelectItem>
                  <SelectItem value="today">Today</SelectItem>
                  <SelectItem value="Last 7 days">Last 7 days</SelectItem>
                  <SelectItem value="Last 30days">Last 30 days</SelectItem>
                  <SelectItem value="Last 90days">Last 90 days</SelectItem>
                </SelectContent>
              </Select>
              <Select onValueChange={(value) => setSelectedSite(value)}>
                <SelectTrigger className="h-8 text-xs w-28 border-gray-200">
                  <SelectValue placeholder="All tools" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="All">All tools</SelectItem>
                  <SelectItem value="notion">Notion</SelectItem>
                  <SelectItem value="jira">Jira</SelectItem>
                  <SelectItem value="slack">Slack</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </CardHeader>
        <CardContent className="px-5 pb-5">
          <div className="flex flex-col divide-y divide-gray-50">
            {filteredActivities.map((activity) => (
              <div
                key={activity.id}
                className="flex items-center gap-3 py-3 group"
              >
                <div
                  className={`size-8 rounded-lg ${activity.color} flex items-center justify-center text-white text-xs font-bold shrink-0`}
                >
                  {activity.icon}
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-gray-800 truncate">
                    {activity.action}
                  </p>
                  <p className="text-xs text-gray-400 capitalize">{activity.site}</p>
                </div>
                <span className="text-[11px] text-gray-400 whitespace-nowrap shrink-0">
                  {timeAgo(activity.date)}
                </span>
              </div>
            ))}
            {filteredActivities.length === 0 && (
              <p className="text-sm text-gray-400 text-center py-6">No activity found</p>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
