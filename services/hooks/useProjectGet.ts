'use client';
import { useMutation, useQuery } from '@tanstack/react-query';
import api from '@/services/axios';
import { projects as projectsApi, users as usersApi } from '@/services/api';
import { 
  ProjectResponse, 
  ComprehensiveProjectData, 
  MyProjectData, 
  WebhookSetupInstructions,
  UserOut
} from '@/types/projects';
import { APIResponse } from '@/types/api';

// Maintain legacy types if needed for compatibility, but prefer new ones
export interface Project extends ProjectResponse {}

// Members of the organization
export interface Member extends UserOut {
  role: string;
}

// Project member type
export interface ProjectMember extends Member {
  project_role?: string;
}

// Populate project data using real users' details
export interface CreatedProject extends Project {
  projectLead?: UserOut;
  teamMembers?: UserOut[];
}

const parseDates = (project: any) => {
  if (project.created_at) project.created_at = new Date(project.created_at).toISOString();
  if (project.updated_at) project.updated_at = new Date(project.updated_at).toISOString();
  if (project.start_date) project.start_date = new Date(project.start_date).toISOString();
  if (project.end_date) project.end_date = new Date(project.end_date).toISOString();
  return project;
};

export const useProjects = () => {
  return useQuery({
    queryKey: ['projects'],
    queryFn: async (): Promise<Project[]> => {
      const response = await api.get<APIResponse<Project[]>>(projectsApi.list);
      const data = response.data;

      if (!data.success) {
        throw new Error(data.message || 'Failed to fetch projects');
      }

      const projects = data.data || [];

      // Sort by created_at descending (newest first)
      const sortedProjects = projects.map(parseDates).sort(
        (a, b) =>
          new Date(b.created_at).getTime() - new Date(a.created_at).getTime()
      );
      return sortedProjects;
    },
    staleTime: 2 * 60 * 1000,
    gcTime: 5 * 60 * 1000,
  });
};

export const useCreatedProjects = () => {
  return useQuery({
    queryKey: ['created-projects'],
    queryFn: async (): Promise<ProjectResponse[]> => {
      const response = await api.get<APIResponse<ProjectResponse[]>>(projectsApi.list);
      const data = response.data;

      if (!data.success) {
        throw new Error(data.message || 'Failed to fetch projects');
      }

      const projects = data.data || [];

      return projects.map(parseDates).sort(
        (a, b) =>
          new Date(b.created_at).getTime() - new Date(a.created_at).getTime()
      );
    },
    staleTime: 2 * 60 * 1000,
    gcTime: 5 * 60 * 1000,
  });
};

export const useProject = (projectId: number | string | undefined) => {
  return useQuery({
    queryKey: ['project', projectId],
    queryFn: async (): Promise<ProjectResponse | null> => {
      if (!projectId) return null;
      try {
        const response = await api.get<APIResponse<ProjectResponse>>(projectsApi.byId(projectId));
        const data = response.data;

        if (!data.success) {
          throw new Error(data.message || 'Failed to fetch project');
        }

        return parseDates(data.data);
      } catch (error: any) {
        console.error('❌ Failed to fetch project:', error.message);
        throw error;
      }
    },
    enabled: !!projectId,
    staleTime: 2 * 60 * 1000,
    gcTime: 5 * 60 * 1000,
  });
};

export const useComprehensiveProjectData = (projectId: string | number | undefined) => {
  return useQuery({
    queryKey: ['project-comprehensive', projectId],
    queryFn: async (): Promise<ComprehensiveProjectData | null> => {
      if (!projectId) return null;
      const response = await api.get<APIResponse<ComprehensiveProjectData>>(
        projectsApi.comprehensive(projectId)
      );
      const data = response.data;

      if (!data.success) {
        throw new Error(data.message || 'Failed to fetch comprehensive data');
      }

      const comprehensiveData = data.data;
      if (comprehensiveData.project) parseDates(comprehensiveData.project);
      if (comprehensiveData.tasks) comprehensiveData.tasks.forEach(parseDates);

      return comprehensiveData;
    },
    enabled: !!projectId,
    staleTime: 2 * 60 * 1000,
    gcTime: 5 * 60 * 1000,
  });
};

export const useMyProjectData = (projectId: string | number | undefined) => {
  return useQuery({
    queryKey: ['project-my-data', projectId],
    queryFn: async (): Promise<MyProjectData | null> => {
      if (!projectId) return null;
      const response = await api.get<APIResponse<MyProjectData>>(
        projectsApi.myData(projectId)
      );
      const data = response.data;

      if (!data.success) {
        throw new Error(data.message || 'Failed to fetch my data');
      }

      return data.data;
    },
    enabled: !!projectId,
  });
};

export const useWebhookInstructions = (projectId: string | number | undefined) => {
  return useQuery({
    queryKey: ['project-webhook-instructions', projectId],
    queryFn: async (): Promise<WebhookSetupInstructions | null> => {
      if (!projectId) return null;
      const response = await api.get<APIResponse<WebhookSetupInstructions>>(
        projectsApi.webhookInstructions(projectId)
      );
      const data = response.data;

      if (!data.success) {
        throw new Error(data.message || 'Failed to fetch webhook instructions');
      }

      return data.data;
    },
    enabled: !!projectId,
  });
};

export const useGenerateAiSummary = (projectId: string | number | undefined) => {
  return useMutation({
    mutationFn: async () => {
      if (!projectId) throw new Error('Project ID is required');
      const response = await api.post<APIResponse<string>>(
        projectsApi.generateAiSummary(projectId)
      );
      if (!response.data.success) {
        throw new Error(response.data.message || 'Failed to generate AI summary');
      }
      return response.data.data;
    },
  });
};

export const useGetMyProjects = () => {
  return useQuery({
    queryKey: ['user-projects'],
    queryFn: async () => {
      const response = await api.get<APIResponse<ProjectResponse[]>>(usersApi.getProjects);
      return response.data.data;
    },
  });
};

export const useDeleteProject = () => {
  return useMutation({
    mutationFn: async (projectId: number | string) => {
      const response = await api.delete<APIResponse<any>>(projectsApi.deleteProject(projectId as number));
      return response.data;
    },
  });
};