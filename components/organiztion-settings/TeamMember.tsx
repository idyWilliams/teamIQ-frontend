'use client';

import React, { useState } from 'react';
import InviteMembers from '@/app/(admin)/organization/components/member-group/InviteMembers';
import InviteTable from '@/app/(admin)/organization/components/member-group/InviteTable';
import PendingInvite from '@/app/(admin)/organization/components/member-group/PendingInvite';
import PendingTable from '@/app/(admin)/organization/components/member-group/PendingInvite';
import InviteTeamMemberModal from '@/app/(admin)/organization/components/member-group/InviteTeamMemberModal';

const TeamMemberPage = () => {
  const [modalOpen, setModalOpen] = useState(false);

  const openModal = () => {
    setModalOpen(true);
  };

  return (
    <div className="flex flex-col justify-center p-1">
      <div className="flex items-center justify-center gap-3 border-b p-3 py-0 pb-4">
        <InviteMembers onOpen={openModal} />
        <InviteTable />
      </div>
      <div className="flex items-center justify-center gap-3 py-12">
        <PendingInvite />
        <PendingTable />
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

export default TeamMemberPage;
