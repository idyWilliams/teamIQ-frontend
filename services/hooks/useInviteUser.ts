import axiosInstance from '../axios';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { toast } from 'sonner';
import { userInvitation } from '../api';
import api from '@/services/axios';


export const useInviteUser = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (payload: { email: string; role: string }) => {
      console.log('User invitation', userInvitation.register);
      const res = await axiosInstance.post(userInvitation.register, {
        ...payload,
        role: 'intern',
      });
      return console.log(res.data);
    },
    onSuccess: () => {
      toast.success('Invited sent sucessfully!');
      queryClient.invalidateQueries({ queryKey: ['get-assinged-users'] });
    },
  });
};

export function useGetInvitedUsers() {
  return useQuery({
    queryKey: ['get-assinged-users'],
    queryFn: async () => {
      const res = await api.get(userInvitation.getInvitedUsers); 
      return res.data;
    },
  });
}


export const useRevokeInvite = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (invitationId: number) => {
      const res = await api.post(`/api/v1/invitations/${invitationId}/revoke`);
      return res.data;
    },
    onSuccess: () => {
      toast.success('Invite revoked successfully!');
      queryClient.invalidateQueries({ queryKey: ['get-assinged-users'] });
    },
  });
};