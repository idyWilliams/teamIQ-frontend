'use client';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import api from '@/services/axios';
import { toast } from 'sonner';
import { organizations } from '@/services/api';

interface SignupOrgData {
  name: string;
  email: string;
  password: string;
  //address: string;
  //phone: string;
}
export const useSignupOrg = () => {
  const queryClient = useQueryClient();
  return useMutation({
    //the API call to register organization
    mutationFn: async (data: SignupOrgData) => {
      const response = await api.post(organizations.signup, data);
      return response.data;
    },
    //if request is successful
    onSuccess: () => {
      toast.success('Organization created successfully!');
      queryClient.invalidateQueries({ queryKey: ['organizations'] });
    },

    //if request fails
     onError: (error: any) => {
  console.error("Signup Error:", error.response?.data?.detail || error.response?.data);
  toast.error(error.response?.data?.message || 'Signup failed. Please try again.');
},

  });
};