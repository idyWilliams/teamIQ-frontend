"use client"
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import axiosInstance from '@/services/axios';
import { organizations } from '@/services/api';
import { toast } from 'sonner';
import { AxiosError } from 'axios';


export interface OrgProfile {
  id: string;
  organization_name: string;
  team_size: string;
  organization_image: string;
  description: string;
  sector: string;
  social_media_handles: {
    additionalProp1: string;
    additionalProp2: string;
    additionalProp3: string;
  };
  domain_link: string;
  favorite_tools: string[];
  website: string;
  country: string;
  phone_number: string;
}

export interface ApiErrorResponse {
  message?: string;
}

// GET Organization Profile
export const useOrgProfile = () => {
  return useQuery<OrgProfile, AxiosError<ApiErrorResponse>>({
    queryKey: ['orgProfile'],
    queryFn: async () => {
      const res = await axiosInstance.get<OrgProfile>(organizations.profile);
      return res.data;
    },
    staleTime: 5 * 60 * 1000, // 5 minutes
    retry: 1,
  });
};

// UPDATE Organization Profile
export const useUpdateOrgProfile = () => {
  const queryClient = useQueryClient();

  return useMutation<OrgProfile, AxiosError<ApiErrorResponse>, { org_id: string; data: Partial<OrgProfile> }>({
    mutationFn: async ({ org_id, data }) => {
      const res = await axiosInstance.patch<OrgProfile>(
        organizations.update(org_id),
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