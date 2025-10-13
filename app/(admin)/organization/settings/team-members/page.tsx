import React from 'react'
import InviteMembers from '../../components/member-group/InviteMembers'
import InviteTable from '../../components/member-group/InviteTable'
import PendingInvite from '../../components/member-group/PendingInvite'
import PendingTable from '../../components/member-group/PendingTable'

const TeamMemberPage = () => {
  return (
    <div className='flex flex-col justify-center p-1  '>
      <div className='flex items-center justify-center gap-3 py-12 border-b'>
      <InviteMembers/>
      <InviteTable/>
      </div>
      <div className='flex items-center justify-center gap-3 py-12'>
      <PendingInvite/>
      <PendingTable/>    
     </div>
    </div>
  )
}

export default TeamMemberPage