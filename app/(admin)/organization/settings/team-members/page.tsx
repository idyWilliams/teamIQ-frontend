'use client';

import React, { useState } from 'react';
import InviteMembers from '../../components/member-group/InviteMembers';
import InviteTable from '../../components/member-group/InviteTable';
import PendingInvite from '../../components/member-group/PendingInvite';
import PendingTable from '../../components/member-group/PendingTable';
import InviteTeamMemberModal from '../../components/InviteTeamMemberModal';

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
