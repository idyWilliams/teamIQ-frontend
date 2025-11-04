'use client';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { auth, organizations } from '@/services/api';
import { toast } from 'sonner';
import axiosInstance from '@/services/axios';
import { useAuthStore } from '@/store/useAuthStore';
import { useRouter } from 'next/navigation';

//Register Individual
export const useRegisterIndividual = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async ({
      data,
      invitation_code,
    }: {
      data: any;
      invitation_code: string;
    }) => {
      const res = await axiosInstance.post(
        auth.registerIndividual(invitation_code),
        data
      );
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

interface SignupOrgData {
  name: string;
  email: string;
  password: string;
  team_size: string;
  country: string;
}

//Register Organization
export const useSignupOrg = () => {
  const queryClient = useQueryClient();
   const router = useRouter();
  const { authorize } = useAuthStore.getState(); // Get Zustand authorize method


  return useMutation({
    //the API call to register organization
    mutationFn: async (data: SignupOrgData) => {
      const response = await axiosInstance.post(organizations.signup, data);
      return response.data;
    },
    //if request is successful
   onSuccess: (responseData) => {
      toast.success('Organization created successfully! Redirecting...');

      // Step 1: Extract tokens and user info (adjust keys if needed)
      const { user, token, refreshToken } = responseData.data || responseData;

      // Step 2: Save them in Zustand
      authorize({ user, token, refreshToken });

      // Step 3: Invalidate queries and redirect
      queryClient.invalidateQueries({ queryKey: ['organizations'] });
      router.push('/organization');
    },
    //if request fails
    onError: (error: any) => {
      console.error(
        'Signup Error:',
        error.response?.data?.detail || error.response?.data
      );
      toast.error(
        error.response?.data?.message || 'Signup failed. Please try again.'
      );
    },
  });
};
