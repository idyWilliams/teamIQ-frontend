import { create } from 'zustand';
import axiosInstance from '@/services/axios';
import { projects } from '@/services/api';
import { ProjectResponse, IntegratedData } from '@/types/projects';

interface ProjectDetailState {
  project: ProjectResponse | null;
  integratedData: IntegratedData | null;
  isLoading: boolean;
  error: string | null;

  fetchProjectDetails: (id: string | number) => Promise<void>;
  fetchIntegratedData: (id: string | number) => Promise<void>;
}

export const useProjectDetailStore = create<ProjectDetailState>((set) => ({
  project: null,
  integratedData: null,
  isLoading: false,
  error: null,

  fetchProjectDetails: async (id) => {
    set({ isLoading: true, error: null });
    try {
      const response = await axiosInstance.get<ProjectResponse>(projects.comprehensive(id));
      set({ project: response.data, isLoading: false });
    } catch (err: any) {
      set({ error: err.message || 'Failed to fetch project details', isLoading: false });
    }
  },

  fetchIntegratedData: async (id) => {
    try {
      const response = await axiosInstance.get<IntegratedData>(projects.integrated(id));
      set({ integratedData: response.data });
    } catch (err: any) {
      console.error('Failed to fetch integrated data', err);
    }
  },
}));
