import React from 'react';
import { Button } from '@/components/ui/button';

type OpenModalProp = {
  onOpen: () => void;
};

const InviteMembers = ({ onOpen }: OpenModalProp) => {
  return (
    <div className="w-[25%] p-1">
      <h1 className="h-[20px] w-[70px] leading-tight font-medium text-iq-950">
        Members
      </h1>
      <p className="h-[40px] w-[230px] text-sm font-normal text-[#626262]">
        Invite new members to TeamIQ to work faster and collaborate easily.
      </p>
      <div className="py-3">
        <Button
          onClick={onOpen}
          className="h-[40px] w-[160px] cursor-pointer bg-[#086ACE] p-[4px]"
        >
          Invite Member
        </Button>
      </div>
    </div>
  );
};

export default InviteMembers;
