"use client";
import { useState } from "react";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Activity as ActivityType } from "@/types/activity";
import { Activity as ActivityIcon, Github, Slack, MessageCircle, ClipboardList } from "lucide-react";

interface RecentCardProps {
  activities?: ActivityType[];
}

const toolIcons: Record<string, React.ReactNode> = {
  GitHub: <Github className="size-4" />,
  Slack: <Slack className="size-4" />,
  ClickUp: <ClipboardList className="size-4" />,
  Jira: <MessageCircle className="size-4" />,
  Notion: <ActivityIcon className="size-4" />,
};

const toolColors: Record<string, string> = {
  GitHub: "bg-slate-800",
  Slack: "bg-[#4A154B]",
  ClickUp: "bg-[#7B68EE]",
  Jira: "bg-[#0052CC]",
  Notion: "bg-black",
};

function timeAgo(dateString: string): string {
  const now = new Date();
  const activityDate = new Date(dateString);
  const diff = Math.floor((now.getTime() - activityDate.getTime()) / 1000);

  if (diff < 60) return "just now";
  if (diff < 3600) return `${Math.floor(diff / 60)}m ago`;
  if (diff < 86400) return `${Math.floor(diff / 3600)}h ago`;
  return `${Math.floor(diff / 86400)}d ago`;
}

export default function RecentCard({ activities = [] }: RecentCardProps) {
  const [selectedSite, setSelectedSite] = useState("All");

  const filteredActivities = activities.filter((activity) => {
    const matchSite = selectedSite === "All" || selectedSite === activity.source_tool;
    return matchSite;
  });

  return (
    <div className="h-full">
      <Card className="shadow-none h-full border border-gray-100 rounded-xl">
        <CardHeader className="px-5 pt-5 pb-3">
          <div className="flex flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-2">
              <ActivityIcon className="size-4 text-[#086ACE]" />
              <CardTitle className="text-base font-semibold text-gray-900">
                Recent Activity
              </CardTitle>
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
                  className={`size-8 rounded-lg ${toolColors[activity.source_tool] || "bg-gray-400"} flex items-center justify-center text-white shrink-0`}
                >
                  {toolIcons[activity.source_tool] || activity.source_tool[0]}
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-gray-800 truncate">
                    {activity.action_taken}
                  </p>
                  <p className="text-xs text-gray-400 capitalize">{activity.source_tool} • {activity.user.name}</p>
                </div>
                <span className="text-[11px] text-gray-400 whitespace-nowrap shrink-0">
                  {timeAgo(activity.timestamp)}
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
