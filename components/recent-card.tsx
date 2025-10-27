"use client";
import { useState } from "react";
import {
  Card,
  CardAction,
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
import { Avatar, AvatarFallback, AvatarImage } from "@radix-ui/react-avatar";

// have an array of mockActivities like they are coming from backend
const mockActivities = [
  {
    id: 1,
    user: "Adeola",
    site: "notion",
    action: "Refactored Dashboard Component",
    date: "2025-09-23T15:00:00Z",
  },
  {
    id: 2,
    user: "Adeola",
    site: "slack",
    action: "Scheduled board meeeting",
    date: "2025-09-23T15:00:00",
  },
  {
    id: 3,
    user: "Adeola",
    site: "jira",
    action: "Built dashboard layout ",
    date: "2025-09-23T15:00:00Z",
  },
  {
    id: 4,
    user: "Adeola",
    site: "jira",
    action: "Built team dashboard",
    date: "2025-09-23T15:00:00Z",
  },
  {
    id: 5,
    user: "Adeola",
    site: "slack",
    action: "Built organizations dashboard",
    date: "2025-09-23T15:00:00Z",
  },
];

// this functions to show how recent the activity is
function timeAgo(dateString: string): string {
  const now = new Date();
  const activityDate = new Date(dateString);
  const diff = Math.floor((now.getTime() - activityDate.getTime()) / 1000);

  if (diff < 60) return "justnow";
  if (diff < 3600) return `${Math.floor(diff / 60)} minutes ago`;
  if (diff < 86400) return `${Math.floor(diff / 3600)} hours ago`;
  return `${Math.floor(diff / 86400)} days ago`;
}

export default function RecentCard() {

  // this iss the filter setup
  const [selectedSite, setSelectedSite] = useState("All");
  const [selectedDateRange, setSelectedDateRange] = useState("All");

  const filteredActivities = mockActivities.filter((activity) => {
    const matchSite = selectedSite === "All" || selectedSite === activity.site ; // matchsite is either All or {site with task}
    const matchDate =
      selectedDateRange === "All" || activity.date === selectedDateRange;

    return matchSite && matchDate;
  });

  return (
    <div className="h-full">
      <Card className="shadow-none h-full">
        <CardHeader className="flex flex-row max-sm:flex-col items-start justify-between gap-6 ">
          <CardTitle className="text-[20px] max-sm:text-[16px]"> Recent Activity</CardTitle>
          <CardAction className="flex flex-row gap-6">
            <Select onValueChange={(value) => setSelectedDateRange(value)}>
              <SelectTrigger>
                <SelectValue placeholder="Date" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="All">Date</SelectItem>
                <SelectItem value="today">Today</SelectItem>
                <SelectItem value="Last 7 days">Last 7days</SelectItem>
                <SelectItem value="Last 30days">Last 30days</SelectItem>
                <SelectItem value="Last 90days">Last 90days</SelectItem>
              </SelectContent>
            </Select>
            <Select onValueChange={(value) => setSelectedSite(value)}>
              <SelectTrigger>
                <SelectValue placeholder="Github" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="All">Github</SelectItem>
                <SelectItem value="notion">notion</SelectItem>
                <SelectItem value="jira">jira</SelectItem>
                <SelectItem value="slack">slack</SelectItem>
              </SelectContent>
            </Select>
          </CardAction>
        </CardHeader>
        {/* the activities are displayed here in card content  */}
        <CardContent>
          <div className="flex flex-col gap-7">
            {filteredActivities.map((activity) => (
              <div
                key={activity.id}
                className="flex flex-row gap-[10px] items-center"
              >
                <Avatar className="size-7">
                  <AvatarImage src="images/recent-btn.svg" alt="recent" />
                  <AvatarFallback>R</AvatarFallback>
                </Avatar>
                <div>
                  <p className="text-[16px]  max-sm:text-sm">{activity.action}</p>
                  <p className="text-sm text-muted-foreground">
                    {timeAgo(activity.date)}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
