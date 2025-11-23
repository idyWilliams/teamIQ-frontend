'use client';
import { useQuery } from '@tanstack/react-query';
import api from '@/services/axios';
import { users as usersApi } from '@/services/api';

export interface User {
  id: number;
  email: string;
  username: string;
  first_name: string;
  last_name: string;
  country: string;
  role: string;
  profile_image: string | null;
  bio: string | null;
  phone_number: string | null;
  organization_id: number | null;
  createdAt: string;
  last_seen: string | null;
}

interface UsersResponse {
  success: boolean;
  message: string;
  errors: null;
  data: User[];
  timestamp: string;
}

export function useUsers() {
  return useQuery({
    queryKey: ['users'],
    queryFn: async () => {
      const res = await api.get('/users'); // fetch from jsonplaceholder
      return res.data;
    },
  });
}

export function useOrganizationUsers() {
  return useQuery({
    queryKey: ['organization-users'],
    queryFn: async (): Promise<User[]> => {
      const res = await api.get<UsersResponse>(usersApi.organizationUsers);
      console.log('👥 Organization users fetched:', res.data);
      return res.data.data; 
    },
    staleTime: 5 * 60 * 1000, // 5 minutes
    gcTime: 10 * 60 * 1000, // 10 minutes
  });
}
