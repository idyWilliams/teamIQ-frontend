'use client';
import React, { useState } from 'react';
import { Button } from '../../ui/button';
import { Input } from '../../ui/input';
import { Check, Search } from 'lucide-react';
import { teamList as initialTeamList } from '@/constants';
import { Card } from '../../ui/card';
import { Avatar, AvatarImage } from '../../ui/avatar';

interface UserPermissionProps {
  onSubmit?: () => void;
}

interface TeamMember {
  image: string;
  name: string;
  job: string;
  checked?: boolean;
  lead?: boolean;
}

const UserPermission = ({ onSubmit }: UserPermissionProps) => {
  const [teamList, setTeamList] = useState<TeamMember[]>(
    initialTeamList.map(member => ({
      ...member,
      checked: false,
      lead: false,
    }))
  );

  const handleCardClick = (clickedIndex: number) => {
    setTeamList(prevList => {
      const hasLead = prevList.some(member => member.lead);

      return prevList.map((member, index) => {
        if (index === clickedIndex) {
          // If no lead exists yet and this card is being clicked, make it lead
          if (!hasLead && !member.lead) {
            return { ...member, lead: true, checked: false };
          }
          // If this card is already lead, toggle it off
          else if (member.lead) {
            return { ...member, lead: false, checked: false };
          }
          // Otherwise, toggle checked status
          else {
            return { ...member, checked: !member.checked, lead: false };
          }
        }
        // If we're setting a new lead, ensure all others are not lead
        else if (!hasLead && !prevList[clickedIndex].lead) {
          return { ...member, lead: false };
        }
        return member;
      });
    });
  };

  return (
    <div>
      <div className="mt-2 max-w-[440px]">
        <p className="text-normal text-base">
          Set up the tool for this project to help synchronize your activities
          with your preferred tool.
        </p>
      </div>
      <div className="md:w- relative mt-10 mb-4 w-full">
        <Input
          id="search"
          type="text"
          value=""
          onChange={() => {}}
          placeholder="Search for a team member"
          className="h-8 max-w-[250px] pl-7"
        />
        <Search className="pointer-events-none absolute top-1/2 left-2 size-4 -translate-y-1/2 opacity-50 select-none" />
      </div>
      <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
        {teamList?.map((team, index) => {
          return (
            <Card
              key={index}
              className="cursor-pointer border-0 shadow-none"
              onClick={() => handleCardClick(index)}
            >
              <div className="flex items-center justify-between">
                <div className="flex gap-2">
                  <Avatar>
                    <AvatarImage
                      src={team.image}
                      alt="team"
                      width={24}
                      height={24}
                    />
                  </Avatar>
                  <div className="flex flex-col">
                    <p className="text-sm font-normal text-[#1C1C1C]">
                      {team.name}
                    </p>
                    <p className="text-xs font-normal text-[#1C1C1C66]">
                      {team.job}
                    </p>
                  </div>
                </div>
                <div>
                  {team.lead ? (
                    <p className="rounded bg-[#086ACE10] px-2 py-1 text-xs font-medium text-[#086ACE]">
                      Lead
                    </p>
                  ) : team.checked ? (
                    <div className="flex h-5 w-5 items-center justify-center rounded-full bg-[#086ACE]">
                      <Check className="h-3 w-3 text-white" />
                    </div>
                  ) : null}
                </div>
              </div>
            </Card>
          );
        })}
      </div>

      <div className="mt-8">
        <Button
          onClick={onSubmit}
          className="w-full cursor-pointer bg-[#086ACE] p-6 text-base font-semibold"
        >
          Next
        </Button>
      </div>
    </div>
  );
};

export default UserPermission;
