import axios, { AxiosError, InternalAxiosRequestConfig } from 'axios';
import { useAuthStore } from '@/store/useAuthStore';
import { auth } from './api';

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

    // Check if error is 401 and not already a retry
    if (err.response?.status === 401 && !originalRequest?._retry) {
      originalRequest._retry = true;
      const refreshToken = useAuthStore.getState().refresh_token;

      if (refreshToken) {
        try {
          // Attempt to refresh token
          const response = await axios.post(`${axiosInstance.defaults.baseURL}${auth.refresh}`, {
            refresh_token: refreshToken,
          });

          const { access_token, refresh_token } = response.data.tokens || response.data;

          // Update store with new tokens
          useAuthStore.getState().setTokens({ access_token, refresh_token });

          // Update header and retry original request
          originalRequest.headers.Authorization = `Bearer ${access_token}`;
          return axiosInstance(originalRequest);
        } catch (refreshError) {
          // If refresh fails, log out
          useAuthStore.getState().logout();
          if (typeof window !== 'undefined') {
            window.location.href = '/login';
          }
          return Promise.reject(refreshError);
        }
      } else {
        // No refresh token available, log out
        useAuthStore.getState().logout();
        if (typeof window !== 'undefined') {
          window.location.href = '/login';
        }
      }
    }

    return Promise.reject(err);
  }
);

export default axiosInstance;
