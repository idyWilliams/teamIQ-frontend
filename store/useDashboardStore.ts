import { create } from 'zustand';
import axiosInstance from '@/services/axios';
import { dashboard } from '@/services/api';
import { OrgDashboardResponse, UserDashboardResponse } from '@/types/dashboard';

interface DashboardState {
  orgData: OrgDashboardResponse | null;
  userData: UserDashboardResponse | null;
  isLoading: boolean;
  error: string | null;

  fetchOrgDashboard: () => Promise<void>;
  fetchUserDashboard: () => Promise<void>;
}

export const useDashboardStore = create<DashboardState>((set) => ({
  orgData: null,
  userData: null,
  isLoading: false,
  error: null,

  fetchOrgDashboard: async () => {
    set({ isLoading: true, error: null });
    try {
      const response = await axiosInstance.get<OrgDashboardResponse>(dashboard.organization);
      set({ orgData: response.data, isLoading: false });
    } catch (err: any) {
      set({ error: err.message || 'Failed to fetch organization dashboard', isLoading: false });
    }
  },

  fetchUserDashboard: async () => {
    set({ isLoading: true, error: null });
    try {
      const response = await axiosInstance.get<UserDashboardResponse>(dashboard.user);
      set({ userData: response.data, isLoading: false });
    } catch (err: any) {
      set({ error: err.message || 'Failed to fetch user dashboard', isLoading: false });
    }
  },
}));
