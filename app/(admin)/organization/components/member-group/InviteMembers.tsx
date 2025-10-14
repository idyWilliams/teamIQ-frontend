import React from 'react'
import { Button } from '@/components/ui/button';

const InviteMembers = () => {
  return (
     <div className='w-[25%] p-1'>
      <h1 className='text-[#0B0B0B] w-[70px] h-[20px] font-medium leading-tight'>Members</h1>
      <p className='text-sm text-[#626262] w-[250px] h-[40px] font-normal'>
        Invite new members to TeamIQ to work faster and collaborate easily.</p>
      <div className='py-3'>
      <Button className='bg-[#086ACE] w-[180px] h-[40px] p-[4px]'>
        Invite Member</Button>
      </div> 
     </div>
  )
} 

export default InviteMembers;