import { useMutation, useQueryClient } from '@tanstack/react-query';
import axiosInstance from '../axios';
import { userMappings } from '../api';
import { toast } from 'sonner';

interface MapUserPayload {
  project_id: number;
  user_id: number;
  provider: string;
  external_user_id: string;
  external_username?: string;
  external_email?: string;
}

interface UnmapUserPayload {
  project_id: number;
  user_id: number;
  provider: string;
}

export const useMapUser = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (payload: MapUserPayload) => {
      const { data } = await axiosInstance.post(userMappings.map, payload);
      return data;
    },
    onSuccess: () => {
      toast.success('User mapped successfully');
      queryClient.invalidateQueries({ queryKey: ['project-members'] });
    },
    onError: (error: any) => {
      toast.error(error.response?.data?.message || 'Failed to map user');
    },
  });
};

export const useUnmapUser = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (payload: UnmapUserPayload) => {
      // The user request specified DELETE /api/v1/user-mappings/unmap
      // Assuming it takes a body, but DELETE with body is sometimes tricky.
      // However, axios supports it via 'data' config.
      const { data } = await axiosInstance.delete(userMappings.unmap, {
        data: payload,
      });
      return data;
    },
    onSuccess: () => {
      toast.success('User unmapped successfully');
      queryClient.invalidateQueries({ queryKey: ['project-members'] });
    },
    onError: (error: any) => {
      toast.error(error.response?.data?.message || 'Failed to unmap user');
    },
  });
};
