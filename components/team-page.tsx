'use client';

import { useState, useEffect } from 'react';
import OrganizationMemberCard from '@/components/OrganisationMemberCard';
import { UserPlus } from 'lucide-react';
import { TeamModal } from './team-modal';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogTrigger,
} from '@/components/ui/dialog';
import { TeamMember } from '@/constants';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from '@/components/ui/select';
import {
  useOrganizationUsers,
  type User as ApiUser,
} from '@/services/hooks/useUsers';

interface MappedTeamMember extends Omit<TeamMember, 'avatar'> {
  id: number;
  avatar?: string;
}

const mapApiUserToTeamMember = (user: ApiUser): MappedTeamMember => ({
  id: user.id,
  name: `${user.first_name} ${user.last_name}`.trim(),
  email: user.email || '',
  role: user.role,
  lastSeen: user.last_seen
    ? `on ${new Date(user.last_seen).toLocaleDateString()}`
    : 'recently',
  avatar: user.profile_image || undefined,
});

export default function TeamPage() {
  const [selectedMember, setSelectedMember] = useState<MappedTeamMember | null>(
    null
  );
  const [isMemberModalOpen, setIsMemberModalOpen] = useState(false);
  const [teamMembers, setTeamMembers] = useState<MappedTeamMember[]>([]);

  const { data: users, isLoading, error } = useOrganizationUsers();

  useEffect(() => {
    if (users) {
      const transformedMembers = users.map(mapApiUserToTeamMember);
      setTeamMembers(transformedMembers);
    }
  }, [users]);

  const handleMemberClick = (member: MappedTeamMember) => {
    setSelectedMember(member);
    setIsMemberModalOpen(true);
  };

  const handleSendMessage = () => {
    if (!selectedMember) return;
    const mailtoLink = `mailto:${selectedMember.email}?subject=Message from Team Portal&body=Hi ${selectedMember.name},%0D%0A%0D%0A`;
    window.location.href = mailtoLink;
  };

  if (isLoading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-gray-50 p-6">
        <div className="text-gray-600">Loading team members...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-gray-50 p-6">
        <div className="text-red-600">Error loading team members</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      {/* Content */}
      <div className="flex gap-8">
        {/* Team Members */}
        <div className="flex-1">
          <div className="mb-4 flex items-center justify-between">
            <h2 className="text-lg font-semibold text-gray-800">
              Team Members ({teamMembers.length})
            </h2>
            <Dialog>
              <DialogTrigger asChild>
                <button className="flex items-center gap-2 text-sm font-medium text-blue-600 hover:underline">
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
                  <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
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

                  <Button className="w-full bg-blue-600 text-white hover:bg-blue-700">
                    Send Invite
                  </Button>
                </div>
              </DialogContent>
            </Dialog>
          </div>

          {teamMembers.length === 0 ? (
            <div className="py-12 text-center">
              <div className="mb-2 text-lg text-gray-500">
                No team members found
              </div>
              <p className="text-sm text-gray-400">
                Start by adding team members to your organization
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-2 gap-4 sm:grid-cols-3">
              {teamMembers.map(member => (
                <div
                  className="w-full"
                  key={member.id}
                  onClick={() => handleMemberClick(member)}
                >
                  <OrganizationMemberCard
                    name={member.name}
                    role={member.role?? ""}
                    lastSeen={member.lastSeen}
                    avatar={member.avatar}
                  />
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Member Details Modal */}
      <Dialog open={isMemberModalOpen} onOpenChange={setIsMemberModalOpen}>
        <DialogContent className="w-[700px] sm:max-w-full">
          {selectedMember && (
            <TeamModal
              selectedMember={selectedMember}
              onClose={() => setIsMemberModalOpen(false)}
              handleSendMessage={handleSendMessage}
            />
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}
