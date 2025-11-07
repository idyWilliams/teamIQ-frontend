'use client';
import { useQuery } from '@tanstack/react-query';
import api from '@/services/axios';
import axiosInstance from '@/services/axios';

export interface Project {
  id: number;
  name: string;
  description: string;
  owner_id: number | null;
  organization_id: number;
  project_lead_id: number | null;
  stacks: string[];
  start_date: string;
  end_date: string;
  pm_tool: string | null;
  vc_tool: string | null;
  comm_tool: string | null;
  status: 'active' | 'inactive' | 'completed' | 'archived';
  pct_complete: number;
  is_visible: boolean;
  createdAt: string;
  updatedAt: string;
}

interface ProjectsResponse {
  success: boolean;
  message: string;
  errors: null;
  data: Project[];
  timestamp: string;
}

export const useProjects = () => {
  return useQuery({
    queryKey: ['projects'],
    queryFn: async (): Promise<Project[]> => {
      const { data } = await axiosInstance.get<ProjectsResponse>('/projects/');
      console.log('📋 Projects fetched:', data);
      return data.data;
    },
    staleTime: 2 * 60 * 1000,
    gcTime: 5 * 60 * 1000,
  });
};
