'use client';

import InviteTeamMemberModal from '@/components/organizational-settings-component/member-group/InviteTeamMemberModal';
import InviteMembers from '@/components/organizational-settings-component/member-group/InviteMembers';
import InviteTable from '@/components/organizational-settings-component/member-group/InviteTable';
import PendingInvite from '@/components/organizational-settings-component/member-group/PendingInvite';
import PendingTable from '@/components/organizational-settings-component/member-group/PendingTable';
import React, { useState } from 'react';
import { useGetInvitedUsers } from '@/services/hooks/useInviteUser';

const TeamMemberTab = () => {
  const {data: invitedUsers, isError, isLoading}= useGetInvitedUsers()
  console.log("invited users", invitedUsers?.data)
  const [modalOpen, setModalOpen] = useState(false);

  const activeUsers = invitedUsers?.data.filter((user:any) => user.accepted) || []
  console.log("activeUsers", activeUsers)

  const pendingUsers = invitedUsers?.data.filter((user: any) => user.status === "pending" ) || []
  console.log("pendingUsers",pendingUsers)

  const openModal = () => {
    setModalOpen(true);
  };

  return (
    <div className="flex flex-col justify-center p-1">
      <div className="flex items-center justify-center gap-3 border-b p-3 py-0 pb-4">
        <InviteMembers onOpen={openModal} />
        <InviteTable activeUsers={activeUsers}/>
      </div>
      <div className="flex items-center justify-center gap-3 py-12">
        <PendingInvite />
        <PendingTable pendingUsers={pendingUsers}/>
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
