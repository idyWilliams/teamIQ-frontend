// services/hooks/useProjects.ts
'use client';
import { useMutation } from '@tanstack/react-query';
import axiosInstance from '@/services/axios';
import { toast } from 'sonner';

export interface ProjectStep1Data {
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

export interface ProjectStep2Data {
  pm_tool: string;
  pm_integration_method: 'oauth2' | 'api_key';
  pm_project_id?: string;
  pm_api_key?: string;
  pm_access_token?: string;
}

export interface ProjectStep3Data {
  vc_tool: string;
  vc_integration_method: 'oauth2' | 'api_key';
  vc_repository_url?: string;
  vc_api_key?: string;
  vc_access_token?: string;
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

export const useUpdateProjectStep2 = (projectId: number) => {
  return useMutation({
    mutationFn: async (step2Data: ProjectStep2Data) => {
      console.log('SENDING STEP 2 DATA:', step2Data);
      console.log('Project ID:', projectId);

      const token = localStorage.getItem('accessToken');
      console.log('Token exists:', !!token);

      const response = await axiosInstance.patch(
        `/projects/${projectId}/step2-pm-tool`,
        step2Data
      );

      console.log('STEP 2 SUCCESS RESPONSE:', response);
      return response.data;
    },
  });
};

export const useUpdateProjectStep3 = (projectId: number) => {
  return useMutation({
    mutationFn: async (step3Data: ProjectStep3Data) => {
      console.log('SENDING STEP 3 DATA:', step3Data);
      console.log('Project ID:', projectId);

      const token = localStorage.getItem('accessToken');
      console.log('Token exists:', !!token);

      const response = await axiosInstance.patch(
        `/projects/${projectId}/step3-version-control`,
        step3Data
      );

      console.log('STEP 3 SUCCESS RESPONSE:', response);
      return response.data;
    },
  });
};
