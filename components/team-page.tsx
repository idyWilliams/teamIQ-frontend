'use client';

import { useState, useEffect } from 'react';
import OrganizationMemberCard from '@/components/OrganisationMemberCard';
import { UserPlus, Search, Filter } from 'lucide-react';
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
  avatar: user.profile_picture || undefined,
});

export default function TeamPage() {
  const [selectedMember, setSelectedMember] = useState<MappedTeamMember | null>(
    null
  );
  const [isMemberModalOpen, setIsMemberModalOpen] = useState(false);
  const [teamMembers, setTeamMembers] = useState<MappedTeamMember[]>([]);
  const [searchQuery, setSearchQuery] = useState('');

  const { data: users, isLoading, error } = useOrganizationUsers();

  useEffect(() => {
    if (users) {
      const transformedMembers = users.map(mapApiUserToTeamMember);
      setTeamMembers(transformedMembers);
    }
  }, [users]);

  const filteredMembers = teamMembers.filter(member => 
    member.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    member.role?.toLowerCase().includes(searchQuery.toLowerCase())
  );

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
      <div className="flex min-h-[400px] items-center justify-center">
        <div className="flex flex-col items-center gap-2">
          <div className="size-8 animate-spin rounded-full border-2 border-[#086ACE] border-t-transparent" />
          <p className="text-sm text-gray-500 font-medium">Loading team intelligence...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex min-h-[400px] items-center justify-center">
        <div className="rounded-xl border border-red-100 bg-red-50 p-6 text-center">
          <p className="text-sm font-semibold text-red-800">Error loading team</p>
          <p className="mt-1 text-xs text-red-600 opacity-80">Failed to fetch organization members.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="pb-8">
      {/* Search and Filter Row */}
      <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between px-2">
         <div className="relative flex-1 max-w-md">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-gray-400" />
          <Input 
            placeholder="Search team by name or role..." 
            className="pl-10 h-10 border-gray-200 rounded-xl bg-white shadow-sm focus:ring-[#086ACE]/20"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
        
        <div className="flex items-center gap-3">
          <Dialog>
            <DialogTrigger asChild>
              <Button className="h-10 bg-[#086ACE] text-white hover:bg-blue-700 font-bold px-4 rounded-xl shadow-sm flex items-center gap-2">
                <UserPlus size={18} /> 
                <span className="hidden sm:inline">Add Member</span>
              </Button>
            </DialogTrigger>

            <DialogContent className="sm:max-w-md rounded-2xl">
              <DialogHeader>
                <DialogTitle className="text-xl font-bold">Invite Team Member</DialogTitle>
                <DialogDescription className="text-gray-500">
                  Add a new member to your organization via email.
                </DialogDescription>
              </DialogHeader>

              <div className="flex flex-col gap-5 py-4">
                <div className="space-y-2">
                  <label className="text-xs font-bold uppercase tracking-wider text-gray-500">Email Address</label>
                  <Input placeholder="e.g. alex@company.com" className="h-11 border-gray-200" />
                </div>
                
                <div className="space-y-2">
                  <label className="text-xs font-bold uppercase tracking-wider text-gray-500">Assign Role</label>
                  <Select>
                    <SelectTrigger className="h-11 border-gray-200">
                      <SelectValue placeholder="Select a role" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="admin">Admin</SelectItem>
                      <SelectItem value="developer">Developer</SelectItem>
                      <SelectItem value="designer">Designer</SelectItem>
                      <SelectItem value="manager">Product Manager</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <Button className="h-12 w-full bg-[#086ACE] text-white hover:bg-blue-700 font-bold mt-2 shadow-md">
                  Send Invitation
                </Button>
              </div>
            </DialogContent>
          </Dialog>
        </div>
      </div>

      <div className="px-2 mb-6">
        <h2 className="text-lg font-bold text-gray-900 flex items-center gap-2">
          Team Members 
          <span className="bg-[#086ACE]/10 text-[#086ACE] text-xs px-2 py-0.5 rounded-full">{filteredMembers.length}</span>
        </h2>
      </div>

      {filteredMembers.length === 0 ? (
        <div className="py-20 text-center rounded-2xl border-2 border-dashed border-gray-100 bg-gray-50/50 mx-2">
          <div className="mx-auto size-12 bg-gray-100 rounded-full flex items-center justify-center mb-4 text-gray-400">
            <Search size={24} />
          </div>
          <h3 className="text-lg font-bold text-gray-800">No members found</h3>
          <p className="text-sm text-gray-500 max-w-xs mx-auto mt-1 font-medium">
            {searchQuery ? `We couldn't find any member matching "${searchQuery}"` : "Your organization doesn't have any team members yet."}
          </p>
          {searchQuery && (
            <Button 
              variant="link" 
              className="mt-2 text-[#086ACE]" 
              onClick={() => setSearchQuery('')}
            >
              Clear search
            </Button>
          )}
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 px-2">
          {filteredMembers.map(member => (
            <div
              key={member.id}
              onClick={() => handleMemberClick(member)}
            >
              <OrganizationMemberCard
                name={member.name}
                role={member.role ?? ''}
                lastSeen={member.lastSeen}
                avatar={member.avatar}
              />
            </div>
          ))}
        </div>
      )}

      {/* Member Details Modal */}
      <Dialog open={isMemberModalOpen} onOpenChange={setIsMemberModalOpen}>
        <DialogContent className="max-w-[700px] rounded-2xl p-0 overflow-hidden">
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
