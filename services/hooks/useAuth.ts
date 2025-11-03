'use client';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { auth, organizations } from '@/services/api';
import { toast } from 'sonner';
import axiosInstance from '@/services/axios';

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
  return useMutation({
    //the API call to register organization
    mutationFn: async (data: SignupOrgData) => {
      const response = await axiosInstance.post(organizations.signup, data);
      return response.data;
    },
    //if request is successful
    onSuccess: () => {
      toast.success('Organization created successfully!');
      queryClient.invalidateQueries({ queryKey: ['organizations'] });
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
