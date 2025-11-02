'use client';
import {
  QueryClient,
  useMutation,
  useQueryClient,
} from '@tanstack/react-query';
import api from '@/services/axios';
import { toast } from 'sonner';
import { auth } from '../api';

// 1 REQUEST PASSWORD RESET — sends reset link/code to email
export const usePassword = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (payload: { email: string }) => {
      const res = await api.post(auth.passwordReset, payload);
      return res.data;
    },
    onSuccess: data => {
      toast.success(data?.message || 'Reset instructions sent to your email!');
      queryClient.invalidateQueries({ queryKey: ['auth'] });
    },
    onError: (error: any) => {
      const message =
        error?.response?.data?.message ||
        'Failed to send password reset email.';
      toast.error(message);
    },
  });
};

// 2 CONFIRM PASSWORD RESET — submits new password + token/code
export const usePasswordResetConfirm = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (payload: { token: string; password: string }) => {
      const res = await api.post(auth.confirmPasswordReset, payload);
      return res.data;
    },
    onSuccess: data => {
      toast.success(data?.message || 'Password reset successful!');
      queryClient.invalidateQueries({ queryKey: ['auth'] });
    },
    onError: (error: any) => {
      const message =
        error?.response?.data?.message || 'Failed to confirm password reset.';
      toast.error(message);
    },
  });
};
