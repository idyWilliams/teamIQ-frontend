import axios, { AxiosError, InternalAxiosRequestConfig } from 'axios';
import { useAuthStore } from '@/store/useAuthStore';
import { isTokenExpired } from '@/utils/jwtUtils';

const axiosInstance = axios.create({
  baseURL:
    process.env.NEXT_PUBLIC_API_BASE_URL ||
    'https://teamiq-backend.onrender.com/api/v1',
  withCredentials: true,
});

// REQUEST INTERCEPTOR
axiosInstance.interceptors.request.use(
  (config: InternalAxiosRequestConfig) => {
    const token = useAuthStore.getState().token;

    if (token) {
      if (isTokenExpired(token)) {
        useAuthStore.getState().logout();
        window.location.href = '/login';
        throw new Error('Token expired');
      }

      config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
  },
  error => Promise.reject(error)
);

// RESPONSE INTERCEPTOR
axiosInstance.interceptors.response.use(
  res => res,
  async (err: AxiosError) => {
    const originalRequest: any = err.config;

    if (err.response?.status === 401 && !originalRequest?._retry) {
      originalRequest._retry = true;
      useAuthStore.getState().logout();
      window.location.href = '/login';
    }

    return Promise.reject(err);
  }
);

export default axiosInstance;
