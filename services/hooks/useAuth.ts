'use client';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import api from '@/services/axios';
import { toast } from 'sonner';

export const useLoginIndividual = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (data: any) => {
      const res = await api.post('/loginIndividual', data);
      return res.data;
    },
    onSuccess: data => {
      toast.success('User registered successfully!');
      queryClient.invalidateQueries({ queryKey: ['auth'] });
    },
    onError: () => {
      toast.error('Registration failed.');
    },
  });
};
