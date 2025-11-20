import React from 'react'
import OrganizationTeamMember from "@/components/organizationTeamMember"
import Tracks from "@/components/tracks"


function organizationTeamMembersTabLayout() {
  return (
    <>
      <div className='flex'>
        <OrganizationTeamMember />
        <Tracks />
      </div>
    </>
  );
}

export default organizationTeamMembersTabLayout;