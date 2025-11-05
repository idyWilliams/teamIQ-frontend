import axiosInstance from '../axios';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from 'sonner';
import { userInvitation } from '../api';

export const useInviteUser = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (payload: {
      email: string;
      stack: string;
      role: string;
    }) => {
      const res = await axiosInstance.post(userInvitation.register, {
        ...payload,
        role: 'intern',
      });
      return res.data;
    },
    onSuccess: () => {
      toast.success('Invited sent sucessfully!');
      queryClient.invalidateQueries({ queryKey: ['invitation'] });
    },
  });
};
