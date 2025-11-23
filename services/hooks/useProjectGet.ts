'use client';
import { useQuery } from '@tanstack/react-query';
import api from '@/services/axios';
import { users as usersApi } from '@/services/api';


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
      const { data } = await api.get<any>('/projects/');
      console.log('Raw Projects Response:', data);

      let projects: Project[] = [];

      if (Array.isArray(data)) {
        projects = data;
      } else if (Array.isArray(data?.data)) {
        projects = data.data;
      } else {
        console.warn('Projects data is missing or undefined:', data);
        return [];
      }

      // Sort by createdAt descending (newest first)
      const sortedProjects = projects.sort(
        (a, b) =>
          new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
      );
      console.log(' Projects fetched (newest first):', sortedProjects);
      return sortedProjects;
    },
    staleTime: 2 * 60 * 1000,
    gcTime: 5 * 60 * 1000,
  });
};

export const useGetMyProjects = () => {
  return useQuery({
    queryKey: ['user-projects'],

    queryFn: async() => {
      const res = await api.get(usersApi.getProjects);
      console.log("users-get-projects", res.data)
      return res.data
    }
  })
}
