'use client';
import { useQuery } from '@tanstack/react-query';
import api from '@/services/axios';
import { users as usersApi } from '@/services/api';
import { TeamMember } from '@/constants';

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

// Members of the organization
export interface Member extends TeamMember {
  id: number;
  first_name: string;
  last_name: string;
  email: string;
  profile_image?: string;
  role: string;
  username?: string;
}

// Project member type
export interface ProjectMember extends Member {
  project_role?: string;
}

// Populate project data using real users' details
export interface CreatedProject extends Project {
  projectLead?: Member;
  teamMembers?: ProjectMember[];
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

// Hook to get members for a specific project
export const useProjectMembers = (projectId: number | undefined) => {
  return useQuery({
    queryKey: ['project-members', projectId],
    queryFn: async (): Promise<ProjectMember[]> => {
      if (!projectId) return [];
      
      const { data } = await api.get(`/projects/${projectId}/users`);
      console.log('Project Members Response:', data);

      let members: ProjectMember[] = [];

      if (Array.isArray(data)) {
        members = data;
      } else if (Array.isArray(data?.data)) {
        members = data.data;
      }

      return members;
    },
    enabled: !!projectId,
    staleTime: 2 * 60 * 1000,
    gcTime: 5 * 60 * 1000,
  });
};

// Hook that fetches projects with their members
export const useCreatedProjects = () => {
  return useQuery({
    queryKey: ['created-projects'],
    queryFn: async (): Promise<CreatedProject[]> => {
      // Fetch all projects first
      const { data: projectsRes } = await api.get<any>('/projects/');

      let projects: Project[] = [];
      if (Array.isArray(projectsRes)) {
        projects = projectsRes;
      } else if (Array.isArray(projectsRes?.data)) {
        projects = projectsRes.data;
      }

      if (projects.length === 0) {
        return [];
      }

      // Fetch members for all projects in parallel
      const projectsWithMembers = await Promise.all(
        projects.map(async project => {
          try {
            // Fetch project members
            const { data: membersRes } = await api.get(
              `/projects/${project.id}/users`
            );

            let members: ProjectMember[] = [];
            if (Array.isArray(membersRes)) {
              members = membersRes;
            } else if (Array.isArray(membersRes?.data)) {
              members = membersRes.data;
            }

            // Find the project lead from members
            const projectLead = members.find(
              m => m.id === project.project_lead_id
            );

            return {
              ...project,
              projectLead,
              teamMembers: members,
            } as CreatedProject;
          } catch (error) {
            console.error(
              `Failed to fetch members for project ${project.id}:`,
              error
            );
            // Return project without members on error
            return {
              ...project,
              projectLead: undefined,
              teamMembers: [],
            } as CreatedProject;
          }
        })
      );

      // Sort by createdAt descending
      return projectsWithMembers.sort(
        (a, b) =>
          new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
      );
    },
    staleTime: 2 * 60 * 1000,
    gcTime: 5 * 60 * 1000,
  });
};

// Hook to get a single project with full details
export const useProject = (projectId: number | string | undefined) => {
  return useQuery({
    queryKey: ['project', projectId],
    queryFn: async (): Promise<CreatedProject | null> => {
      if (!projectId) {
        console.log('❌ No projectId provided');
        return null;
      }
      console.log('🔍 Fetching project:', projectId);
      try {
        // Fetch project details
        const { data: projectRes } = await api.get(`/projects/${projectId}`);
        console.log('📦 Raw project response:', projectRes);

        let project: Project | null = null;
        if (projectRes) {
          project = projectRes.data || projectRes;
        }
        if (!project) return null;
        // Fetch project members
        try {
          const { data: membersRes } = await api.get(
            `/projects/${projectId}/users`
          );

          let members: ProjectMember[] = [];
          if (Array.isArray(membersRes)) {
            members = membersRes;
          } else if (Array.isArray(membersRes?.data)) {
            members = membersRes.data;
          }

          // Find the project lead from members
          const projectLead = members.find(
            m => m.id === project!.project_lead_id
          );

          return {
            ...project,
            projectLead,
            teamMembers: members,
          } as CreatedProject;
        } catch (error) {
          console.error('Failed to fetch project members:', error);
          return {
            ...project,
            projectLead: undefined,
            teamMembers: [],
          } as CreatedProject;
        }
      } catch (error: any) {
        console.error('❌ Failed to fetch project:', error.message);
        console.error('Error details:', error.response?.data);
        throw error;
      }
    },
    enabled: !!projectId,
    staleTime: 2 * 60 * 1000,
    gcTime: 5 * 60 * 1000,
    retry: 1, // Only retry once
    retryDelay: 1000,
  });
};


export const useGetMyProjects = () => {
  return useQuery({
    queryKey: ['user-projects'],

    queryFn: async () => {
      const res = await api.get(usersApi.getProjects);
      console.log('users-get-projects', res.data);
      return res.data;
    },
  });
};
