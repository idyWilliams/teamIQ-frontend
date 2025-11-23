import React from 'react';
import OrganizationTeamMember from '@/components/organizationTeamMember';
import Tracks from '@/components/tracks';

function organizationTeamMembersTabLayout() {
  return (
    <>
      <div className="grid grid-cols-[2fr_1fr]">
        <OrganizationTeamMember />
        <Tracks />
      </div>
    </>
  );
}

export default organizationTeamMembersTabLayout;
