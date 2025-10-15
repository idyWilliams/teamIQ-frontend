"use client";

import { useState } from "react";
import OrganizationMemberCard from "@/components/OrganisationMemberCard";
import { UserPlus, Calendar } from "lucide-react";
import Image from "next/image";
import { TeamModal } from "./team-modal";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogTrigger,
} from "@/components/ui/dialog";
import { teamMembers, TeamMember } from "@/constants";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from "@/components/ui/select";


export default function TeamPage() {
  const [selectedMember, setSelectedMember] = useState<TeamMember | null>(null);
  const [isMemberModalOpen, setIsMemberModalOpen] = useState(false);

  

  const handleMemberClick = (member: TeamMember) => {
    setSelectedMember(member);
    setIsMemberModalOpen(true);
  };

  const handleSendMessage = () => {
    if (!selectedMember) return;
    const mailtoLink = `mailto:${selectedMember.email}?subject=Message from Team Portal&body=Hi ${selectedMember.name},%0D%0A%0D%0A`;
    window.location.href = mailtoLink;
  };

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      {/* Header */}
      <header className="mb-6 border-b border-gray-200">
        <div className="flex justify-between items-center py-3">
          <div className="flex items-center gap-2">
            <Image src="/images/isentry-logo.jpeg" alt="Logo" width={32} height={32} />
            <h1 className="font-semibold text-lg text-gray-800">ISentry Technologies</h1>
          </div>
        </div>
      </header>

      {/* Content */}
      <div className="flex gap-8">
        {/* Team Members */}
        <div className="flex-1">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-lg font-semibold text-gray-800">Team Members</h2>
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
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
            {teamMembers.map((member, index) => (
              <div className="w-full" key={index} onClick={() => handleMemberClick(member)}>
                <OrganizationMemberCard {...member} />
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Member Details Modal */}
      <Dialog open={isMemberModalOpen} onOpenChange={setIsMemberModalOpen}>
        <DialogContent className="w-[700px] sm:max-w-full">
          {selectedMember && (
            <TeamModal selectedMember={selectedMember} onClose={() => setIsMemberModalOpen(false)} handleSendMessage={handleSendMessage} />
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}
