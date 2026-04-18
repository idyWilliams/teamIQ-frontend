"use client"
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import axiosInstance from '@/services/axios';
import { organizations } from '@/services/api';
import { toast } from 'sonner';
import { AxiosError } from 'axios';
import api from '@/services/axios'


export interface OrgProfileResponse {
  data: OrgProfile;
}
export interface OrgProfile {
  id: number;
  organization_name: string;
  team_size: string;
  organization_image: string;
  description: string;
  sector: string;
  website: string;
  country: string;
  phone_number: string;
  email?: string;
}

export interface ApiErrorResponse {
  message?: string;
}

// GET Organization Profile
export const useOrgProfile = () => {
  return useQuery<OrgProfile, AxiosError<ApiErrorResponse>>({
    queryKey: ['orgProfile'],
    queryFn: async () => {
      const res = await axiosInstance.get<OrgProfileResponse>(organizations.profile);
      return res.data.data;
    },
    staleTime: 5 * 60 * 1000, // 5 minutes
  });
};

// UPDATE Organization Profile
export const useUpdateOrgProfile = () => {
  const queryClient = useQueryClient();

  return useMutation<OrgProfile, AxiosError<ApiErrorResponse>, { org_id: number; data: Partial<OrgProfile> }>({
    mutationFn: async ({ org_id, data }) => {
      const res = await axiosInstance.patch<OrgProfile>(
        organizations.byId(org_id),
        data
      );
      return res.data;
    },
    onSuccess: (data) => {
      queryClient.setQueryData(['orgProfile'], data);
      queryClient.invalidateQueries({ queryKey: ['orgProfile'] });
    },
    onError: (error) => {
      const message =
        error?.response?.data?.message ??
        'Failed to update organization profile.';
      toast.error(message);
      console.error('Update Org Profile Error:', error);
    },
  });
};


// GET Organization Members
export const useOrganizationTeamMember = () => {
  return useQuery({
    queryKey: ['organization-members'],

    queryFn: async () => {
      const res = await api.get('/organizations/members');
      console.log('organization-members', res.data.data.members);
      return res.data.data.members;
    },
  });
};