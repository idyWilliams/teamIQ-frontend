import axiosInstance from '@/services/axios';
import { auth } from '../api';
import { useMutation } from '@tanstack/react-query';

export const useLogin = () => {
  return useMutation({
    mutationFn: async (payload: { email: string; password: string }) => {
      const { data } = await axiosInstance.post(auth.login, payload);
      return data;
    },
  });
};


