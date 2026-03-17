import axiosInstance from '../axios';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { toast } from 'sonner';
import { userInvitation } from '../api';
import api from '@/services/axios';

export const useInviteUser = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (payload: { email: string; role: string }) => {
      console.log('User invitation ooo', userInvitation.register);
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
    onError: (error: any) => {
      // console.log('Errors ooo', error.response.data.detail);
      toast.error(error.response.data.detail);
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

export const useResendInvite = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (invitationId: number) => {
      const res = await api.post(
        `${userInvitation.resendInvitation}/${invitationId}/resend`
      );
      return res.data;
    },
    onSuccess: () => {
      toast.success('Invite resent successfully!');
      queryClient.invalidateQueries({ queryKey: ['get-assinged-users'] });
    },
  });
};

export const useRevokeInvite = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (invitationId: number) => {
      const res = await api.post(
        `${userInvitation.revokeInvitation}/${invitationId}/revoke`
      );
      return res.data;
    },
    onSuccess: () => {
      toast.success('Invite revoked successfully!');
      queryClient.invalidateQueries({ queryKey: ['get-assinged-users'] });
    },
  });
};
