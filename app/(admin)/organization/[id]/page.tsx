"use client";

import OrganizationMemberCard from "@/components/OrganisationMemberCard";
import BlockerCard from "@/components/BlockerCard";
import {  UserPlus, Calendar } from "lucide-react";
import Image from "next/image";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogTrigger,
} from "@/components/ui/dialog";

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from "@/components/ui/select";



export default function OrganizationTeamPage() {
  const teamMembers = [
    { name: "Jacob Jones", tasks: "12 active tasks", lastSeen: "12:12", avatar: "/images/gent.jpg" },
    { name: "Ronald Richards", tasks: "12 active tasks", lastSeen: "12:12", avatar: "/images/gent1.jpg" },
    { name: "Darrell Steward", tasks: "12 active tasks", lastSeen: "12:12", avatar: "/images/gent2.jpg" },
    { name: "Cameron Williamson", tasks: "12 active tasks", lastSeen: "12:12", avatar: "/images/gent4.jpg" },
    { name: "Bessie Cooper", tasks: "12 active tasks", lastSeen: "12:12" , avatar: "/images/gent3.jpg"},
    { name: "Ralph Edwards", tasks: "12 active tasks", lastSeen: "12:12", avatar: "/images/gent5.jpg" },
    { name: "Marvin McKinney", tasks: "12 active tasks", lastSeen: "12:12" , avatar: "/images/gent6.jpg"},
    { name: "Jerome Bell", tasks: "12 active tasks", lastSeen: "12:12" , avatar: "/images/gent7.jpg"},
    { name: "Guy Hawkins", tasks: "12 active tasks", lastSeen: "12:12", avatar: "/images/gent8.jpg" },
    { name: "Savannah Nguyen", tasks: "12 active tasks", lastSeen: "12:12" , avatar: "/images/gent9.jpg"},
    { name: "Leslie Alexander", tasks: "12 active tasks", lastSeen: "12:12", avatar: "/images/lady.jpg" },
    { name: "Floyd Miles", tasks: "12 active tasks", lastSeen: "12:12", avatar: "/images/gent4.jpg" },
  ];


  /* filling blocker with the same data
  
  const blockers = Array(7).fill({
  name: "Alex",
  description: "Blocked on API dependencies",
  time: "2 hours",
});

  
  */ 
  const blockers = [
  {
    name: "Alex",
    description: "Blocked on API dependencies",
    time: "2 hours",
  },
  {
    name: "Maria",
    description: "Waiting for design review",
    time: "30 min",
  },
  {
    name: "John",
    description: "Database schema conflict",
    time: "1 hour",
  },
  {
    name: "Tanya",
    description: "Missing access to production API",
    time: "3 hours",
  },
];

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      {/* Header */}
<header className="mb-6 border-b border-gray-200">
  {/* Top Navigation Bar */}
  <div className="flex justify-between items-center py-3">
    <div className="flex items-center gap-2">
      <Image src="/images/isentry-logo.jpeg" alt="Logo" width={32} height={32} />
      <h1 className="font-semibold text-lg text-gray-800">ISentry Technologies</h1>
    </div>
  </div>

  {/* Tabs Bar */}
  <Tabs defaultValue="overview" className="w-full">
    <TabsList className="flex gap-6 border-b border-gray-100 px-1">
      <TabsTrigger
        value="overview"
        className="data-[state=active]:text-blue-600 data-[state=active]:border-b-2 data-[state=active]:border-blue-600 pb-2 text-gray-600 text-sm"
      >
        Overview
      </TabsTrigger>
      <TabsTrigger
        value="status"
        className="data-[state=active]:text-blue-600 data-[state=active]:border-b-2 data-[state=active]:border-blue-600 pb-2 text-gray-600 text-sm"
      >
        Project Status
      </TabsTrigger>
      <TabsTrigger
        value="team"
        className="data-[state=active]:text-blue-600 data-[state=active]:border-b-2 data-[state=active]:border-blue-600 pb-2 text-gray-600 text-sm"
      >
        Team
      </TabsTrigger>
    </TabsList>
  </Tabs>
</header>


      {/* Content */}
      <div className="flex gap-8">
        {/* Team Members */}
        <div className="flex-1">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-lg font-semibold text-gray-800">Team Members</h2>
            <Dialog>
  <DialogTrigger asChild>
    <Dialog>
  <DialogTrigger asChild>
    <button className="flex items-center gap-2 text-blue-600 text-sm font-medium hover:underline">
      <UserPlus size={16} /> Add Team Member
    </button>
  </DialogTrigger>

  <DialogContent className="sm:max-w-md">
    <DialogHeader>
      <DialogTitle>Invite Team Member</DialogTitle>
      <DialogDescription>
        You can invite your team members with their email.
      </DialogDescription>
    </DialogHeader>

    <div className="flex flex-col gap-4">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        <Input placeholder="Enter email" />
        <Select>
          <SelectTrigger>
            <SelectValue placeholder="Select role" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="admin">Admin</SelectItem>
            <SelectItem value="developer">Developer</SelectItem>
            <SelectItem value="designer">Designer</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <Button className="w-full bg-blue-600 hover:bg-blue-700 text-white">
        Send Invite
      </Button>
    </div>
  </DialogContent>
</Dialog>

  </DialogTrigger>

  <DialogContent className="sm:max-w-md">
    <DialogHeader>
      <DialogTitle>Invite Team Member</DialogTitle>
      <DialogDescription>
        You can invite your team members with their email.
      </DialogDescription>
    </DialogHeader>

    <div className="flex flex-col gap-4">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        <Input placeholder="Enter email" />
        <Select>
          <SelectTrigger>
            <SelectValue placeholder="Select role" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="admin">Admin</SelectItem>
            <SelectItem value="developer">Developer</SelectItem>
            <SelectItem value="designer">Designer</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <Button className="w-full bg-blue-600 hover:bg-blue-700 text-white">
        Send Invite
      </Button>
    </div>
  </DialogContent>
</Dialog>

          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
            {teamMembers.map((member, index) => (
              <OrganizationMemberCard key={index} {...member} />
            ))}
          </div>
        </div>
{/* Active Blockers */}
<aside
  className="rounded-xl border border-gray-200 bg-white shadow-sm"
  style={{
    width: "382px",
    height: "620px",
    paddingTop: "24px",
    paddingRight: "16px",
    paddingBottom: "24px",
    paddingLeft: "16px",
    gap: "24px",
  }}
>
  <h2 className="text-lg font-semibold text-gray-800 mb-4">Active Blockers</h2>

  <div className="flex flex-col gap-4 overflow-y-auto h-[540px] pr-1">
    {blockers.map((blocker, index) => (
      <div
        key={index}
        className="relative flex justify-between items-center w-[350px] h-[60px] gap-5 border border-gray-200 bg-gray-50 rounded-lg px-4 py-3 shadow-sm hover:shadow-md transition-all"
      >
        {/* Blue left highlight bar */}
        <span className="absolute left-0 top-0 h-full w-1 bg-blue-500 rounded-l-lg"></span>

        {/* Content */}
        <div className="ml-2">
          <p className="font-medium text-gray-800">{blocker.name}</p>
          <p className="text-sm text-gray-500">{blocker.description}</p>
        </div>

        {/* Time with Calendar Icon */}
        <div className="flex items-center gap-1 text-sm text-gray-400">
          <Calendar size={14} className="text-gray-400" />
          <span>{blocker.time}</span>
        </div>
      </div>
    ))}
  </div>
</aside>

      </div>
    </div>
  );
}
