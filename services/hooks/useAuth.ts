'use client';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { auth } from '@/services/api';
import { toast } from 'sonner';
import apiInstance from '@/services/axios';
export const useRegisterIndividual = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (data: any) => {
      const res = await apiInstance.post(auth.registerIndividual, data);
      return res.data;
    },
    onSuccess: data => {
      toast.success('User registered successfully!');
      queryClient.invalidateQueries({ queryKey: ['auth'] });
    },
    onError: () => {
      console.error('Error details:', error?.response?.data);
      toast.error('Registration failed.');
    },
  });
};
