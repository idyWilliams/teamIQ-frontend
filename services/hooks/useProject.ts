// services/hooks/useProjects.ts
'use client';
import { useMutation } from '@tanstack/react-query';
import axiosInstance from '@/services/axios';
import { toast } from 'sonner';

interface ProjectStep1Data {
  name: string;
  description: string;
  project_lead_id: number;
  stacks: string[];
  start_date: string;
  end_date: string;
  linked_documents: string[];
  project_image: string;
  is_visible: boolean;
}

export const useCreateProjectStep1 = () => {
  return useMutation({
    mutationFn: async (projectData: ProjectStep1Data) => {
      console.log('SENDING PROJECT DATA:', projectData);
      console.log('Checking token...');

      const token = localStorage.getItem('accessToken');
      console.log('Token exists:', !!token);
      if (token) {
        console.log('Token preview:', token.substring(0, 50) + '...');
      }

      try {
        const response = await axiosInstance.post(
          '/projects/create/step1-details',
          projectData
        );

        console.log('SUCCESS RESPONSE:', response);
        return response.data;
      } catch (error: any) {
        console.error(' API ERROR DETAILS:');
        console.error('URL:', error.config?.url);
        console.error('Method:', error.config?.method);
        console.error('Data sent:', error.config?.data);
        console.error('Headers:', error.config?.headers);
        console.error('Status:', error.response?.status);
        console.error('Response data:', error.response?.data);
        console.error('Full error:', error);

        throw error;
      }
    },
    onSuccess: data => {
      console.log('Project creation successful:', data);
      toast.success('Project created successfully!');
      return data;
    },
    onError: (error: any) => {
      console.error('Mutation onError:', error);
      const errorMessage =
        error.response?.data?.detail ||
        error.response?.data?.message ||
        'Failed to create project';
      toast.error(errorMessage);
    },
  });
};
