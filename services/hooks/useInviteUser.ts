import axiosInstance from '../axios';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from 'sonner';
import { userInvitation } from '../api';

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
      queryClient.invalidateQueries({ queryKey: ['invitation'] });
    },
    onError: error => {
      toast.error(error?.message || 'Failed to sent invite');
    },
  });
};
