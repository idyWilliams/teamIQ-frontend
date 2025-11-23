'use client';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import axiosInstance from '@/services/axios';
import { auth, organizations } from '@/services/api';
import { toast } from 'sonner';
import { useAuthStore } from '@/store/useAuthStore';
import { useRouter } from 'next/navigation';
import { AxiosError } from 'axios';
import { useState } from 'react';

interface SignupOrgData {
  name: string;
  email: string;
  password: string;
  team_size: string;
  country: string;
}

// Login Individual & Organization
export const useLogin = () => {
  return useMutation<any, AxiosError, { email: string; password: string }>({
    mutationFn: async (payload: { email: string; password: string }) => {
      console.log('Payload being sent:', payload);
      const { data } = await axiosInstance.post(auth.login, payload);
      return data;
    },
  });
};

//Register Individual
export const useRegisterIndividual = () => {
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: async ({
      data,
      invitation_code,
    }: {
      data: any;
      invitation_code: string;
    }) => {
      setLoading(true);
      const res = await axiosInstance.post(
        auth.registerIndividual(invitation_code),
        data
      );
      return res.data;
    },
    onSuccess: () => {
      toast.success('User registered successfully!');
      setLoading(false);
      queryClient.invalidateQueries({ queryKey: ['auth'] });
      router.push('/login'); // redirect to login page
    },
    onError: () => {
      toast.error('Registration failed.');
      setLoading(false);
    },
  });

  return { ...mutation, loading };
};

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
    onSuccess: responseData => {
      toast.success('Organization created successfully! Redirecting...');

      // Step 1: Extract tokens and user info (adjust keys if needed)
      const { organization, access_token } = responseData.data || responseData;

      // Step 2: Save them in Zustand
      authorize({ user: organization as any, token: access_token });

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
      // toast.error(
      //   error.response?.data?.message || 'Signup failed. Please try again.'
      // );
    },
  });
};

// 1 REQUEST PASSWORD RESET — sends reset link/code to email
export const usePassword = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (payload: { email: string }) => {
      const res = await axiosInstance.post(auth.passwordReset, payload);
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
    mutationFn: async (payload: { token: string; new_password: string }) => {
      const res = await axiosInstance.post(auth.confirmPasswordReset, payload);
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

// Onboarding Complete Hook
export const useOnboardingComplete = () => {
  const queryClient = useQueryClient();
  const router = useRouter();

  return useMutation({
    mutationFn: async (payload: {
      description: string;
      sector: string;
      social_media_handles: {
        additionalProp1: string;
        additionalProp2: string;
        additionalProp3: string;
      };
      domain_link: string;
      favorite_tools: string;
      website: string;
      phone_number: string;
    }) => {
      const res = await axiosInstance.patch(
        organizations.onboardingComplete, 
        payload
      );
      return res.data;
    },
    onSuccess: data => {
      // toast.success(data?.message || 'Onboarding completed successfully!');
      queryClient.invalidateQueries({ queryKey: ['organizations'] });
    },
    onError: (error: any) => {
      const message =
        error?.response?.data?.message || 'Failed to complete onboarding.';
      // toast.error(message);
    },
  });
};


