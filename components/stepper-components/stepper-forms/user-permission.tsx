'use client';
import React, { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { Button } from '../../ui/button';
import { Input } from '../../ui/input';
import { Check, Search, Loader, AlertCircle, User } from 'lucide-react';
import { Card } from '../../ui/card';
import { Avatar, AvatarImage, AvatarFallback } from '../../ui/avatar';
import { useUpdateProjectStep5 } from '@/services/hooks/useProject';
import {
  useOrganizationUsers,
  type User as ApiUser,
} from '@/services/hooks/useUsers';
import { toast } from 'sonner';
// import { Alert, AlertDescription } from '../../ui/alert';

interface UserPermissionProps {
  onSubmit?: () => void;
  hideButton?: boolean;
  projectId?: number;
}

interface TeamMember {
  id: number;
  name: string;
  email: string;
  job: string;
  avatar?: string;
  checked?: boolean;
  lead?: boolean;
}

interface FormData {
  selectedMembers: number[];
  projectLead: number | null;
}

const UserPermission = ({
  onSubmit,
  hideButton,
  projectId,
}: UserPermissionProps) => {
  const updateProjectStep5 = useUpdateProjectStep5(projectId || 0);
  const { data: users, isLoading, error } = useOrganizationUsers();

  const { handleSubmit, setValue, watch } = useForm<FormData>({
    defaultValues: {
      selectedMembers: [],
      projectLead: null,
    },
  });

  const selectedMembers = watch('selectedMembers');
  const projectLead = watch('projectLead');

  const [teamList, setTeamList] = useState<TeamMember[]>([]);
  const [searchTerm, setSearchTerm] = useState('');

  // Transform API users to team members format
  useEffect(() => {
    if (users) {
      const transformedUsers: TeamMember[] = users.map(user => ({
        id: user.id,
        name: `${user.first_name} ${user.last_name}`.trim(),
        email: user.email,
        job: user.role || 'Team Member',
        avatar: user.profile_image || undefined,
        checked: false,
        lead: false,
      }));
      setTeamList(transformedUsers);
      console.log('🔄 Transformed team list:', transformedUsers);
    }
  }, [users]);

  const handleCardClick = (userId: number) => {
    setTeamList(prevList => {
      const hasLead = prevList.some(member => member.lead);
      const clickedMember = prevList.find(member => member.id === userId);

      if (!clickedMember) return prevList;

      return prevList.map(member => {
        if (member.id === userId) {
          // If no lead exists yet and this card is being clicked, make it lead
          if (!hasLead && !member.lead) {
            setValue('projectLead', member.id);
            // Remove from selected members if they were selected
            setValue(
              'selectedMembers',
              selectedMembers.filter(id => id !== member.id)
            );
            return { ...member, lead: true, checked: false };
          }
          // If this card is already lead, toggle it off
          else if (member.lead) {
            setValue('projectLead', null);
            return { ...member, lead: false, checked: false };
          }
          // Otherwise, toggle checked status
          else {
            const newChecked = !member.checked;
            if (newChecked) {
              setValue('selectedMembers', [...selectedMembers, member.id]);
            } else {
              setValue(
                'selectedMembers',
                selectedMembers.filter(id => id !== member.id)
              );
            }
            return { ...member, checked: newChecked, lead: false };
          }
        }
        // If we're setting a new lead, ensure all others are not lead
        else if (!hasLead && clickedMember && !clickedMember.lead) {
          return { ...member, lead: false };
        }
        return member;
      });
    });
  };

  const handleFormSubmit = async (data: FormData) => {
    console.log('📝 STEP 5 FORM DATA:', data);
    console.log('🆕 Project ID for Step 5:', projectId);

    // Prepare API payload
    const apiData = {
      members: [
        // Add project lead if selected
        ...(data.projectLead
          ? [
              {
                user_id: data.projectLead,
                role: 'lead',
              },
            ]
          : []),
        // Add other selected members (excluding the lead)
        ...data.selectedMembers
          .filter(memberId => memberId !== data.projectLead)
          .map(memberId => ({
            user_id: memberId,
            role: 'member',
          })),
      ],
    };

    console.log('📤 STEP 5 API PAYLOAD:', apiData);

    if (!projectId) {
      console.log('No projectId available, skipping API call');
      toast.success('Team members saved locally');
      if (onSubmit) onSubmit();
      return;
    }

    // Check if at least one member is selected
    if (apiData.members.length === 0) {
      toast.error('Please select at least one team member');
      return;
    }

    updateProjectStep5.mutate(apiData, {
      onSuccess: responseData => {
        console.log('✅ Step 5 completed successfully:', responseData);
        toast.success('Team members added successfully!');
        if (onSubmit) onSubmit();
      },
      onError: (error: any) => {
        console.error('❌ Step 5 failed:', error);
        const errorMessage =
          error.response?.data?.detail ||
          error.response?.data?.message ||
          'Failed to add team members';
        toast.error(errorMessage);
      },
    });
  };

  const filteredTeamList = teamList.filter(
    member =>
      member.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      member.job.toLowerCase().includes(searchTerm.toLowerCase()) ||
      member.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Generate initials for avatar fallback
  const getInitials = (name: string) => {
    return name
      .split(' ')
      .map(part => part[0])
      .join('')
      .toUpperCase()
      .slice(0, 2);
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center py-8">
        <Loader className="mr-2 h-6 w-6 animate-spin" />
        <span>Loading team members...</span>
      </div>
    );
  }

  // if (error) {
  //   return (
  //     <Alert variant="destructive">
  //       <AlertCircle className="h-4 w-4" />
  //       <AlertDescription>
  //         Failed to load team members: {error.message}
  //       </AlertDescription>
  //     </Alert>
  //   );
  // }

  return (
    <form onSubmit={handleSubmit(handleFormSubmit)}>
      <div className="mt-2 max-w-[440px]">
        <p className="text-normal text-base">
          Add team members to your project and assign roles. The project lead
          will have administrative permissions.
        </p>
      </div>

      <div className="md:w- relative mt-10 mb-4 w-full">
        <Input
          id="search"
          type="text"
          value={searchTerm}
          onChange={e => setSearchTerm(e.target.value)}
          placeholder="Search for a team member"
          className="h-8 max-w-[250px] pl-7"
        />
        <Search className="pointer-events-none absolute top-1/2 left-2 size-4 -translate-y-1/2 opacity-50 select-none" />
      </div>

      {filteredTeamList.length === 0 ? (
        <div className="py-8 text-center text-gray-500">
          {searchTerm
            ? 'No team members found matching your search.'
            : 'No team members available.'}
        </div>
      ) : (
        <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
          {filteredTeamList?.map(team => {
            return (
              <Card
                key={team.id}
                className={`cursor-pointer border-0 shadow-none ${
                  team.lead
                    ? 'ring-2 ring-[#086ACE]'
                    : team.checked
                      ? 'ring-1 ring-[#086ACE]'
                      : ''
                }`}
                onClick={() => handleCardClick(team.id)}
              >
                <div className="flex items-center justify-between">
                  <div className="flex gap-2">
                    <Avatar>
                      <AvatarImage
                        src={team.avatar}
                        alt={team.name}
                        width={24}
                        height={24}
                      />
                      <AvatarFallback className="bg-gray-200 text-xs text-gray-700">
                        {getInitials(team.name)}
                      </AvatarFallback>
                    </Avatar>
                    <div className="flex flex-col">
                      <p className="text-sm font-normal text-[#1C1C1C]">
                        {team.name}
                      </p>
                      <p className="text-xs font-normal text-[#1C1C1C66]">
                        {team.job}
                      </p>
                      <p className="text-xs font-normal text-[#1C1C1C66]">
                        {team.email}
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
      )}

      {!hideButton && (
        <div className="mt-8">
          <Button
            type="submit"
            className="w-full cursor-pointer bg-[#086ACE] p-6 text-base font-semibold hover:bg-[#086ACE]/90 disabled:cursor-not-allowed disabled:bg-gray-400"
            disabled={updateProjectStep5.isPending || teamList.length === 0}
          >
            {updateProjectStep5.isPending ? (
              <div className="flex items-center gap-2">
                <Loader className="h-4 w-4 animate-spin" />
                Adding Members...
              </div>
            ) : (
              'Next'
            )}
          </Button>
        </div>
      )}
    </form>
  );
};

export default UserPermission;
