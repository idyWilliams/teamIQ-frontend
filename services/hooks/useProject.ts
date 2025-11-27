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

export interface CommNotifications {
  pmt_updates: boolean;
  code_events: boolean;
  sentiment_monitoring: boolean;
  custom_commands: boolean;
}

export interface ProjectStep4Data {
  comm_tool: string;
  comm_integration_method: 'oauth2' | 'api_key' | 'webhook';
  comm_channel_id?: string;
  comm_api_key?: string;
  comm_webhook_url?: string;
  comm_notifications: CommNotifications;
}

export interface ProjectMember {
  user_id: number;
  role: string;
}

export interface ProjectStep5Data {
  members: ProjectMember[];
}

export interface FinalProjectData {
  name: string;
  description: string;
  project_lead_id: number;
  stacks: string[];
  start_date: string;
  end_date: string;
  linked_documents: string[];
  project_image: string;
  is_visible: boolean;
  pm_tool: string;
  pm_integration_method: 'oauth2' | 'api_key';
  pm_project_id?: string;
  pm_api_key?: string;
  vc_tool: string;
  vc_integration_method: 'oauth2' | 'api_key';
  vc_repository_url?: string;
  vc_api_key?: string;
  comm_tool: string;
  comm_integration_method: 'oauth2' | 'api_key' | 'webhook';
  comm_channel_id?: string;
  comm_api_key?: string;
  comm_webhook_url?: string;
  comm_notifications: {
    pmt_updates: boolean;
    code_events: boolean;
    sentiment_monitoring: boolean;
    custom_commands: boolean;
  };
  member_ids: number[];
}

export const useCreateProjectStep1 = () => {
  return useMutation({
    mutationFn: async (projectData: ProjectStep1Data) => {
      try {
        const response = await axiosInstance.post(
          '/projects/create/step1-details',
          projectData
        );

        return response.data;
      } catch (error: any) {
        throw error;
      }
    },
    onSuccess: data => {
      toast.success('Project created successfully!');
      return data;
    },
    onError: (error: any) => {
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
      const response = await axiosInstance.patch(
        `/projects/${projectId}/step2-pm-tool`,
        step2Data
      );

      return response.data;
    },
  });
};

export const useUpdateProjectStep3 = (projectId: number) => {
  return useMutation({
    mutationFn: async (step3Data: ProjectStep3Data) => {
      const response = await axiosInstance.patch(
        `/projects/${projectId}/step3-version-control`,
        step3Data
      );

      return response.data;
    },
  });
};

export const useUpdateProjectStep4 = (projectId: number) => {
  return useMutation({
    mutationFn: async (step4Data: ProjectStep4Data) => {
      const response = await axiosInstance.patch(
        `/projects/${projectId}/step4-communication-tool`,
        step4Data
      );

      return response.data;
    },
  });
};

export const useUpdateProjectStep5 = (projectId: number) => {
  return useMutation({
    mutationFn: async (step5Data: ProjectStep5Data) => {
      const response = await axiosInstance.patch(
        `/projects/${projectId}/step5-add-members`,
        step5Data
      );

      return response.data;
    },
    onSuccess: data => {
      toast.success('Team members added successfully!');
      return data;
    },
    onError: (error: any) => {
      const errorMessage =
        error.response?.data?.detail ||
        error.response?.data?.message ||
        'Failed to add team members';
      toast.error(errorMessage);
    },
  });
};

export const useCreateCompleteProject = () => {
  return useMutation({
    mutationFn: async (projectData: FinalProjectData) => {
      try {
        const response = await axiosInstance.post(
          '/projects/create',
          projectData
        );

        return response.data;
      } catch (error: any) {
        throw error;
      }
    },
    onSuccess: data => {
      toast.success('Project created successfully!');
      return data;
    },
    onError: (error: any) => {
      const errorMessage =
        error.response?.data?.detail ||
        error.response?.data?.message ||
        'Failed to create project';
      toast.error(errorMessage);
    },
  });
};
