'use client';

import InviteTeamMemberModal from '@/components/organizational-settings-component/member-group/InviteTeamMemberModal';
import InviteMembers from '@/components/organizational-settings-component/member-group/InviteMembers';
import InviteTable from '@/components/organizational-settings-component/member-group/InviteTable';
import PendingInvite from '@/components/organizational-settings-component/member-group/PendingInvite';
import PendingTable from '@/components/organizational-settings-component/member-group/PendingTable';
import React, { useState } from 'react';
import { useGetInvitedUsers } from '@/services/hooks/useInviteUser';
import { Users } from 'lucide-react';

const TeamMemberTab = () => {
  const { data: invitedUsers } = useGetInvitedUsers();
  const [modalOpen, setModalOpen] = useState(false);

  const activeUsers =
    invitedUsers?.data.filter(
      (user: any) => user.status === 'active' || user.accepted
    ) || [];

  const pendingUsers =
    invitedUsers?.data.filter(
      (user: any) => user.status === 'pending' || user.status === 'expired'
    ) || [];

  const openModal = () => {
    setModalOpen(true);
  };

  return (
    <div className="flex flex-col justify-center p-1">
      <div className="flex items-center justify-center gap-3 border-b p-3 py-0 pb-4">
        <InviteMembers onOpen={openModal} />
        {activeUsers.length > 0 ? (
          <InviteTable activeUsers={activeUsers} />
        ) : (
          <div className="flex w-[70%] flex-col items-center justify-center gap-4 py-8">
            <Users className="h-16 w-16 text-gray-400" />
            <p className="text-gray-500">No active users currently</p>
          </div>
        )}
      </div>
      <div className="flex items-center justify-center gap-3 py-12">
        <PendingInvite />
        <PendingTable pendingUsers={pendingUsers} />
      </div>
      {
        <InviteTeamMemberModal
          open={modalOpen}
          onClose={() => setModalOpen(false)}
        />
      }
    </div>
  );
};

export default TeamMemberTab;
